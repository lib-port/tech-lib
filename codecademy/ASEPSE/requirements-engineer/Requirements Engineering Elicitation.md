# Requirements Elicitation
Requirements elicitation discovers stakeholder needs, goals, constraints, assumptions, risks, and knowledge about a system's operating environment. It supplies evidence for requirements analysis, specification, validation, and management. Effective elicitation improves shared understanding and reduces avoidable rework, but it cannot guarantee delivery on time, within budget, or without defects.

Elicitation involves more than collecting requests. Stakeholders may omit familiar activities, describe symptoms instead of causes, propose solutions instead of outcomes, or hold conflicting views. Analysts use structured inquiry, observation, models, and feedback to uncover and test the reasoning behind each statement. They then transform confirmed needs into requirements at the appropriate level.
## Purpose and lifecycle
Elicitation starts early and continues throughout the system life cycle. Teams revisit it when research exposes new needs, architecture reveals constraints, prototypes challenge assumptions, regulations change, or operational feedback identifies gaps. Iterative work replaces the false idea that analysts can identify every stakeholder and requirement once, then hand a finished package to developers.

The work seeks to establish:
- Stakeholder outcomes and measures of success
- The problem or opportunity and its underlying causes
- The system scope, boundary, context, and external interfaces
- Functional capabilities, quality expectations, and constraints
- Assumptions, dependencies, risks, conflicts, and uncertainties
- Priorities, acceptance conditions, sources, and rationale

Teams should separate a need from a proposed implementation. A request for a specific screen, card, or database may express a need for faster access, stronger security, or fewer errors. Preserving the underlying outcome allows the team to compare alternative solutions.
## Preparation
An elicitation plan defines the purpose, participants, topics, techniques, schedule, roles, recording method, and expected outputs. It also addresses consent, confidentiality, accessibility, cultural needs, stakeholder availability, and information security. High-risk or regulated systems normally require more formal evidence and review than low-risk changes.

Before a session, analysts should examine the business or mission objectives, current processes, relevant laws and policies, existing requirements, architecture, interface records, incident reports, user research, support data, and known constraints. Older documents remain useful clues, but analysts must compare them with current practice because workarounds and undocumented changes may have made them inaccurate.

Clear objectives prevent a technique from driving the enquiry. A survey cannot replace observation when the team needs to understand physical work, and a workshop cannot replace confidential interviews when power differences inhibit discussion. Teams combine methods to offset their individual limitations.
## Stakeholders
A stakeholder can affect the system, contribute to it, regulate it, fund it, operate it, support it, maintain it, or experience benefit or harm from it. Relevant groups may include customers, end users, operators, maintainers, sponsors, decision-makers, developers, testers, suppliers, regulators, auditors, security and safety specialists, support teams, and affected communities.

Influence does not determine whether a stakeholder counts. People with little organisational power may face the greatest consequences. Teams should identify stakeholders by examining the whole life cycle, external interfaces, decisions, risks, and operating contexts. They should revisit the analysis as the project and environment change.

Stakeholder analysis records each group's interests, knowledge, responsibilities, decision rights, availability, communication needs, and exposure to risk. It also identifies missing perspectives, conflicts, and power imbalances. Representative participation can keep large programmes workable, but sampling must not erase legitimate voices. Facilitators should create conditions in which participants can disagree safely and dominant attendees cannot silence others.
## Elicitation techniques
Technique selection depends on the question, audience, risk, time, access, and evidence already available.

