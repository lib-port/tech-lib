# Monitoring and Observability for Development and DevOps

## Introduction to Monitoring for Applications

Application monitoring systematically collects and analyses data to assess whether software is available, responds correctly, and performs efficiently. Developers and operations teams use it throughout development, testing, and operation to identify faults, investigate their causes, and improve the user experience. Dedicated application tools and log management systems provide different ways to collect and examine this information.

Availability alone does not establish healthy performance. An application may remain accessible while responding slowly, failing intermittently, or returning incorrect results. Monitoring helps reveal these conditions, improve resource use, identify potential security threats, and reduce disruption and costs.

Early detection allows teams to begin repairs sooner, limiting downtime and slow service. Resource measurements also help identify inefficient hardware use and indicate when faulty equipment may need repair or replacement.

Applications can span on-premises infrastructure, cloud services, and hybrid environments. Full-stack monitoring connects the user experience with supporting servers, databases, networks, and message queues. Coverage across devices, browsers, and operating systems helps explain differences in performance.

### Monitoring approaches

Different approaches provide complementary views of an application and its environment.

| Approach                                 | Focus                                                                                                                  |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| System monitoring                        | Availability, uptime, and performance across applications, servers, infrastructure, and networks.                      |
| Dependency monitoring                    | Connections between services and resources, helping locate faults such as an offline supporting server.                |
| Integration monitoring                   | Availability, processing, and capacity of third-party services used by an application.                                 |
| Web performance monitoring               | Server availability, page loading times, errors, and the loading of individual page elements.                          |
| Application performance monitoring (APM) | Resource consumption, errors, request rates, response times, and user experience across applications and dependencies. |
| Real user monitoring (RUM)               | Actual user interactions and historical service performance, revealing conditions that testing may not reproduce.      |
| Business activity monitoring             | Business measures such as sales, downloads, and transaction volumes, tracked over time.                                |
| Security monitoring                      | Network logs and unusual activity that may indicate threats requiring investigation or intervention.                   |

### Metrics, observability, and alerts

Metrics measure resource use and behaviour. Comparing and aggregating them reveals trends, changes, and relationships across services. Some metrics describe total capacity, while others express activity as a rate. Observability supports understanding of system behaviour through analysis of this data. A rise in errors can be investigated alongside events in other services to identify possible contributing factors.

Dashboards provide an overview, while logs supply records for investigation. Distributed tracing follows events across multiple nodes. Dependency and flow maps show service relationships and information paths. Anomaly detection identifies unusual conditions through thresholds or pattern recognition, including machine learning.

An alert combines a condition or threshold with an action, such as notifying an operator or triggering an automated response. Alerts direct attention to problems without requiring continuous manual observation. Historical data helps establish context and investigate possible causes.

### The four golden signals

Latency, traffic, errors, and saturation provide a focused view of service health. Together, they support incident response, diagnosis, and capacity planning.

- Latency measures the time taken to complete a request. Successful and failed requests need separate attention because a fast error can disguise poor service. Averages also need examination alongside unusually slow responses and defined latency targets.
- Traffic measures demand, such as web requests, storage transactions, or retrievals per second. Measurements for individual pages or resources reveal where demand occurs.
- Errors include failed requests and incorrect results. HTTP 500 and 404 responses are explicit examples, but an HTTP 200 response can still contain incorrect content. Error definitions need to reflect service-level objectives, the intended standards of service.
- Saturation measures how much available capacity is being used, including processor and memory resources. Approaching full capacity can degrade performance, while consistently low utilisation may indicate excessive provisioning. Utilisation targets help assess capacity, and rising latency can signal emerging saturation.

For example, high saturation in one dependency may explain an application's increasing latency even when other supporting services appear healthy.

### Choosing measurements

Measurements at different levels connect application behaviour with the infrastructure supporting it.

| Level | Useful indicators |
| --- | --- |
| Host | Processor utilisation, memory use, disk space, and running processes. |
| Application | Success and error rates, failures and restarts, response latency, and resource use. |
| Network | Connectivity, packet loss, error rates, latency, and bandwidth utilisation. |
| Server pool | Collective health and capacity to handle demand across multiple machines. |
| External dependency | Availability, success and error rates, operating costs, and resource exhaustion. |

Server-pool measurements become especially useful as services expand across additional machines. Monitoring external dependencies from the application's perspective can reveal problems affecting operations, alongside information from providers' status pages.

Metric selection depends on staffing, budget, infrastructure, application complexity, and required service reliability. Production, staging, and testing environments may need different detail and alert severity. Each additional metric consumes resources and increases complexity, so its usefulness needs periodic reassessment as the project matures.

The application's purpose also determines which measures are essential. Stability may be a lower priority for a personal or early-stage project than for an established production service.

