# Business Analysis: Process Modelling and Requirements Elicitation

> [!NOTE]
> Explains how business analysts use BABOK-aligned planning, elicitation, requirements management, agile practices, process modelling and evidence-based improvement to deliver valuable organisational change.

Business analysis defines needs, recommends valuable change and helps organisations evaluate outcomes. Effective analysis connects strategy, stakeholders, requirements, designs, delivery and benefits through clear decisions and verifiable evidence.

## Business analysis and the BABOK Guide

The International Institute of Business Analysis publishes A Guide to the Business Analysis Body of Knowledge, commonly called the BABOK Guide. Its knowledge areas, tasks, techniques, underlying competencies and perspectives provide a shared professional framework. The framework describes adaptable practices rather than a fixed project method.

### Business Analysis Core Concept Model

The Business Analysis Core Concept Model connects six concepts that analysts consider together throughout an initiative:

| Concept | Focus |
| --- | --- |
| Change | The act of transformation in response to a need |
| Need | A problem, opportunity or constraint with potential value |
| Stakeholder | A group or individual connected to the change, need or solution |
| Value | The worth or usefulness of an outcome to a stakeholder in context |
| Solution | A specific way of satisfying one or more needs |
| Context | The circumstances that influence, and receive influence from, the change |

The analyst records the concepts early and revisits them when evidence, scope or stakeholder expectations change.

### Business analysis planning and monitoring

Planning establishes how analysis will proceed, who will participate, how decisions will occur and how the organisation will control information.

| Task | Key decisions |
| --- | --- |
| Plan the business analysis approach | Delivery approach, timing, activities, techniques and outputs |
| Plan stakeholder engagement | Stakeholder roles, influence, communication, participation and decision points |
| Plan business analysis governance | Decision authority, approvals, prioritisation and change control |
| Plan business analysis information management | Storage, access, ownership, versioning, traceability and retention |
| Identify performance improvements | Measures, review methods and improvements to analysis practice |

Predictive approaches suit work that can define substantial scope before delivery. Adaptive approaches support frequent learning and incremental delivery. Hybrid approaches combine elements of both. The analyst selects an approach according to uncertainty, risk, regulation, organisational capability and delivery needs.

Useful performance measures include avoidable rework, review cycle time, requirement defects, stakeholder participation and decision delays. A measure should support improvement rather than reward document volume or encourage superficial compliance.

### Elicitation and collaboration

Elicitation discovers information from stakeholders, documents, systems, data and observation. Collaboration develops shared understanding and supports timely decisions.

Common techniques include:

- Interviews for detailed individual perspectives
- Workshops for collective analysis and decision-making
- Observation for actual work practices and exceptions
- Surveys for structured input from larger groups
- Document analysis for policies, rules and historical evidence
- Prototypes for early feedback on concepts and interactions
- Data analysis for volumes, trends, performance and variation

The analyst records decisions, actions, assumptions and unresolved questions after each activity. Stakeholders then confirm interpretations before the analyst treats them as approved requirements.

### Requirements analysis and design definition

Requirements Analysis and Design Definition turns elicited information into coherent requirements and viable design options. The analyst specifies and models requirements, verifies their quality, validates their relevance, defines design options and recommends a solution.

Verification examines whether a requirement or model is clear, consistent, complete enough for its purpose, feasible and testable. Validation examines whether it represents a genuine need and supports the intended value. Neither activity replaces stakeholder authority or specialist assurance.

The analyst compares options against consistent criteria, such as:

- Expected value and strategic alignment
- Feasibility and organisational readiness
- Cost and time
- Risk, privacy, security and compliance
- Dependencies and integration
- Accessibility and user impact
- Operational support and sustainability

### Requirements life cycle management

Requirements life cycle management maintains requirements and designs from their origin until the organisation retires them.

Traceability links needs, sources, requirements, designs, delivery items, tests and outcomes. Stable identifiers and controlled relationships support impact analysis when a change occurs.

Prioritisation considers value, urgency, risk, dependency, cost and feasibility. MoSCoW classifies items for an agreed scope or timebox:

| Category | Meaning |
| --- | --- |
| Must Have | The agreed outcome cannot succeed without the item |
| Should Have | The item is important, but a viable workaround or deferral exists |
| Could Have | The item is desirable if capacity permits |
| Won't Have this time | The item is outside the current commitment |

The team defines each category, agrees who assigns it and records the consequence of omission. Change control then identifies a proposed change, assesses its effects, assigns a decision-maker and records the outcome. The level of formality should reflect risk and governance needs.

### Strategy analysis and solution evaluation

Strategy analysis connects a need with organisational direction. It examines the current state, defines a future state, assesses risks and develops a change strategy.

Solution evaluation compares actual performance with agreed measures. The analyst examines benefits, limitations, unintended effects and organisational constraints. Recommendations may improve the solution, strengthen supporting processes, address capability gaps or retire features that no longer create sufficient value.

Measures should exist before implementation where possible. Quantitative measures may include cost, cycle time, throughput, error rate and adoption. Qualitative evidence may include usability findings, stakeholder confidence and user experience. The organisation should interpret both forms of evidence in context.

### Perspectives and tools

BABOK perspectives provide context-specific guidance for agile work, business intelligence, information technology, business architecture and business process management. An initiative may draw on several perspectives when its context requires them.

Tools support the work but do not determine the analysis approach:

| Purpose | Tool category |
| --- | --- |
| Documentation | Word processing and collaborative knowledge platforms |
| Data analysis | Spreadsheets, query tools and statistical platforms |
| Requirements control | Backlog, requirements and application lifecycle management platforms |
| Visual modelling | Diagramming and specialist modelling platforms |
| Reporting | Business intelligence and data visualisation platforms |
| Collaboration | Meeting, messaging and shared-work platforms |

The organisation should define ownership, access, naming, versioning and retention before it treats a tool as an authoritative repository.

## Agile analysis and system modelling

### Unified Modeling Language

Unified Modeling Language, or UML, is a standard graphical language for visualising, specifying, constructing and documenting systems. Teams select UML diagrams according to the question they need to answer.

| Diagram family | Examples | Purpose |
| --- | --- | --- |
| Structural | Class, component and deployment diagrams | Represents the elements and organisation of a system |
| Behavioural | Use case, activity and state machine diagrams | Represents behaviour and changes in state |
| Interaction | Sequence and communication diagrams | Represents exchanges between participants over time |

An actor represents a role played by a person, organisation, device or external system that interacts with the subject. A use case represents behaviour that helps an actor achieve a goal. A class defines a set of objects with common features, while an object represents an instance with specific values.

### Use cases and actors

A use case description provides more detail than a use case diagram. A useful description contains:

- Goal-based title
- System boundary and scope
- Primary and supporting actors
- Preconditions and trigger
- Main success flow
- Alternative flows
- Exception and recovery flows
- Postconditions
- Related business rules and requirements

The analyst writes one observable action per step and states who performs it. The analyst avoids interface detail unless it constrains the requirement.

For a purchase use case, the main flow may cover product selection, cart review, delivery details, payment and confirmation. Alternative flows may cover an unavailable item or a changed delivery method. Exception flows may cover rejected payment, a failed service or an interrupted session.

Actors represent roles, not job titles or named people. The analyst identifies actors by defining the system boundary, listing external participants, identifying their goals and validating the result with stakeholders.

### Use case diagrams

A UML use case diagram places actors outside the subject boundary and use cases inside it. Associations show participation. An include relationship represents required behaviour that a base use case incorporates. An extend relationship represents conditional behaviour added at defined extension points.

The diagram should provide a high-level view of scope. Detailed steps, rules and exceptions belong in supporting descriptions rather than crowded diagram labels.

### User stories and acceptance criteria

User stories describe a need from a user's perspective. Teams often use a role-capability-benefit form:

```text
[Role] needs [capability] to achieve [benefit].
```

The format does not make a story complete. Conversation, examples and acceptance criteria supply the detail needed for shared understanding. Given, When, Then is one useful structure for examples, but teams may use any form that produces clear and testable conditions.

