# Systems Engineering: System Architecture & Design

Systems engineering coordinates the definition, analysis, design, integration, verification, validation, operation, and retirement of a system. The work proceeds iteratively because stakeholder understanding, technical evidence, risks, and constraints develop throughout the life cycle. Architecture and design connect those concerns to an implementable system.

## System architecture

A system architecture encompasses the fundamental organisation of a system, including its elements, relationships, governing principles, and environmental context. An architecture description communicates selected aspects of that architecture. It does not duplicate every design detail.

Stakeholder concerns determine what an architecture description should show. Architects define viewpoints for recurring concerns, then create views that conform to those viewpoints. One view might show physical deployment and network connections. Another might show functions, data flows, states, timing, or human interaction. A useful set of views usually covers several complementary perspectives:

- Physical views show equipment, facilities, devices, networks, and deployment locations.
- Logical or functional views show responsibilities, transformations, behaviour, and information flow without committing every function to a physical component.
- Interface views show exchanges and dependencies across component or system boundaries.
- Dynamic and temporal views show states, sequences, concurrency, timing, and responses to events.
- Context views show the system boundary, external actors, external systems, and environmental conditions.

No universal set of static, dynamic, temporal, and environmental domains governs every architecture. The project should select views that address its decisions and stakeholder concerns, use consistent notation, and retain links to supporting assumptions, requirements, costs, risks, and rationale.

Architecture descriptions support communication and decision-making. They help teams compare alternatives, expose dependencies, allocate responsibilities, identify incompatibilities, and explain how the proposed system creates value. Teams should keep them consistent with the implemented and intended system. An obsolete diagram can conceal risk and misdirect later work.

Teams often distinguish a current-state architecture from a target-state architecture. The first explains the system that exists, including technical debt and operational constraints. The second explains the intended structure and the principles that will govern its evolution. Transition views connect the two by showing increments, dependencies, temporary interfaces, data migration, and retirement activities. These views prevent a desirable destination from becoming an impractical delivery plan.

Organisations often distribute architectural responsibility across several scopes. Enterprise architects align portfolios and shared capabilities with organisational strategy. Solution architects coordinate a coherent solution across products, services, and platforms. Technical or domain architects guide detailed decisions in areas such as software, networks, data, safety, or security. Titles vary, but every role should connect decisions to stakeholder concerns and system-wide outcomes.

## Components, modularity, and standardisation

A component represents an element that engineers treat as a unit at a chosen level of abstraction. Components may include hardware, software, data stores, people, facilities, procedures, or combinations of these. The useful level of decomposition depends on the decision. A component should have a clear responsibility, explicit interfaces, and enough internal cohesion to support independent understanding and change.

Inputs, processing, outputs, feedback, and control provide useful functional categories, but they do not form an exhaustive classification of all components. A component may perform several roles. Its significance also depends on the system boundary and the relationships that create system-level behaviour.

Decomposition should preserve attention to emergent properties. Engineers allocate functions and requirements to components, but component compliance alone does not demonstrate that the integrated system will achieve safety, performance, usability, or mission outcomes. Integration can introduce delays, contention, incompatible assumptions, and feedback effects that no isolated component displays. System-level analysis and testing must therefore examine interactions as well as individual elements.

Modularity divides a system into components with strong internal cohesion and controlled dependencies. Effective modularity can improve comprehensibility, reuse, testability, replaceability, deployment, scaling, and fault isolation. It does not guarantee resilience. Removing a critical service can still stop the system, and distributed components can introduce network failures, latency, data consistency problems, and operational complexity. Architects must design redundancy, graceful degradation, recovery, and observability where the required level of service justifies them.

Standardisation strengthens modularity when teams agree on interface protocols, data formats, naming, error handling, security controls, and deployment conventions. Standards reduce avoidable variation and enable substitution, automation, and parallel work. They should preserve necessary flexibility rather than force unlike components into an unsuitable pattern.

Microservices offer one modular software style, not a definition of modularity. Each service normally owns a bounded capability and communicates through an explicit contract. Service boundaries should reflect cohesive responsibilities and minimise unnecessary coupling.

Container platforms can automate deployment and recovery, but their structure requires accurate description. Kubernetes schedules Pods onto Nodes. A Pod contains one or more co-located containers that share network and storage resources. Deployments and other controllers can maintain a desired number of Pod replicas. This mechanism replaces failed instances only when teams configure suitable controllers, health checks, resources, dependencies, and data protection.

## Modelling and simulation

A model represents selected aspects of a real or proposed system for a stated purpose. Models may be physical, mathematical, computational, descriptive, or hybrid. A simulation executes or manipulates a model to examine behaviour under specified conditions. Engineers use models and simulations to explore alternatives, forecast conditional outcomes, investigate inaccessible scales, support trade studies, rehearse operations, and gather evidence before building or changing the full system.

Every model simplifies its subject. Credible use therefore depends on fitness for purpose, not maximum detail. The modelling team should define:

