# Requirements Engineering: An Introduction
Requirements engineering defines, analyses, documents, validates, and manages the needs and requirements that a system must satisfy. It connects a problem or opportunity to an agreed set of stakeholder and system requirements, then maintains that connection as understanding, technology, and operating conditions change.

Effective requirements engineering reduces ambiguity before it becomes expensive rework. It also gives architecture, design, implementation, procurement, verification, validation, deployment, and operations a shared basis for decisions. The work begins early, but continues iteratively throughout the system life cycle.
## Core principles
Requirements engineering focuses on value. Each requirement should support an identified stakeholder need, mission objective, business goal, legal duty, safety obligation, or other justified outcome. A requirement without a credible source or purpose consumes resources without establishing useful value.

Several principles guide the work:
- Teams identify the relevant stakeholders and understand their needs, constraints, responsibilities, and operating contexts.
- Teams define the system boundary and its external interfaces to distinguish the system from its environment.
- Teams separate the problem, stakeholder need, requirement, and proposed solution. This separation preserves design options and exposes unsupported assumptions.
- Teams build shared understanding through models, examples, prototypes, scenarios, and clear definitions.
- Teams validate requirements early and repeatedly with appropriate stakeholders.
- Teams record assumptions and dependencies, assign owners, and test them as evidence develops.
- Teams expect requirements to evolve and control change through analysis, traceability, approval, and versioning.
- Teams tailor the process to the system's scale, risk, novelty, regulatory environment, and development approach.

A disciplined process does not require excessive documentation. It requires enough reliable information to support decisions, demonstrate agreement, and provide evidence. High-risk systems normally need stronger formality, traceability, and independent review than low-risk systems.
## From problem to controlled requirement
A requirements effort normally begins by clarifying the problem, desired outcomes, system context, and decision authority. The team then identifies stakeholders and plans how to engage them. The plan should define responsibilities, elicitation methods, review points, deliverables, repositories, configuration controls, and approval arrangements. It should also account for stakeholder availability, geographic distribution, confidentiality, accessibility, and cultural or technical differences.

The team turns raw stakeholder input into controlled requirements through a repeating sequence:
1. The team elicits needs, goals, constraints, assumptions, concerns, and operational knowledge.
2. The team analyses sources, conflicts, dependencies, feasibility, risks, and missing information.
3. The team models the context, behaviours, data, interfaces, states, and important scenarios.
4. The team specifies requirements and supporting rationale at the appropriate level of detail.
5. The team verifies the wording and structure, then validates the requirements with authorised stakeholders.
6. The team agrees priorities and acceptance criteria, approves a defined set, and establishes a baseline.
7. The team maintains traceability, assesses proposed changes, and revisits validation as the system evolves.

Feedback can return the work to any earlier activity. A prototype may expose a missing stakeholder, feasibility analysis may invalidate an assumption, or a test design may reveal that a requirement cannot be measured. Teams should preserve this learning rather than force it into an artificial one-way sequence.
## Requirements and related information
Requirements can be classified along several independent dimensions. Mixing these dimensions creates confusion. For example, a stakeholder requirement can describe either a function or a quality, while a system requirement can do the same at a more detailed level.

| Dimension | Categories | Purpose |
| --- | --- | --- |
| Level | Stakeholder needs, stakeholder requirements, and system requirements | Translates desired outcomes into increasingly precise system obligations |
| Kind | Functional requirements, quality requirements, and constraints | Distinguishes capabilities from performance or quality levels and imposed limits |
| Source | Stated requirements and derived requirements | Distinguishes direct stakeholder or governing inputs from requirements produced by analysis |
| Priority | Essential, high, medium, and low, or another agreed scale | Supports trade-offs, sequencing, and release planning |

Functional requirements state what the system must do, such as calculate a fare, issue an alert, or exchange an order with a supplier. Quality requirements set measurable levels for attributes such as performance, security, reliability, usability, maintainability, portability, compatibility, and scalability. Constraints limit the solution through laws, policies, standards, interfaces, technologies, budgets, schedules, or physical conditions. A quality requirement should state the required outcome and conditions instead of relying on labels such as fast, secure, or user-friendly.

A performance requirement may specify response time, throughput, capacity, accuracy, or resource use under stated loads and operating conditions. A reliability requirement may specify continuity of correct service or the probability of operating without failure for a defined period and environment. A security requirement may define authorised access, confidentiality, integrity, accountability, resilience, or recovery outcomes. Teams should prescribe a particular implementation only when a justified constraint requires it.

Derived requirements arise from analysis rather than direct stakeholder statements. Architecture, interfaces, hazards, regulations, operating concepts, and design decisions can all generate them. They require the same justification, review, traceability, and change control as other requirements.

Acceptance criteria describe the observable conditions that a deliverable must satisfy for an authorised party to accept it. A requirements specification is not another requirement type. It is an organised information item that contains requirements and supporting information.
### Prioritisation and negotiation
Prioritisation directs limited time and resources towards the greatest value and risk reduction. Useful criteria include stakeholder benefit, safety, legal obligation, mission contribution, urgency, technical dependency, uncertainty, cost, and delivery risk. A ranking method should define what each category means. Teams should not treat an attractive feature and a statutory constraint as interchangeable items on a popularity list.