The INVEST heuristic checks whether a story is Independent, Negotiable, Valuable, Estimable, Small and Testable. It guides discussion rather than setting an absolute compliance test.

### Product backlog refinement

In Scrum, the Product Backlog is an emergent, ordered list of what the team needs to improve the product. Refinement is an ongoing activity that breaks items into smaller, more precise items and adds details such as description, order and size. Scrum does not prescribe user stories, story points or planning poker.

The Product Owner remains accountable for effective Product Backlog management. Developers remain responsible for sizing the work. The Scrum Team decides how and when refinement occurs.

A practical refinement activity may:

1. Confirm an item's connection to the Product Goal.
2. Clarify the need, outcome, assumptions and dependencies.
3. Split work that is too large for an intended Sprint.
4. Add examples and acceptance criteria.
5. Order items according to value, risk and learning needs.
6. Size items using the team's chosen method.

### Scrum events

Scrum defines formal events rather than generic ceremonies.

| Event | Purpose and timebox |
| --- | --- |
| Sprint | Creates a usable Increment and lasts one month or less |
| Sprint Planning | Establishes why the Sprint is valuable, what can be done and how the work will occur. The maximum is eight hours for a one-month Sprint and shorter Sprints usually require less time |
| Daily Scrum | Allows Developers to inspect progress towards the Sprint Goal and adapt the Sprint Backlog. It lasts 15 minutes |
| Sprint Review | Inspects the Sprint outcome with stakeholders and considers future adaptations |
| Sprint Retrospective | Plans ways to improve quality and effectiveness |

The Scrum Guide does not require a three-question Daily Scrum format. Developers select any structure that focuses on the Sprint Goal and produces an actionable plan.

### Delivery life cycles

A software development life cycle describes the work needed to plan, analyse, design, build, test, deploy, operate and retire a software solution. Organisations arrange these activities differently.

| Approach | Characteristics |
| --- | --- |
| Sequential | Work progresses through defined stages with controlled feedback and change |
| Iterative and incremental | Teams learn through repeated cycles and deliver in increments |
| Risk-driven spiral | Teams repeat planning, risk analysis, engineering and evaluation around significant risks |
| Hybrid | The organisation combines approaches across governance, discovery and delivery |

Agile is a set of values and principles, not one life cycle or a synonym for Scrum.

### Entity relationship and data flow diagrams

An entity relationship diagram represents data entities, attributes and relationships. A data flow diagram represents processes, data flows, data stores and external entities. The diagrams answer different questions and should use a consistent notation.

An entity relationship diagram clarifies what data exists and how it relates. A data flow diagram clarifies how information enters, moves through and leaves a system. Neither diagram represents process timing or user interface behaviour.

## Process modelling and improvement

### Purpose and scope

Process models make work visible. A useful model defines its purpose, audience, boundaries, level of detail, notation, owner and review status.

The analyst develops a current-state model from evidence rather than policy alone. Interviews reveal perspectives, observation reveals actual practice, documents reveal formal controls and operational data reveals frequency and performance.

### Select a suitable representation

| Representation | Suitable use |
| --- | --- |
| Flowchart | Simple sequences and decisions |
| Cross-functional flowchart | Activities and hand-offs across roles or teams |
| SIPOC | High-level Suppliers, Inputs, Process, Outputs and Customers view |
| Value stream map | Flow, lead time, processing time and waste across a value stream |
| BPMN | Standard process and collaboration models with events, activities, gateways and messages |

A swimlane is an organising feature that groups activities by responsibility. It can appear in a flowchart or BPMN model. It is not a separate process language.

### Build and validate a process model

1. The analyst defines the first and last points within scope.
2. The analyst identifies participants, events, activities, decisions, information and systems.
3. The analyst drafts the model at the level required by its audience.
4. Process participants walk through normal, alternative and exception scenarios.
5. The analyst corrects ownership, sequence, conditions and terminology.
6. The accountable owner approves and versions the model.

Every decision should have explicit outcomes. Every hand-off should identify the sender, receiver and information transferred. A model should also distinguish confirmed practice from assumptions or proposed changes.

