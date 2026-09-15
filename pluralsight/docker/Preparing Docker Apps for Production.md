# Preparing Docker Applications for Production

> [!NOTE]
> This guide explains how to make containerized applications production-ready through portable images, runtime configuration, secure secrets, centralized logging, meaningful health checks, resilient routing, and explicit deployment models.

A container image packages an application and its runtime dependencies. Production operation also depends on how the application receives configuration, records events, reports its condition, and accepts network traffic. These interfaces allow a container platform to manage applications consistently, even when their components use different programming languages.

Starting a container establishes that its main process can run. It does not establish that the application can perform useful work. A web server can remain running while returning errors, useful logs can remain hidden in private files, and configuration embedded in an image can prevent the same release from working in another environment.

Four connections between application and platform address these problems:

- Runtime configuration supplies environment-specific settings without rebuilding the image.
- Container logging makes application events available to a collection system.
- Health, readiness, and startup signals support recovery and traffic management.
- Reverse proxies route requests and can provide TLS, caching, and other traffic controls.

Application developers define the configuration keys, log events, and health interfaces. Deployment definitions supply settings, arrange collection, configure recovery policies, and connect services to incoming traffic. The image and its deployment configuration work together.

Docker Compose, Kubernetes, and other platforms implement these principles differently. Compose and Kubernetes commonly use YAML definitions, while Nomad commonly uses HCL. Common packaging conventions do not imply identical management APIs, automatic scaling, or recovery behaviour.

## Configuration across environments

### One image, different settings

The same built image can move through testing and production while each environment supplies its own configuration. This preserves the tested binaries and dependencies. An image digest identifies content more precisely than a mutable tag. Production settings, external services, data, and load still need validation because successful testing does not guarantee correctness or security under different conditions.

A container supplies a filesystem view, process environment variables, and network access according to its runtime configuration. Files and variables provide useful configuration inputs. The application does not need to know whether they originated in local files, cluster resources, or a managed configuration service.

A common hierarchy combines three sources:

| Source | Typical role |
| --- | --- |
| Defaults packaged in the image | Non-confidential settings that support ordinary execution |
| Mounted configuration file | Values for a particular environment |
| Selected environment variables | Overrides for individual settings |

The application or its configuration library implements this precedence. Docker supplies files and variables but does not merge their contents. Libraries may also consider command-line arguments, profiles, and explicit assignments in code, so the actual precedence needs to be understood and verified.

A logging setting illustrates the pattern. The image might default to `WARN`, an environment file might select `INFO`, and a diagnostic deployment might override the setting to `DEBUG`. Each change increases verbosity. Application code reads the effective setting after the configured sources have been combined.

Credentials belong outside the image's ordinary defaults. A prefix on environment-variable names can prevent naming collisions, but it does not provide confidentiality. Processes that inherit those variables and administrators with sufficient access may read them. Diagnostic output should expose selected non-sensitive settings rather than dump the entire environment.

A bind mount exposes a host file or directory at a path inside the container. The source is on the machine running the Docker daemon, which may differ from the machine running a remote command-line client. Mounting over an existing path hides the image content there. A dedicated override directory can preserve default files that the application still needs.

Directory mounts are convenient when several configuration files belong together. Single-file mounts suit precise overrides. The choice depends on the application and update mechanism, and read-only mounts suit configuration that the application should not modify.

### Configuration in different languages

An image gallery illustrates how these principles apply across languages. Its Go web component displays astronomy content. A Java API retrieves and caches information from NASA's Astronomy Picture of the Day service. A Node.js access-log API records visits. NASA content can include media other than still images, so production clients need to handle the media types and optional fields returned by the API.

The Go component uses Viper. Its image contains `config.toml`, and the application also reads an override file and selected IG-prefixed environment variables. Within that arrangement, the variables override file settings. Viper's wider precedence rules also give explicit `Set` calls and flags priority over environment variables. The prefix is an application choice, not a universal Viper requirement.

The Node.js component uses node-config. A packaged `default.json` supplies defaults, and a mounted `local.json` can replace selected values. `NODE_CONFIG` supplies overrides as a JSON string. Node-config also supports individually mapped environment variables through a `custom-environment-variables` file, and those mappings take precedence over file configuration and `NODE_CONFIG`.

