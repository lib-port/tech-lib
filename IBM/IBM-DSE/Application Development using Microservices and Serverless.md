# Application Development using Microservices and Serverless
## Introduction to Microservices

### Architectural choices

Application architecture determines how software responsibilities are organised, deployed, and connected. Software-as-a-service delivers remotely hosted software, often through a web interface.

| Architecture | Characteristics and trade-offs |
| --- | --- |
| Monolith | Functionality forms one deployment unit, simplifying development and operation. Internal modules can remain well separated, but changes and scaling generally affect the whole application. |
| Service-oriented architecture (SOA) | Services expose capabilities through described interfaces and contracts. Often used for enterprise integration, SOA supports reuse without guaranteeing simple integration or low costs. |
| Microservices | Services follow business capabilities and support independent deployment and scaling. Each controls its data and can choose suitable technologies. Microservices share principles with SOA. |

Services exchange information through application programming interfaces (APIs), messages, or event streams. Direct access to another service's private database can undermine that service's autonomy. A bounded context defines where a business model and its terminology apply, helping identify service boundaries.

Horizontal scaling adds instances. Scaling selected services can save resources, although networking, deployment, and monitoring add costs. Services retain dependencies, so independent releases require compatible interfaces, and failure isolation requires deliberate fault handling. Event streaming distributes changes asynchronously, potentially leaving consumers temporarily out of date.

### Twelve-factor applications

The twelve-factor methodology supports portable, repeatable software-as-a-service deployments. It covers development, deployment, and operation and can apply to monoliths or microservices.

| Factor | Principle |
| --- | --- |
| 1. Codebase | One version-controlled codebase supports multiple deployments. |
| 2. Dependencies | Required packages and tools are explicitly declared and isolated. |
| 3. Configuration | Deployment-specific settings reside in environment variables, separate from code. |
| 4. Backing services | Databases and other services are attached resources, replaceable with compatible alternatives through configuration. |
| 5. Build, release, and run | Building prepares executable software, releasing adds configuration, and running starts processes. These stages remain separate. |
| 6. Processes | Stateless application processes keep persistent data in backing services. |
| 7. Port binding | Applications expose network services by listening on ports. Server support is included among declared dependencies. |
| 8. Concurrency | Additional processes provide horizontal capacity. |
| 9. Disposability | Processes start quickly, stop gracefully, and tolerate unexpected termination. |
| 10. Development-production parity | Development, staging, and production remain similar, including backing-service types and versions. |
| 11. Logs | Processes write events to standard output for the environment to collect and route. |
| 12. Administrative processes | One-off tasks use the application's release, configuration, and dependencies. Administrative code ships with application code. |

### Supporting patterns

- Single-page applications update browser content dynamically without loading a new document for every interaction. They can use monolithic or microservice backends.
- Backend for Frontend provides client-specific backend behaviour, such as different responses for mobile and desktop interfaces. Separate backends add maintenance and network overhead.
- Strangler Fig replaces functionality gradually while old and new systems coexist, allowing retirement after remaining dependencies move.
- Service discovery locates available service instances as deployments, scaling, and failures change their locations.
- Entities retain identity as attributes change. Aggregates group related objects, such as an order and its line items, within a consistency boundary managed through a root entity.
- Adapters translate incompatible interfaces or data models so systems can communicate.

### Operational choices

A modular monolith often suits simpler systems or uncertain service boundaries. Microservices become useful when independent deployment or scaling justifies their complexity. Excessively small services increase coordination overhead.

Reliable operation requires testing, deployment, and monitoring automation. Cloud hosting is optional. Networked services need appropriate security, and distributed debugging can be difficult. Transport Layer Security (TLS) can protect service communications. API gateways can centralise authentication, rate limiting, routing, and monitoring, while internal communications and resource access still require protection.

## Web API Essentials: REST API and GraphQL

An application programming interface (API) defines how software components interact. Its contract describes available operations, accepted inputs, responses, and access requirements. APIs can connect applications or coordinate microservices while hiding implementation details. REST and GraphQL offer different approaches to these interfaces, supported by frameworks, testing tools, documentation, and deployment infrastructure.

### REST and HTTP

REST, or Representational State Transfer, is an architectural style with six constraints: client-server separation, stateless interaction, cacheability rules, a uniform interface, a layered system, and optional code-on-demand. HTTP commonly implements REST, but HTTP routes and JSON responses alone do not establish REST conformance.