### Business Process Model and Notation

Business Process Model and Notation, or BPMN, standardises the representation of business processes and collaborations.

| Element | Function |
| --- | --- |
| Event | Represents something that happens, such as a trigger, interruption or outcome |
| Activity | Represents work performed as a task or subprocess |
| Gateway | Controls divergence and convergence of flow |
| Sequence flow | Shows the order of flow within one pool |
| Message flow | Shows communication between separate participants or pools |
| Pool | Represents a participant in a collaboration |
| Lane | Organises activities within a pool |
| Data object | Shows data used or produced by an activity |

A sequence flow may cross lane boundaries but cannot cross a pool boundary. A message flow connects separate participants. Data associations connect data with activities or events without controlling execution order.

### Advanced BPMN behaviour

- A collapsed subprocess hides lower-level detail while preserving the higher-level flow
- An exclusive gateway selects one path according to conditions
- A parallel gateway creates or synchronises concurrent paths
- An inclusive gateway activates one or more paths whose conditions hold
- An event-based gateway selects a path according to the event that occurs first
- A boundary event handles an event associated with an activity

The modeller should not use a gateway where ordinary sequence flow already expresses the behaviour clearly. BPMN models also require defined event types and conditions when those details affect interpretation or execution.

### Select and govern modelling tools

Tool selection should consider:

- Support for the required notation and validation
- Ease of use for authors and reviewers
- Real-time and asynchronous collaboration
- Versioning, approvals and access control
- Export and interchange formats
- Integration with delivery and repository tools
- Accessibility, cost, support and vendor viability

General diagramming tools support rapid communication. Specialist platforms add notation validation, repositories, process architecture and governance. The team should select the lightest tool that satisfies the required control.

### Identify inefficiency with evidence

Common patterns include:

- Queues and long waiting times
- Rework and repeated data entry
- Unnecessary approvals or hand-offs
- Unclear decision authority
- Variation without a valid business reason
- Manual processing of stable, high-volume rules
- Missing information and status visibility
- Capacity constraints and scarce skills

The analyst confirms the frequency, cause and effect of each issue before recommending a change. A visible delay may result from demand variation, policy, system performance, upstream defects or capacity. The model alone does not establish the cause.

### Analyse causes and options

1. The analyst defines the problem, scope and baseline.
2. The analyst maps the current process and collects performance evidence.
3. Stakeholders identify possible causes and constraints.
4. The analyst tests causes against data and direct evidence.
5. The team develops options and compares their likely effects.
6. The organisation pilots or implements the selected option.
7. The analyst monitors results and unintended effects.

The five whys technique can reveal a plausible causal chain, but it does not prove a single root cause. The analyst should test the chain and consider interacting causes.

For example, late loan processing may appear to result from delayed documents. Further analysis may link the delay to unclear instructions and weak ownership of document updates. The organisation should verify that explanation against records, process participants and other possible causes before changing governance.

### Improve and redesign processes

| Approach | Primary focus |
| --- | --- |
| Lean | Improves flow and removes activity that does not create necessary value |
| Six Sigma | Reduces defects and variation through disciplined measurement and analysis |
| Business process redesign | Changes selected process components to improve outcomes |
| Business process re-engineering | Fundamentally rethinks a process when incremental change cannot achieve the required outcome |

An improvement objective should state a baseline, target, population and time period. A team might aim to reduce median peak-period waiting time from 10 minutes to 5 minutes within three months while maintaining service quality and control effectiveness.

Radical redesign can introduce cost, disruption and control failure. Stakeholder involvement, pilot testing, training, cutover planning and post-implementation monitoring reduce those risks.

### Automate stable work with controls

Automation suits work with sufficient volume, stable rules, reliable data and manageable exceptions. It should not preserve a flawed process or obscure accountability.

| Automation type | Function |
| --- | --- |
| Workflow automation | Routes work and triggers actions according to defined conditions |
| Robotic process automation | Uses software to perform repeatable interface interactions |
| System integration | Exchanges data or invokes services between systems |
| Decision automation | Applies explicit rules or approved models to defined decisions |