These mechanisms can combine values from several places. A release identifier can remain at its packaged default, an override file can select the TEST environment, and an environment variable can change a metrics setting. A startup log or restricted configuration endpoint can confirm the effective values without exposing credentials.

Configuration diagnosis follows the same chain in reverse. A value unexpected by the application may come from a higher-priority variable, an override mounted at the wrong location, or a file that the application has not reloaded. Confirming the mounted path and the effective non-sensitive values distinguishes delivery problems from precedence problems. A successful container start alone cannot establish that the intended configuration was applied, particularly when defaults allow the application to run despite a missing override.

Spring Boot natively supports external properties files, YAML, environment variables, and command-line settings. Its configuration system combines packaged defaults with external configuration according to defined precedence rules.

Some applications nevertheless need an adapter for a fixed file format or a particular naming convention. A configuration loader can read supplied files and selected variables, validate them, and write the configuration file expected by the application. The application starts only after the loader succeeds.

The gallery's Java component uses `ConfigLoader` to read an override path and IOTD-prefixed variables, then write an external `application.properties` file. This adapts the gallery's file formats and naming conventions to the application.

A multistage Dockerfile can compile the application and its loader, then copy their outputs into the runtime image. This keeps the build relationship explicit and avoids retaining unnecessary build tools in the final image. The loader still needs testing for missing files, invalid values, permissions, and compatibility with the application's expected format.

The startup sequence should stop if configuration preparation fails. A shell's double ampersand runs the next command only after the previous command succeeds. After initialisation, an entrypoint can replace the shell with the application process so that termination signals reach it correctly.

Metrics configuration needs precise interpretation. In Spring Boot, exposing the Prometheus management endpoint makes metrics available through that interface when the required registry is present. Removing it from the exposure list hides the endpoint. It does not establish that internal metric recording has stopped. Instrumentation, endpoint exposure, and collection by a monitoring server are separate controls.

### Compose and Kubernetes configuration

Compose records images, environment variables, mounts, and network settings in one application definition. Each gallery component can receive configuration in its own format while sharing the same operating pattern. Services on the same Compose network can normally reach one another by service name, using the destination container's listening port.

The command `docker compose up` creates and starts the defined services. An update can recreate services whose definitions changed while leaving unchanged services running. A changed external file does not automatically make every application reload it. Reload behaviour or controlled container replacement must be part of the configuration workflow.

Kubernetes stores non-confidential configuration in ConfigMaps and confidential values in Secrets. These objects can be managed independently of the Pods that consume them. A Pod specification defines how selected entries become environment variables or mounted files.

| Kubernetes object | Purpose |
| --- | --- |
| ConfigMap | Supplies non-confidential configuration, including complete text files |
| Secret | Supplies confidential data under separate access policies |
| Pod | Runs one or more containers with shared networking and selected storage |
| Deployment | Manages replaceable application Pods through ReplicaSets |
| Service | Provides a stable access point for selected backends |

A ConfigMap key named `config.toml` can become a TOML file, while `local.json` can become a JSON file. Several entries can appear in a mounted directory. A ConfigMap has a 1 MiB data limit and is not intended for large datasets. The application still needs to read the files at the configured paths.

The Go and Node.js components can use ConfigMaps for ordinary settings. The Java API can combine a ConfigMap for properties with a Secret for its NASA API key. This preserves the same image and startup workflow while moving configuration ownership into the platform.

Secret data under `data` is base64-encoded, while `stringData` accepts text for conversion by the API. Base64 is not encryption. Encryption at rest requires configuration, and permissions must restrict access. Permission to create workloads in a namespace can also provide a route to mounting that namespace's Secrets. Actual credentials should not appear in ordinary source control or diagnostic responses.

Configuration updates have different lifetimes. Mounted ConfigMap contents normally update after propagation, but `subPath` mounts do not receive those updates. Applications must reload changed files to use them. Environment variables remain unchanged inside an existing process when the source object changes, requiring a controlled workload restart or replacement.

Not every Pod belongs to a Deployment. Other controllers and directly created Pods are possible. Containers within one Pod normally share its IP address and network namespace, rather than each receiving a separate IP address. Configured cluster DNS provides Service records, but a Service does not create the DNS server itself.

A LoadBalancer Service requests an external access point when a supporting implementation exists. A local development cluster may expose it through localhost, while a cloud cluster can provision an external load balancer. Identical YAML does not guarantee identical reachability in every environment. Internal APIs usually need no separate external entry point when a shared proxy provides access.