- the decision or question that the model will support
- the system boundary, operational scenarios, and domain of use
- assumptions, abstractions, governing relationships, and data provenance
- input parameters, initial conditions, and experimental design
- outputs, measures, thresholds, and methods of interpretation
- uncertainty, sensitivity, limitations, and acceptance criteria

The team should verify that the implementation correctly represents the intended model and validate that the model represents the relevant real-world behaviour well enough for its proposed use. Calibration, comparison with observations, independent review, and sensitivity analysis can strengthen confidence. Results should retain their assumptions and uncertainty. A simulation supports a decision, but it does not remove uncertainty or guarantee an outcome.

An experimental plan should define the scenarios, parameter ranges, number of runs, random seeds where applicable, and method for comparing alternatives. Repeated runs can reveal variability in stochastic models. Sensitivity analysis can identify assumptions or inputs that dominate results, while uncertainty analysis can show the range of plausible outcomes. Version control should connect each result to the exact model, data, configuration, and execution environment that produced it.

## System interfaces

An interface is a shared boundary or connection through which system elements interact. Interfaces can carry data, commands, electrical power, heat, fluids, forces, or human actions. Mechanical, electrical, thermal, software, communications, and human interfaces all require compatible definitions.

The system boundary determines whether an interface is internal or external. An internal interface connects elements within the system of interest. An external interface connects that system to a user, another system, or the operating environment. Changing the boundary can change the classification without changing the physical connection.

Teams should define important interfaces early enough to let component teams work in parallel. An interface definition should specify the exchanged item, direction, format, units, timing, sequence, capacity, error behaviour, security, physical characteristics, ownership, and versioning that apply. Interface control records should preserve agreements and track changes. Integration tests should confirm both conformance to each side of the contract and correct end-to-end behaviour.

## Needs and requirements

Business or mission needs explain the problem, opportunity, purpose, and desired outcomes. Stakeholder requirements translate those needs into capabilities, quality expectations, operational conditions, and constraints from the stakeholder perspective. System requirements then express a technical view of the system capabilities and characteristics needed to satisfy the stakeholder requirements. Requirements state what the system must achieve and which limits apply. They should prescribe a design only when a justified constraint requires a particular solution.

Requirements can describe:

- functions and externally visible behaviour
- performance, capacity, timing, accuracy, and availability
- safety, security, reliability, usability, and maintainability
- interfaces, operating environments, regulations, budgets, and physical limits
- verification conditions and acceptance thresholds

Derived requirements arise when analysis, architecture, regulation, or risk treatment identifies a necessary capability or constraint that stakeholders did not state directly. Teams should document the derivation and retain its link to the originating need, decision, or hazard. Allocation assigns system requirements to lower-level elements without losing responsibility for the integrated outcome. Where one requirement spans several elements, the architecture should identify the coordinating behaviour and the evidence needed at component and system levels.

Labels such as business, user, stakeholder, system, subsystem, functional, and quality requirement describe different dimensions. A team should define its taxonomy instead of treating all system requirements as user requirements or assuming that every technical statement belongs at the same level.

A well-formed requirement is necessary, appropriate to its level, unambiguous, complete, singular, feasible, correct, and verifiable. Quantified conditions and thresholds usually improve testability. Vague words such as easy, fast, sufficient, or user-friendly require measurable interpretation. A requirement should also trace to its source and forward to architecture, design, implementation, verification evidence, and validation outcomes.

Stakeholder analysis begins by identifying everyone who affects, uses, acquires, operates, supports, regulates, or experiences consequences from the system. Teams elicit needs through interviews, workshops, observation, questionnaires, brainstorming, document analysis, operational scenarios, and analysis of existing systems. A Concept of Operations can describe intended users, environments, activities, and outcomes. Use cases, activity models, prototypes, and simulations can reveal assumptions and needs that prose alone leaves hidden.

Elicitation continues throughout development. Stakeholders often refine their understanding after they see alternatives or working increments. Analysts should confirm inferred needs with the affected stakeholders rather than rely on untested interpretation. They should also resolve conflicts, identify feasibility limits, prioritise desired outcomes, and record rationale.

Teams transform approved stakeholder requirements into system requirements, classify them, and establish bidirectional traceability. Reviews should test completeness, consistency, feasibility, risk, and alignment across levels. A controlled baseline identifies the agreed requirements for a stage of work. Change control then records the proposed change, rationale, affected artefacts, technical and commercial impact, decision, and resulting baseline. Control should enable justified change while preventing silent divergence.

Verification planning should start while teams define requirements. Each requirement needs a suitable method such as analysis, inspection, demonstration, or test, together with conditions and acceptance criteria. Early planning exposes statements that no practical method can verify. Validation planning should also connect operational scenarios and stakeholder outcomes to evidence, including evidence that teams can collect from prototypes, simulations, field trials, or the realised system.

## The relationship between requirements and architecture

Requirements and architecture develop through a two-way, iterative relationship. Initial needs and requirements guide architectural exploration. Candidate architectures reveal technical constraints, quality trade-offs, missing scenarios, interface demands, and cost or schedule implications. That evidence can prompt stakeholders to clarify or revise requirements through the agreed change process.

