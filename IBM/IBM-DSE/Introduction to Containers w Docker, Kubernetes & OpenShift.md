# Introduction to Containers w/ Docker, Kubernetes & OpenShift
## Containers and Containerization

### Containers in context

A container packages an application with the runtime, libraries, system tools, and configuration it needs. When started, it runs as an isolated process on a host. Unlike a virtual machine, a typical Linux container does not carry its own kernel. It shares the host kernel while namespaces separate process, network, and filesystem views, and control groups account for and limit resources.

This design can make deployments faster, smaller, and more consistent across development, testing, and production. It also supports automated delivery, microservices, and cloud-native systems. Portability has limits. A container's code must suit the target operating system and processor architecture, unless a compatible image variant or emulation is available.

### Docker architecture

Docker is a platform for building, distributing, and running containers. Its client-server architecture centres on the `docker` command-line client and the `dockerd` daemon, which communicate through an API. They may run on the same machine or on separate systems. The daemon manages images, containers, networks, and volumes.

Registries store and distribute images. Docker Hub is Docker's default public registry, while private and managed services include IBM Cloud Container Registry. A client pulls an image before running it when no suitable local copy exists, and pushes a tagged image to a registry for authorised users and systems to retrieve.

### Images and Dockerfiles

A Docker image is a read-only template for creating containers. A Dockerfile records build instructions. `FROM` begins a build stage, although globally scoped `ARG` instructions may precede it. `WORKDIR` selects a working directory, `COPY` adds files, `RUN` executes build-time commands, `LABEL` adds metadata, and `CMD` supplies the default runtime command. If several `CMD` instructions appear, only the last takes effect.

Filesystem-changing instructions create image layers that later builds may reuse from cache. Metadata-only instructions, including `CMD`, do not create filesystem layers. Starting a container adds a writable layer over the image. Removing the container removes that layer, so durable data belongs in a volume or bind mount.

`EXPOSE` documents an intended container port but does not publish it. Runtime options such as `docker run -p` publish ports. `HEALTHCHECK` runs a command to classify a container as starting, healthy, or unhealthy. The check's required tools must exist in the image.

An image reference can include a registry host, namespace, repository, tag, or digest. For example, `docker.io/library/ubuntu:24.04` identifies a tagged Ubuntu image on Docker Hub. Omitting the host defaults to Docker Hub, and omitting the tag defaults to `latest`, which is a tag rather than a guarantee of recency.

### Core command workflow

| Command | Purpose |
| --- | --- |
| `docker build -t my-app:v1 .` | Builds and tags an image from the current build context. |
| `docker images` | Lists local images. |
| `docker run my-app:v1` | Creates and starts a container from an image. |
| `docker ps` | Lists running containers. |
| `docker ps -a` | Lists containers in all states, including exited containers. |
| `docker pull` and `docker push` | Retrieve and upload tagged images. |
| `docker stop` and `docker container rm` | Stop and remove containers. |

### Operations, security, and related tools

User-defined networks group containers and can isolate them from containers on other networks. Volumes persist independently of a container, while bind mounts expose selected host paths. Both networking and storage require deliberate access controls.

Container isolation is not an absolute security boundary. Containers share a kernel, daemon access is highly privileged in standard Docker installations, and unsafe mounts or excessive capabilities can expose the host. Rootless operation, least privilege, trusted images, updates, and host hardening reduce risk. Large deployments also require monitoring, resource planning, and orchestration.

Docker Compose defines multi-container applications. Docker Swarm and Kubernetes orchestrate containerised workloads, and Prometheus can monitor them. Podman is a daemonless container engine that supports non-root use. LXC manages Linux system or application containers. Vagrant mainly creates and manages virtual machine environments, so it is not a container engine.

## Kubernetes Basics

Container orchestration coordinates containerised workloads across a group of machines. It schedules work, maintains requested replica counts, replaces failed instances, distributes network traffic, mounts storage, and supports controlled updates. These capabilities become valuable when applications span many containers or hosts, but they do not make an application secure, resilient, or economical without sound design and operation.

Kubernetes is an open-source platform for managing containerised workloads and services. Google open-sourced the project in 2014. It is designed around portable APIs and a large ecosystem rather than a complete platform with fixed choices. Docker Swarm mode and HashiCorp Nomad remain alternative orchestrators. Apache Mesos was retired in 2025, and the Marathon repository used with Mesos was archived in 2024.