Stateless interaction means each request supplies the context needed to understand it without relying on a server-held conversational session. Servers can still store resource data in databases. This separation can support scaling and recovery, although neither follows automatically.

Resources, such as products or orders, are identified through uniform resource identifiers (URIs). Clients interact with representations of their state. The uniform interface also requires self-descriptive messages and hypermedia controls that guide available interactions. A representation need not contain every possible field, and underlying information can appear through multiple resources.

CRUD means create, read, update, and delete. Common HTTP mappings are:

| Method | Typical product API operation |
| --- | --- |
| GET | Retrieves `/products` or an individual product such as `/products/144`. |
| POST | Submits data to `/products`, commonly creating a new item. |
| PUT | Creates or replaces the state at a specified product URI. |
| PATCH | Partially modifies an existing product, such as changing its price. |
| DELETE | Removes the resource at its URI, without necessarily erasing stored copies. |

Responses communicate outcomes through status codes and content. Common examples include 200 for successful retrieval, 201 for creation, 204 for success without a response body, and 404 for a missing resource. Invalid input needs an appropriate error response. An empty response body alone does not prove success.

### Implementing APIs with Flask

Flask is a small, extensible Python web framework. It uses Werkzeug and integrates Jinja templates, while leaving database choices to the application. Its description as a microframework does not require an application to use microservices.

A Flask application associates routes with Python functions. A root route can return a Hello World string, while `jsonify` produces JSON responses. The relevant Python environment needs Flask and any additional dependencies. Flask's development server normally listens locally on port 5000. Production hosting requires an appropriate server and configuration, with the development debugger disabled.

A product service can demonstrate CRUD operations using an in-memory list containing IDs, names, and prices. Such data resets on restart and is not automatically shared across worker processes. Durable applications need suitable storage. Handlers also need input validation, deliberate handling of missing IDs, controls over editable fields, and appropriate authentication and authorisation. A price-only update should use partial-update semantics rather than being presented as a complete replacement.

### Calling and testing APIs

curl transfers data through URLs from a command line or script. A plain HTTP request normally uses GET. Uppercase `-X` selects a method, `-H` adds a header, `-d` supplies body data, and `-i` includes response headers. Lowercase `-x` configures a proxy. Supplying data with `-d` normally selects POST unless another option changes the method.

`Content-Type: application/json` describes the request body. `Accept: application/json` expresses a response-format preference. Neither header validates the body or guarantees REST conformance.

Postman provides a graphical interface for constructing requests, inspecting responses, saving collections, and repeating tests. It can generate client request snippets, rather than complete API implementations. Useful checks cover creation, retrieval, modification, deletion, and error cases.

Requests must originate somewhere that can reach the server. Postman's desktop application or Desktop Agent can access local services. A cloud agent cannot reach a private localhost endpoint, while direct browser requests may encounter cross-origin restrictions.

### API gateways

An API gateway provides an entry point between clients and backend services. It can route requests, aggregate responses, enforce authentication and rate limits, and collect monitoring information. Wider API-management platforms may integrate billing and usage controls.

For an online store, a gateway might combine product and inventory information while routing orders to a separate service. It can hide changes to backend locations and instance counts when the client-facing contract remains compatible. It cannot make incompatible API changes invisible to clients.

Aggregation can reduce client round trips, but backend calls still occur. A gateway adds processing and maintenance overhead and can become a bottleneck or point of failure. Its effect on response time depends on the design. Managed and open-source options offer different operational responsibilities, and gateway policies do not replace all service-level protection.

### OpenAPI and Swagger

The OpenAPI Specification describes HTTP APIs in a programming-language-independent form, using JSON or YAML. Descriptions cover paths, operations, parameters, request bodies, responses, and security requirements. They can also include contact, licence, and service information.

Swagger is a family of tools. Swagger Editor supports authoring descriptions, Swagger UI renders interactive documentation, and Swagger Codegen generates client software or server stubs. Generated stubs still need application-specific behaviour. A valid description does not prove that the running implementation follows it.

A generated greetings endpoint can return a dictionary of language names and greeting strings, illustrating how application logic replaces placeholder responses in generated server stubs.

Flask can group Swagger UI routes in an optional blueprint. The application registers the blueprint and supplies an accessible description location. Installing a package alone does not complete that setup.

