# Requirements Engineering: Management and Traceability

Requirements engineering elicits, analyses, specifies, validates, and manages the needs and constraints that shape a system. It applies to hardware, software, services, and combined systems throughout their life cycles. Effective practice aligns development with stakeholder and business goals, provides a basis for estimating and acceptance, and reduces avoidable rework. It cannot, by itself, ensure that a project finishes on time or within budget.

Functional requirements describe capabilities and behaviour. Non-functional requirements define qualities or operating conditions, including performance, security, reliability, usability, and maintainability. Constraints limit the solution through technology, law, policy, standards, budgets, schedules, or interfaces. Teams keep these categories distinct where the distinction improves analysis, while managing their dependencies as one coherent set.

## Requirements management across the life cycle

Requirements management controls agreed requirements and their relationships as work evolves. Teams identify stakeholders and sources, elicit needs through techniques such as interviews, workshops, observation, and surveys, and then document requirements in clear, feasible, necessary, consistent, and verifiable terms. They resolve conflicts, prioritise requirements, define acceptance criteria, obtain appropriate agreement, and establish controlled baselines.

Requirements inform architecture, design, implementation, integration, verification, validation, deployment, operation, maintenance, and retirement. Life-cycle activities can overlap or repeat, especially in iterative and agile development, so requirements analysis does not always form the first discrete phase. Continuous management keeps requirements, designs, tests, plans, and user information consistent as knowledge changes.

Requirements validation asks whether the documented set represents the intended stakeholder needs and supports the proposed use. System verification asks whether the realised system satisfies specified requirements. Reviews bring together stakeholders, subject experts, analysts, architects, developers, testers, operators, and approval authorities to identify omissions, contradictions, infeasible demands, and unverifiable statements before they generate expensive downstream work.

Weak management allows ambiguous, missing, conflicting, obsolete, or unauthorised requirements to drive development. The resulting defects, scope growth, rework, delays, and cost increases can undermine stakeholder confidence. Strong management gives each participant a current, controlled view of what the system must achieve and why.

## Requirements traceability

Traceability establishes and maintains explicit relationships between requirements and related artefacts. Upstream links connect a requirement to its source, such as a stakeholder need, business objective, contract, regulation, assumption, or higher-level requirement. Downstream links connect it to architecture, design elements, implementation items, interfaces, test cases, verification results, releases, and user documentation. Bidirectional traceability lets a team navigate both upstream and downstream.

Relationship types need precise meanings. A parent-child link represents hierarchy or decomposition. A predecessor-successor link represents order or dependency, not hierarchy. Cross-system traceability connects shared requirements across interacting products or services. Teams should define each link type and use it consistently.

Each requirement benefits from a unique identifier and controlled attributes such as source, rationale, owner, priority, criticality, status, approval state, version, and verification method. Origin information explains who requested the requirement and why. Downstream information shows how the organisation designed, implemented, tested, and released it.

A requirements traceability matrix can present these relationships in tabular form. A connected repository usually handles larger or faster-changing projects more effectively. The representation remains useful only when teams maintain the links and check their quality.

A traceability strategy defines which artefact types require links, the permitted directions and meanings, the responsible roles, and the evidence needed at each decision point. It avoids indiscriminate linking, which creates maintenance effort without useful insight. Reviews can then test for missing, incorrect, suspect, or obsolete links and confirm that lower-level requirements collectively satisfy their parent need.

Traceability supports:

- Coverage analysis, which exposes requirements without implementation or verification evidence
- Change impact analysis across related requirements, interfaces, designs, tests, releases, and documentation
- Compliance and audit evidence
- Project status reporting and accountability
- Test planning, maintenance, and justified reuse

Traceability adds administrative cost, so the project should tailor its depth to complexity, risk, contractual obligations, and regulatory needs. Ownership, agreed conventions, regular reviews, and proportionate automation keep the information reliable.

## Requirements change control

Requirements change because stakeholders learn, markets and policies shift, defects emerge, technology imposes constraints, and verification reveals gaps. A controlled process accommodates valuable change without concealing its consequences.

One change can propagate through several life-cycle activities. Planning may need revised scope, estimates, milestones, and staffing. Architecture and design may need new allocations or interfaces. Implementation may require altered hardware, code, data, or procedures. Verification needs updated test cases and expected results. Deployment may need a different release plan, training package, migration, or operational instruction. Impact analysis identifies this ripple before commitment.

A sound change process:

1. Records the request, originator, rationale, affected requirement, and proposed outcome.
2. Analyses feasibility and effects on scope, value, architecture, interfaces, safety, security, compliance, cost, schedule, resources, tests, documentation, training, and other requirements.
3. Allows the authorised decision-maker or change body to approve, defer, batch, or reject the request under the project's governance model.
4. Records the decision and rationale, then updates the baseline, links, plans, estimates, designs, implementation items, tests, and supporting information.
5. Communicates the approved change, implements it under control, verifies the result, gathers relevant feedback, and closes the request.

The governance model determines the necessary approval authority and record. No universal rule requires every requirement change to receive a separately signed written approval. Agile teams may reprioritise a backlog frequently, but they still need clear authority, acceptance criteria, impact awareness, and an auditable history appropriate to their risk.

## Version and configuration control

Version control preserves the evolution of controlled requirements. Each revision should identify what changed, who changed it, when it changed, and why. Baselines mark approved sets for a defined release or decision point, while access controls prevent accidental or unauthorised alteration. Where the selected platform supports parallel work, branching and merging can isolate proposed changes before integration.

A linear revision history suits controlled sequential changes and makes chronology easy to inspect. Parallel versions support concurrent features, alternatives, or releases, but they require explicit ownership and disciplined reconciliation. Teams should compare proposed revisions with the active baseline, resolve conflicts, preserve approval status, and avoid implementing obsolete requirements.

Version history and traceability complement each other but perform different functions. Version history records changes to an item. Traceability records explicit relationships among needs, requirements, system elements, and evidence. A version-control system does not create those relationships unless the team defines and maintains the links.

## Requirements management tools

A suitable tool provides a central repository, unique identifiers, configurable attributes, controlled access, collaboration, baselines, change history, approvals, trace links, impact analysis, reporting, and audit records. Complex projects may also need hierarchical structures, reusable components, notifications, APIs, integration with modelling, development, issue, test, and document systems, and support for regulated workflows.

Selection should reflect project scale, risk, methods, integration needs, usability, security, support, total cost, and reporting obligations. A generic document or work-management platform can support simple, low-risk work. Cards, labels, and shared tables can represent requirements and coarse links, but they offer limited semantic control, coverage analysis, baseline management, and compliance evidence. Dedicated requirements platforms better suit complex, long-lived, or regulated systems.

No platform repairs an undefined process. Teams need common terminology, disciplined data entry, quality checks, clear ownership, and training. Automation can flag suspect links, propagate notifications, and generate coverage or status reports, but accountable people still assess meaning, approve changes, and resolve conflicts.

## Organisational adoption

An organisation replacing scattered documents should first define identifiers, attributes, link types, roles, approval rules, and measures of success. It should then evaluate tools against those needs, configure the chosen platform, clean and migrate existing information, train users, and run a bounded pilot. The pilot should test trace coverage, change turnaround, data quality, usability, integration, and reporting before wider deployment.

Phased rollout reduces disruption and gives teams time to correct the process. Ongoing reviews, ownership, training, and metrics keep the repository current. Centralisation improves access only when governance prevents duplicated, stale, or weakly linked information.