This interaction does not give designers licence to substitute preferred features for approved needs. Every significant architectural element and decision should trace to a requirement, risk treatment, constraint, or documented rationale. Conversely, every allocated requirement should have an architectural home and a credible verification approach. Early architecture sketches can improve requirements analysis, while evolving baselines keep both sets of artefacts aligned.

## Principles of system design

Effective design balances simplicity with the complexity needed to satisfy requirements. Teams should solve current, evidenced needs, preserve feasible evolution paths, and avoid speculative features. Small, reversible changes often reduce disruption, but major change remains appropriate when the existing structure cannot support required outcomes.

Clear design records should explain decisions, alternatives, assumptions, and consequences. Consistent terminology, interaction patterns, and interface conventions reduce cognitive load. Readable code and models help maintainers, but they do not replace the documentation needed for architecture, operations, safety, security, and decisions.

Designers should place complexity where teams can isolate and manage it. Cohesive components, limited dependencies, controlled data ownership, and explicit interfaces reduce the paths through which changes and failures propagate. Critical flows require attention to capacity, timing, contention, and back-pressure.

Reliability and resilience require deliberate engineering. Replication can improve availability, while health monitoring, failover, graceful degradation, recovery procedures, and tested restoration support continuity. Backups protect recoverable data from loss or corruption. They serve a different purpose from live redundancy, so a sound design may require both.

Safety, security, privacy, and human factors should influence requirements and architecture from the beginning. Security design should identify assets, threats, trust boundaries, identities, privileges, secrets, and failure consequences. Authentication establishes identity, while authorisation controls permitted actions. A bearer access token commonly supports API authorisation, but the token alone does not define a complete authentication or security design.

Teams should iterate, review competing ideas, test high-risk assumptions early, and keep attention on system-level outcomes. Implementation details deserve focus when they affect feasibility, interfaces, safety, security, cost, or quality. Otherwise, premature detail can obscure the architectural decision.

Alternative designs should receive explicit comparison against the same criteria. A trade study can examine performance, cost, schedule, risk, maintainability, and environmental impact without pretending that one option maximises every quality. Sensitivity analysis can show whether a small change in assumptions reverses the ranking. Teams should record why they accepted a disadvantage, which evidence supports the choice, and which future condition would trigger reconsideration.

## Metrics and system evaluation

Measurement begins with an information need. A useful metric links a defined concept to a repeatable method, data source, unit, sampling approach, calculation, interpretation, and decision context. Teams should choose measures that reflect stakeholder outcomes and system qualities, while balancing benefit against the cost of collection and analysis.

Aggregation can reveal trends, but averaging does not increase measurement precision. Precision concerns agreement among repeated measurements, resolution concerns the smallest detectable or reported increment, and accuracy concerns closeness to an accepted reference. Teams should select resolution, sampling frequency, and reporting precision that fit the scale of meaningful change. Excess digits can imply unsupported certainty, while coarse measures can hide important variation.

Metric validation should examine construct validity, data quality, bias, uncertainty, sensitivity, stability, and usefulness. Statistical significance addresses whether observed evidence conflicts with a stated statistical hypothesis under defined assumptions. It does not establish practical importance, causation, or overall validity. Feedback samples also require scrutiny because voluntary or unrepresentative responses can distort conclusions.

A measurement plan should set a baseline, target, tolerance, threshold, collection frequency, retention period, and responsible owner where each element applies. A metric also needs an interpretation rule. A change may signal improvement, deterioration, normal variation, or a shift in workload. Teams should review related measures together because optimisation of one indicator can degrade another. For example, higher throughput may increase latency, cost, energy use, or error rates.

Systems engineering often distinguishes three related measures. Measures of Effectiveness express stakeholder or mission success. Measures of Performance translate that success into technical characteristics of the operating system. Technical Performance Measures compare evolving achievement with planned values and thresholds during development. Cost, schedule, performance, reliability, availability, safety, security, maintainability, and user outcomes may all contribute to evaluation.

Architecture evaluation should begin before teams commit to expensive implementation and continue when requirements, evidence, or risks change. Stakeholders should agree on scenarios, quality attributes, constraints, measures, and decision criteria. The evaluation should compare credible alternatives, identify sensitivities and trade-offs, expose risks and assumptions, and record the rationale for selection. No review guarantees future success, but early analysis can reduce avoidable rework and make residual risk visible.

The Carnegie Mellon Software Engineering Institute developed several scenario-based methods:

- The Software Architecture Analysis Method assesses an architecture against scenarios and quality concerns, with an early emphasis on modifiability.
- The Architecture Tradeoff Analysis Method evaluates competing quality attribute goals and exposes architectural risks, sensitivity points, and trade-offs that can affect business goals.
- Active Reviews for Intermediate Designs uses task-oriented reviews to evaluate incomplete designs and their suitability for intended users.

Verification and validation complete different checks. Verification gathers evidence that the realised system conforms to specified requirements. Validation gathers evidence that the system fulfils its intended purpose in its intended environment. A strong evaluation programme connects stakeholder outcomes, requirements, architectural decisions, metrics, tests, analyses, demonstrations, and operational evidence across the life cycle.