Address configuration depends on the specification version. Swagger 2.0 separates the host, scheme, and base path. OpenAPI 3.x uses server URLs. Browser-based interactive requests also need network access, credentials, and compatible cross-origin settings. Cross-Origin Resource Sharing (CORS) controls browser access to responses across origins and does not authenticate users.

### Docker packaging

Docker builds images from application code and configuration, then creates containers from those images. An image tag identifies an image, not a running container. The `-d` option runs a container in the background.

Port mapping uses host-to-container order. `8080:4000` forwards host port 8080 to container port 4000. A returned container identifier does not establish readiness. Status, logs, and endpoint requests help verify operation. Code embedded during an image build normally requires a rebuild and a new container after changes. `docker stop` requests an orderly shutdown before forcing termination after a timeout.

### GraphQL

GraphQL is a query language and execution model built around a typed schema. Clients select available fields, and resolver functions obtain the underlying data. Queries read information, while mutations define changes. A service commonly exposes one HTTP endpoint, often `/graphql`. POST supports queries and mutations, while some servers also accept GET for queries.

A city service can filter records by state while returning only city names:

```graphql
{
  cities(state: "Florida") {
    city
  }
}
```

Results reflect the service's dataset, which need not contain every US city. Responses commonly contain `data`, but errors can produce partial results or prevent execution. One endpoint does not imply one backend call, and REST APIs can also support aggregation or field selection.

Adding output fields can preserve existing queries. Removing fields, changing types, or adding required inputs can break clients, so compatible schema evolution remains necessary. Federation can combine schemas managed by different domain teams, as Netflix has described for its studio systems.

## Serverless Overview

Serverless computing lets application teams run software without provisioning or maintaining the underlying servers. Servers still execute the code, but a platform operator manages the execution infrastructure. Developers concentrate on application logic, integrations, and configuration.

Function-as-a-service (FaaS) runs code in response to invocations or events. Backend-as-a-service (BaaS) provides capabilities such as authentication, databases, object storage, and messaging. Applications often combine these services, although serverless also includes managed container platforms and other execution models.

Virtual machines provide separate guest operating systems, while containers usually share a host kernel. Managed serverless services hide more of this infrastructure from developers. These models coexist, and the appropriate choice depends on control, workload duration, operational capacity, and cost.

### How functions work

A function contains code for a defined task, together with runtime settings, resource allocation, permissions, and event integrations. Triggers include HTTP requests, scheduled events, uploaded files, and queue messages. An API gateway can route web requests to functions, while other event sources can invoke them directly.

The platform runs each invocation in an execution environment. Results can return to a caller, update stored data, or feed another operation. Some platforms use containers internally, but executing a function does not inherently produce a container object.

Functions should not depend on durable local state. Reused environments may retain memory or temporary files, but reuse is not guaranteed. Databases and object storage retain application state, while caches can accelerate access. Login sessions or tokens can persist between requests without continuously executing a front end.

Focused functions can simplify testing and allow different tasks to scale separately. Excessive fragmentation can add communication and coordination overhead. Language choice depends on supported runtimes or compatible custom packaging, even when different functions use different languages.

### Benefits and limits

Managed platforms reduce server administration and can automatically adjust capacity. Scaling takes time and remains subject to service quotas, configuration, and the capacity of connected systems. Deployment time, startup latency, execution duration, and hardware lifetime are separate measurements, with no universal values for functions, containers, or virtual machines.

A cold start occurs when the platform prepares a new execution environment. It adds initialisation latency and can occur after inactivity, during scaling, or following environment replacement. Smaller dependencies and suitable resource settings can improve performance. Pre-initialised capacity can reduce startup delays, often at additional cost.

On-demand function charges commonly reflect requests, execution duration, and allocated resources. Storage, logging, networking, API services, and provisioned capacity can add charges. Intermittent workloads can benefit from reduced idle compute, while sustained workloads may favour another hosting model. Lower cost and environmental impact require assessment of the complete workload.

Providers can supply resilience across availability zones, but application recovery and reliable dependencies still require design. Deployment across regions is a separate choice. Strict latency requirements need realistic testing rather than assumptions based on industry or platform labels.

Security remains shared. Providers maintain their infrastructure, while customers protect code, dependencies, data, identities, permissions, and configuration. Logs and metrics support diagnosis. Local emulators assist development, but deployed integration tests remain necessary.

### Platforms and deployment tools

