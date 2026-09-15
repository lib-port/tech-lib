# Getting Started with Docker Swarm

> [!NOTE]
> This guide explains how Docker Swarm orchestrates scalable, resilient multi-host applications through clustered nodes, desired-state services, declarative stacks, overlay networking, secure configuration, and automated workload management.

Docker Swarm mode coordinates container workloads across a group of Docker Engines. It adds cluster membership, service scheduling, networking, and reconciliation of desired state to Docker's packaging and command-line tools. Managers distribute suitable work and create replacements when the application specification requires them.

Each container runs on a particular node and uses that node's resources. Compatible hardware, software, and application design determine whether additional replicas improve capacity, availability, or both.

Infrastructure management supplies nodes and connectivity. Application management defines images, commands, replicas, networks, mounts, and runtime settings. A service describes work the cluster should maintain, a stack groups related application resources, and a job describes work expected to finish.

## Containers and the move beyond one host

Containers give processes separate views of resources such as filesystems and networks. Applications can use different library versions at the same apparent path inside their containers. Separate network namespaces also allow two web servers to listen internally on port 80. Publishing both through the same fixed host address, protocol, and port still creates a conflict that deployment configuration must resolve.

An ordinary Linux container shares its host's kernel. Its isolation depends on runtime settings, host security, and exposed interfaces. Shared mounts, privileged operation, or Docker API access can give a container substantial access to its host. A virtual machine provides a different boundary by running its own operating-system kernel.

Images package application filesystems and runtime dependencies for distribution. Docker Hub hosts applications, databases, web servers, and development tools. Docker Official Images form a curated subset of its repositories. Other images come from publishers or community maintainers. Registry availability alone does not establish maintenance, compatibility, or suitability for a particular environment.

Prebuilt images simplify experiments with databases, application versions, and development tools. Image layers can share storage, although images and application data still consume disk space. A larger host can postpone resource limits. Multiple hosts can add capacity and reduce dependence on one machine when the application and its data support that arrangement.

A distributed loan application illustrates the coordination problem. A web frontend may depend on a database and a risk-assessment API, while the risk API depends on a model. Each component needs an address through which it can reach the next. Service discovery supplies those addresses. Database replication, readable standby behaviour, and model distribution still require application-specific implementation.

## Nodes and practical lab environments

A swarm node is a participating Docker Engine on a physical machine, virtual machine, or cloud instance. Several virtual nodes on one computer can demonstrate orchestration, but share the physical host's capacity and failure risks. Separate Raspberry Pi machines provide independent hardware with additional architecture considerations.

A single-node swarm supports services and stacks with little setup, although it cannot tolerate failure of its only host. Docker Desktop can support local learning. Its virtual machine and network integration need consideration when it joins other hosts.

Vagrant describes repeatable virtual-machine labs through a Ruby-based Vagrantfile. Machine names such as `m1` and `w1` can identify intended roles, but actual manager or worker status comes from Swarm membership.

A Vagrant configuration selects a base box, network interfaces, hostnames, CPU allocation, memory, and provisioning steps. The box supplies the starting virtual-machine image. Current installations need a supported operating system and compatible packages. CPU and memory allocations must fit the physical host.

A provider supplies the virtualisation backend and can be selected through a command-line option or `VAGRANT_DEFAULT_PROVIDER`. Existing machines retain their original provider. The provider, box, and host architecture must be compatible.

Vagrant's Docker provisioner installs Docker when required. Docker's convenience installation script suits development and testing, while production installations need the supported package and upgrade procedure for their platform.

`vagrant up m1 w1` starts and provisions selected machines, while `vagrant status` reports their state. Starting a subset of a larger configuration can keep early exercises within available resources.

Automated cluster creation must initialise the first manager before other nodes join. Provisioning can pass manager and worker tokens to later machines, with restricted access to temporary copies. Those copies need removal when no longer required.

Play with Docker previously offered temporary browser-based labs. Its site announced unavailability from 1 March 2026, so those sessions are historical examples. Local virtual machines and independently provisioned hosts provide alternative lab environments.

## Initialisation and node membership

The server section of `docker info` reports whether Swarm mode is active. `docker swarm init` creates a single-node swarm and makes the targeted Engine its first manager. Subsequent inspection reports the active swarm and manager information.

A machine with several network interfaces needs a suitable address for node communication. A virtual machine may have both a NAT interface for host access and another private interface shared with other guests. The required address must be reachable by the other swarm nodes.

The `--advertise-addr` option selects the advertised address or interface. Managers need stable, reachable addresses. Interface names, IP addresses, and MAC addresses help relate guest networking to the hypervisor's settings. An address that works for host-to-guest SSH may be unsuitable for communication among guests.

Swarm requires connectivity for its management and data paths:

| Protocol and default port | Purpose |
| --- | --- |
| TCP 2377 | Manager communication |
| TCP and UDP 7946 | Node discovery |
| UDP 4789 | Overlay data traffic |

The overlay data port is configurable. Encrypted overlays also require IPsec ESP traffic. These internal connections belong on trusted networks, with published application ports controlled separately.

Initialisation also exposes task-history retention, certificate expiry, address pools, and data-path settings. Some can later change through `docker swarm update`. Default address pools, however, must be chosen when the swarm is initialised.