### Monitoring and evaluation

Monitoring is an ongoing operational activity, usually undertaken by teams directly involved with an application. Evaluation is a periodic assessment of whether it achieves its intended goals, meets standards, and provides sustainable business value. Managers or independent evaluators may examine expected results, unanticipated effects, usefulness, and profitability during or after rollout. Monitoring data provides evidence for these assessments.

A monitoring solution also needs evaluation. Its effectiveness depends on how it is implemented and maintained over time. Relevant criteria include ease of deployment, suitable metrics, informative alerts, and coverage of every required environment. Alerts need to identify the problem, its location, and its performance impact. Effective systems operate reliably on independent infrastructure, provide usable dashboards, retain historical data, correlate information across sources, accommodate new metrics and infrastructure, and support flexible alerting.

## Monitoring Systems and Techniques

Application monitoring gathers and analyses information about running software to assess its availability, performance, and behaviour. It helps developers and operations teams detect faults, investigate their causes, and assess whether changes improve service. Its scope includes the application and the servers, databases, message queues, caches, and networks on which it depends.

Telemetry is the operational information automatically collected from these systems. It includes numerical measurements, logs, and network observations. Response time describes how long an operation takes, throughput describes how much work a system handles, and error rates indicate how often operations fail. CPU and memory measurements show resource use.

Dashboards present an overview, while alerts identify conditions requiring attention. Distributed tracing follows requests across services, and dependency maps show how those services connect. Together, these capabilities can shorten diagnosis, reduce downtime, and support improvements to customer experience and operational efficiency.

### Synthetic monitoring and real user monitoring

Synthetic monitoring, also called active monitoring, runs scheduled tests that simulate user interactions. Automated clients can request a page, sign in, search, complete a form, or follow a purchase through checkout. These tests examine whether an important process works and how quickly it responds, even when no real users are active.

Checkpoints in different locations perform the tests and report their results to a monitoring service. The service records availability, response time, and failures. If a check fails, a second checkpoint can repeat it to help confirm the problem before an alert is sent. Test intervals and escalation arrangements determine how quickly problems are detected and who receives notifications.

Availability is often expressed as an uptime percentage over a defined period. Response time is commonly measured in milliseconds. Testing complete transactions adds information that a simple page-availability check cannot provide. A website may load successfully while registration or payment fails.

Synthetic tests can also monitor third-party dependencies, including payment services, content distribution networks, and application programming interfaces, or APIs. Reports provide evidence for reviewing supplier performance and service-level agreements. Controlled scenarios support baselines, performance comparisons, and checks in development or staging environments before release.

Availability reports need a defined observation period and a clear description of what was tested. A supplier's homepage, an API endpoint, and a complete payment journey represent different services. Measurements support an agreement only when they correspond to its service expectations.

External tests and internal telemetry answer different questions. A failed transaction describes an observable service problem, while CPU, memory, and database measurements can help explain it. Correlating the two supports investigation without assuming that a slow page identifies its own cause.

Real user monitoring, or RUM, observes actual interactions. Browser-based implementations commonly use JavaScript to collect information about load times, errors, browsers, locations, and user journeys. This reveals the diversity of real conditions and supports analysis of longer-term trends.

The approaches complement each other. Synthetic tests provide repeatable checks of selected scenarios, while RUM reveals behaviour that those scenarios may miss. Findings from real traffic can guide new synthetic tests. Neither approach alone represents every possible user experience.

### Establishing useful monitoring

Monitoring begins with operational goals and the questions that measurements should answer. Performance, availability, errors, logs, and user experience provide related but distinct views. A reachable service may still respond slowly, while a successful technical request may not complete the user's intended task.

A practical implementation follows a continuing cycle:

1. Teams define the services, business processes, and failure conditions requiring attention.
2. They select tools and measurements suited to those goals, such as response time, resource use, database performance, and error rates.
3. Developers instrument the application through code, libraries, or integrations that expose the required information.
4. Teams configure storage, dashboards, alert conditions, and notification routes.
5. They generate known requests or failures to verify that measurements and alerts reflect the expected behaviour.
6. They review coverage and thresholds as the application, workload, and dependencies change.

Monitoring also supports DevOps, which brings development and operations together, by supplying feedback about releases. Comparing behaviour before and after a change helps teams examine its effects and prioritise investigation. Data must remain accessible through suitable storage and reporting arrangements so that recurring problems can be reviewed over time.

Error records and stack traces help locate faults. Logs preserve event sequences, while user experience measurements such as session duration and conversion rates connect technical behaviour with customer activity. Interpretation requires this context rather than reliance on a single indicator.

### How Prometheus collects and queries metrics

Prometheus is an open-source monitoring and alerting system designed for numerical time-series data. A time series records a measurement over time. Prometheus discovers services or uses configured targets, then periodically requests their metrics over HTTP or HTTPS. This collection process is called scraping.