Kubernetes can provide service discovery, load balancing, automated rollouts and rollbacks, horizontal scaling, self-healing, batch execution, and storage integration. It does not build application source, define a continuous delivery process, or supply databases, logging, monitoring, and alerting as built-in application services. Those functions require separate tools or integrations.

### Desired state and objects

Kubernetes is primarily a desired-state system. An operator declares what should exist, and controllers repeatedly compare that specification with observed state and act to reduce the difference. This reconciliation model is more flexible than a fixed sequence of scripted steps.

The Kubernetes API represents persistent entities as objects. A YAML or JSON manifest normally identifies an `apiVersion`, `kind`, `metadata`, and `spec`. For most objects, the `spec` expresses intended configuration, while the system reports observed conditions through `status`. Labels attach key-value metadata to objects, and selectors use those labels to group or target resources.

Namespaces scope the names of most resources and help divide one cluster among teams or applications. The initial namespaces include `default`, `kube-system`, `kube-public`, and `kube-node-lease`. Namespaces do not cover every resource and do not create complete security isolation by themselves. Stronger separation also needs suitable access controls, quotas, network policies, storage controls, and sometimes separate clusters.

### Cluster architecture

A cluster has a control plane and one or more worker nodes. Production designs can replicate control-plane components for high availability rather than depend on one machine.

The API server validates requests and exposes the cluster API. `etcd` stores cluster data. The scheduler assigns unscheduled Pods to suitable nodes, and controller managers run reconciliation loops. A cloud controller manager can integrate supported cloud infrastructure.

A node may be physical or virtual and can be registered manually or by its kubelet. The kubelet ensures that assigned Pods run as specified. A Container Runtime Interface implementation runs containers, while networking components connect Pods and implement Service traffic. Common runtimes include containerd and CRI-O. Kubernetes still runs standard container images, including Docker-built images, although its built-in Docker Engine integration was removed and Docker Engine now requires a CRI adapter.

### Workload resources

Pods are the smallest deployable Kubernetes units. A Pod contains one or more tightly coupled containers that are co-scheduled and share its network namespace and declared volumes. Containers in different Pods do not share those resources. Pods are replaceable, so applications are normally managed through controllers rather than as standalone Pods.

| Resource | Main role |
| - | - |
| Deployment | Manages usually stateless Pods through ReplicaSets, with scaling, controlled rollouts, and rollback history. |
| ReplicaSet | Maintains a replica count. Direct use is uncommon because Deployments manage ReplicaSets and updates. |
| StatefulSet | Gives each Pod a stable identity and can associate it with persistent storage, ordered scaling, and ordered updates. |
| DaemonSet | Runs a Pod on every eligible node or on a selected set, commonly for networking, logging, or monitoring agents. |
| Job | Runs one-off work and tracks successful completions, subject to configured retry and failure policies. |
| CronJob | Creates Jobs on a repeating schedule. |

### Services and incoming traffic

Pod addresses can change when Pods are replaced. A Service supplies a stable network endpoint for one or more backends, usually selected by labels.

| Service type | Behaviour |
| - | - |
| `ClusterIP` | Provides the default cluster-internal virtual address. |
| `NodePort` | Opens the same allocated port on configured node addresses and forwards traffic to ready backends. Exposure and security depend on network configuration. |
| `LoadBalancer` | Requests an external load balancer from a supported implementation. Provisioning and behaviour vary by provider. |
| `ExternalName` | Returns a DNS alias to the configured external name rather than proxying traffic. |

An Ingress defines HTTP and HTTPS routing from outside the cluster to Services. Creating the object alone has no effect because an Ingress controller must implement its rules. Ingress does not route arbitrary protocols. Gateway API is its more expressive successor, but it also requires installed custom resources and a supporting controller.

### kubectl and configuration

`kubectl` sends requests to the Kubernetes API. Its usual form is `kubectl command type name flags`. A kubeconfig context selects a cluster, user, and default namespace. `kubectl config get-contexts` lists one or more configured contexts, not only the active one.

| Command | Purpose |
| - | - |
| `kubectl get` | Lists resources, optionally filtered or formatted. |
| `kubectl describe` | Shows detailed state and related events. |
| `kubectl logs` | Reads container logs from a Pod. |
| `kubectl exec` | Runs a command in a container. |
| `kubectl diff -f` | Compares manifests with live configuration. |
| `kubectl apply -f` | Creates or patches objects declaratively. |
| `kubectl expose` | Creates a Service for a supported resource. It does not necessarily make it internet-accessible. |
| `kubectl delete` | Deletes identified resources, including those named in manifests. |