Initialisation generates separate worker and manager join tokens. On a manager, `docker swarm join-token worker` and `docker swarm join-token manager` retrieve the corresponding join commands. Running `docker swarm join` with the appropriate token enrols the targeted Engine in that role.

Both tokens are sensitive credentials. A worker token admits a machine that can receive workloads and their authorised secrets. A manager token grants a wider role in cluster control and state. Tokens can be rotated to prevent further use of old values for enrolment. Rotation does not remove nodes that have already joined and received certificates.

Swarm uses a built-in public key infrastructure. By default, the first manager creates a root certificate authority. A join token contains that certificate's digest and an enrolment secret. Each accepted node receives a certificate identifying its node ID and role. Certificates secure subsequent management communication.

Management traffic is encrypted by default through mutual TLS. Application traffic on an overlay network is a separate concern and is not encrypted by default. An encrypted overlay can protect traffic between nodes, while client-facing TLS remains part of the application's network design. Automatic certificate provisioning does not eliminate host security, network configuration, or access control responsibilities.

After joining, `docker info` confirms membership. Cluster-wide queries such as `docker node ls` must target a manager, because workers do not expose the manager interface for listing or changing the whole swarm.

## Docker contexts and remote access

A Docker context stores connection information for an Engine, allowing one client to address several hosts. An SSH context can use a hostname alias, user, port, and identity file from the client's SSH configuration. Vagrant's `ssh-config` command can supply suitable connection settings for a guest.

SSH provides an encrypted connection when authentication and host verification are properly configured. The remote user also needs permission to access the Docker daemon socket. Possession of an SSH connection alone does not grant that permission. Conversely, broad Docker daemon access is a powerful administrative capability and needs appropriate restrictions.

`docker context ls` lists contexts, with an asterisk identifying the selected context. `docker context show` reports its name, and `docker context inspect` exposes its stored details. Selecting `m1` with `docker context use m1` changes the default target for later commands. The set of saved context names remains, but the active marker changes.

The global `--context` option, also available as `-c`, overrides the target for one invocation. A command directed to `w1` through that flag does not change a previously selected `m1` context for the next command. This is useful when one operation needs information from a manager while the surrounding work concerns a worker.

`DOCKER_HOST` and `DOCKER_CONTEXT` can also affect the target. Checking the server identity in `docker info` establishes which Engine received a command. Saved context names alone do not establish cluster membership.

A context changes the Docker client's connection. A local stack file can be submitted to a remote manager, but a resulting service's bind mounts still refer to paths on the nodes running its tasks. Remote command connections also add overhead, which can affect suitable polling intervals for diagnostic displays.

## Manager roles, quorum, and availability

Managers maintain the swarm's desired state and coordinate scheduling. They elect one leader for orchestration and replicate agreed state using Raft. Other managers are active participants in that replication and can take over leadership when the remaining group retains quorum. Workers receive assigned tasks and report their status through their agents.

By default, managers can also run application tasks. A small lab can use this capability to make full use of its nodes. Larger or critical deployments may reserve managers for management work because resource starvation can disrupt heartbeats, consensus, and elections. Scheduling availability controls whether a manager also receives ordinary Swarm tasks.

Raft requires a majority of managers, called quorum, to agree on cluster changes.

| Managers | Required for quorum | Manager failures tolerated |
| --- | --- | --- |
| 1 | 1 | 0 |
| 2 | 2 | 0 |
| 3 | 2 | 1 |
| 5 | 3 | 2 |

An odd manager count avoids adding a manager without gaining the next level of failure tolerance. Two managers still require both to remain available.

Manager placement also affects resilience. Several virtual managers on one physical host can all fail together. A suitable distribution considers independent machines, network paths, and failure zones. Additional managers improve tolerance only within the limits of quorum, and introduce additional coordination overhead. Replicated state still needs backups and a recovery procedure.

If manager quorum is lost, existing worker tasks may continue running, but the swarm cannot perform normal management or reconcile new scheduling changes. A promotion cannot repair lost quorum through the ordinary management API. The unavailable managers need recovery, or a deliberate disaster-recovery procedure is required.

`docker node promote` changes an eligible worker into a manager, and `docker node demote` changes a manager into a worker. Both operations change cluster membership and require a functioning manager group. `docker node inspect` shows the role and availability. A hostname such as `worker2` remains a name even after promotion.

A node's scheduling availability is separate from its manager or worker role.

| Availability | New Swarm assignments | Existing Swarm tasks |
| --- | --- | --- |
| `active` | Allowed | Continue running |
| `pause` | Prevented | Continue running |
| `drain` | Prevented | Stopped, with required replacements scheduled elsewhere |

Standalone containers created directly on an Engine are unaffected by these availability settings.

`docker node update --availability drain m2` can reserve a manager for management or prepare it for maintenance, while retaining its manager role. Replacements need quorum and suitable capacity. A normal `vagrant halt` requests an orderly guest shutdown, while a forced halt can simulate abrupt interruption.