## Logging and diagnosis

### Making application events visible

Logs record application events and provide evidence for diagnosing failures. Distributed applications often require events from several components and the operating platform. A central logging system can preserve those records beyond individual container lifetimes and provide one interface for searching them.

Docker logging drivers handle the container's `stdout` and `stderr` streams. Applications and child processes writing through those streams can produce container logs. This is separate from the runtime's monitoring of the main process. Files, syslog destinations, Windows Event Log, and Event Tracing for Windows are not automatically collected through those streams.

Many logging frameworks support a console destination. Configuring that destination and running the application as the main process provides a straightforward arrangement. The absence of entries in `docker logs` does not prove that no work occurred. The application may lack suitable log statements, suppress them through a severity filter, or write them elsewhere.

The gallery illustrates these differences. Its Go component initially emits only a startup message. The Node.js API records visits, while the Java API emits both application events and framework messages. Increasing verbosity reveals existing statements but cannot create request logs absent from the Go code.

Winston, used by the Node.js component, calls its destinations transports. Its Console transport can write to `stdout` and `stderr`. A configurable threshold can retain `INFO` messages during normal operation and expose `DEBUG` details during investigation. Spring Boot can apply separate levels to framework loggers and application loggers, reducing irrelevant output while retaining useful detail.

Logging defaults need to preserve useful operational evidence without overwhelming storage. Debug output can increase volume and reveal sensitive information if requests or configuration are recorded indiscriminately. Useful events identify relevant actions and failures while excluding credentials and unnecessary personal data.

### Relaying logs from other destinations

A relay can read application log files or another destination and forward records to `stdout`. This allows older applications to join a standard container logging pipeline without changing their logging code. Microsoft Log Monitor provides this bridge for Windows event logs, ETW providers, and application files.

A timestamp application can run normally and write a record every few seconds to a private file while producing no corresponding container log entries. A relay that follows the file makes those records visible to the runtime. Building a smaller image alone does not change the application's log destination.

Running the application and relay in one container requires deliberate supervision. If the main process remains alive while the application has failed, Docker can continue to report the container as running. If the relay's exit causes the main process to exit, the container can stop despite an otherwise healthy application.

A suitable wrapper must detect the relevant failures, forward termination signals, wait for processes, and reap exited children. Docker's init option can assist with child-process handling, but it does not decide the application's recovery policy. Health checks provide additional evidence, and the runtime policy determines the response.

Relaying also creates additional copies of log data. Application files, runtime output, collector buffers, and central storage can all consume capacity. Files still need rotation and retention limits. A relay must handle file creation, rotation, truncation, and restarts without silently losing records or duplicating them unnecessarily.

Kubernetes can instead run the application and streaming relay in separate containers within one Pod. Both mount a shared volume. The application writes the file, and the relay emits its contents through its own `stdout`. Their process lifecycles are tracked separately, making an application failure visible independently of the relay.

A shared ephemeral volume can survive an individual container restart within the Pod, but it does not provide durable history across Pod replacement. Forwarding to central storage remains necessary when logs must outlive the workload. Sidecars improve separation of responsibilities but do not remove storage and relay reliability requirements.

### Central collection

A logging system commonly separates collection, storage and indexing, and the search interface. EFK usually refers to Elasticsearch, Fluentd, and Kibana. Fluent Bit can fill the collection role in a similar design. It is a separate lightweight implementation in the Fluent ecosystem, not a smaller version of Fluentd.

| Component | Role |
| --- | --- |
| Fluent Bit or Fluentd | Reads, processes, enriches, and forwards records |
| Elasticsearch | Stores and indexes log documents |
| Kibana | Provides search, filtering, and visualisation |

A document-oriented search engine suits many logging workloads, but NoSQL storage is not mandatory and indexed fields still need suitable types and mappings. The storage choice depends on volume, retention, search requirements, and operating constraints.

A node-level collector reads logs accessible on its own node. A DaemonSet requests a collector Pod on each eligible node. Selectors, affinity, taints, tolerations, and resources affect scheduling. A ConfigMap can provide its pipeline, and limited `hostPath` mounts expose required log directories, normally read-only.

Filesystem access and Kubernetes API access are separate. A ServiceAccount and RBAC permissions allow the collector to retrieve selected metadata. The Kubernetes filter can enrich records with Pod, namespace, container, node, and label information. Its permissions should match the features enabled rather than grant unrestricted cluster access.