An automation assessment examines value, exception rate, process stability, data quality, security, privacy, accessibility, resilience, monitoring and human override. Testing should cover normal paths, boundary conditions, failures, recovery and audit records.

Business process management is a discipline for governing, modelling, executing, monitoring and improving processes. It is broader than automation software.

## Requirements elicitation and management

### Identify and analyse stakeholders

Stakeholder analysis starts with the relationship to the need and change, not a generic organisation chart. The analyst considers who experiences the problem, owns the outcome, performs the work, supplies information, builds or operates the solution, controls risk and receives an effect.

An influence-interest grid can guide engagement:

| Influence | Interest | Typical engagement |
| --- | --- | --- |
| High | High | Collaborate closely and involve in key decisions |
| High | Low | Maintain sufficient involvement for governance and timely decisions |
| Low | High | Consult and keep informed about relevant effects |
| Low | Low | Monitor and communicate when circumstances change |

The grid does not determine whose needs count. People with low organisational power may experience the greatest effect and require deliberate representation. The analyst reviews the stakeholder list as scope, evidence and influence change.

### Select elicitation techniques

No fixed number of techniques suits every initiative. The analyst selects a combination according to purpose, risk, accessibility, stakeholder availability, sensitivity, time and evidence quality.

| Technique | Strength | Limitation to manage |
| --- | --- | --- |
| Interview | Depth, context and sensitive discussion | Individual perspective and interviewer influence |
| Workshop | Shared discovery and rapid resolution | Group dynamics and scheduling |
| Observation | Actual behaviour, exceptions and workarounds | Observer effect, privacy and limited sample |
| Survey | Broad and structured input | Response bias and limited explanation |
| Prototype | Concrete feedback on concepts | Premature attachment to a design |
| Document analysis | Formal rules and historical context | Outdated or incomplete records |
| Data analysis | Scale, frequency and performance | Data quality and missing context |

Triangulation compares findings from different sources. Agreement increases confidence, while disagreement identifies a question for further analysis.

### Conduct interviews

Structured interviews use consistent questions. Semi-structured interviews combine prepared questions with follow-up exploration. Unstructured interviews suit early discovery when the analyst has limited knowledge.

The analyst prepares by defining the objective, participant role, topics, evidence needed and privacy arrangements. Open questions encourage explanation. Specific probes seek examples, frequency, consequences and exceptions. Neutral wording avoids suggesting a preferred answer.

Useful questions include:

- What happens from the initial request to completion?
- How does the team assign priority when demand exceeds capacity?
- Which exceptions occur most often?
- What evidence shows that the current process succeeds or fails?
- Which rules constrain a different approach?

The analyst confirms key points during the interview, records unresolved questions and validates the structured notes afterwards. Recording requires appropriate authority, notice and consent where applicable.

### Observe work responsibly

Observation reveals workarounds, interruptions, informal coordination and environmental constraints. Direct observation watches the work. Contextual inquiry combines observation with questions. Shadowing follows a participant across activities and time.

The analyst defines the purpose and sampling approach before observation. Participants should understand what the organisation will observe, record, use, retain and share. The organisation should protect personal and sensitive information and avoid unnecessary collection.

The analyst records behaviour and context without treating interpretation as fact. A debrief allows participants to explain why an observed action occurred.

### Design surveys

A survey should connect every question to an analysis objective or decision. The analyst identifies the target population, sampling approach, response scale, privacy requirements and analysis method before distribution.

Good survey design uses neutral wording, mutually exclusive response options where required, balanced scales and a logical order. The survey should remain as short as the purpose allows. A pilot with representative participants can reveal confusing wording, accessibility barriers and technical faults.

Response rate alone does not establish representativeness. The analyst considers non-response, self-selection, sample coverage and subgroup differences before generalising findings. Incentives should remain proportionate and should not pressure participation.

### Use prototypes for learning

Low-fidelity prototypes, such as sketches and wireframes, support rapid exploration. High-fidelity prototypes provide realistic interaction for usability assessment. Throwaway prototypes exist to answer questions and are then discarded. Evolutionary prototypes develop into part of the solution under appropriate engineering control.