Returning a node to `active` allows scheduling again. A global service can acquire its required task on that newly eligible node. Existing replicated services do not automatically move healthy tasks simply to fill an idle node. Swarm generally avoids disrupting running applications solely to rebalance them. A recovered node may regain membership when its identity and configuration remain intact. Its Ready status reports participation, while application responses establish whether its workloads function correctly.

## Services, tasks, and containers

A Swarm service describes work that the cluster should perform. Its specification can include an image, command, environment, network attachments, ports, mounts, placement requirements, and replica count. Managers use that description to create tasks. Each task carries the specification and lifecycle state of one scheduled unit of work, implemented as a container by Docker Engine.

The service stores durable desired state. Each task is one attempt to fulfil part of that state on one assigned node. Replacement ends the old attempt and creates a new task, which may run on the same node or another eligible node.

A replicated service requests a number of instances, represented by numbered slots. Replacement of slot 1 creates a new task ID while retaining that slot's purpose. The service identity and endpoint can remain stable across replacements.

A task progresses through states such as pending, assigned, preparing, starting, and running. A pending task may lack a suitable node. Preparing can include image retrieval and container setup. Completion, failure, and shutdown describe other lifecycle outcomes. The desired state and current state may differ while the system is converging or unable to satisfy the specification.

`docker service create` submits the specification and initiates scheduling. Its image, environment, and port options resemble those of `docker container run`. A directly started container belongs to one Engine, while a service delegates task management to Swarm.

The create command can wait for convergence or detach and return after submission. A service ID confirms acceptance of the request. It does not prove that every task has started, that health checks pass, or that the application works. Convergence output describes the state being observed, rather than streaming the application's normal logs.

`docker service ls` reports service summaries. `docker service ps` lists tasks and retained task history. `docker service inspect` exposes the stored specification and other detailed state. A previous specification may appear after an update, but it is not a complete version-control history. The initial service may have no previous specification.

Service scheduling depends on eligible capacity. A request for two replicas does not immediately guarantee two running containers. The cluster may have insufficient CPU or memory for reservations, no compatible platform, inaccessible images, missing mount paths, or no nodes satisfying placement constraints. Pending or rejected tasks help distinguish these causes from slow startup.

Resource reservations influence scheduling, while limits constrain runtime use. A cluster's total memory cannot satisfy a single task that requires more memory than any eligible node can provide. Adding replicas also does not automatically provide database replication or safe concurrent access to shared state. Those remain properties of the application and storage design.

SwarmKit supplies the underlying orchestration mechanisms. A worker's agent performs assigned work and reports progress to a manager's dispatcher. Managers use that feedback to compare actual tasks with the stored service specification. Keeping desired state separate from execution lets the cluster create replacements after failure while preserving the service's identity.

## A visualiser as a placement example

A cluster visualiser can show nodes and the Swarm tasks assigned to them. A standalone visualiser container on a manager can query the local Docker API through a socket mount and publish a web interface, for example on host port 8080. It may not appear as a Swarm task in its own display because it was started directly with the standalone container interface.

Converting the visualiser to a service retains its image and connections. The long `--mount` form specifies the socket bind mount. Another published port, such as 8081, avoids the existing standalone interface's port.

The required API access creates a placement constraint. A visualiser querying its local daemon for cluster state needs to run on a manager. If it runs on a worker, its process can start while its cluster queries fail. Adding `node.role==manager` to the service's constraints restricts tasks to nodes that expose the required manager APIs.

Constraints are requirements, while placement preferences express best-effort distribution choices. Multiple constraints must all be satisfied. A manager-only service can remain pending if every manager is drained or otherwise unsuitable. The constraint supplies the scheduler with a requirement, but does not create the required capacity or permissions.

A forced update replaces service tasks and can exercise placement, although a replacement may use the same node. Stopping an underlying task container can also prompt replacement under the service's restart policy. Either operation can interrupt work and lose in-memory state. Required placement belongs in the service specification.

Socket access is a separate security concern from placement. An unrestricted Docker API connection can confer control over containers and the host. Making the socket's filesystem mount read-only does not restrict the API to read-only operations. Diagnostic interfaces that expose node or container details need access controls and a trusted environment.

## Deploying and observing a web service

An NGINX service provides a straightforward application example. The standard image listens for HTTP on container port 80. Publishing that target through port 8200 creates an external entry point without requiring the application to change its internal listening port. A service name such as `weby` identifies the desired workload for subsequent inspection and updates.

`docker service logs weby` retrieves available output for the service through a manager. It can include output from tasks on other nodes, provided the service uses a supported logging driver. The command supports `json-file` and `journald`. It reads container standard output and standard error, not every application file that happens to contain logs.

Following logs keeps the stream open for new output. Tail and time filters narrow the output, while timestamps and task identifiers help connect records to individual instances. A service-wide stream may interleave records from several tasks. An individual task ID can be supplied when one uninterrupted task stream is needed.

Task history and logs have different lifecycles. Swarm's default task-history limit is five, while visible task rows also depend on current tasks, slots, and recent activity. This setting controls retained task history. Application log storage and retention need their own configuration, particularly when records must survive cleanup or node failure.

Missing logs can reflect output written elsewhere, filtering, or failure before recording. A failed API query may appear in an HTTP response or browser diagnostics without a corresponding application log entry.

