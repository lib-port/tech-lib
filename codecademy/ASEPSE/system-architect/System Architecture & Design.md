# Decision Analysis and Management: System Architecture & Design

System architecture defines a system's components, their relationships, and the principles governing its structure and behaviour. It translates stakeholder needs into a design that guides development, operation, and change. As complexity increases, architecture helps manage risk by making dependencies, constraints, and trade-offs explicit. Its effectiveness depends on alignment with requirements and continuing evaluation.

## Requirements and architectural responsibility

Requirements specify the functions, qualities, and constraints a system must satisfy. Architecture describes how its components and interactions will address them. Architects establish the system's purpose and boundaries, assess alternatives, explain decisions, and coordinate stakeholders and technical specialists. Their work connects business objectives with practical design choices.

Requirements fall into three broad groups:

- Visionary requirements establish long-term goals and desired outcomes.
- Functional requirements describe capabilities, user interactions, and system behaviour.
- Performance requirements specify qualities such as response time, throughput, and reliability.

Requirements come from sponsors, users, authorities, and internal organisational needs. Effective requirements are clear, complete, consistent, and testable, with measurable acceptance criteria. Prioritisation distinguishes essential outcomes, challenges requiring resolution, and additional improvements.

Sponsors establish strategic priorities and resources. Users and operators identify practical needs. Authorities impose obligations, while internal policies and experience reveal additional constraints. Involving these groups helps resolve conflicting expectations before they become embedded in the design.

Traceability connects requirements to architectural decisions and components. It helps assess whether each component serves a defined need and how changes affect the design. Architecting and systems engineering support this relationship through analysis and feedback throughout the life cycle, from conception to retirement.

## Frameworks and guiding principles

Architectural principles guide decisions, while methods provide systematic ways to analyse and develop a design. Several approaches address different aspects of this work.

| Approach | Purpose |
| --- | --- |
| TOGAF | Connects business, data, application, and technology architecture with organisational objectives. |
| Zachman framework | Organises architectural descriptions by stakeholder perspective and the questions what, how, where, who, when, and why. |
| Service-oriented architecture | Organises functionality into reusable services connected through defined interfaces. |
| ITIL 4 | Supports IT service management through collaboration, iterative work, and continual improvement. |

TOGAF progresses through preparation and vision, business and information systems architecture, technology architecture, solution options, migration planning, implementation governance, and change management. Requirements management continues throughout these activities.

Preparation establishes scope and sponsorship. The vision identifies stakeholders and desired outcomes. Migration planning addresses the transition from the existing design to the intended architecture. Governance oversees implementation against architectural standards, while change management assesses proposed changes and maintains coherence over time.

Documentation preserves requirements, decisions, and implementation details. Simplification reduces unnecessary complexity and dependencies. Managed services can reduce operational work, while stateless processing handles requests independently of session state to support scaling and resilience.

## Architectural views and scope

Different viewpoints reveal different concerns. Logical views describe components and interfaces. Behavioural views describe interactions, workflows, and state changes. Physical views describe deployment across hardware, software, and networks. A metamodel defines the elements, relationships, and constraints used in architectural models.

Architecture also varies by purpose. Operational architecture addresses running systems and responding to incidents. Program architecture supports project coordination. Information architecture governs data organisation and access. Security architecture protects assets. Integration architecture connects systems, design control separates responsibilities, and problem domain architecture represents the concepts and relationships of a particular field.

The scope may cover one system, an enterprise, a product family, or a system of systems. Enterprise architecture connects organisational capabilities and assets. Product family architecture supports reuse across related products. A system of systems coordinates independent systems towards shared objectives while managing their interdependencies.

These perspectives help architects communicate with different audiences and identify business and technical concerns. Architectural decisions also reflect organisational constraints, technological capabilities, and environmental conditions. Recording their rationale supports later maintenance, extensions, and reuse.

## Managing complexity

Three techniques make complex designs easier to understand and change:

- Modularisation assigns responsibilities to components with clear interfaces and limited dependencies. It supports reuse, fault isolation, independent updates, and scaling.
- Decomposition divides a system into smaller parts, often arranged hierarchically, so that teams can analyse, develop, and test manageable components.
- Abstraction retains the features relevant to a particular purpose while omitting unnecessary detail. It supports business models, functional designs, and reusable software components.

A top-down approach starts with objectives and requirements before defining components. A bottom-up approach assembles components into larger structures, testing practical feasibility. Both can contribute to the same design.

Modular systems can scale by adding or replicating components as workloads increase. Their interfaces allow teams to work independently while coordinating integration. Hierarchical decomposition clarifies responsibilities at successive levels, and abstraction keeps each model focused on the detail needed for its intended analysis.

## Systems thinking and patterns