Metric names identify measurements, labels distinguish characteristics such as application instances, and timestamps place observations in time. Prometheus stores the results in a time-series database. Prometheus Query Language, or PromQL, selects and analyses the data for tables, graphs, and alerting rules.

Labels make the data multidimensional. The same measurement can be examined across instances or selected groups, allowing a broad overview to be narrowed to one component. This is useful when a distributed service contains many independently running parts.

Metrics require instrumentation. Developers can add measurement code using client libraries, or deploy an exporter that translates an existing system's measurements into Prometheus format. Some services already expose compatible metrics. The method depends on available interfaces and access to application code.

Prometheus can run locally or in the cloud. An individual server can collect and store measurements independently, while other arrangements use additional storage. It supports host monitoring and changing service architectures, with capacity dependent on the workload and configuration.

Prometheus evaluates alerting rules and forwards resulting alerts to Alertmanager. Alertmanager handles notifications through channels such as email, on-call services, and chat systems. Grafana commonly provides visualisation of the collected data.

### Connecting infrastructure and application measurements

A Docker setup can place Prometheus and three node exporters on a shared network. Each exporter exposes metrics on internal port 9100, while published ports 9101, 9102, and 9103 allow separate access from outside the container network. Prometheus uses the internal container addresses to collect data.

The `prometheus.yml` configuration defines collection jobs, targets, labels, and scrape intervals. A 15-second interval provides frequent updates. The target view shows whether collection succeeds, while queries examine the measurements themselves. Stopping an exporter creates a known collection failure that should appear after a subsequent scrape.

The metric `node_cpu_seconds_total` records accumulated CPU time. Labels can restrict a query to one exporter. Graphs show changes over time, while tables display the individual series and values.

Application instrumentation adds detail. A Flask application can use `prometheus_flask_exporter` to expose a `/metrics` endpoint. Its container joins the same network, and a separate Prometheus job identifies its internal address. Updating the configuration and restarting Prometheus in this setup enables collection from the new target.

The application can listen internally on port 8080 while publishing port 8081 externally. Prometheus needs the internal target address, such as `pythonserver:8080`. Requests to the application's root, home, and contact routes generate activity for inspection.

The metric `flask_http_request_total` provides request counts, `flask_http_request_duration_seconds_bucket` groups observed durations into histogram buckets, and `process_virtual_memory_bytes` reports virtual memory use. These measurements describe traffic, response times, and resource use. Checking the metrics endpoint and target status helps verify the path from instrumentation to collection.

### Grafana and visual interpretation

Grafana is an open-source tool that queries configured data sources and presents their information through browser-based dashboards. In a Prometheus arrangement, Prometheus collects and stores measurements, while Grafana retrieves them for visual analysis. Other sources can include databases and monitoring services, allowing related information to appear in a shared view.

Panels can display graphs, histograms, heatmaps, tables, individual values, and explanatory text. Configurable time ranges support comparison and investigation. Dashboards, reports, and notifications serve different needs, from live operational awareness to periodic review. Access controls help make the appropriate views available to teams.

Reusable dashboards and visualisation plugins can reduce setup effort or support specialised displays. Log exploration adds filters and searches to the graphical views. Teams still need to choose panels that answer operational questions and distinguish a useful overview from unnecessary detail.

Visualisation helps people recognise trends, outliers, and patterns in large datasets. The display should fit the question being investigated.

| Visual form | Useful purpose |
| --- | --- |
| Line chart | Showing change over time |
| Bar chart | Comparing categories |
| Scatter plot | Examining relationships between two variables |
| Treemap | Comparing parts of a whole within a hierarchy |
| Table | Checking exact values |
| Map | Comparing geographic patterns |

Clear presentation supports diagnosis and communication, but it still depends on suitable measurements and interpretation. A shared dashboard can help development, operations, and business teams discuss the same evidence.

Kibana with Elasticsearch supports searching, analysing, and visualising stored information. Splunk combines log analysis, searching, and visualisation across sources such as applications and devices. These illustrate different approaches to examining operational data.

### Alerts and effective response

Alerting connects monitoring with action. A rule identifies a condition requiring attention and produces either a notification or a configured automated response. Notifications direct staff towards an investigation, while automated actions execute scripts or programs intended to mitigate a problem.

The process continues after an alert is issued. Investigators begin with the triggering measurement, examine related events and dependencies, and test possible causes. Successful mitigation requires evidence that operation has improved. If the measurements remain abnormal, the explanation or corrective action needs reassessment.

| Alert type | Basis for detection |
| --- | --- |
| Metric alert | Numerical measurements crossing a limit or meeting a condition |
| Log alert | Queries identifying relevant patterns in recorded events |
| Activity log alert | A new event matching a defined rule |
| Smart detection | Analysis identifying unusual changes in performance or failures |

