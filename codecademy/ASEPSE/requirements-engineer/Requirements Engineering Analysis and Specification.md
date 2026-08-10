# Requirements Analysis and Specification
Requirements analysis transforms elicited needs, evidence, constraints, and assumptions into a coherent set of requirements. Specification records that set in forms that stakeholders, designers, developers, testers, operators, and decision-makers can use. Both activities continue throughout the system life cycle as understanding and circumstances change.

Analysis does not guarantee project success, and no single phase outranks every other discipline. It reduces risk by clarifying the problem, defining scope, testing feasibility, exposing conflicts, and establishing a basis for design, verification, validation, and controlled change.
## Analysis objectives
Analysts determine whether requirements are necessary, consistent, feasible, sufficiently complete, and aligned with stakeholder needs and organisational goals. They examine system boundaries, operating conditions, interfaces, data, behaviours, quality expectations, legal duties, risks, dependencies, and acceptance conditions.

Requirements generally describe required outcomes rather than implementation. Some requirements may impose justified design constraints, such as a mandated interface, standard, material, or platform. Teams should preserve solution freedom unless evidence, law, compatibility, safety, or another legitimate constraint requires a specific choice.

Scope creep means uncontrolled expansion, not every addition, alteration, or deletion. A governed change can improve value or correct an error. Teams should assess its effects before updating an approved baseline.
### Analysis workflow
A practical analysis cycle connects evidence to decisions:
1. Analysts organise elicited statements by source, level, type, scope, and status.
2. They define terms, boundaries, interfaces, operational scenarios, and assumptions.
3. They model behaviours, data, states, processes, and quality conditions where models improve understanding.
4. They identify gaps, duplication, conflicts, dependencies, risks, and derived requirements.
5. They assess feasibility against technology, cost, schedule, law, safety, ethics, and acceptable risk.
6. They verify individual statements and the quality of the requirements set.
7. They validate the set with relevant stakeholders and authorised decision-makers.
8. They prioritise, approve, baseline, trace, and maintain the requirements under change control.

The cycle remains iterative and recursive. Architecture can expose missing interfaces, test design can reveal unverifiable wording, and prototypes can disprove assumptions. Analysts should return to earlier activities when new evidence changes the problem or solution space.
## Requirement classifications
Classification schemes answer different questions and should not be mixed as if they formed one flat list.

| Classification | Purpose |
| --- | --- |
| Business requirements | Define the enterprise outcome, problem, opportunity, or objective |
| Stakeholder requirements | Describe the needs of users and other stakeholders in context |
| Solution requirements | Describe the capabilities and qualities that satisfy stakeholder requirements |
| Functional requirements | Define required behaviours, functions, and information handling within solution requirements |
| Quality requirements | Set measurable levels for performance, reliability, security, usability, maintainability, scalability, and other attributes |
| Transition requirements | Define temporary capabilities or conditions needed for migration, training, deployment, and organisational change |

Systems engineering also distinguishes stakeholder requirements, system requirements, and lower-level requirements. These levels describe increasing technical detail. Functional, quality, and constraint categories can occur at more than one level.

Functional and quality requirements are complementary, not competing types with inherent advantages and disadvantages. Functional requirements can be difficult to discover and must cover exceptions and adverse conditions. Quality requirements can be quantified through defined measures, thresholds, loads, periods, and environments. A statement that a system supports 10,000 concurrent users remains incomplete unless it also defines acceptable response time, throughput, error rate, and test conditions.

Security and compliance cut across functions, qualities, constraints, processes, and evidence. A role-based access rule may be functional, an encryption mandate may be a constraint, and an availability target may be a quality requirement. Teams should classify each statement according to its purpose rather than force every concern into a single category.
## Analysis techniques
Teams select techniques according to the problem, risk, audience, evidence, and required decisions.

- Context diagrams define the system boundary and show relevant external entities and interactions.
- Use cases and scenarios explore actor goals, normal flows, alternatives, exceptions, and edge cases.
- Process models and BPMN diagrams analyse activities, events, decisions, responsibilities, and hand-offs.
- Data models, state models, flowcharts, and interface analysis clarify information, behaviour, and dependencies.
- Prototypes test assumptions, terminology, workflows, and design options through stakeholder feedback.
- Gap analysis compares current and desired capabilities without assuming that every difference requires implementation.
- Business motivation and goal models connect proposed requirements to strategy and value.
- User stories and journey maps express user goals and experiences, but they require acceptance criteria and supporting quality requirements.

No model removes ambiguity by itself. Reviewers must confirm definitions, scope, assumptions, and interpretations with relevant stakeholders. Gantt charts schedule project work. They may show requirements activities or dependencies, but they do not analyse requirement content.
## Writing high-quality requirements
Reviewers should check that each requirement is necessary, appropriate, unambiguous, complete, singular, feasible, verifiable, and correct. The requirement should identify a required capability, quality, or constraint, together with relevant conditions and measurable criteria. It should use consistent terminology and avoid vague words such as intuitive, rapid, robust, seamless, or sufficient unless the specification defines them.