Custom output formatting can make inspection more useful. Many Docker commands accept Go templates through `--format`. A table template can retain relevant fields and add headers. JSON formatting can expose available fields, with `jq` making the result easier to read or filter. Template fields and supported options vary by command.

The `--no-trunc` option reveals complete values and error messages in commands that support it. A shortened error can hide the distinction between an image problem and an unsatisfied constraint. Matching a task ID with the generated container name can locate the container on its assigned Engine for further inspection.

A combined display can poll node state and service tasks. The refresh interval should allow each query to finish without adding unnecessary management load. Node readiness, task state, and correct application responses provide different evidence.

## Events and the limits of historical diagnosis

`docker events` reports events from the connected daemon. Swarm-scoped events are visible on managers, while local events describe activity on the queried node. A manager connection therefore does not provide an automatic combined stream of every container event on every worker.

Events can be filtered by object type, scope, and time. A service filter focuses on service creation, update, and removal. A swarm scope filter excludes local-only activity. The `--since` option requests recent history, but the daemon returns only its recent buffer of up to 256 events. It is not an unlimited audit log.

An exec sequence can include creation, start, and completion events. Health checks may produce such sequences, but so can other commands executed inside a container. `exec_create` and `exec_start` do not represent the beginning and end of a check. `exec_die` records process completion, while `health_status` identifies a change in reported health.

JSON output can expose event attributes, timestamps, and object identifiers without relying on a wide terminal row. Filters and inspection can then build a more detailed picture of a change. Long-term operational evidence requires collection and retention outside the short event history offered by the daemon.

## Stacks as application definitions

A stack groups related Swarm resources into an application deployment. A YAML file can describe services, networks, volumes, configs, and secrets. The format resembles Docker Compose because stack deployment uses the legacy Compose version 3 format. A simple file can work with both commands, but current Compose features are not universally accepted by stack deployment.

Local `docker compose up` creates containers on the selected Engine. It does not distribute those containers across a swarm. `docker stack deploy` submits Swarm service definitions to a manager. The shared configuration vocabulary therefore supports different execution models, and compatibility needs to be checked for the actual commands and versions in use.

A minimal web stack specifies the NGINX image and a published-port mapping. `docker stack deploy -c weby.yml weby` submits it under the stack name `weby`. Its `web` service normally appears as `weby_web`, and an automatically created default overlay appears as `weby_default`. A local Compose project normally uses a bridge network instead.

The stack name identifies an application instance. Reusing it updates that instance, while another name creates a separate deployment. Names and ownership labels group resources, but fixed published ports and external resources can still conflict.

`docker stack ls` lists stacks inferred from deployed resources. `docker stack services` lists the services associated with one stack. `docker stack ps` lists its tasks across services. The equivalent lower-level service commands remain available when diagnosis needs to focus on one component or compare its current and previous specifications.

A deployment is not a single atomic transaction covering every resource. A missing external secret, for example, can prevent service creation after a network has already been created. Such partial results require inspection and cleanup or a corrected redeployment. A stack summary alone cannot prove that every intended component exists and works.

## Updating desired state

Changing a stack's file and redeploying it under the same name updates its desired configuration. Swarm then continues reconciling tasks after the command exits, subject to quorum, capacity, and scheduling requirements.

The Docker client reads the file and submits API requests. Managers store the resulting specification. Swarm does not continuously watch the local file, so edits take effect only after deployment.

Imperative service changes and declarative stack files can diverge. A command-line scale change may increase the desired replicas immediately, while the file still specifies the earlier number. A later deployment can restore the file's value. Recording intended changes in the application definition preserves a clearer operational history.

The `--prune` deployment option removes services no longer referenced by the stack definition. Without it, deleting or renaming a service in the file can leave the previous service deployed. The option needs care when older services are deliberately retained.

An image tag can change independently of its name. By default, stack deployment attempts to resolve image references against the registry. If a tag now identifies a different digest, redeployment can trigger task replacement even when the file's tag text is unchanged. That behaviour depends on image-resolution options and successful registry access.

Explicit deployment or service update initiates an image change. Swarm does not continually poll tags for new versions. A digest identifies the intended image content precisely, and every scheduled node needs access to that content.

Stack deployment distributes definitions. It does not build an image from a Compose `build` instruction and transfer it to every node. Images must be built and made available through a registry or another suitable distribution process.

Service updates can use rolling replacement settings, including order, parallelism, delay, and failure handling. A forced update can reuse the same image and configuration while replacing tasks. Such replacement does not guarantee uninterrupted service. Application startup, health reporting, connection handling, spare capacity, and state management determine its practical effect.

Rollback can restore a previous service specification where supported. Database migrations, lost in-memory data, and external side effects need their own recovery procedures. Separate configuration history records changes beyond the current and previous specifications.

Some properties require service replacement. Changing from replicated to global mode needs controlled migration or recreation. Removing an entire stack is one possible method, but also affects its other managed resources.

## Platform compatibility and image diagnosis

The node's operating-system platform determines native image compatibility. An ARMv7 Linux installation can require `linux/arm/v7`, while a 64-bit Raspberry Pi installation can use `linux/arm64`. An `amd64` image needs a suitable native variant or compatible emulation to run on ARM hardware.