| Technique | Best use | Main caution |
| --- | --- | --- |
| Interviews | Exploring specialised, sensitive, or individual perspectives in depth | Interviewer assumptions and inconsistent questioning can bias findings |
| Workshops | Building shared understanding, resolving conflicts, modelling processes, and refining requirements | Poor facilitation can let status or personality dominate |
| Brainstorming | Generating alternatives before evaluation | Early criticism or solution fixation can narrow the option space |
| Focus groups | Examining reactions and differences among selected participants | Group pressure and weak sampling can distort apparent agreement |
| Surveys | Collecting comparable information from a defined population | Ambiguous questions, non-response, and selection bias can weaken conclusions |
| Observation | Discovering real workflows, exceptions, tacit knowledge, and environmental constraints | Observation requires consent and may alter participant behaviour |
| Document analysis | Recovering rules, interfaces, history, incidents, and current commitments | Documents may be incomplete, obsolete, or inconsistent with practice |
| Interface analysis | Identifying exchanges among people, processes, devices, and external systems | Hidden ownership and error paths often escape the first review |
| Scenarios and prototypes | Testing assumptions, workflows, terminology, and alternative designs | Stakeholders may mistake an illustrative design for a final commitment |

Questionnaires should start with a defined objective, target population, and analysis plan. Designers should use plain, neutral questions, avoid double-barrelled items, provide suitable response options, and pilot the instrument with representative respondents. Accessible formats, privacy controls, and an appropriate length improve participation. Analysts should interpret rankings alongside stakeholder context, safety, law, dependencies, feasibility, and risk. They should not ask respondents to write formal system requirements without support.

Interviews may use a shared guide while allowing follow-up questions. Interviewers should confirm significant interpretations with participants. Workshops need an agenda, a neutral facilitator, time limits, decision rules, and visible records of agreements and unresolved issues. Observation can be passive or interactive, but analysts should avoid unannounced site visits and respect operational safety and privacy.
## System boundaries, models, and prototypes
The system boundary separates the system of interest from its environment. The context boundary separates relevant parts of that environment from unrelated surroundings. Teams define both early enough to guide scope and stakeholder identification, then refine them as evidence develops. A boundary decision assigns responsibility, so teams should record its rationale and consequences.

Context analysis identifies external people, organisations, systems, devices, events, data, resources, and rules that interact with or constrain the system. Context diagrams, data-flow models, use cases, process maps, state models, interface inventories, and operational scenarios can reveal omissions and conflicting assumptions. Domain or class models may clarify concepts and relationships, but they do not establish the system boundary by themselves.

Prototypes make assumptions concrete and invite early feedback. Low-fidelity sketches and storyboards can test concepts cheaply. Throwaway prototypes explore a question, then teams discard them. Evolutionary prototypes develop towards an operational product, so teams must apply suitable architecture, security, quality, and engineering controls from the outset.

Teams should state a prototype's purpose, fidelity, limitations, and disposal plan. They should test the riskiest assumptions rather than polish irrelevant detail. Prototypes support requirements validation by showing whether proposed behaviours address stakeholder needs. They do not, by themselves, verify requirement quality or prove that the delivered product conforms to its specification.
## Analysis, documentation, and validation
Analysts organise elicited information, remove duplication, expose gaps, resolve terminology, and examine feasibility. They compare conflicts against objectives, safety, law, ethics, user outcomes, cost, schedule, technical constraints, and acceptable risk. A decision record should preserve the rationale and any dissent.
### Converting evidence into requirements
Analysts should not copy every stakeholder statement directly into a specification. They first identify whether the statement expresses a goal, need, problem, assumption, constraint, design preference, or requirement. They then clarify its source, context, purpose, and consequences. When several sources describe the same need differently, analysts should reconcile the terminology without discarding meaningful differences among roles or environments.

Functional requirements state the capabilities or behaviours that the system must provide. Quality requirements set measurable expectations for attributes such as performance, reliability, security, usability, maintainability, and scalability. Constraints limit the solution through laws, policies, standards, interfaces, technology, cost, schedule, or physical conditions. Analysts should replace vague words such as fast, easy, flexible, and secure with defined measures and operating conditions.

Requirements should describe the necessary outcome and avoid premature design detail unless a justified constraint requires a particular implementation. They should also cover abnormal conditions, failures, recovery, access needs, data handling, and external interfaces. Negative requirements can define prohibited outcomes, but they still need precise conditions and a practical verification method.