Thresholds need calibration against normal behaviour. Limits that tolerate excessive deterioration can delay detection and allow disruption to grow. Overly sensitive rules generate alerts during ordinary variation, consuming attention and making significant problems harder to recognise. Incident reviews and changing workloads provide reasons to reassess those settings.

Notification routes, escalation rules, and duty schedules determine whether the appropriate person receives an alert. Confirmation checks can reduce unnecessary notifications, while continuing measurements show whether a response worked. Alert quality therefore depends on both detection and the operational process that follows it.

Alerting tools take different approaches. Bosun uses an expression language to define conditions and supports notification templates. Cabot obtains information through integrations and APIs for alerting decisions. StatsAgg combines metrics aggregation with alerting organised around services. The relevant choice depends on existing data sources and response requirements.

Automation reduces the need to inspect every log entry or measurement manually. Staff can concentrate on conditions selected for active management while monitoring continues in the background. The resulting time savings depend on rules that lead to a useful response.

### Choosing tools for the service

Tool selection should reflect the application, its users, and the organisation's operating requirements. Important criteria include monitoring coverage, scalability, integration, usability, analytics, alerting controls, support, and cost. Software agents, specialised appliances, local installations, and cloud services offer different deployment options.

Synthetic monitoring tools need scripting capabilities that represent important transactions, suitable checkpoint locations, appropriate test frequency, and useful failure reports. They should support comparisons against baselines and checks before release. Synthetic tools can also test mobile interactions, file transfers, and services delivered through browsers or dedicated APIs. Products such as Datadog, Pingdom, New Relic, and Uptrends illustrate this category, but suitability depends on the required capabilities.

External checks also support comparisons with public websites without installing an agent in their infrastructure. Such benchmarking describes observed performance under the tested conditions. It does not reveal the internal design or all the factors influencing another service.

Application monitoring tools need to connect performance measurements with errors, logs, dependencies, and user experience. Visualisation tools need suitable data connections and displays that staff can interpret efficiently. Existing frameworks, training requirements, technical support, and community resources influence the effort required to establish and maintain the system.

Monitoring remains effective through validation and review. Applications evolve, normal workloads shift, and dependencies change. Regularly testing the monitoring itself helps ensure that its measurements, displays, and alerts continue to support timely investigation and useful corrective action.

## Methodologies and Tools in Logging

Application logging records events within running software. It helps developers diagnose faults and helps operations teams understand production systems. Logs also preserve evidence of significant actions and transactions for auditing. Their usefulness depends on recording relevant events with enough context to explain what happened.

Applications traditionally wrote logs to files. Cloud-native applications commonly treat logs as event streams and write to standard output, or stdout, so that collectors can process them. In either arrangement, useful logging requires deliberate design, implementation, and testing.

Diagnosis reconstructs an application's behaviour so that faults can be located and corrected. Auditing preserves significant actions for later review, including records relevant to management and finance. These purposes can overlap, but they may require different fields, access arrangements, and retention periods.

### What logs record

Different log categories support related investigations.

| Log category | Typical information and purpose |
| --- | --- |
| Event | User actions and application events, including sign-ins and data changes |
| Error | Exceptions, stack traces, and error codes used to diagnose faults |
| Access | Requests, access times, and the actions performed |
| Performance | Response times, CPU use, memory consumption, and network traffic |
| Debugging | Variable values, method calls, and execution details used to trace program flow |

Records can describe incoming and outgoing requests, service calls, business transactions, configuration changes, and system starts or stops. Timestamps, service identifiers, and relevant request context help connect events. Audit records may also identify the actor, privileges used, data operation, and resulting change.

System context can include connection attempts, disconnections, retries, active service instances, and configuration updates. Such records help explain the conditions surrounding a failure. Business context identifies the process under way, making a technical event easier to relate to a transaction or user journey.

The intended use determines the detail required. Transaction delays can reveal performance problems, while repeated failures at one stage of a user journey can expose usability difficulties. Recorded transaction volumes and user activity also support business analysis.

### Consistent structure and implementation

Logging frameworks provide message levels, formatting, and output destinations. Levels such as DEBUG, INFO, WARNING, and ERROR distinguish diagnostic detail from routine information and more serious conditions. Detailed service or function context can be recorded at TRACE or DEBUG level.

Python's `logging` module and Java's `java.util.logging` provide built-in facilities. Developers configure loggers, choose levels, and direct output to files or consoles. Other libraries include Log4j, Logback, and Logrus. Testing checks that expected events appear with the information needed for investigation.