An image reference can identify a manifest containing one platform or an index containing several platform variants. Each variant still needs compatible binaries and dependencies. The registry's platform metadata and the Engine's server architecture should be compared when scheduling reports an unsupported platform.

In a five-node ARM lab with three managers, a visualiser requiring manager placement can encounter two separate restrictions: an image incompatible with the managers, and workers excluded by the role constraint. Each restriction needs its own solution. Platform compatibility does not grant access to manager APIs.

`docker service ps --no-trunc` or `docker stack ps --no-trunc` can reveal the complete scheduling error. `docker info` identifies the targeted Engine's operating system and architecture. `docker buildx imagetools inspect` shows registry manifests and their platforms. These tools provide more precise evidence than assuming that every image under a familiar tag supports the same machines.

An updated image with the required platform can be selected in the stack file and redeployed. Tasks may spend time preparing while their nodes retrieve its layers. Once current state reaches the requested running state, the application's interface still needs to be checked. A working browser response supplies evidence beyond the scheduler's ability to start the process.

Docker Desktop includes emulation support for supported non-native Linux architectures. That can make an image run locally even when a plain Linux node cannot execute it natively. Emulation does not supply an arbitrary guest operating-system kernel or guarantee compatibility with every workload. It can also perform substantially differently from native execution.

Native builds for each target platform, cross-compilation, and emulated builds provide different ways to produce multi-platform images. The chosen method must produce the runtime dependencies the application needs. A successful emulated local run is useful evidence, but does not establish native cluster compatibility or production performance.

## Replicas, global services, and identity

Replicated mode maintains a specified number of task instances. Two replicas can provide two request handlers, but the scheduler may place them on the same node if the specification allows it. That arrangement uses separate containers while retaining a shared host failure risk. Placement controls are needed when separate nodes are a requirement.

The `--replicas-max-per-node` setting can limit a replicated service to one task per node. With five requested replicas, at least five eligible nodes are then needed. Otherwise, some requested tasks remain pending. The setting limits placement without creating additional capacity or changing the service into global mode.

Global mode maintains one task per eligible active node, subject to constraints, platform compatibility, and resource availability. A drained manager remains in the manager group but receives no global application task. Returning it to active allows that task to be scheduled.

Global services suit node-local agents and diagnostics. Replicated services maintain an application scale independent of node count. Neither mode supplies load-based autoscaling by itself. Operators or additional systems change the desired scale or cluster membership.

Templates can inject task-specific values into supported service settings, including hostnames, environment variables, and mount options. A hostname built from a node hostname and task slot can identify the source of a response in a diagnostic service. The values are expanded for the assigned task rather than being fixed when the stack file is written.

A diagnostic echo service can return connection addresses, interfaces, and its hostname. An additional endpoint can query the local Docker API for the host's containers. The resulting list can include both running and stopped containers, including the diagnostic container itself. Its scope is the particular host, not automatically the whole cluster.

If two diagnostic replicas run on the same node, their host-container listings can be duplicates. A global diagnostic service can obtain one response per eligible host instead. It still needs restricted API access and a controlled interface. Convenient visibility into infrastructure is also access to potentially sensitive operational information.

`docker service scale SERVICE=COUNT` changes a replicated service's desired size. A count of zero stops its running tasks while preserving the service definition. Scaling up creates new attempts whose placement may differ. Task-history retention is configured separately. Standalone containers on the nodes remain outside this service lifecycle.

## Routing mesh and published ports

The routing mesh provides an entry point for published Swarm service ports. In ingress mode, each participating node can accept the published port and forward a connection to an active task, whether that task is local or remote. This keeps the external node address and published port independent of an individual task's current placement.

The published port and target port serve different roles. An echo service can listen internally on port 80 while receiving external connections through port 9090. An internal client on the same application network normally uses port 80. Publishing 9090 does not change the server process's listening port inside the container.

Host publishing mode bypasses the routing mesh. Traffic reaches tasks on nodes where those tasks actually run, and fixed host-port bindings constrain how many matching tasks can share a node. An external load balancer can provide another entry layer, with appropriate knowledge of reachable nodes or actual task locations.

External DNS, hostname routing, TLS certificates, and client failover require separate configuration. The routing mesh supplies a shared entry port. A client using one failed node address still needs a way to reach another healthy entry point.

On Linux, ingress uses IPVS and associated kernel networking rules to select backends and route traffic. Load balancing operates at the connection level. Logical forwarding rules connect published endpoints to available tasks, allowing those endpoints to remain usable as task placement changes.

Address translation can change the peer address visible to an application. A diagnostic server may see an ingress sandbox address instead of the original external client's address. Identifying the original caller requires understanding the forwarding path and any trusted application-level information it supplies.

## Connections and observed load distribution

Browsers often reuse established HTTP connections. Repeated refreshes can therefore reach the same task while the service has several available replicas. That is consistent with connection-level load balancing. It does not necessarily mean that the routing mesh ignored the other replicas.

Separate curl invocations make new connections because one process cannot reuse a previous process's connection pool. Repeating requests through separate invocations can reveal different backend addresses and hostnames. Within one invocation, curl can reuse connections for multiple transfers.