Older Kubernetes examples often assume Docker JSON logs and Docker-specific directories. Current runtimes integrate through the Container Runtime Interface and its log format. Collector paths and parsers must match the deployed runtime, with suitable handling of multiline records. An old mount or regular expression is not universally portable.

The pipeline can route records to different indices or external destinations. Application logs might go to app-logs, while selected kube-system container records go to system-logs. Tags and metadata support filtering, but neither a namespace name nor a pipeline label guarantees isolation or complete coverage.

Not every Kubernetes component runs in a container. The kubelet and container runtime normally run as host services, whose logs may require additional inputs. Managed control-plane logs may need provider integration. Kubernetes exposes available container logs through `kubectl logs` but does not provide a complete central logging backend by default.

A single Elasticsearch instance cannot remain available if it fails. Production resilience requires an appropriate cluster arrangement, durable storage, and recovery provisions. More collectors do not automatically increase storage capacity. Elasticsearch and Kibana licence terms also depend on the distribution and version, rather than the whole stack sharing one unrestricted licence.

Search tools can filter events by application, time, severity, Pod, or node. An error code can connect matching records across components if each component records it. A shared request or correlation identifier provides a more precise association. Metadata cannot reconstruct events that were never emitted or failed to reach storage.

Collection can be checked by following a known event from its application output to the collector and then to the search interface. Its timestamp, component label, and container identity should remain usable along that path. An event visible locally but absent centrally points towards collection, parsing, routing, or storage rather than missing application instrumentation. Conversely, a central record with incorrect metadata can make a working collection system misleading during diagnosis, especially when many replicas emit similar messages.

Rotation, buffering, retention, and monitored delivery remain essential. Docker's logging configuration needs review because an unbounded file driver can exhaust disk space. The collection system itself needs capacity and failure handling so that an application incident does not also erase the evidence needed to investigate it.

## Health, readiness, and recovery

### Different signals for different decisions

A running process can be unable to perform useful work. A web application might return errors for every request while its main process remains alive. Process monitoring detects termination, while application checks provide evidence about behaviour. A health endpoint that always returns a fixed success response offers little evidence about a failing application.

The check needs to match the action that follows its failure:

| Signal | Question | Typical consequence |
| --- | --- | --- |
| Process state | Has the main process stopped? | A configured restart policy may restart it |
| Liveness | Has the local application entered a state that restarting may improve? | The orchestrator can restart the affected container |
| Readiness | Can this instance currently accept its assigned traffic? | Ordinary Service routing can exclude an unready instance |
| Startup | Has initialisation completed successfully? | Other probes can wait until startup succeeds |

These signals are observations, not guarantees that every operation will succeed. A dependency can fail between checks, and a check may exercise only part of the application. Probe design needs to identify the failures that the platform can usefully respond to without adding excessive work or creating false alarms.

Recovery also depends on the platform. Standalone Docker records health state, Swarm can replace unhealthy service tasks, and Kubernetes uses explicitly configured probes. Their actions depend on thresholds and policies. A health command alone does not establish that a live but unhealthy process will be repaired.

Readiness supports orderly updates by allowing existing replicas to serve traffic while replacements initialise. Avoiding user-visible interruption also requires sufficient capacity, suitable rollout settings, and graceful handling of existing connections. Rolling updates and accurate probes support availability, but do not guarantee it under every workload or failure.

### Docker health checks

A Dockerfile `HEALTHCHECK` instruction defines a command that runs inside the container. The image must contain the command and any required runtime or utility. The same principle applies when Compose supplies or overrides a check. Referring to curl in a deployment definition does not make it available in an image that lacks it.

Docker interprets exit code zero as healthy and one as unhealthy. Exit code two is reserved and should not be used. The health state begins as starting, changes to healthy after a successful check, and becomes unhealthy after the configured consecutive failure threshold. This state is separate from the container's running status.

The gallery includes a test failure mode that leaves the Go process running after the application stops serving useful responses. Without an application check, the container remains `Up`. A health endpoint that reflects the failure allows Docker to report unhealthy while the process is still alive. Inspection can then show recent check results, exit codes, and diagnostic output.

A curl check can call the local health endpoint from within the container. With `--fail`, curl treats HTTP responses of 400 or higher as failures, as well as reporting transfer failures. It does not require exactly HTTP 200. Without `--fail` or explicit status evaluation, curl can transfer an HTTP error response successfully and return a successful exit status.

