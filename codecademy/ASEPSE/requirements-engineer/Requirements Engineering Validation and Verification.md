# Requirements Engineering: Validation and Verification
Requirements engineering turns stakeholder needs, intended uses, constraints, and risks into an agreed basis for design, implementation, and acceptance. Verification and validation provide different forms of evidence about that basis. Teams apply both activities throughout the life cycle and repeat them when requirements or operating conditions change.
## Verification and validation
Requirements verification checks whether each requirement and the complete requirements set conform to defined quality rules. A verified requirement uses clear language, expresses one need, identifies necessary conditions, avoids unintended design decisions, and permits objective verification. The set should be complete, consistent, feasible, traceable, and suitable for its level of detail.

Requirements validation checks whether the requirements represent stakeholders' real needs and support the intended use in the intended operating environment. It examines whether the proposed system would solve the right problem, deliver the required outcomes, and respect relevant constraints.

These activities differ from product verification and product validation. After implementation, product verification provides evidence that the system conforms to its specified requirements. Product validation provides evidence that the system fulfils its intended purpose in its operational context. Neither activity belongs to only one project phase.

Stakeholder approval can establish a requirements baseline, but approval alone does not prove validity. Teams need evidence from analysis, reviews, prototypes, models, demonstrations, tests, or other appropriate methods.
## Quality checks
Teams evaluate individual requirements for:
- necessity and relevance to an identified stakeholder need or obligation
- clarity, singularity, and freedom from ambiguity
- feasibility within technical, cost, schedule, legal, and operational constraints
- objective acceptance or verification criteria
- correct allocation to the appropriate system level
- bidirectional traceability to sources and downstream work

They evaluate the requirements set for completeness, consistency, suitable terminology, interface coverage, and balanced treatment of functional behaviour and quality attributes. Quality attributes can include performance, reliability, safety, security, privacy, maintainability, accessibility, and usability. Absolute claims such as "secure", "fast", or "user-friendly" need measurable conditions and thresholds.

A useful requirement normally carries a unique identifier, source, rationale, priority, status, allocation, dependencies, acceptance criteria, and planned verification method. These attributes support governance without replacing a well-written requirement. Teams define terms in a shared glossary and use units, ranges, tolerances, and operating conditions consistently. They distinguish genuine needs from proposed solutions unless a binding constraint requires a particular design.

Completeness does not mean recording every possible wish. The set must cover the agreed scope, relevant modes and states, interfaces, normal and abnormal paths, data, quality attributes, external obligations, and operational support. Consistency means that requirements can operate together without logical or resource conflicts. Feasibility considers available technology, skills, budget, schedule, and physical or organisational limits. Verifiability requires a practical way to obtain objective evidence.
## Techniques and evidence
Reviews range from informal walkthroughs to structured inspections. Analysts, users, domain specialists, architects, developers, testers, operators, and assurance specialists compare the requirements with stakeholder needs, business rules, standards, constraints, and quality criteria. The review record should identify findings, decisions, owners, due dates, and closure evidence. Project governance determines whether formal approval is required.

Scenarios, use cases, process models, mock-ups, and prototypes help stakeholders test their understanding before full implementation. These techniques expose omitted paths, unsuitable workflows, misunderstood terms, and usability concerns. A prototype supplies evidence about the questions it was designed to explore, not proof that the final system will work correctly.

Test-case design checks whether requirements contain observable conditions and expected results. Executing tests against an implementation then contributes evidence of product conformance or fitness for use. Unit, integration, system, and acceptance tests address different levels and should trace to the requirements relevant at those levels. User acceptance testing supports validation, while demonstration remains a separate evidence method that may serve verification or validation.

Analysis can assess feasibility, performance budgets, interfaces, safety, security, and other properties. Simulation explores behaviour that would be expensive, hazardous, or impractical to reproduce. Formal methods, including model checking and theorem proving, can establish selected properties of suitable models, especially in critical systems. They do not establish every desired property unless the model and proof obligations cover it.

Automated tools can find undefined terms, syntax defects, missing attributes, duplicate statements, broken trace links, and some inconsistencies. Human judgement must still determine stakeholder value, contextual correctness, acceptable risk, and whether the model reflects reality.

The V-model illustrates relationships between definition and evaluation activities. Stakeholder needs inform acceptance and operational validation. System requirements inform system-level verification. Architecture and interface requirements inform integration verification. Detailed design informs component verification. Iterative and agile teams can apply the same relationships within each increment, so the model does not require teams to defer evaluation until development ends.

Test design covers positive, negative, boundary, error, recovery, and misuse conditions where relevant. Performance tests need defined workloads, environments, durations, and thresholds. Security evaluation combines requirements review with threat analysis and suitable verification activities. Usability and accessibility validation requires representative users, tasks, contexts, and success criteria. Test execution cannot compensate for an omitted, ambiguous, or incorrect requirement, which makes early review and test-case derivation valuable.