Imperative commands are useful for learning and one-off work. Imperative configuration uses operations such as `create` or `replace` with complete files. Declarative configuration lets `apply` determine required creates and patches. Reviewed, source-controlled manifests improve repeatability, but each object should have a clear management method to avoid conflicting writers and configuration drift.

### Reliable and secure operation

Resource requests guide scheduling and reserve capacity. Limits constrain consumption, but poorly chosen limits can throttle CPU or terminate containers that exceed memory limits. Values should be based on measurements and workload behaviour rather than copied defaults.

Production images should use meaningful version tags or immutable digests instead of `latest`. Readiness probes keep unready Pods out of Service traffic, liveness probes can trigger restarts, and startup probes protect slow-starting applications. Probe behaviour and thresholds must match the application to avoid harmful restart loops.

ConfigMaps hold non-confidential configuration. Secrets are intended for confidential data. Their manifest values are base64-encoded, and Secret data is stored unencrypted in `etcd` by default. Clusters should enable encryption at rest, restrict Secret access through least-privilege RBAC, and consider external secret management where appropriate.

Namespaces, RBAC, quotas, and supported NetworkPolicies can separate teams and reduce resource contention. NetworkPolicy objects have no effect without a compatible network plugin. Production and non-production workloads may share or use separate clusters according to trust, failure impact, compliance needs, and operational cost. Kubernetes supplies mechanisms for reliability and isolation, but application retries, backups, observability, release controls, and disaster recovery remain separate responsibilities.
## Managing Applications with Kubernetes

Container orchestration coordinates containerised workloads across a group of machines. It schedules work, maintains requested replica counts, replaces failed instances, distributes network traffic, mounts storage, and supports controlled updates. These capabilities become valuable when applications span many containers or hosts, but they do not make an application secure, resilient, or economical without sound design and operation.

Kubernetes is an open-source platform for managing containerised workloads and services. Google open-sourced the project in 2014. It is designed around portable APIs and a large ecosystem rather than a complete platform with fixed choices. Docker Swarm mode and HashiCorp Nomad remain alternative orchestrators. Apache Mesos was retired in 2025, and the Marathon repository used with Mesos was archived in 2024.

Kubernetes can provide service discovery, load balancing, automated rollouts and rollbacks, horizontal scaling, self-healing, batch execution, and storage integration. It does not build application source, define a continuous delivery process, or supply databases, logging, monitoring, and alerting as built-in application services. Those functions require separate tools or integrations.

### Desired state and objects

Kubernetes is primarily a desired-state system. An operator declares what should exist, and controllers repeatedly compare that specification with observed state and act to reduce the difference. This reconciliation model is more flexible than a fixed sequence of scripted steps.

The Kubernetes API represents persistent entities as objects. A YAML or JSON manifest normally identifies an `apiVersion`, `kind`, `metadata`, and `spec`. For most objects, the `spec` expresses intended configuration, while the system reports observed conditions through `status`. Labels attach key-value metadata to objects, and selectors use those labels to group or target resources.

Namespaces scope the names of most resources and help divide one cluster among teams or applications. The initial namespaces include `default`, `kube-system`, `kube-public`, and `kube-node-lease`. Namespaces do not cover every resource and do not create complete security isolation by themselves. Stronger separation also needs suitable access controls, quotas, network policies, storage controls, and sometimes separate clusters.

### Cluster architecture

A cluster has a control plane and one or more worker nodes. Production designs can replicate control-plane components for high availability rather than depend on one machine.

The API server validates requests and exposes the cluster API. `etcd` stores cluster data. The scheduler assigns unscheduled Pods to suitable nodes, and controller managers run reconciliation loops. A cloud controller manager can integrate supported cloud infrastructure.

A node may be physical or virtual and can be registered manually or by its kubelet. The kubelet ensures that assigned Pods run as specified. A Container Runtime Interface implementation runs containers, while networking components connect Pods and implement Service traffic. Common runtimes include containerd and CRI-O. Kubernetes still runs standard container images, including Docker-built images, although its built-in Docker Engine integration was removed and Docker Engine now requires a CRI adapter.

### Workload resources

Pods are the smallest deployable Kubernetes units. A Pod contains one or more tightly coupled containers that are co-scheduled and share its network namespace and declared volumes. Containers in different Pods do not share those resources. Pods are replaceable, so applications are normally managed through controllers rather than as standalone Pods.