Alternating responses can make distribution visible, but perfect alternation is not guaranteed. Connection reuse, other traffic, backend changes, and the balancing implementation affect the sequence. A small sequence of requests does not establish equal capacity, equal workload, or reliable application performance across the cluster.

The echo service can report a server-local address, a remote peer address, and a connection identifier. Together, these help distinguish a new connection from a new backend. A changed source port can indicate a new connection even if the same server responds. A changed local task address provides evidence that another task handled the request.

## Application overlays and gateway connectivity

Ingress is a special overlay for published-port routing. Application services normally communicate through their own default or explicitly defined overlays. A stack named `echor` can create `echor_default`, supporting communication by service name across its participating hosts.

A task can have interfaces for ingress, an application overlay, loopback, and gateway connectivity. Several addresses in diagnostic output can therefore belong to different networks on the same container.

The local `docker_gwbridge` connects overlay networking to the host's physical network, commonly with address translation for external connectivity. Application overlays span nodes, while this bridge provides the local connection to the host network.

`docker network ls` shows networks known to the queried Engine, including their drivers and scope. Overlay networking is distributed, but a node need not instantiate every application network when it has no relevant tasks. A manager's network metadata and a worker's local network state can therefore present different views.

`docker network inspect` exposes details such as the subnet, attached endpoints, labels, and network options. Verbose inspection can add service and backend details. Those fields help relate a logical service address to actual task endpoints, but the visible sandbox addresses and internal layout are implementation-specific.

Network membership controls ordinary connectivity. Services on different networks do not gain direct communication simply because they belong to the same swarm. A shared overlay can connect selected services from different stacks, while a component attached to more than one network can participate in several application relationships.

Separating frontend and backend networks can reduce unnecessary reachability, but it is not a substitute for authentication, authorisation, or encryption. By default, application traffic between swarm nodes is not encrypted. An overlay created with encryption enabled uses IPsec for that traffic, with performance and platform considerations that need validation.

## Service discovery through VIPs and task addresses

Docker's embedded DNS supplies service discovery on user-defined networks. In default virtual IP, or VIP, mode, a service name resolves to a stable logical front end on that network. Connections to the VIP can be distributed among task endpoints as their addresses change.

A diagnostic lookup of `echor_echo` from a container on its overlay can return the service VIP. A request to that name and container port 80 can reach either echo task, including the requesting task itself. That path differs from a browser entering through a node's published port 9090 and the ingress network.

The name `tasks.echor_echo` exposes task addresses on the shared network. Clients can contact individual replicas, collect diagnostic information, or implement their own backend selection policy.

Setting endpoint mode to `dnsrr` makes the ordinary service name resolve to task addresses instead of a VIP. Backend selection then belongs to the client or an external load balancer. This mode cannot be combined with ingress-mode port publishing.

DNS responses can vary in address order, but that does not guarantee equal traffic distribution. Clients may cache results, favour one address, maintain long-lived connections, or retry in different ways. A successful DNS lookup also proves discovery only. It does not prove that the application is listening, healthy, or returning the expected content.

A cluster-wide diagnostic endpoint can first resolve `tasks.echor_echo`, then query each returned address through an endpoint reporting the host's containers. It combines those results into one response. With a replicated service, several replies may come from the same host. With a global service, the intended scope is one diagnostic task per eligible host.

The list of task addresses changes as replicas are added, removed, or replaced. Results describe membership at the time of discovery and may become stale before every request completes. Failures need to be handled rather than assuming that every DNS result remains reachable throughout the collection operation.

## Shared networks for jobs and services

A job can communicate with a long-running service through the same user-defined overlay. A web stack can define a network named `testers`, which becomes `sr_testers` under the stack name `sr`. Both the web service and a subsequently created test job can attach to it.

The `attachable` option permits standalone containers to join an overlay network. Swarm service tasks and jobs can use an overlay without that option. Marking a lab network attachable is useful for direct diagnostic containers, but it is not a prerequisite for a Swarm job to contact a service.

An internal test client can use `sr_web` and port 3000 when the server listens there. Publishing the same port externally is optional for that communication. An external browser request and an internal job request can reach the same application through different network paths, with different addresses visible to the server.

## Jobs and completion-based work

Swarm jobs run tasks that are expected to finish. A long-running service continually maintains its requested running tasks. A job instead treats successful completion as the intended outcome. Batch processing, diagnostic checks, simulations, and bounded load tests can fit that model when their programs exit with a meaningful status.

The two job modes are `replicated-job` and `global-job`. A replicated job requests a specified number of successful task completions. A global job runs one task per eligible active node and can run on additional nodes that become eligible later.

The Apache HTTP Server image can provide ApacheBench, the HTTP benchmarking program named `ab`. A global job running `ab -V` prints the program's version and exits on each eligible node. This checks image retrieval and execution, subject to image contents and platform compatibility.

A successful job task exits with status zero and reaches the Complete state. It is not restarted to keep it running. Failed tasks can be retried according to the job's applicable restart policy, including its delay and attempt limits. A policy intended for long-running services should not be interpreted as making a successful job repeat indefinitely.

A global job whose current tasks have all completed can remain available for future eligible nodes. Completion of the current set is therefore different from permanently closing the job to later work. Conversely, an existing successfully completed task does not run again continuously on the same node without an update or another change that requires execution.