A consistent record can include a timestamp, severity level, logger name, thread identifier, and message. Structured logging places information in named fields, commonly using JSON. Key-value records, CSV, and XML provide other options. Consistency makes records easier to search, filter, and analyse.

Parsing interprets a record and extracts its fields for indexing and storage. Many log management systems recognise common formats automatically. Custom formats need suitable rules or extraction code. Field boundaries and data types are important because timestamps, quoted requests, and numbers cannot always be interpreted correctly by splitting on spaces.

### Distributed logging and tracing

Distributed logging brings records from multiple services or servers into a central system. Aggregation and indexing allow investigators to search across components and connect evidence that would otherwise remain scattered. The arrangement requires collection, transport, storage, retention rules, and continuing review.

Distributed tracing follows an individual request through a system. It reveals service dependencies, delays, and errors along that request's path. A trace contains spans, each representing an operation with a start time, an end time, and contextual information. All spans belonging to the trace share a trace ID.

A span can include the service name, an operation identifier, and tags describing its context. Timing information helps locate a slow operation, while the parent-child structure shows how it relates to other work. Centralised logs provide additional events around that request.

Parent-child relationships connect operations that invoke other operations. Context propagation passes trace information between services so that their work contributes to the same trace. Instrumentation creates spans either through code added by developers or through supporting libraries and frameworks. Correlating traces with logs and measurements helps investigators explain both individual failures and wider system behaviour.

### Reading and searching HTTP logs

An HTTP access log commonly contains a client IP address, identity fields, a timestamp, a request, a response status, a response size, a referrer, and a user-agent string. Hyphens can indicate unavailable information. The timestamp's time-zone offset helps establish when the event occurred.

The request `GET / HTTP/1.1` identifies a method, resource path, and protocol version. Status `200` indicates success, while a size value describes the response in bytes. The referrer records an associated page when available, and the user-agent string describes the client software reported in the request.

CloudVyzor LogPad provides a browser-based way to upload and search log files. Its query forms illustrate several useful distinctions.

| Search form | Effect |
| --- | --- |
| `Firefox` | Finds records containing the term |
| `-Firefox` | Excludes records containing the term |
| `Mozilla 5.0` | Searches for separate terms rather than one continuous phrase |
| `" 500 "` | Looks for the digits with surrounding spaces |
| `-"200 553"` | Excludes the specified adjacent sequence |
| `date=2018-11-15` | Restricts records to the specified date |

A search for `500` alone can match part of a larger number or an unrelated field. More precise text matching reduces such results, but interpretation still depends on the record's structure. Timestamp comparisons and time ranges narrow an investigation further. Sharing the current search state allows colleagues to examine the same query and results.

The user-agent token Mozilla/5.0 also illustrates why syntax affects results. Searching for Mozilla and 5.0 as separate terms can find it, while a quoted phrase containing a space describes different text. A successful search therefore depends on both the query and the underlying representation.

### Custom parsing and operational views

Mezmo supports automatic parsing and custom templates. A custom workflow selects a representative line, extracts values, and validates the result. An HTTP log can be separated into fields such as `ip_address`, `timestamp`, and `response`.

Delimiter-based extraction isolates values, but spaces within timestamps and quoted text need to be preserved. Bracketed timestamps can then be trimmed to remove their surrounding brackets. A response code can be converted from text to a number before being captured in a named field. These operations make the extracted information suitable for more precise searches and comparisons.

Templates need validation against several representative lines because one successful example may conceal differences in field boundaries and values. Invalid results require correction before activation. A matching query determines which incoming records they process, and the order of active templates affects overlapping matches. Activation applies to newly ingested records rather than automatically reprocessing historical data.

Mezmo can ingest logs through agents, application libraries, integrations, and programming interfaces. Saved views preserve filters and queries for repeated use. Presence alerts respond when matching events meet a condition, while absence alerts detect missing expected activity. A rule might check for 100 matching lines within 15 minutes, with notifications routed through email or an integrated service.

An organisation's workspace groups log access and configuration. Ingestion dashboards show incoming, retained, and restored data, with breakdowns by applications, sources, or tags. These views help teams understand data flow and adjust collection settings as operational needs change.

Exclusion rules can prioritise data for routing, while different retention settings distinguish log categories. Volume thresholds help identify sudden increases in ingestion. Archiving and restoration provide a way to retain historical records and return them to the analysis interface when needed.

### Storage, retention, and access

Stored logs support reliability analysis, security investigations, auditing, and comparisons over time. Historical records can reveal slow queries, recurring errors, capacity needs, and changing user behaviour. Failed logins or unusual server activity can prompt investigation without independently establishing their cause.

Retention periods depend on service criticality, security needs, audit obligations, software maturity, execution frequency, storage costs, and the time needed to discover and resolve problems. An infrequently run process may need a longer history so that several executions can be compared. Different log categories can therefore justify different retention periods.