A shell fallback can translate curl's non-zero result into the health-check failure code of one. If the application requires exactly 200, the check needs an explicit status comparison. Accepted responses should reflect the endpoint's intended behaviour rather than assume that every redirect or successful transfer proves application health.

Docker publishes a `health_status` event when health state changes. Standalone Docker does not automatically restart a still-running container solely because it becomes unhealthy. Restart policies react to container termination. This distinction concerns the configured runtime behaviour, rather than whether the deployment has one server or several.

Swarm can replace a failed service task after the relevant health threshold is reached, according to its service policies. Replacement can restore an instance with a recoverable local fault. It cannot correct an invalid configuration or a failed external service simply by running the same application again.

### Timing and check implementation

Docker's health-check settings control the interval, timeout, retry count, and startup grace period. The usual interval runs from the completion of one check to the next. A check exceeding its timeout fails. The retry count specifies consecutive failures, so retries set to three means three failures, not four.

The `start_period` allows initialisation failures without counting them towards that threshold. However, a successful check during the period marks the container as started, after which later failures count. Recent Docker versions also support a separate `start_interval`. These settings differ from delaying the first probe entirely.

An interval of five seconds and a one-second timeout do not promise an exact recovery time. A fault can arise between checks, startup rules can affect counting, and replacement takes additional time. Values should reflect expected startup duration, ordinary response times, and the cost of acting on a false failure.

Adding curl introduces an executable and dependencies that require maintenance. A custom check can instead reuse an existing runtime, such as Node.js or Java, or use a compiled Go utility. It can share application configuration and avoid another operating system package. It still adds code that needs review and maintenance.

A custom HTTP check must handle connection errors, unexpected responses, and timeout events, then exit with the intended status. Setting a timeout option is insufficient if the program does not turn expiry into failure and terminate correctly. The platform's outer timeout provides another limit, but the utility should behave coherently on its own.

The gallery's Node.js health utility accepts exactly HTTP 200 and is designed to apply a 300 ms deadline. Other responses, connection failures, and deadline expiry need to produce failure. A 300 ms deadline may be unsuitable under production load, when repeated false failures can make recovery controls harmful.

### Startup dependencies and continuing readiness

A startup utility can check a required dependency before launching the application. The Java component runs `ConfigLoader`, then `DependencyCheck`, and then the API process. If preparation fails, the startup sequence exits instead of launching an application with incomplete configuration or an unavailable essential dependency.

A fixed 20-second delay postpones startup but does not establish that a dependency is ready. A useful implementation needs bounded attempts, sensible timeouts, and a decision about whether the dependency is essential. Cached data may allow useful operation during a remote outage.

A one-off startup check differs from continuous readiness. It can prevent the application from starting, but it cannot establish that dependencies remain available afterwards. Readiness can influence traffic throughout the running application's life without terminating the container whenever a temporary problem occurs.

Compose's basic `depends_on` ordering starts dependencies before the dependent service, but a running dependency is not necessarily ready. A `service_healthy` condition can wait for a health check to pass. The application still needs to tolerate failures and disconnections after startup.

### Kubernetes probes

Kubernetes does not use Dockerfile `HEALTHCHECK` metadata as its probe definition. The Pod specification declares `livenessProbe`, `readinessProbe`, and, when needed, `startupProbe`. The kubelet evaluates them and applies the relevant behaviour.

An HTTP probe normally reaches the Pod IP from the kubelet, so the application must listen on an interface reachable that way. No curl binary is needed inside the image. Kubernetes normally accepts HTTP responses from 200 through 399 as success. An exec probe runs a command inside the container and evaluates its exit status. TCP and gRPC mechanisms are also available for suitable applications.

The Go web component can use an HTTP liveness probe, while the Node.js component can use an exec probe running its existing script. The choices differ in where the check logic runs, while serving the same liveness purpose.

`periodSeconds` controls the usual probing interval, `timeoutSeconds` bounds an attempt, and `initialDelaySeconds` delays the first check. `failureThreshold` specifies consecutive unsuccessful results. A threshold of two means two failures, not a third attempt after two retries. The initial delay differs from Docker's `start_period`, which permits a period of uncounted failures under its startup rules.