The analyst defines the learning objective, participants and success criteria before a session. Stakeholder feedback updates requirements and design decisions. The organisation should label prototypes clearly so participants do not mistake them for approved or production-ready solutions.

### Classify requirements correctly

BABOK defines four main requirement types:

| Type | Purpose |
| --- | --- |
| Business requirement | States a goal, objective or outcome that explains why change began |
| Stakeholder requirement | Describes a stakeholder need that supports a business requirement |
| Solution requirement | Describes a capability or quality of a solution |
| Transition requirement | Describes a temporary capability needed to move from the current state to the future state |

Solution requirements include functional requirements and quality requirements, which are often called non-functional requirements. Legal, regulatory and policy obligations can shape any requirement type. They should remain traceable to their authoritative source rather than form an unsupported category by default.

Quality requirements should include measurable conditions where feasible. Performance may specify response time and load. Availability may specify the service period and target. Security, privacy, usability, accessibility, resilience and maintainability also require defined evidence for acceptance.

### Document high-quality requirements

A high-quality requirement is necessary, clear, concise, feasible, testable and traceable. The analyst uses consistent terminology, stable identifiers and one controlled source.

Acceptance criteria state observable conditions for acceptance. They complement a requirement but do not replace its rationale, source, dependencies or business rules.

Models can clarify complex behaviour, data and rules. The analyst keeps textual and visual artefacts consistent and records which source takes precedence if a conflict occurs.

### Prioritise transparently

The team agrees on criteria and decision authority before prioritisation. Suitable methods include:

- MoSCoW for commitment within an agreed scope or timebox
- Weighted scoring for comparison across defined criteria
- Kano analysis for different forms of customer response
- Pairwise comparison for relative ordering
- Fixed-budget allocation for revealing stakeholder preferences

Priority does not equal delivery sequence. Dependencies, risk reduction, learning and capacity may change the order of implementation.

### Maintain traceability

Forward traceability follows a need or requirement into designs, delivery items, tests and outcomes. Backward traceability follows a downstream artefact to its approved source. Bidirectional traceability supports both directions.

Traceability should be proportionate to risk. Regulated, safety-critical or complex work may require formal relationship types and baselines. Lower-risk work may use controlled links in a backlog platform. Consistent practice is more important than a particular tool.

### Facilitate workshops

1. The facilitator defines the objective, scope, participants and decisions.
2. Participants receive preparatory information and participation expectations.
3. The facilitator uses a timed agenda and suitable collaborative techniques.
4. A recorder captures evidence, assumptions, decisions and actions.
5. The decision-maker confirms outcomes and unresolved issues.
6. The analyst distributes the record and updates controlled artefacts.

Effective facilitation balances participation, distinguishes evidence from opinion and prevents seniority from becoming the only basis for a decision. Accessibility arrangements should allow every participant to contribute.

### Apply systems thinking

A business system includes interacting people, processes, information, technology, controls and environmental factors. Systems analysis examines boundaries, inputs, activities, outputs, feedback, relationships and external influences.

The analyst considers how a proposed improvement changes incentives, workload, information flow, controls and other parts of the system. Local optimisation can shift delay or risk elsewhere, so evaluation should cover the broader outcome.

Business rules define or constrain aspects of the organisation. The analyst identifies their source, owner, scope and exceptions, then translates approved rules into testable specifications or decision models.

## Practice checklist

- The analysis approach reflects uncertainty, risk and governance
- The stakeholder list represents affected groups as well as formal authority
- Elicitation uses suitable and accessible techniques
- Sources, assumptions and decisions remain distinguishable
- Requirements use stable identifiers and testable wording
- Priorities have agreed criteria and decision authority
- Models use consistent notation and defined boundaries
- Traceability connects needs, requirements, delivery and tests
- Process changes rely on evidence and measurable baselines
- Automation includes exceptions, controls, monitoring and recovery
- Stakeholders validate needs and the accountable owner approves decisions
- Evaluation compares outcomes with agreed measures