Negotiation reconciles competing needs without concealing disagreement. Analysts first test whether apparently conflicting requirements address different contexts or user groups. They can then compare alternative scopes, service levels, releases, architectures, and mitigations. The responsible decision-maker approves the trade-off after consulting affected stakeholders and specialists.

Teams cannot defer some requirements without making the system unsafe, unlawful, or unfit for its intended purpose. That status does not make an infeasible plan viable. If essential requirements exceed available capability, budget, or time, governance must change the solution, resources, schedule, intended use, or project commitment. The requirement record should retain its priority, rationale, source, dependencies, and decision history.
## Requirements engineering activities
Requirements engineering combines elicitation, analysis, modelling, specification, verification, validation, and management. These activities overlap and repeat as the team learns more.
### Elicitation
Elicitation discovers stakeholder needs, goals, concerns, constraints, assumptions, and knowledge about the current environment. Useful techniques include interviews, workshops, observation, document and interface analysis, surveys, prototypes, scenarios, use cases, user stories, and role play. Role play places participants in relevant stakeholder roles and operating situations to expose needs, exceptions, and interactions.

No single technique reaches every stakeholder or reveals every need. Interviews provide depth, surveys provide breadth, observation exposes differences between stated and actual work, and prototypes help stakeholders respond to concrete possibilities. Surveys can also suffer from selection bias, low response rates, and superficial answers. Teams therefore combine methods and confirm important findings through more than one form of evidence.
### Analysis and modelling
Analysis identifies conflicts, gaps, duplication, ambiguity, dependencies, risks, infeasible expectations, and unstated assumptions. It also defines priorities and evaluates trade-offs against value, safety, law, ethics, cost, schedule, technical feasibility, and acceptable risk.

Models make complex information easier to examine. Context diagrams clarify boundaries and external entities. Process, state, data, interaction, and interface models expose behaviours and dependencies. Scenarios and prototypes test operational ideas. Modelling supports analysis before the design is complete, and teams refine models as decisions develop.

Stakeholders often propose solutions when describing problems. Analysts should uncover the underlying outcome before accepting a design choice. A request for a particular screen, database, or device may reflect a need for faster access, lower error rates, or work in a difficult environment. The underlying need allows the team to compare better alternatives.
### Specification
Specification expresses requirements in a form that stakeholders and delivery teams can understand and assess. Natural language remains common, but diagrams, tables, models, data definitions, interface descriptions, and formal notation can add precision.

A well-formed requirement should be necessary, appropriate, unambiguous, complete, singular, feasible, verifiable, and correct. It should identify the required capability, quality, or constraint, together with relevant conditions and measurable criteria. Consistent terms and a controlled glossary reduce misunderstandings.
### Verification and validation
Requirements verification checks whether each requirement and the requirements set possess the required quality. Reviewers look for ambiguity, incompleteness, inconsistency, duplication, infeasibility, unverifiable language, missing units, undefined terms, and hidden design decisions.

Requirements validation checks whether the requirements represent stakeholder expectations, mission objectives, intended use, operational concepts, and constraints. Reviews, simulations, prototypes, walkthroughs, scenarios, and early test design can reveal incorrect or missing requirements before implementation.

Product verification and product validation answer different questions. Verification determines whether the implemented product conforms to specified requirements. Validation determines whether the product fulfils its intended use in its intended environment. Planning both activities while developing requirements improves testability and exposes weak acceptance criteria.

Reviewers should select perspectives that fit the risk. Users can assess workflows and terminology, architects can assess technical feasibility and interfaces, testers can assess measurability, and safety, security, legal, or operational specialists can examine their domains. Review records should identify findings, owners, decisions, and closure evidence. Useful measures include unresolved defects, volatile requirements, missing trace links, failed validation scenarios, and requirements without an agreed verification method. Counts alone do not demonstrate quality, so teams should interpret them alongside severity, context, and trends.
## Stakeholders and communication
A stakeholder can affect the system, contribute to it, use it, regulate it, pay for it, support it, maintain it, or experience benefits or harm from it. Relevant stakeholders may include acquirers, sponsors, customers, end users, operators, maintainers, developers, testers, suppliers, regulators, auditors, security specialists, safety specialists, support staff, and affected communities.

Labels such as primary and secondary or critical and minor depend on context. They should not automatically relegate regulators, users, maintainers, or affected people to a lower class. Teams can plan engagement by assessing influence, affectedness, legitimacy, urgency, knowledge, responsibility, and exposure to risk. Limited influence does not erase a legitimate need.

Stakeholder analysis records roles, interests, decision rights, knowledge, conflicts, availability, and preferred forms of communication. Teams should revisit the analysis when scope, personnel, regulations, suppliers, or operating conditions change.

Communication must remain two-way, tailored, and continuous. Workshops can build shared understanding, interviews can explore sensitive or specialised issues, demonstrations can gather feedback, and written reviews can create an auditable record. Visual models and prototypes often bridge differences in technical language. Analysts should confirm interpretations rather than assume that silence signals agreement.