A startup probe gives a slow application a dedicated initialisation window. Until it succeeds, liveness and readiness probes are suppressed. After success, the normal probes take over. Repeated startup failure beyond the threshold causes termination and application of the restart policy.

Repeated liveness failures can restart the affected container according to policy. The Pod object can remain the same, but Kubernetes starts a fresh container instance and reruns its startup command. Process memory is lost. If a controller replaces a Pod after a node failure, the replacement is a different Pod, even when it serves the same role.

Readiness failure normally excludes a Pod from the ready backends used by its Services. The container continues running and can become ready again. This applies during startup and later operation. Readiness is not a firewall against direct Pod access, and Services explicitly configured to publish unready addresses are a separate case.

Two Java API Pods can therefore be `Running` while neither is ready to serve traffic. When initialisation completes and readiness succeeds, both become eligible backends. If one later becomes unready, the other can continue serving requests if it has enough capacity. With no ready backends, client requests fail according to the network and proxy implementation, potentially through errors or timeouts.

### Avoiding harmful recovery loops

Restarting the access-log component discards its in-memory visit count. The application may become healthy again while its recorded count resets. Process recovery and data durability are separate concerns. Information that must survive replacement needs suitably persistent storage and its own recovery arrangements.

Controlled failure testing can verify the complete recovery path. A test instance enters a known failed state, its check reports failure, the platform applies its policy, and the replacement or restarted instance resumes useful work. Observing restart counts without checking application responses and retained data gives an incomplete result. The same exercise can reveal a check that misses the failure, a policy that takes no action, or an apparently successful recovery that loses required state.

An external dependency can also make a poor liveness target. If NASA rejects requests, restarting every Java instance does not repair NASA. It can discard caches, interrupt useful work, and produce more startup traffic. A shared remote failure can consequently trigger widespread local restarts.

Probe frequency consumes API capacity. NASA's `DEMO_KEY` limits include 30 requests per IP address per hour and 50 per day. Checks every five seconds can quickly exhaust that allowance. More replicas multiply the requests, and several replicas may share one externally visible source address.

Treating an HTTP 429 rate-limit response as a fatal local failure can create repeated restarts and backoff while the remote restriction persists. Kubernetes may display `CrashLoopBackOff` during delayed restart attempts, but events and logs are needed to identify the cause.

Liveness should normally focus on local failures that restarting can improve. External dependencies can be monitored separately or included selectively in readiness when useful service is otherwise impossible. Cached responses, fallbacks, and optional features need consideration before every replica is withdrawn. Probe intervals and thresholds should balance detection speed, load, and false alarms.

## Routing incoming traffic

### Shared ports and internal services

Multiple containers with separate network addresses can all listen internally on port 80. A conflict arises when two independent containers try to publish the same fixed host address, protocol, and port. A port number is not globally exclusive across every address or node in a cluster.

For example, a whoami service can publish container port 80 through host port 8010. A gallery container cannot independently claim that same binding. Other components might start successfully, leaving the application partly running. Moving the gallery to host port 8011 solves that conflict, but replicas still cannot all claim the same fixed binding on one host address.

A reverse proxy provides a shared entry point. Clients connect to it, and routing rules select the backend that supplies the response. Hostnames distinguish sites on one external port, while paths distinguish components under one hostname. Default handling determines what happens to unmatched requests.

Only the proxy needs publicly reachable ports in this arrangement. Backends can remain on an internal network without their own published host ports. The proxy must still discover their addresses and reach their listening ports. Removing published ports reduces exposure, but does not prevent access from other workloads on a reachable shared network.

HTTP commonly uses port 80 and HTTPS uses port 443. A proxy can use those conventional entry points while backends use different internal ports. Several proxy replicas behind a load balancer can implement one logical entry point. A lone proxy otherwise becomes a point of failure for every application behind it.

Local hosts-file mappings can direct test hostnames to a local address. They affect local name resolution rather than create public DNS records. Production clients need DNS and network routing that reach the actual proxy. The hostname in the request then helps select the application.

### NGINX routing and updates

NGINX can serve content or forward requests to upstream services. Server blocks define listening addresses and hostnames, while location rules select path handling. A `proxy_pass` setting identifies the upstream destination. Included files allow separate application routes to form part of one proxy configuration.

An NGINX image can package basic defaults while mounted files supply environment-specific routes. The proxy and application containers need reachable networking. In Compose, a network declared external must already exist or be provisioned separately.