| Resource | Main role |
| - | - |
| Deployment | Manages usually stateless Pods through ReplicaSets, with scaling, controlled rollouts, and rollback history. |
| ReplicaSet | Maintains a replica count. Direct use is uncommon because Deployments manage ReplicaSets and updates. |
| StatefulSet | Gives each Pod a stable identity and can associate it with persistent storage, ordered scaling, and ordered updates. |
| DaemonSet | Runs a Pod on every eligible node or on a selected set, commonly for networking, logging, or monitoring agents. |
| Job | Runs one-off work and tracks successful completions, subject to configured retry and failure policies. |
| CronJob | Creates Jobs on a repeating schedule. |

### Services and incoming traffic

Pod addresses can change when Pods are replaced. A Service supplies a stable network endpoint for one or more backends, usually selected by labels.

| Service type | Behaviour |
| - | - |
| `ClusterIP` | Provides the default cluster-internal virtual address. |
| `NodePort` | Opens the same allocated port on configured node addresses and forwards traffic to ready backends. Exposure and security depend on network configuration. |
| `LoadBalancer` | Requests an external load balancer from a supported implementation. Provisioning and behaviour vary by provider. |
| `ExternalName` | Returns a DNS alias to the configured external name rather than proxying traffic. |

An Ingress defines HTTP and HTTPS routing from outside the cluster to Services. Creating the object alone has no effect because an Ingress controller must implement its rules. Ingress does not route arbitrary protocols. Gateway API is its more expressive successor, but it also requires installed custom resources and a supporting controller.

### kubectl and configuration

`kubectl` sends requests to the Kubernetes API. Its usual form is `kubectl command type name flags`. A kubeconfig context selects a cluster, user, and default namespace. `kubectl config get-contexts` lists one or more configured contexts, not only the active one.

| Command | Purpose |
| - | - |
| `kubectl get` | Lists resources, optionally filtered or formatted. |
| `kubectl describe` | Shows detailed state and related events. |
| `kubectl logs` | Reads container logs from a Pod. |
| `kubectl exec` | Runs a command in a container. |
| `kubectl diff -f` | Compares manifests with live configuration. |
| `kubectl apply -f` | Creates or patches objects declaratively. |
| `kubectl expose` | Creates a Service for a supported resource. It does not necessarily make it internet-accessible. |
| `kubectl delete` | Deletes identified resources, including those named in manifests. |

Imperative commands are useful for learning and one-off work. Imperative configuration uses operations such as `create` or `replace` with complete files. Declarative configuration lets `apply` determine required creates and patches. Reviewed, source-controlled manifests improve repeatability, but each object should have a clear management method to avoid conflicting writers and configuration drift.

### Reliable and secure operation

Resource requests guide scheduling and reserve capacity. Limits constrain consumption, but poorly chosen limits can throttle CPU or terminate containers that exceed memory limits. Values should be based on measurements and workload behaviour rather than copied defaults.

Production images should use meaningful version tags or immutable digests instead of `latest`. Readiness probes keep unready Pods out of Service traffic, liveness probes can trigger restarts, and startup probes protect slow-starting applications. Probe behaviour and thresholds must match the application to avoid harmful restart loops.

ConfigMaps hold non-confidential configuration. Secrets are intended for confidential data. Their manifest values are base64-encoded, and Secret data is stored unencrypted in `etcd` by default. Clusters should enable encryption at rest, restrict Secret access through least-privilege RBAC, and consider external secret management where appropriate.

Namespaces, RBAC, quotas, and supported NetworkPolicies can separate teams and reduce resource contention. NetworkPolicy objects have no effect without a compatible network plugin. Production and non-production workloads may share or use separate clusters according to trust, failure impact, compliance needs, and operational cost. Kubernetes supplies mechanisms for reliability and isolation, but application retries, backups, observability, release controls, and disaster recovery remain separate responsibilities.

## The Kubernetes Ecosystem: OpenShift, Istio, etc.

### Platform and architecture

Red Hat OpenShift Container Platform is an enterprise Kubernetes distribution for operating containerised applications across supported hybrid environments. Kubernetes supplies the core orchestration APIs and controllers. OpenShift adds an integrated web console, command-line tooling, installation and update automation, networking, monitoring, image management, builds, and Operator lifecycle services. Some security, multicluster, storage, and developer capabilities depend on the edition or separately installed products.