Replicated jobs distinguish total completions from concurrency. The settings `--replicas 10 --max-concurrent 2` request ten successful completions while allowing at most two active tasks at once. Later tasks begin as earlier ones finish, until the completion target is reached.

The default concurrency limit at creation follows the requested replica count. A job initially created with one replica can retain a maximum concurrency of one when its replica target is later increased. Three requested completions can then execute sequentially. That outcome reflects the job's retained settings, not a rule that all replicated jobs run serially.

Updating a job can establish a new iteration. `docker service update --force JOB` reruns an unchanged job and can stop active tasks from its preceding iteration. A changed replica target belongs to the updated job specification, so the current iteration and concurrency settings need inspection.

Jobs do not support the same rolling update and rollback controls as long-running services. Their execution model needs to be considered before reusing deployment settings intended to replace a web service gradually. A repeated job may also repeat external side effects, so successful completion should not automatically imply that another run is harmless.

Stack deployment support for job modes depends on the installed Docker CLI and Engine versions. Current Compose deployment definitions include these modes, and Docker's stack conversion handles them. Available concurrency controls still vary by interface, with the CLI exposing options that are not all represented in Compose configuration.

## Job output and diagnostic use

`docker service logs` can collect job output with a supported logging driver. Global job output may interleave lines from several nodes. Reading one task's logs at a time groups its execution, while timestamps help establish event order. Grouping by task does not create a combined chronological record.

Completion state, exit status, and output need to be assessed together. A program can print an error before exiting successfully if its script does not propagate the failure. It can also fail before producing useful output. The job scheduler can report process outcomes, but it cannot infer the intended meaning of every application message.

Completed job tasks and their service can remain visible until they are removed or their history is cleaned up. This visibility is useful for inspection, but task history and local container logs are not permanent archives. Results that need to survive routine cleanup, node replacement, or a longer retention period require deliberate collection and storage.

A small global version job can warm image caches on the eligible nodes before a larger test. This can reduce differences caused by one node downloading the image while another already has it. It does not synchronise the start of every later task or ensure that every future node has the same cached content.

Diagnostic jobs can test network membership and application reachability. A job attached to `sr_testers` can first resolve `sr_web`, then request the application on port 3000. DNS output confirms name resolution. An HTTP response with the expected status and content provides additional evidence that the intended application is reachable.

A later iteration can run another diagnostic command, such as reporting network interfaces before an HTTP request. Comparing those addresses with inspected overlay endpoints helps identify the communication path and distinguish application connectivity from ingress routing.

Jobs also support bounded processing unrelated to networking. A task might analyse a data partition or run a simulation, while a concurrency limit prevents every task from starting together. The application still needs a plan for input assignment, result collection, failures, and retries. A completion count alone does not identify which independent records have been processed correctly.

## HTTP load testing

ApacheBench generates a specified number of HTTP requests at a chosen concurrency. For example, `-n 100 -c 10` asks it to make 100 requests, with up to ten in progress at once. Client count, total request count, and request concurrency are separate test settings.

A replicated test job with one task can direct that workload at `sr_web` over a shared overlay. Requests use the application's container port, such as 3000, because internal service discovery does not require the externally published port. This design separates the number of test clients from the number of server replicas.

Results include completed requests, failed requests, responses outside the HTTP 2xx success range, elapsed time, throughput, and timing statistics. These describe different aspects of a run. A completed request does not establish that its response had the required status or content.

Latency percentiles describe the distribution of request times. The median represents the midpoint, while high percentiles expose slower responses near the tail. Both are useful when additional replicas improve typical response time but some requests remain slow.

Connection behaviour also affects a test. ApacheBench's keep-alive option changes whether connections may be reused. A test's settings therefore need to be recorded alongside its request count and concurrency. Results from clients with different connection behaviour are not directly interchangeable simply because both send HTTP requests.

An endpoint with a configured blocking delay can provide an artificial workload. Its behaviour needs verification before it represents a particular bottleneck. Work that blocks an application's execution thread can behave differently from a non-blocking database operation.

A lab workload of 1,000 requests at a concurrency of 100 can be repeated against one, two, and five server replicas. Keeping the request count and concurrency unchanged makes the server replica count a clearer comparison variable. Image versions, hardware, other workloads, and test placement also need to remain sufficiently consistent.

A per-node replica limit can place each server replica on a separate eligible machine, making the physical distribution explicit. The web application remains a replicated service while a separate job generates test traffic. Five requested server replicas require five eligible nodes if each node is limited to one.

Adding replicas can increase available processing capacity, but doubling the replica count does not guarantee that latency will halve. Shared databases, network links, connection pools, storage, or the load generator can become limiting factors. Uneven work distribution and long-lived connections can also prevent the replicas from receiving equal demand.

Physical placement affects the interpretation. Virtual machines on one computer share that computer's underlying resources. Separate Raspberry Pi hosts supply separate processors and memory, although their network and other dependencies may still be shared. Several replicas on one machine can also improve utilisation when spare resources are available, so physical separation is not the only route to improvement.