A hostname rule can send the whoami site's requests to its service. A gallery hostname can send the root path to the Go web component and an API path to the Java component. Multiple backend replicas can share the work without each publishing a host port.

Routing verification distinguishes the public request from the proxy's upstream request. The hostname selects the intended application, the path selects its component, and any rewrite produces the path that component expects. A simple backend that returns its instance name can reveal distribution across replicas. Testing several applications through the same entry point also confirms that a successful default response has not concealed a missing route, an incorrect backend port, or an unintended path transformation.

Forwarding headers need deliberate configuration. Applications may need the original hostname, scheme, and client address rather than the proxy's immediate connection details. Only trusted proxies should establish those values. Incorrect handling can distort access logs, redirects, rate limits, and security decisions.

NGINX supports graceful configuration reloads, so a configuration change does not inherently require restarting its container. The master process validates the new configuration, starts replacement workers, and lets existing workers finish requests. An invalid update can leave the old configuration operating.

Upstream discovery depends on configuration. A statically resolved hostname may need refreshing when container addresses change. Configured `resolver` and `resolve` settings can track upstream address changes automatically, with this `resolve` capability available in open-source NGINX from version 1.27.3. Platform controllers can also generate and refresh configuration from application resources.

Static files, graceful reloads, dynamic DNS resolution, and API-driven discovery offer different ways to keep routing aligned with changes in application scale and network addresses.

### Caching and application behaviour

NGINX can cache eligible responses and answer later requests without contacting the backend. This can reduce latency and application load when clients repeatedly request the same information. Benefits depend on cacheability, reuse, freshness requirements, and available storage.

Response bodies are stored in cache files, while shared memory holds keys and metadata. Configuration controls capacity, inactivity expiry, and validity. The cache key must distinguish requests whose responses differ, potentially including hostname, scheme, path, query parameters, and relevant request variation.

A path alone may be insufficient when responses depend on identity or other inputs. Personalised and authenticated responses require explicit safeguards against accidental sharing. Cache rules also need to respect the application's intended freshness and response controls.

Daily image metadata can be a useful caching candidate. A six-hour validity period allows substantial reuse, but acceptable freshness depends on the application. Some applications need shorter validity, revalidation, or a defined policy for serving stale data during an upstream outage.

Caching can alter application side effects. If the proxy answers a gallery request without contacting the Go component, a visit recorded only by that component will not occur for that cache hit. Proxy access logs and application visit counts can therefore measure different activity. Cache diagnostics should be interpreted alongside the application's logging design.

### Traefik discovery and middleware

Traefik's Docker provider reads container information and labels through the Docker API and updates routes as relevant state changes. Its initial provider and listening configuration still needs to be supplied through supported files or command-line options. Dynamic discovery does not eliminate configuration management.

| Traefik concept | Function |
| --- | --- |
| Entry point | Defines where traffic enters the proxy |
| Router | Matches requests and selects their handling |
| Service | Identifies backend servers |
| Middleware | Modifies requests or responses, redirects traffic, or applies controls |

Setting `exposedByDefault` to false prevents automatic routing to every discovered container. A selected application can opt in with `traefik.enable=true` and labels defining its rules. The proxy needs the correct backend network and port, with an explicit service port setting when automatic selection is unsuitable.

Adding enabled whoami replicas allows Traefik to discover their addresses and distribute requests without restarting the proxy for each addition. The gallery can use a root web route and a more specific API route. If the public API prefix is absent from the backend's own paths, `StripPrefix` middleware removes it before forwarding. Matching and rewriting paths are separate operations.

The dashboard can help verify active routers, services, and middleware. It is an administrative interface and needs authentication and restricted access. The information needed to diagnose routing should not become a publicly exposed view of the infrastructure.

Docker API access is another trust boundary. Unrestricted socket access can expose the host if the proxy is compromised. Mounting the socket read-only does not make its API operations read-only. Restrictions need to control the actual operations and clients, and the connection transport must match the deployment platform.

Caching capabilities depend on product versions, editions, and extensions. NGINX has built-in proxy caching. Traefik Hub API Gateway supplies HTTP Cache middleware, while the basic open-source Traefik Proxy middleware set differs.

### TLS and certificates

TLS protects the connection between a client and the endpoint terminating it. A reverse proxy can terminate HTTPS for several applications and centralise certificate configuration. Its connection to a backend is separate and remains unencrypted if it uses HTTP. Internal encryption requirements therefore need their own configuration.