Centralised storage simplifies analysis across applications. Local and cloud arrangements offer different operating models, while backups and restoration preserve access to historical information. Log rotation controls file growth and reduces the risk of exhausted storage. Access restrictions protect confidentiality, and defined archiving and deletion rules keep retention aligned with its purpose.

### Monitoring platforms and operational use

Log monitoring tools automate recurring search, analysis, reporting, and notification tasks. Dashboards help compare current activity with historical patterns, while alerts direct attention to selected conditions. Useful results depend on appropriate records, queries, and response processes.

Platforms emphasise different combinations of capabilities. Mezmo provides centralisation, parsing, routing, retention controls, and volume alerts. Sumo Logic combines cloud log analysis with measurements and pattern detection. Instana connects application performance information with distributed tracing. Datadog relates logs to measurements, traces, and security signals.

Other components serve distinct roles. Fluentd and Logstash support collection and processing, while Elasticsearch, Graylog, and Splunk provide storage, search, or analysis capabilities. Integration, scale, usability, retention requirements, and cost shape the choice of tools. Regular review helps ensure that the resulting system continues to support diagnosis, collaboration, and informed operational decisions.

## Observability and Concepts

Observability is the ability to understand a system's internal state through the information it produces. In software, it helps developers and operators explain application behaviour, investigate failures, and improve performance. Its value increases when a request crosses many services, containers, and infrastructure components.

An online shop may appear operational while customers abandon purchases because one part of the checkout process is slow. Measurements from individual servers may not explain the problem. Observability connects the customer-facing symptom with the services and dependencies involved in completing the transaction.

Monitoring and observability serve related purposes. Monitoring collects information over time and commonly checks predefined indicators, thresholds, and known failure conditions. Observability combines that evidence with context, allowing teams to investigate unexpected behaviour and ask questions that were not anticipated when monitoring was configured.

The intended benefits include faster diagnosis, shorter outages, better resource use, and improved user experience. These outcomes depend on the quality of the evidence and the actions taken in response.

### The evidence: logs, metrics, events, and traces

Logs, metrics, and traces provide complementary views of a system. Events add information about significant occurrences, such as deployments or changes in health. Together, metrics, events, logs, and traces are sometimes abbreviated as MELT.

| Signal | What it records | Main diagnostic use |
| --- | --- | --- |
| Logs | Timestamped details of application, platform, or infrastructure activity | Reconstructing events and examining errors or exceptions |
| Metrics | Numerical measurements, such as response time, error rate, or resource use | Comparing conditions, tracking trends, and triggering alerts |
| Events | Significant occurrences or changes | Connecting incidents with deployments, configuration changes, or other activity |
| Traces | The path and timing of an individual request across components | Locating delays, failures, and dependencies within a transaction |

Logs offer detailed records that are often human-readable. Their usefulness depends on the information captured and the ability to connect entries with relevant requests. Metrics provide a more compact, aggregated view and can be collected through polling or pushed measurements. Their selection requires care because infrastructure health alone may not describe application performance.

Different signals also support different timescales. Detailed logs can help reconstruct a past incident, while repeated metrics reveal longer trends. A trace provides the context of a particular transaction. Retaining these distinctions helps teams choose evidence suited to the problem under investigation.

Traces join evidence from several components to show an entire request path. A rising response-time metric can reveal a slowdown, a trace can locate the delayed operation, and logs can explain the error encountered there. Correlation makes these signals more useful than isolated collections of data.

### Telemetry and purposeful data collection

Telemetry is the collection and transmission of information from remote sources for monitoring and analysis. It is broader than distributed tracing and includes data about performance, usage, errors, and security. Outside software, telemetry systems use sensors, transmitters, and receivers to measure conditions and deliver information for processing.

Sensors measure quantities such as temperature or pressure. Transmitters convert their output for radio, cellular, or wired communication, and receivers pass the information to processing systems. In software, remote feedback similarly reduces dependence on users reporting every fault or describing every interaction.

Application telemetry can describe response times, throughput, resource consumption, feature use, crashes, and device configurations. Security-related records can include failed sign-ins or suspicious network activity. Usage information can reveal common workflows and help guide development priorities.

Effective collection begins with an objective, such as investigating slow transactions or understanding feature adoption. Teams then choose suitable tools, define a data schema, and instrument the application. The schema establishes data types, naming conventions, and aggregation levels so measurements remain interpretable.

Analysis turns the collected information into evidence for decisions. Dashboards can support shared understanding, while findings inform changes to code, infrastructure, and product priorities. Collection and analysis continue to evolve as the application changes. The volume of telemetry alone does not establish how useful it will be.

### Why cloud-native systems need context

