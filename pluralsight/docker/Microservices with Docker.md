# Microservices with Docker

Microservices organise applications into independently deployable services aligned with business capabilities. Docker images package software and its dependencies, while containers run that software. Container separation alone does not establish a microservices architecture.

A library catalogue can combine an ASP.NET Core API for application logic, a PostgreSQL database, and an NGINX web interface. Docker Compose runs these components together on one Docker host. Swarm distributes workloads across Docker hosts, while Kubernetes provides another orchestration platform, available through services such as Google Kubernetes Engine (GKE).

## Local deployment with Compose

A Compose file defines services, images, build settings, networks, and storage. Docker Desktop's `docker init` can generate starter files for supported applications, including ASP.NET Core. Those files require review of paths, ports, and application settings.

The API and web interface can use custom images, while PostgreSQL uses its official image. NGINX serves static website files and can proxy API requests. Example host ports are 9000 for the API and 8080 for the website.

Compose normally creates a shared network. The API connects to PostgreSQL through its service name, such as `db`, using the database's container port and valid credentials. Published host ports serve connections from outside that network. Moving the Compose file requires checking relative paths and can change the default project name, affecting which resources Compose manages.

PostgreSQL's initialisation settings specify a user, password, and database. An SQL file mounted under `/docker-entrypoint-initdb.d` can create the books table and sample records. These settings and scripts apply when the data directory is empty. They do not reinitialise an existing database whenever its container is replaced.

The image's initial user is a database superuser. Applications can use a separate account with narrower permissions, and credentials require protected handling throughout configuration and deployment.

A named volume preserves database files independently of a container's writable layer. Reusing that volume allows replacement containers to reopen the data. Volume retention does not replace backups or protect against host storage failure.

`docker compose up -d` starts services in detached mode and can build required images. Unchanged containers can remain running when another service is added. Running status does not establish readiness. A database health check and a `service_healthy` dependency condition can coordinate startup, while logs and requests to database-backed API routes check application behaviour.

## Services and stacks in Swarm

`docker swarm init` creates a cluster with a manager, and join commands add further nodes. Managers maintain cluster state and schedule work. Workers run assigned tasks, and managers can also run application tasks.

A service specifies a workload's desired state, including its image and replica count. Each task represents one container execution. `docker service ls` lists cluster services, while `docker service ps` shows a service's task placement and history. `docker ps` lists containers only on the selected Docker daemon.

A cluster visualiser may need a manager's Docker socket to obtain cluster-wide information. Worker sockets provide a different view, so a manager placement constraint can be necessary.

Changing the replica count scales a service. Swarm's routing mesh distributes incoming connections on published service ports to active tasks, including tasks on other nodes. Requests need not alternate between replicas. Placement depends on resources, constraints, and cluster conditions.

Swarm attempts to replace failed tasks to restore the desired state. Replacement requires capacity and suitable nodes. Scaling to zero stops tasks while retaining the service definition, whereas removing the service deletes that definition.

A stack groups related services in a deployment file. API and web images must be built and made available to the nodes, commonly through a registry. Images also need compatible operating systems and CPU architectures. `docker stack deploy -c stack.yaml staging` deploys the named stack from a manager. It does not build images and uses the legacy Compose version 3 format, with different support from the current Compose Specification.

Swarm configs distribute non-sensitive files such as database initialisation SQL. Inspection exposes Base64-encoded content, which can be decoded. Overlay networks connect services across hosts. The default local volume driver keeps data on an individual host. Constraining PostgreSQL to that host supports reuse of its existing volume, but does not replicate data or provide database failover.

Task logs help diagnose failures. An NGINX error reporting an unresolved upstream hostname identifies a name-resolution problem that can prevent startup. Later API connection failures can instead produce proxy errors. Repeated failed tasks alone do not establish the cause.

## Kubernetes deployment on GKE

GKE Autopilot manages nodes and other infrastructure tasks. Cluster creation requires an authenticated account, an appropriate project and region, billing, permissions, and an enabled Kubernetes Engine API. Retrieving cluster credentials configures local Kubernetes access. A namespace groups the application's namespaced resources.

Kubernetes manifests describe the application through distinct resources:

| Resource | Role |
| --- | --- |
| Pod | Runs one or more containers sharing a network namespace and potentially storage. |
| Service | Provides access to selected backend Pods through configured ports. |
| Ingress | Defines HTTP routing rules implemented by a compatible controller. |
| PersistentVolume and PersistentVolumeClaim | Represent storage independent of a particular Pod and a request to use it. |

`kubectl apply -f` creates or updates resources from manifests. Image references and environment settings can resemble those in Compose, but networking and storage require Kubernetes configuration. Declaring `containerPort` does not itself publish a port externally.

An Ingress can route `/api` requests to the API Service and other matching paths to the web Service. With Prefix rules, the longest matching path takes precedence. An Ingress controller must implement the routing. Events, readiness checks, and requests to both application endpoints help confirm deployment.

`kubectl port-forward` provides temporary local access to a selected Pod, including through a Service. A local `psql` client can then create the books table and records. The forwarding process must remain running.

A database using ephemeral storage can lose its files when its Pod is replaced. Durable operation requires suitable persistent storage and backups before application data are relied upon. Managed infrastructure does not automatically supply these application-level arrangements.

## Monitoring and cleanup

The PostgreSQL exporter can run alongside the database in the same Pod, using their shared network namespace. With valid database credentials and permissions, it exposes Prometheus-compatible metrics, normally at `/metrics` on port 9187.

Adding the exporter can replace the database Pod. With ephemeral storage, this monitoring change can lose existing records. A `2/2` readiness count reports two ready containers, according to their configured checks.

Where available, `pg_exporter_last_scrape_error` reports whether the latest scrape encountered an error. Zero does not establish complete application health. Database-size metrics describe individual databases in bytes. Comparing captures before and after SQL operations can show growth, but the change depends on actual storage allocation. Exporter versions and configurations determine available metrics.

Cleanup commands have different scopes. Ordinary `docker compose down` retains named volumes and images. Additional options can remove them. Removing a Swarm stack can also leave database volumes behind.

Renaming a service can leave obsolete containers. Cleanup should use the intended project identity, with orphan removal where required, while preserving any database volume that must survive.

Kubernetes deletion can wait on finalisers, and interrupting the client does not confirm completion. Deleting a GKE cluster can leave persistent disks and some load balancer resources. Checking retained data and cloud resources completes cleanup and identifies resources that may continue to incur charges.