Systems thinking examines relationships among products, the processes supporting them, and their operating environment. It distinguishes the system containing a problem from the system intended to address it. The system of interest defines the focus and boundaries of engineering work, which may differ between stakeholders.

Patterns describe recurring structures and behaviours. Hierarchies organise parts and wholes or distribute authority. Networks describe connections. Other patterns include cycles, interchangeable components, layers, and similarities across scales. Emergence occurs when interactions produce capabilities absent from individual components.

Holarchies describe nested structures in which each element forms a whole and belongs to a larger whole. Such relationships help explain systems at different levels of detail.

Pattern selection depends on the problem, requirements, constraints, and stakeholder priorities. Established approaches provide starting points that require evaluation against the actual operating context.

## Capabilities and trade-offs

Architecture balances several qualities, each requiring deliberate design choices.

| Capability | Design implications |
| --- | --- |
| Testability | Clear interfaces, limited dependencies, and diagnostic features support verification and troubleshooting. |
| Performance and scalability | Efficient processing and resource use must accommodate growing workloads. |
| Reliability and availability | Fault tolerance, redundancy, recovery, load balancing, and failover support dependable operation and access. |
| Maintainability and extensibility | Modular structures and documentation support repairs, updates, and additions without extensive redesign. |
| Security | Encryption, authentication, authorisation, and auditing protect data and system assets. |
| Manageability | Monitoring, configuration controls, and automation support administration. |

These qualities overlap but remain distinct. Reliability concerns correct operation under specified conditions, while availability concerns whether a service is accessible. Maintainability concerns changing and repairing existing capabilities, while extensibility concerns adding capabilities.

Greater flexibility can introduce complexity. Performance concerns current speed and efficiency, while scalability concerns accommodating growth. Throughput measures work completed over time, whereas latency measures the delay for an individual request. Improving one measure can affect another.

Distributed systems may also face a trade-off between continued availability and immediate agreement among copies of data during disruptions. Decisions depend on requirements and operating conditions. Systematic comparison, collaboration, and operational feedback help teams assess consequences and revise choices as needs change.

Security mechanisms can be incorporated throughout system development and operational management. Similarly, testing needs to cover interactions as well as individual components. Operational monitoring supplies evidence about resource use, service performance, and emerging problems, supporting informed changes throughout the system's life cycle.

## Integration and interfaces

Integration combines components so that functions, information, and workflows operate coherently. Networking, application integration, custom interfaces, and business process management support this coordination.

Application programming interfaces and middleware support message routing and service requests. Business process management coordinates activities across applications, connecting technical communication with the workflows needed to achieve organisational objectives.

Vertical integration connects subsystems within a functional area, but can create isolated silos. Horizontal integration connects systems through a shared mechanism, reducing separate connections and supporting coordination across functions. Star integration creates direct links between multiple systems, which can increase cost and coordination demands as connections accumulate.

Enterprise application integration uses common formats and protocols to support data exchange and reduce repeated conversion. Integration across the life cycle connects design, engineering, delivery, and operations, with requirements appropriate to each stage.

Interfaces allow applications to communicate without necessarily changing their internal architecture. They can also provide interim connections before more extensive integration. Clear interfaces support interoperability, the ability of different systems to exchange and use information.

## Modelling and tool selection

Systems engineering, modelling, and simulation tools help validate and refine architectural designs. Model-based systems engineering uses models to support engineering activities. Tool selection depends on project requirements, industry, users, cost, and support needs.

Comparisons can consider functionality, reviews, user satisfaction, and market presence. Popularity and satisfaction measure different attributes, and neither establishes suitability by itself. Detailed evaluation connects the choice to the organisation's actual work.

Comparison grids can reveal these differences across products. Wider adoption may offer a larger support community, while a less widely used product may better fit a particular project.

## Applications across sectors

Transport systems balance traffic volumes, passenger safety, and infrastructure capacity. Modular traffic management and passenger information systems can use real-time data to support routing and scheduling. Scalability accommodates growth, while resilience supports recovery from disruption.

Manufacturing systems balance efficiency, waste reduction, and product quality. Sensor feedback supports closed-loop control, which adjusts processes in response to measured conditions. Equipment monitoring supports predictive maintenance, while collaborative robots assist operators and automate repetitive tasks.

Supply chains depend on coordination among suppliers, manufacturers, distributors, and retailers. Tracking provides visibility of goods and inventory. Forecasting, shared information, and flexible logistics support responses to demand changes and disruptions.

Regional infrastructure and constraints influence logistics choices. Shared forecasts support inventory decisions, production schedules, and transport planning, while adaptable networks help maintain deliveries when demand or operating conditions change.

Healthcare systems require information exchange, service continuity, and protection of patient data. Modular, interoperable systems support coordinated care and growth. Redundancy helps maintain access to critical information, while encryption and access controls protect confidentiality. Design choices connect these capabilities with workflows, resource use, and patient needs.