Documentation should distinguish raw evidence, stakeholder needs, stakeholder requirements, system requirements, assumptions, and design ideas. Each approved requirement should have a unique identifier, source, rationale, priority, status, owner, acceptance or verification method, and relevant trace links. Notes should also record open questions, decisions, dependencies, and follow-up actions.

Requirement verification checks whether requirements are necessary, clear, complete, consistent, feasible, singular, and verifiable. Requirement validation checks whether the set accurately reflects stakeholder needs, intended use, objectives, operational concepts, and constraints. A requirement may allow several technical solutions and still be valid. Multiple interpretations signal ambiguity and require correction.

Reviews, scenarios, models, prototypes, simulations, and early test design support validation. Later product tests assess whether the implemented system satisfies specified requirements. Stakeholder approval provides important evidence, but approval does not replace feasibility, safety, legal, or quality analysis.
### Prioritisation and change
Prioritisation considers value, urgency, safety, legal obligation, risk reduction, uncertainty, technical dependency, cost, and effort. Voting and point allocation can reveal preferences, but they should not let a majority override statutory duties or the needs of people who face serious harm. Decision-makers should define each priority category and identify who can approve trade-offs.

Requirements can change when stakeholders learn, operating conditions shift, or technical work exposes constraints. Teams should assess each proposed change against scope, interfaces, architecture, cost, schedule, risk, tests, and affected stakeholders. Bidirectional traceability connects needs to requirements, design elements, implementation, and verification evidence, which makes impact analysis more reliable. Controlled change supports learning without allowing unmanaged scope growth.
## Conducting an elicitation session
A disciplined session follows a simple cycle:
1. The facilitator confirms the purpose, scope, participants, roles, agenda, terminology, constraints, and recording arrangements.
2. The facilitator explains how the team will use the information and establishes respectful discussion rules.
3. Participants describe goals, current work, problems, exceptions, interfaces, desired outcomes, and constraints.
4. The analyst probes assumptions, examples, frequencies, consequences, quality expectations, and edge cases.
5. The group uses models or prototypes where they improve understanding and records conflicting views without forcing false consensus.
6. The facilitator summarises decisions, uncertainties, priorities, owners, and next actions before closing.
7. The analyst distributes an accurate record, confirms interpretations, updates traceability, and schedules further work.

Follow-up remains part of elicitation. New evidence may change earlier conclusions, and non-participants may identify missing needs. Teams should control the resulting changes while continuing to learn.
## Benefits and challenges
Good elicitation clarifies scope, uncovers tacit needs, improves collaboration, supports estimates and priorities, strengthens traceability, and gives validation and acceptance a sound basis. It can reduce confusion, unnecessary features, and avoidable defects.

Common challenges include incomplete knowledge, changing conditions, conflicting goals, unavailable users, language barriers, distributed teams, legacy constraints, weak documentation, survey bias, technology uncertainty, and scope pressure. Teams respond through varied evidence sources, inclusive engagement, skilled facilitation, explicit assumptions, early validation, and controlled change. They should align technology choices with needs and constraints, not chase trends without a justified outcome.
## Applied example
An access-control project can use a survey to compare user groups, identify desired capabilities, rank competing outcomes, and measure response burden. Analysts should pilot the questions, interpret negative preferences carefully, and confirm findings through interviews, observation, and security analysis before specifying access rules.

An e-commerce renewal may involve customers, sales, marketing, support, finance, fulfilment, suppliers, security specialists, and regulators. The team can combine interviews, customer research, service data, competitor analysis, interface review, and prototype testing. Analysts then categorise, prioritise, document, and validate the resulting needs before and during incremental delivery.

A prioritisation scheme such as must, should, could, and will not include in the current release can support planning. The team should also record rationale, dependencies, risk, and decision authority. Frequent communication helps resolve ambiguity and change, but it does not guarantee satisfaction or project success.