Conflicting requirements require explicit resolution. Decision-makers should compare the alternatives against objectives, safety, law, ethics, user outcomes, feasibility, cost, schedule, and risk. They should document the decision, rationale, dissent, and consequences. A business preference cannot override a legal or safety obligation.
## Lifecycle integration
Requirements engineering operates within the chosen system or software life cycle. No universal sequence of seven stages applies to every project. Sequential, incremental, iterative, evolutionary, and hybrid approaches organise work differently, but each still needs requirements activities.

Sequential approaches establish substantial requirements before downstream development, although controlled feedback and change remain necessary. Iterative and incremental approaches refine requirements alongside architecture, implementation, and evaluation. Agile development welcomes changing requirements and uses frequent delivery and feedback, but it does not remove the need to analyse value, constraints, interfaces, quality, risks, or acceptance.

Teams should involve requirements, architecture, development, testing, operations, security, safety, and other relevant disciplines early. Concurrent work exposes feasibility and integration issues sooner than a strict hand-off between isolated phases. Requirements effort should match uncertainty and risk. Excessive early detail can lock in weak assumptions, while insufficient analysis can produce unstable scope and costly rework.
## Management, traceability, and baselines
Requirements management maintains requirements and related information across the life cycle. It controls identifiers, attributes, priorities, status, ownership, versions, relationships, approvals, and changes.

Bidirectional traceability connects stakeholder needs and sources to system requirements, architecture and design elements, implementation, verification methods, test results, and acceptance evidence. It helps teams assess change impact, detect missing coverage, justify requirements, and demonstrate compliance. Trace links should remain useful and current rather than becoming an administrative archive.

A requirements baseline is an approved, versioned, and configuration-controlled set of requirements for a defined scope or release at a specific point in time. It creates a stable reference for planning, design, procurement, verification, and accountability. It does not freeze requirements permanently.

After approval, proposed changes should enter a defined control process. The responsible authority evaluates the reason, value, affected stakeholders, dependencies, technical impact, cost, schedule, risk, and verification consequences. The authority then approves, rejects, defers, or requests further analysis. The record preserves the decision and updates the baseline, traceability, plans, and affected artefacts when necessary.
## Requirements specifications
An organisation should tailor a requirements specification to the system, audience, contractual context, risk, and governing standards. ISO/IEC/IEEE 29148:2018 provides current guidance for requirements engineering processes and information items. The ISO/IEC/IEEE 29148 series superseded the earlier IEEE 830 software requirements specification guidance.

A useful specification may include:
- Purpose, scope, objectives, and system context
- Stakeholders, users, roles, and operating concepts
- Definitions, acronyms, references, assumptions, and dependencies
- System boundaries, operational environments, and external interfaces
- Functional requirements, scenarios, and use cases
- Quality requirements and constraints
- Data, security, safety, privacy, regulatory, and transition requirements
- Verification methods, acceptance criteria, priorities, and traceability
- Open issues, owners, target dates, approval records, and revision history

The content should remain internally consistent and navigable. Unique identifiers support review, traceability, and change control. Tables and models can express complex relationships more clearly than long prose. Safety and security are technical, cross-cutting concerns, not administrative additions. Interface and data requirements deserve particular attention because integration failures often arise at system boundaries.
## Benefits and challenges
Sound requirements engineering clarifies value and scope, aligns stakeholders, exposes assumptions, supports feasibility analysis, guides architecture, improves estimates, and creates a basis for verification and acceptance. It reduces avoidable rework and lowers the risk of delivering unused features or overlooking essential qualities.

It cannot guarantee a defect-free system, a fixed cost, an exact schedule, or complete stakeholder satisfaction. Complex projects face evolving needs, conflicting interests, ambiguous language, emerging regulation, technology changes, legacy constraints, distributed teams, interface dependencies, and incomplete knowledge. Critical requirements may be mandatory because of safety, law, or mission objectives, but infeasible combinations require escalation, trade-off analysis, scope change, or a no-go decision.

The strongest response combines active stakeholder engagement, precise and testable requirements, early modelling and validation, explicit risk decisions, disciplined traceability, and controlled adaptation. These practices keep the system aligned with intended outcomes as evidence and circumstances evolve.
## Applied example
An automotive supply-chain renewal may connect dealerships, parts suppliers, materials suppliers, subcontractors, logistics providers, finance teams, and internal users. A team that retains a legacy back-end while introducing web services must understand existing functions, data, interfaces, workarounds, failure modes, and operational constraints before defining the target system.

The team can map the current and future contexts, identify affected stakeholders, elicit problems and outcomes, analyse conflicting practices, define interface and quality requirements, prototype critical workflows, and trace each approved requirement to design and test evidence. Incremental delivery can reduce integration risk, but each release still needs a controlled scope, acceptance criteria, and feedback from representative stakeholders. Teams should base discovery and delivery schedules on system complexity, evidence, capacity, dependencies, and risk, not arbitrary fixed periods.