Teams select evidence methods according to the claim under evaluation. Inspection may verify a physical or documentary property. Analysis may establish a calculated limit. Demonstration may show an observable function without detailed measurement. Testing applies controlled inputs and compares observed results with expected results. A combined method may provide stronger evidence when one method leaves significant uncertainty.
## Traceability and change
Bidirectional traceability links stakeholder needs and obligations to requirements, architecture, design elements, implementation units, verification methods, test cases, results, and accepted changes. A traceability matrix or repository supports coverage checks, impact analysis, accountability, and audits. Trace links reveal relationships, but their presence does not prove that requirements or tests are sound.

Teams baseline agreed requirements and control subsequent changes. For each proposed change, they assess the rationale, affected stakeholders, dependencies, cost, schedule, risk, compliance impact, and required re-verification or re-validation. They keep versions, decisions, and evidence aligned.

An issue log separates observations from accepted defects and records severity, priority, disposition, owner, and closure evidence. Corrective action may clarify or split a requirement, add a missing requirement, resolve a conflict, revise a model, change an implementation, or obtain further stakeholder evidence. Reviewers then confirm the correction and check its effects on related artefacts.
## Stakeholder involvement
Effective validation includes people who define, fund, use, build, assure, operate, regulate, support, and maintain the system. Customers and sponsors set outcomes and constraints. Users contribute operational knowledge and usability evidence. Analysts structure and clarify requirements. Domain, legal, security, privacy, and regulatory specialists assess specialised obligations. Architects, developers, testers, operators, and maintainers evaluate feasibility, interfaces, verification, deployment, and long-term support.

Stakeholder analysis identifies authority, influence, expertise, interest, availability, and potential conflicts. A communication plan then assigns suitable methods and decision rights. Interviews, workshops, surveys, reviews, prototype evaluations, and acceptance activities provide complementary evidence. Teams record disagreements and resolve them through named decision owners instead of assuming consensus.

Participation should match the decision. End users can assess workflows and terminology, but they may not judge architecture or regulatory compliance. Specialists can assess technical constraints, but they cannot substitute for people who perform the work. Teams also seek input from under-represented user groups and people who will operate the system under degraded or exceptional conditions.
## Verification and validation planning
A proportionate plan defines:
- scope, objectives, referenced baselines, and items under evaluation
- roles, responsibilities, independence needs, approvals, and points of contact
- requirement-to-method traceability and the rationale for each selected method
- environments, configurations, tools, test data, interfaces, and facilities
- entry, suspension, resumption, exit, and acceptance criteria
- procedures, inputs, expected results, tolerances, and evidence to retain
- schedule, resources, dependencies, milestones, and deliverables
- security, privacy, safety, access, and data-handling controls
- anomaly classification, corrective action, regression work, reporting, and change control

The plan should fit the system's scale, risk, development approach, and assurance obligations. A small iterative product may use concise, continuously updated records. A safety-critical or regulated system may require formal reviews, independent assurance, controlled evidence, and detailed reports. A fixed 22-page template does not suit every project.

Planning begins early enough to influence requirement wording and system design. Teams assign at least one suitable verification method to every applicable requirement, define the evidence needed for closure, and identify facilities or data with long lead times. Risk determines the rigour, independence, repetition, and formality of the work. The plan also explains any justified limitation and the residual risk accepted by an authorised decision-maker.
## Benefits and challenges
Early and repeated verification and validation can reveal omissions, contradictions, infeasible expectations, weak acceptance criteria, and incorrect assumptions before they propagate into design and code. The work can reduce rework, improve test coverage, support change analysis, and strengthen alignment with stakeholder goals. It reduces risk but cannot guarantee cost, schedule, quality, security, or project success.

Complex systems create large, interdependent, and changing requirements sets. Teams may face limited stakeholder access, conflicting priorities, scarce specialist expertise, uncertain operating conditions, and quality attributes that demand specialised evidence. Reviews can miss defects, tools can produce misleading findings, and poorly controlled changes can invalidate earlier results. Risk-based planning varies the depth and independence of evaluation while maintaining evidence for every applicable requirement.
## Illustrative banking scenario
A mobile banking team could elicit needs through executive interviews, user research, operational analysis, and reviews of applicable legal, regulatory, and industry obligations. Requirements might cover account access, transfers, payments, authentication, accessibility, usability, performance, resilience, auditability, privacy, and security.

Structured reviews could expose inconsistent terminology, ambiguous interface behaviour, omitted failure paths, and weak security criteria. Prototypes could validate navigation and task flows. Traceable unit, integration, system, security, performance, and acceptance tests could verify the implemented behaviour at appropriate levels. If acceptance testing found device-specific login failures, the team would record the anomalies, analyse their impact, correct the relevant artefacts or code, rerun affected tests, update trace links, and communicate the evidence to decision-makers.