Cloud-native applications often distribute work across services that use different languages, frameworks, and infrastructure. Containers can appear, disappear, or move as workloads change. A monitoring arrangement built around fixed machines or isolated components can therefore lose important relationships.

Cloud observability combines automation, context, and informed action. Automation detects components and changes. Context relates services to their dependencies and supporting resources. Analysis connects those relationships with symptoms and possible corrective actions.

Kubernetes manages container deployment and can restart failed containers, but orchestration alone does not explain the user experience or a transaction's performance. A healthy container can participate in a failing request, and dependencies may extend beyond the cluster. Application instrumentation supplies information that basic infrastructure monitoring cannot provide.

Different container workloads can also require different thresholds and interpretations. A single fixed rule may be unsuitable across varied technologies and configurations. Connecting application activity with resource measurements helps distinguish a local infrastructure constraint from a problem involving several services.

Observability also supports earlier diagnosis during development, often called shifting left. Measurements collected during testing and deployment can reveal regressions and help assess changes before they cause wider disruption. Correlating events can shorten the time needed to investigate and resolve faults, although results depend on implementation and operational practice.

### Distributed tracing

Distributed tracing follows a request from its entry point through services, databases, and external dependencies. Trace context passes between components so work performed in different places can be recognised as part of the same transaction.

A trace contains spans, each representing a timed operation. Spans share a trace identifier and have their own identifiers. Parent-child relationships connect an operation with the work it initiates. Attributes and timestamped events add details about what happened during each operation.

This structure helps distinguish total request latency from the time spent in individual components. It can reveal whether a delay originates in application processing, a database interaction, or another service. Consistent identifiers in logs make related evidence easier to find.

Implementation involves choosing compatible tracing tools, instrumenting the application, configuring collection, deploying the receiving components, and verifying delivery. A dashboard or trace interface then confirms whether requests and their relationships are visible.

Configuration may involve environment variables or files that identify the collection destination. Verification checks both the production of trace data and its arrival at the analysis system. An installed agent alone does not establish that the full collection path is functioning.

Coverage of incoming and outgoing service calls improves the completeness of the request path. Teams can relate traces to latency, traffic, errors, and saturation, meaning pressure on available capacity. Clear documentation of custom spans and business measurements helps later investigations. Instrumentation needs sufficient detail without imposing unnecessary processing or storage overhead.

### OpenTelemetry and Kubernetes

OpenTelemetry provides interfaces, software development kits, and tools for generating and collecting telemetry. It supports a common approach across applications and can export data to different analysis systems. Collection and instrumentation are distinct from the back-end tools used to store, query, and visualise the results.

Automatic instrumentation captures activity from supported frameworks and libraries. Manually defined spans and events can add application-specific detail. The two approaches can operate together.

A small Python Flask application can combine both approaches. A virtual environment isolates the project's dependencies. Automatic instrumentation records framework activity, while an explicitly defined span surrounds a `/roll` request. The application records events for individual dice rolls and returns their total. These events explain internal work that an HTTP request record alone would not describe.

Within the tracing setup, a provider holds configuration, a tracer creates spans, and a processor handles completed spans before export. A console exporter makes the records visible in a terminal. The resulting data can include identifiers, timestamps, status, attributes, events, and resource details.

For a request specifying three six-sided dice, the application records each result as an event within the surrounding span. HTTP attributes describe the request, while the custom events describe the calculation. This connects framework activity with the application's own behaviour.

In Kubernetes, the OpenTelemetry Collector receives telemetry, processes it, and exports it to a selected back end. A typical trace pipeline accepts the OpenTelemetry Protocol, batches records, and sends them to a tracing system. Installation can use Helm, Kubernetes manifests, or the OpenTelemetry Operator.

The application architecture and diagnostic objectives guide instrumentation. Consistent attribute conventions improve interpretation, while verification establishes that applications generate spans and that the back end receives them. Regular analysis can then support bottleneck detection, resource allocation, scaling decisions, and assessment of deployments or rollbacks.

Standardised collection also gives organisations flexibility when choosing analysis platforms. A common telemetry format can reduce dependence on a single vendor and support integration with existing tools. The choice of back end still depends on the required investigation, including whether teams need detailed request analysis, resource comparisons, or visualisation across several services.

### Sampling: efficiency and incomplete evidence

Large systems can generate more telemetry than is practical to retain or analyse in full. Sampling selects a subset, reducing data volume while preserving evidence for particular questions.

Common approaches include time-based sampling at fixed intervals, random selection, and event-based selection of records such as errors or warnings. Size-based sampling selects records according to their size. Weighted sampling gives different selection probabilities to records according to their importance or relevance.

Sampling applies to logs, traces, processor measurements, network packets, and user interactions. Collecting less information can reduce computing overhead and storage costs, accelerate analysis, and make monitoring easier to scale.