Redirecting HTTP to HTTPS and supplying a valid certificate are separate requirements. A redirect changes the destination scheme, while the TLS endpoint must present an identity that the intended client can validate. Enabling TLS alone does not establish that trust.

Traefik can use supplied certificates or an ACME resolver to obtain and renew certificates from an issuer such as Let's Encrypt. Automation requires a configured resolver and challenge method, successful domain validation, and appropriate persistence for certificate state.

A generated fallback certificate may enable encryption while remaining untrusted or invalid for the requested hostname. Browser warnings identify a trust or identity problem. Development can use a deliberately trusted local issuer, while production needs certificates that its intended clients can validate.

NGINX also has an ACME module for certificate automation when that module is available and configured. In Kubernetes, cert-manager can manage issuance and renewal independently, store certificate material in Secrets, and make it available to a compatible controller.

Session affinity, also called sticky sessions, can send a client's requests to the same backend. It can help applications with in-memory session state, but it cannot restore that state after an instance fails. Sessions that must survive replacement need suitable storage or a way to reconstruct them.

### Kubernetes routing and maintained controllers

Kubernetes can connect a shared external routing component to internal application Services. A ClusterIP Service provides an internal access point for selected Pods. Some controllers route through Service addresses, while others discover the Service's endpoints and connect directly to Pods.

An Ingress resource defines HTTP and HTTPS routing rules, including hostnames, paths, and backend Services. An Ingress controller implements those rules. Creating an Ingress object alone does not create a functioning proxy when no suitable controller is installed and selected.

Current Ingress manifests require a `pathType`. `Exact` matches the specified path exactly. `Prefix` matches path elements beneath a prefix. `Prefix` at the root can include a whole site, while `Exact` at the root matches only the root path. `ImplementationSpecific` delegates interpretation to the controller. Host wildcards have defined limits and are not arbitrary regular expressions.

The whoami application can have one hostname pointing to its internal Service, while the gallery uses routes for its website and image API. Unmatched traffic receives a default response or an error according to controller configuration. A default 404 response does not establish that application routes have been configured successfully.

The Kubernetes community ingress-nginx project retired on 24 March 2026 and no longer receives releases, bug fixes, or security updates. Existing installations and images can remain available, but availability does not make them a maintained production choice. This project is distinct from other NGINX-based controllers and the NGINX web server.

The Ingress API itself remains supported but is feature-frozen. Kubernetes recommends Gateway API for new routing capabilities, and Gateway API also requires a compatible implementation. A maintained controller needs to support the application's routes, policies, certificate workflow, and operating environment.

The Ingress API versions `extensions/v1beta1` and `networking.k8s.io/v1beta1` stopped being served in Kubernetes 1.22. Current Ingress definitions use `networking.k8s.io/v1`, with its corresponding backend structure and required `pathType`. Older manifests need conversion before use with current clusters.

Controller-specific annotations and configuration snippets need separate review during migration. Caching, rate limiting, and other features are not identical across implementations. Copying an annotation name does not establish equivalent behaviour.

A rate limit's effect depends on client identification, burst allowance, and whether counters are shared or local to each proxy replica. The historical ingress-nginx `limit-rpm` annotation applied per client address and per replica, with burst behaviour. A value of ten was not a strict cluster-wide total of ten requests per minute. Replica counts and forwarded-address handling could change the practical result.

The routing layer needs its own capacity, monitoring, and recovery arrangements. Certificate expiry, incorrect routes, exhausted caches, and unavailable upstreams can disrupt an application whose processes are otherwise healthy. A shared entry point concentrates these operating responsibilities rather than removing them.

## Metrics and continued operation

Logs, probes, and metrics provide different evidence. Logs describe events, probes support immediate decisions about an instance, and metrics describe quantities over time. Prometheus can collect time-series measurements from instrumented applications and exporters, commonly through HTTP scraping. Instrumentation, configured targets, and access are required.

An exposed metrics endpoint does not create dashboards or alerts by itself. Useful monitoring connects measurements such as request rates, failures, and response duration to operating decisions. Configuration, log delivery, probe behaviour, and routing also need verification as applications change. Together, these interfaces support diagnosis and recovery while application correctness, durable state, and sufficient capacity remain continuing engineering responsibilities.