OpenShift is therefore not an alternative orchestrator layered beside Kubernetes. It is an opinionated platform built on Kubernetes and other open-source components. The API server records cluster state in etcd, while controllers continually compare actual conditions with declared state and reconcile differences. Nodes run pods through the kubelet and CRI-O rather than the Docker Engine. Current releases require Red Hat Enterprise Linux CoreOS for control-plane nodes.

OpenShift supports selected public clouds and on-premises infrastructure, while Kubernetes underpins many distributions and managed services. Claims that one platform is universally easier, safer, or more flexible obscure differences in support, defaults, integration, and operational responsibility.

### Interfaces and application resources

Administrators and developers can use the web console or the `oc` command-line client. The `oc` client provides the capabilities of `kubectl` and adds commands such as `oc login` and `oc new-app`, together with support for OpenShift APIs.

OpenShift supports standard Kubernetes resources, including `Deployment` and `Ingress`, as well as extensions such as `Route`, `BuildConfig`, and `ImageStream`. A `Route` exposes a service through an OpenShift Ingress Controller. The older `DeploymentConfig` resource remains supported but has been deprecated since OpenShift 4.14, and new workloads should normally use `Deployment`.

### Builds and image streams

A `BuildConfig` declares build inputs, a strategy, an output, optional hooks, a run policy, and triggers. Inputs can include an inline Dockerfile, content copied from images, a Git repository, a binary upload, secrets, and external artefacts. Inputs may be combined, and an inline Dockerfile overrides one obtained from the repository.

The main strategies are Source-to-Image, Dockerfile, and custom builds. Source-to-Image combines application source, build scripts, and a builder image to produce a runnable image. It generates a Dockerfile. Both Source-to-Image and Dockerfile builds use Buildah. A custom strategy supplies its own builder image and logic but requires highly privileged access. Builds run serially by default. `Parallel` allows concurrency, while `SerialLatestOnly` discards superseded queued builds.

An `ImageStream` stores metadata that maps named tags to images and retains tag history. Image layers remain in a registry. Workloads and builds can refer to an image-stream tag instead of embedding a registry location, and image-change triggers can react when that tag changes.

Webhook triggers start builds from authenticated HTTP requests. OpenShift provides generic, GitHub, GitLab, and Bitbucket webhooks, but the source-control variants process push events and ignore other event types. Image-change triggers start a build when a watched `ImageStreamTag` changes. A configuration-change trigger currently starts a build when a new `BuildConfig` is created, not whenever it is edited. A build trigger starts a build only. Deployment requires a separate image trigger, pipeline, or release process, and OpenShift does not automatically merge or approve source changes.

### Operators

An Operator is a Kubernetes controller that encodes operational knowledge for an application or platform component. A CustomResourceDefinition extends the Kubernetes API with a new resource type, and the controller watches instances of that type. Its reconciliation loop can create supporting deployments, services, secrets, and storage, then handle upgrades, backups, failover, scaling, and health checks when the implementation provides those capabilities.

OpenShift includes Operator Lifecycle Manager to install Operators, grant required role-based access, and manage updates from catalogues. Subscriptions follow a selected update channel and use either automatic or manual approval. Operator capability levels describe increasing scope: basic installation, seamless upgrades, full lifecycle, deep insights, and auto pilot. The upstream Operator SDK supports Go, Ansible, and Helm workflows, although OpenShift 4.20 no longer ships its SDK scaffolding tools.

### Istio service mesh

Istio is a service mesh that moves traffic management, workload-to-workload security, and telemetry into an infrastructure layer. Its control plane distributes configuration to a data plane. Sidecar mode places an Envoy proxy beside each workload. Ambient mode instead uses a per-node Layer 4 proxy and optional waypoint Envoy proxies for Layer 7 functions.

Istio can route percentages of traffic for canary releases and A/B tests, and apply timeouts, retries, circuit breakers, load-balancing policies, and fault injection. It can establish workload identities, mutual TLS, and authorisation policies, but protection depends on correct policy and deployment. Metrics, distributed traces, and access logs expose service behaviour. The commonly used four golden signals are latency, traffic, errors, and saturation.

A mesh can reduce duplicated networking logic in microservices and apply policy consistently across workloads, clusters, and some virtual machines. It also adds configuration, resource use, upgrade work, and new failure modes. Its value therefore depends on application scale, security requirements, traffic-control needs, and the team's capacity to operate the added layer.