| Platform | Main characteristics |
| --- | --- |
| AWS Lambda | Event-driven functions with extensive AWS integrations. A conventional invocation can run for up to 15 minutes. |
| Google Cloud Run functions | Deploys source code as functions running on Cloud Run, with HTTP and event integrations. |
| Azure Functions | Offers hosting plans with different scaling, networking, resource, billing, and execution-duration options. |
| IBM Code Engine functions | Runs supported Node.js or Python code through HTTP requests, with managed execution environments. |

Knative supplies Kubernetes-based serving, event handling, scaling, and gradual traffic shifts between revisions. Red Hat OpenShift Serverless uses Knative. Fission, the Fn Project, and OpenFaaS offer further platform options. Self-managed installations still require infrastructure operators.

Containers can improve portability, but operating system compatibility, processor architecture, and external dependencies constrain migration. Serverless and containers can be combined according to workload needs. Neither guarantees low latency, unlimited execution, or freedom from provider dependence.

Serverless Framework is a command-line deployment tool. Its services group functions, event integrations, and infrastructure resources, commonly in `serverless.yml`. Configuration stored alongside code supports repeatable deployments. Version 4 supports AWS and requires authentication. Its licence requires paid subscriptions for organisations exceeding US$2 million in annual revenue. Earlier versions remain open source.

### Application architecture and uses

A serverless to-do application can use AWS Amplify Hosting for browser assets, API Gateway for requests, Lambda for business logic, DynamoDB for records, and Cognito for registration and authentication. A React front end runs in the browser and communicates with the backend through an API.

Authentication establishes identity. Authorisation must separately enforce which records that identity can access, including ownership of individual to-do items.

Event pipelines can transform data for analytics, update caches or secondary databases, and feed monitoring systems. An uploaded image can trigger thumbnail creation, with the result saved to object storage. Functions can also initiate video processing or image analysis. Tasks exceeding invocation limits require suitable orchestration or another execution service.

### An AWS workflow example

A text-processing application can accept a string in a browser form, convert it to uppercase, and reverse it. Amplify Hosting serves the front end, API Gateway receives the request, and Step Functions coordinates two Lambda functions.

The first Python function reads `inputText`, applies `upper()`, and returns the transformed value under the same property. The second reverses that string. Workflow mappings must pass the expected object between steps. These handlers do not automatically parse an HTTP request body.

A Synchronous Express workflow can wait for both functions and return the result. The API integration must explicitly invoke synchronous execution and map requests and responses correctly. Cross-origin browser requests require appropriate cross-origin resource sharing (CORS) configuration. The front end displays successful output and handles failures.

Source files can be maintained in GitHub or CodeCommit, with Amplify connected to a selected branch for automated deployment. Build settings must match the project. A deployed API can be called through HTTP or a generated SDK.

### Development and maintenance

A simple Node.js function can read a `name` property and return a greeting. A direct test event containing `Eliot` produces `Hello Eliot!`, but HTTP integrations may supply a different event structure. Handler syntax must match the selected module format.

Development uses supported runtimes and appropriately restricted identities and execution roles. Node.js 16 and Python 3.9 are deprecated Lambda runtimes. Routine work uses authorised identities rather than root credentials. Unused functions and separately managed supporting resources require appropriate cleanup.

Managed runtime maintenance leaves teams responsible for updating application dependencies and moving their software away from unsupported language versions.

## Create and Deploy Microservices using Serverless

IBM Cloud Code Engine is a managed serverless platform that runs applications and other workloads while operating the underlying cluster infrastructure. It reduces the work of provisioning servers, building deployment environments, and adjusting application capacity. Developers remain responsible for application behaviour, dependencies, configuration, permissions, and monitoring.

Microservices divide an application into separate services with defined interfaces. Each service can have its own deployment and scaling settings, but shared data, interface changes, and resource limits can still affect other components.

### Projects and workloads

A Code Engine project groups resources within a Kubernetes namespace and provides a scope for access control and resource management. Application names must be unique within a project. Names can be reused in separate projects, subject to the rules for each resource type.

| Resource | Purpose |
| --- | --- |
| Application | Handles HTTP requests or WebSocket connections through running instances. |
| Build | Produces a container image from source using a Dockerfile or Cloud Native Buildpacks. |
| Job | Defines work that can be submitted as separate job runs, including parallel batch processing. |
| Function | Runs supported code through a managed function execution environment. |