Detail should match the requirement's level and purpose. Excessive detail can impose an unsupported design, while insufficient detail can permit conflicting interpretations. Supporting rationale, definitions, diagrams, assumptions, and examples can improve understanding without burdening the normative statement.

A high-quality set also needs suitable breadth, internal consistency, complete interface coverage, and traceability to its sources. Teams should resolve duplicates and contradictions, define units and tolerances, and assign stable identifiers. Any temporary placeholder should have an owner, resolution criterion, and target date. Reviewers should examine the set from user, operational, architectural, safety, security, maintenance, and verification perspectives.

Requirements verification checks construction and quality. Requirements validation checks whether the set reflects stakeholder needs, intended use, objectives, operational concepts, and constraints. Product verification later determines whether the implemented system satisfies specified requirements.

The team should record unresolved conflicts instead of concealing false agreement.
## Requirements specifications
ISO/IEC/IEEE 29148:2018 defines requirements engineering processes and information items for systems and software. Organisations may store requirements in documents, models, repositories, backlogs, or linked combinations. They should tailor content and formality to risk, contracts, regulation, complexity, and stakeholder needs.

A system requirements specification and a software requirements specification are distinct information items. The abbreviation SRS commonly denotes a software requirements specification, while SyRS can distinguish a system requirements specification. Organisational naming varies, so each artefact should define its scope.

A useful specification may include:
- Purpose, scope, context, objectives, definitions, and references
- Stakeholders, operational concepts, assumptions, and dependencies
- Functional, quality, interface, data, safety, security, privacy, and transition requirements
- Constraints, priorities, acceptance conditions, and verification methods
- Traceability, open issues, decision records, approvals, and revision history

Business requirements documents, product requirements documents, interface specifications, wireframes, data models, and other artefacts may support the requirements set. A wireframe primarily represents an interface concept, and a test plan defines a verification approach. Neither automatically serves as a requirements specification.

Approval establishes agreement and may create a baseline under configuration control. It does not act as acceptance criteria. Acceptance criteria state the observable conditions that a deliverable must satisfy. Agile and iterative approaches may use lighter artefacts, but they still need clear requirements, quality criteria, traceability appropriate to risk, and decision authority.
## Traceability and consistency
Bidirectional traceability links needs and sources to requirements, architecture and design elements, implementation, verification methods, results, and validation evidence. It supports impact analysis, coverage assessment, justification, auditing, and compliance. A matrix can represent these links, but repositories and models can do the same.

Consistency includes compatible meaning, terminology, units, assumptions, priorities, interfaces, and relationships. Uniform templates help, but formatting alone cannot resolve semantic conflict. Teams should maintain links and consistency against the current approved objectives rather than an obsolete original plan.
## Prioritisation
Prioritisation ranks requirements for a defined decision, scope, and timeframe. Teams should consider value, safety, legal obligation, urgency, affected users, risk reduction, dependencies, uncertainty, feasibility, cost, and effort. Stakeholder votes provide evidence, but they cannot override non-negotiable duties or decide every trade-off.

MoSCoW classifies requirements as Must Have, Should Have, Could Have, or Won't Have this time. A Must Have is indispensable to a viable outcome within the stated scope. Won't Have this time records an explicit deferral, not permanent rejection.

Other techniques answer different questions. Kano analysis explores how capabilities influence customer satisfaction. An impact-confidence-ease score offers quick comparative triage but depends on subjective estimates. The 100-point method reveals relative stakeholder preferences but can obscure dependencies and minority needs. Priority poker exposes disagreements for discussion. Cost of Delay estimates the economic impact of postponement, while Weighted Shortest Job First divides relative Cost of Delay by relative job size to guide sequencing.

Teams should not assume that the highest-ranked feature must enter development first. Architecture, safety, learning, risk, and dependencies can justify another sequence. Defined governance identifies who recommends priorities, who decides, and how the team records rationale and dissent. Teams revisit priorities as evidence changes.
## Requirements change
Change can reflect learning, corrected assumptions, external events, regulatory updates, technical constraints, or evolving needs. Teams should manage it without blaming stakeholders or resisting useful discovery.

A proportionate change process records the request and rationale, analyses affected requirements and stakeholders, and evaluates value, feasibility, interfaces, safety, security, cost, schedule, contracts, operations, training, and verification. The authorised decision-maker then approves, rejects, defers, or requests further analysis. The team updates the baseline, trace links, plans, specifications, designs, tests, and communications when required.

High-risk or contractual projects may need formal boards and written approvals. Lower-risk iterative work may use a governed backlog and product authority. Every approach still needs transparent decisions and controlled versions, but not every change requires approval from every stakeholder.
## Applied example
A smart-city environmental monitoring system needs more than broad requests for real-time alerts and a public dashboard. Analysts should define pollutant coverage, sensor accuracy, geographic scope, update latency, alert thresholds, availability, data retention, privacy, accessibility, security, and interfaces with emergency services.

City planners, environmental authorities, residents, operators, maintainers, emergency services, and security specialists may assign different priorities. Analysts should combine stakeholder input with legal duties, safety, feasibility, risk, and dependencies. They can then document measurable requirements, trace them to sources and tests, establish decision authority, and reassess them as evidence develops.