The trade-off is incomplete evidence. A sample can miss rare failures, conceal outliers, or poorly represent the wider population. Lower detail can also make it harder to reconstruct complex interactions among services. A strategy useful for observing broad trends may be inadequate for investigating an unusual transaction. Selection therefore needs to reflect the diagnostic purpose, rather than assuming that any smaller dataset is sufficient.

Periodic processor measurements can describe resource trends, while selected network packets help investigate traffic. Samples of clickstreams or other interactions can support user-experience analysis. Each answers a different question, and none necessarily preserves all the details required for another investigation.

### The observability tool landscape

Tools range from projects focused on one signal to platforms that combine collection, analysis, and incident workflows. Several functions can coexist within the same environment.

| Tools | Main roles |
| --- | --- |
| Prometheus and Thanos | Metrics monitoring and alerting, with extensions for storage and views across multiple deployments |
| Fluentd and Mezmo | Log collection, processing, and analysis |
| Jaeger, Zipkin, and Atatus | Distributed tracing and request-path analysis |
| Amazon CloudWatch and Google Cloud Monitoring | Monitoring applications and resources within their cloud ecosystems |
| Datadog, Dynatrace, and New Relic | Integrated observability across applications, infrastructure, and other operational data |
| Sumo Logic | Application and infrastructure analytics, alongside security monitoring |
| Instana | Application performance management, dependency mapping, and contextual analysis |

Selection depends on compatibility, data volume, cost, usability, and the questions teams need to answer. A platform should connect technical evidence with relevant business transactions and support the people responsible for resolving problems. Adding tools without integrating their data can leave the same gaps in understanding.

Development, IT operations, cloud operations, and site reliability engineering teams may need different views of the same evidence. Useful integration preserves shared context while supporting those perspectives. Security requirements and the protection of customer data also influence the wider design of the monitoring environment.

### Instana and a practical diagnostic workflow

Application performance management combines practices and tools for improving software performance and availability. Instana applies this approach to applications, services, infrastructure, browsers, and mobile applications, with particular emphasis on cloud-native environments.

Host agents collect information from technology-specific sensors and send it for analysis. Automatic discovery and dependency mapping help describe changing systems, although some integrations require configuration. Dashboards connect logical services with hosts, containers, processes, and other resources.

An infrastructure map groups systems into zones. Pillars represent monitored systems, with blocks showing their software components and colours indicating health conditions. This offers a starting point for investigation. More detailed dashboards then explain the measurements and relationships associated with an individual entity.

Website and mobile monitoring examine actual request and load times. Service views expose dependencies, errors, and logs. Infrastructure views describe resource consumption and component health. Filters and grouping allow teams to compare relevant entities, including containers within a Kubernetes namespace. Metrics such as processor and memory use can be compared over time to assess deployment effects.

Robotshop is a sample e-commerce application composed of microservices. Investigation of a loading delay begins with a peak in page-load time, narrows the time range, and examines resource timings. The longest loading times are associated with JavaScript content. Inspecting individual resources then provides a more specific starting point for diagnosis.

The same investigation can extend to HTTP requests, JavaScript errors, service dependencies, and supporting infrastructure. Geographic views help compare regional performance, while custom events can represent business workflows. Kubernetes views relate application activity to nodes, namespaces, deployments, pods, and containers.

Analytics supports further examination of calls and traces through filtering and grouping. Events distinguish incidents, issues, and changes, drawing on built-in health rules and custom conditions. Smart alerts notify teams when configured conditions arise. Their value comes from connecting the notification to evidence and an appropriate response.

### From diagnosis to automated recovery

Observability can support automated recovery when a recognised condition has a suitable corrective action. Artificial intelligence for IT operations, or AIOps, combines operational analysis with techniques that can assist correlation, prioritisation, and automation.

A recovery workflow detects an anomaly, validates the condition, diagnoses the likely problem, and starts an established response. Examples include restarting an inactive service or removing temporary files when a disk approaches capacity. These are bounded actions for known situations.

Effective self-healing depends on documented, pre-tested workflows and appropriate escalation. Human judgement remains necessary when conditions are unfamiliar or the diagnosis is uncertain. Automation can reduce repetitive work and shorten recovery time, but visibility alone does not guarantee uninterrupted service.

Reducing mean time to resolution, or MTTR, is one operational objective. Earlier detection and a well-defined response can limit the duration of disruption. Alert fatigue and difficult root-cause investigations remain practical challenges, so automated responses need to follow validated conditions rather than the presence of an alert alone.

The transition also requires attention to architecture and operating practices. Larger data volumes, dynamic infrastructure, and complex dependencies can exceed the assumptions of older monitoring arrangements. Lasting improvements depend on connecting useful telemetry with reliable diagnosis and corrective action.