Applications can provide web pages, APIs, and continuing WebSocket communication. Batch jobs suit tasks such as data transformation, model training, reporting, and billing calculations. A job definition is reusable, while each submission creates a run. Configured retries can repeat failed work.

Parallel job instances receive indexes through `JOB_INDEX`. Automatically assigned indexes start at zero, while explicitly selected indexes can differ. Jobs do not expose application-style inbound URLs, although they can call other services.

### Python services and container images

Python web applications need compatible serving software. The Web Server Gateway Interface (WSGI) defines a synchronous interface used by frameworks such as Flask and servers such as Gunicorn. Servers can still process multiple requests through workers or threads. The Asynchronous Server Gateway Interface (ASGI) supports asynchronous events and protocols such as WebSocket.

Flask's built-in development server and debugger are unsuitable for production. A deployed service needs an appropriate server that listens on the configured port and a reachable network interface.

A container is an isolated running environment created from an image. The image packages application files, dependencies, libraries, and language runtimes. The host supplies the kernel and container runtime. Compatibility therefore depends on the operating system, processor architecture, and runtime environment. Packaging does not make software executable on every device.

Code Engine supports compatible Open Container Initiative images. Docker is one tool for building them. An image contains immutable layers and metadata, while a running container adds runtime configuration and writable storage.

### Building and deploying

A Dockerfile describes image construction. `FROM` selects a base image, `COPY` adds files, and `RUN` executes build-time commands. `ENV` defines environment variables, while `CMD` supplies the default startup command or arguments. Only the last `CMD` in a build stage takes effect.

`EXPOSE` documents a port without starting a listener or publishing it. A variable such as `LISTEN_PORT` affects behaviour only if the application or image reads it. Code Engine supplies `PORT`, and its deployment setting must match the actual server listener. The default application port is 8080, but another port can be configured.

Deployment can start with an existing image in a registry or with local or repository source. For source deployments, Code Engine builds and publishes the image before running it. Dockerfile and buildpack strategies have different build requirements. Private repositories and registries require suitable credentials.

A registry contains repositories of related images. References commonly include a registry hostname, repository path, and tag or digest. Tags can move between images, while digests identify immutable content.

The console and CLI both support deployment. CLI use requires authentication, the Code Engine plug-in, an active selected project, and appropriate permissions. `ibmcloud ce app create` creates an application, `app list` lists applications, and `app get` displays configuration, status, and endpoint details. A browser or HTTP client tests the endpoint. Build and deployment times vary.

### Scaling and resources

Code Engine adjusts application instances according to incoming requests and configured scaling limits. It distributes traffic across instances, while concurrency settings influence how much work reaches each instance and when additional capacity is sought.

An application with a minimum of zero can lose all running instances when idle. The next request then incurs startup latency. A non-zero minimum can reduce that delay but consumes resources while idle.

`ibmcloud ce app update --name listing --min-scale 2` sets a minimum of two instances. It neither requests three nor fixes the total permanently at two. Demand can increase the count, while failures, deployment transitions, or insufficient quota can temporarily prevent the target from being met.

Scale-down timing depends on configuration and workload behaviour. Waiting five minutes does not guarantee that instances disappear, and waiting cannot reduce an application below its configured minimum.

CPU and memory settings apply per instance and must use supported combinations. Ephemeral storage also has limits. Project quotas cover shared workloads, so instance counts alone cannot establish available capacity. Larger instances and more instances address different constraints and require workload measurements.

### Configuration, secrets, and access

Environment variables supply key-value configuration to applications, jobs, and functions. Values can be literal or reference existing configmaps and secrets. Configmaps hold ordinary configuration, while secrets separate sensitive values from source code.

Environment variables are not inherently confidential. Workload code and authorised project users can access relevant values, so permissions and logging need careful configuration. A database host setting must identify the reachable database service. `localhost` refers to the current network environment, not an arbitrary remote database.

Code Engine injects variables describing workload and project context. `CE_DOMAIN` and `CE_SUBDOMAIN` can help form application addresses, but internal addresses and private-network endpoints represent different access paths.

Every application has a project-internal endpoint. Additional visibility can be public or restricted to the IBM Cloud private network through suitable Virtual Private Endpoints. Project-only visibility disables the external system endpoint. These settings govern network exposure and do not replace authentication or authorisation.