The test client consumes resources too. A job running on a node that also hosts a server replica can compete with that replica for CPU time and network capacity. Increasing the number of client tasks changes the applied load and can expose a client-side bottleneck, but it creates a different experiment from changing only the number of server replicas.

A useful comparison records the topology, software versions, resource allocation, warm-up procedure, request settings, and response validation. Repeated measurements provide a stronger basis for interpretation than a single run. A test through an internal overlay also measures a different path from external traffic passing through ingress, an external load balancer, or a TLS termination service.

Load testing supports capacity assessment under defined conditions. Response correctness, recovery behaviour, and longer-term resource use need separate evaluation. Test traffic also requires authority over the target systems.

## Configuration and secrets

Applications often require settings that change independently of an image. Examples include a configuration file, a database address, or an authentication credential. Swarm configs and secrets provide ways to distribute selected file content to service tasks without rebuilding the image for each environment.

A config holds non-confidential configuration data. A secret holds sensitive data, such as a password or private key. Both are managed objects with immutable content and a maximum size of 500 kB. Their purpose differs from that of an ordinary writable volume used for changing application data.

Configs and secrets can be created before a service and granted to it through its specification. Stack definitions can also declare them. Creating the object does not automatically expose it to every task in the swarm. The service needs an explicit reference to the particular object before its tasks receive the corresponding file.

A stack file distinguishes the top-level definition of a secret from the service-level grant of access. An external declaration refers to an object that already exists and must match its actual name. The service's grant must then reference that declared secret, with the intended target path.

Secret content can be supplied from a file or standard input. Standard input is useful when another process supplies the value without a persistent intermediate file. A suitably protected input file is also a valid approach. Neither method automatically protects the original source, command history, terminal output, backups, or any application that subsequently reads the value.

Entering a literal password in a shell command can expose it through history or logs. Secure input handling needs to consider the whole path from the credential's source to its use. A file containing a credential should have appropriate access restrictions and a deliberate lifecycle, rather than being left among broadly readable project files.

Swarm transfers secrets through its mutually authenticated management channels and stores them in the encrypted Raft log. On Linux, a secret granted to a task is presented through a read-only in-memory mount, normally under `/run/secrets/`. The file becomes available to the authorised task while it runs, and its mount is removed when the task stops.

Authorised applications can still read, copy, or disclose secrets. Management permissions also need protection, since an administrator can change which workload receives a value. Linux's in-memory mount behaviour should not be assumed for Windows containers, which handle runtime secret storage differently.

A config is mounted as an ordinary file and does not receive the same worker-side protection as a secret. Its default target can be at the container's root path under the config name, while a secret normally uses `/run/secrets/`. Explicit targets allow either object to appear at the path expected by the application.

Standard secret inspection returns metadata, such as identity and creation details, rather than plaintext content. A trusted administrator can nevertheless grant a service access to the value. Confidentiality therefore also depends on control of the management interface and authorised workloads.

## Database credentials and application conventions

The official MySQL image supports file-based input for selected initialisation variables. `MYSQL_ROOT_PASSWORD_FILE` can point to a mounted secret such as `/run/secrets/db_pass`. The image's entry-point logic reads the file and uses its value when it initialises the database.

The `_FILE` suffix is an application image convention, not a Docker feature that automatically makes every environment variable read a file. Each image needs documentation or implementation support for the particular variable. Supplying an unsupported name can leave the application without the intended setting.

The MySQL service needs both a secret grant and an environment setting pointing to the mounted file. Its configuration exposes the path without including the password value. The path must match the secret's actual target.

For an existing MySQL data directory, changing an initialisation variable or its secret does not automatically change the password stored in the database. Secret distribution and database credential management require coordination.

Changing only the Swarm secret can therefore leave a service expecting one password while the database still recognises another. A credential rotation procedure needs to change the database account, update the applications that use it, and manage the order of those actions. The acceptable sequence depends on the database and its support for overlapping credentials or transitional access.

Database data also needs storage separate from the container's writable layer. An ordinary local Docker volume is tied to the node where its data resides. A volume with the same name on another node does not automatically contain the same database files. Rescheduling a task can therefore expose an empty or different volume unless the storage design accounts for it.

A placement constraint can keep a database service on a suitable storage node, but that choice affects availability when the node fails. Shared storage, replicated storage, or database replication can support other designs. Each approach has its own consistency, recovery, and operational requirements. Swarm scheduling alone does not supply a complete database availability strategy.

## Changing and removing runtime objects

Secret and config contents are immutable. A changed value requires a new object, often named with a version or date. A service update replaces its reference while retaining a stable container path, such as `/run/secrets/db_pass`. Affected tasks receive the new specification through replacement.

Swarm refuses to remove a secret while a service still references it. The reference must first be removed or replaced through a service update, or the service itself must be removed. Deleting the entire application is therefore not a general prerequisite for rotating a secret.

Old objects can be deleted once services no longer reference them and recovery needs have been considered. Versioned names help identify active and obsolete values. Configs follow the same replacement pattern for non-confidential content.

Cleanup depends on resource ownership. A stack can create resources while referring to externally managed ones whose lifecycle continues separately. Removing the stack needs to be followed by inspection of what should remain or be removed. Persistent data requires explicit storage and retention decisions, including whether it remains accessible after a node fails.