Code Engine manages Transport Layer Security for application ingress. IBM Cloud Identity and Access Management controls administrative access to platform resources.

Service bindings connect workloads to supported IBM Cloud services that provide IAM-enabled credentials. Code Engine stores credentials in a service access secret and exposes binding information through environment variables. Application code must still use the service API and a reachable endpoint. Unbinding removes the association without deleting the underlying service instance.

### Updates and independent services

Application updates create immutable revisions while preserving the application resource. Changes can affect code, images, environment variables, visibility, resources, and scaling. A revision remains associated with its image digest, so overwriting a registry tag does not automatically change the running application.

A database change, such as moving from SQL to NoSQL, requires assessment of queries, data structures, consistency, and migration. Higher traffic alone does not establish that the alternative will perform better. Monitoring and endpoint tests help determine whether an update achieves its intended behaviour under load.

A greeting service built locally must be rebuilt, pushed to the registry, and deployed after its message changes. A distinct version tag makes the update explicit. Source-based deployments instead require a successful new build.

A university-information application can separate a listing service from a websites service. Each has its own endpoint and deployment configuration. Its community-maintained dataset may be incomplete or outdated.

The websites service can change from exact-name matching to substring matching without redeploying the listing service. Python's `name in college["name"]` comparison is case-sensitive. Applying `casefold()` to both strings enables case-insensitive matching. Results include matching records from the deployed dataset, rather than a guaranteed complete university register.

The listing service can scale independently, although both services share project quotas. Independent deployment still requires compatible interfaces, appropriate data handling, and validation of the updated service.

## OpenShift Essentials

### Platform and deployment

Red Hat OpenShift is a Kubernetes-based platform for containerised applications, including microservices, across on-premises and cloud environments. It adds development and operational capabilities to Kubernetes, including builds, networking, and cluster monitoring. Additional components provide functions such as serverless execution and application logging.

OpenShift Container Platform 4.20 uses Red Hat Enterprise Linux CoreOS for control-plane machines. Workers can use CoreOS or supported Red Hat Enterprise Linux configurations.

Developers manage projects through the command-line interface or web console. The Developer perspective's From Git option imports source and can recommend a builder image. Builder versions, application dependencies, environment variables, and deployment settings require suitable configuration. The Topology view links application components to builds, deployments, and routes.

The sclorg/nodejs-ex Node.js sample currently requires a PostgreSQL database, so console defaults alone do not establish a complete deployment.

Source-to-Image combines source code with a builder image to produce a container image without requiring a Dockerfile. The image is stored in an integrated or external registry. Deployments create Pods that run containers from the selected image. An OpenShift route exposes a service through a router and hostname. Internet accessibility depends on network and DNS configuration.

### Automated updates

Git changes trigger builds only when the required workflow and triggers are configured. Creating a project does not automatically create Jenkins jobs. OpenShift supports BuildConfig-based builds, Tekton-based OpenShift Pipelines, and separately configured Jenkins integrations.

Image streams track image versions, and configured image-change triggers can update deployments. Rolling updates gradually replace old Pods. Continued availability depends on replicas, readiness checks, capacity, rollout settings, and application compatibility.

### Communication with Istio

Microservices can be updated and scaled independently and use different technology stacks when service boundaries and dependencies allow. Distributed communication introduces security requirements and the risk of cascading failures.

A service mesh such as Istio provides traffic management, communication security, and observability. Routing can direct 90% of requests to an established version and 10% to a new version during a canary release. A/B testing instead compares variants against an outcome. Timeouts, bounded retries, and circuit breaking can limit failures, although retries can increase load.

Mutual TLS authenticates communicating workloads and encrypts covered connections. Separate authorisation policies control permitted calls and can restrict HTTP methods. For example, a policy can allow catalogue access to inventory while denying direct user-interface access.

Istio's istiod control plane distributes configuration and manages certificates. Data-plane proxies apply policies and collect telemetry. Sidecar mode uses an Envoy proxy within each participating Pod, with injection requiring configuration. Ambient mode uses node proxies and optional waypoint proxies for application-layer features.

Applications retain responsibility for business logic, error handling, and appropriate security controls.

| Istio resource | Purpose |
| --- | --- |
| Gateway | Configures gateway proxy ports, protocols, and TLS settings. |
| VirtualService | Defines request routing and weighted traffic splits. |
| DestinationRule | Defines destination subsets, load balancing, TLS, and connection policies. |
