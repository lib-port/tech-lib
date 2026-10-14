# Decision Analysis and Management: System Testing & Reliability

System testing helps manage the risks of complex systems throughout their life cycle. Verification and validation provide evidence about functionality, performance, safety, and reliability. They connect technical requirements with the needs of people who use or depend on a system. Early assessment can expose defects and unsuitable assumptions before they become costly to correct.

## Verification and validation

Verification establishes whether a system and its elements conform to specified requirements. It examines documents, designs, code, components, and their interactions. Validation establishes whether the system fulfils its intended purpose and meets stakeholder needs in its intended environment. A system may satisfy its technical specifications yet remain unsuitable because those specifications misrepresent actual needs.

The distinction concerns the purpose of the assessment, rather than a rigid division between components and complete systems. Verification can assess integrated systems, while validation can examine requirements and designs before a complete system exists.

Both processes accompany system definition, development, and operation. Component verification commonly precedes assessment of the assembled system, but verification and validation also proceed alongside one another. Assessments at milestones support decisions about further work. Repeated evaluation accommodates changes in requirements and operating conditions.

Their combined value includes fewer defects, stronger system understanding, support for standards compliance, and improved user satisfaction. Documented evidence allows decisions to be scrutinised and provides a basis for improving development practices.

Human error makes systematic checking necessary at each stage. Verification examines whether the transformation of inputs into outputs follows defined methods and requirements. Validation considers whether those outputs achieve the intended result. Together, these assessments support accountability and help identify opportunities to improve the system.

## Planning and conducting validation

A validation plan defines the scope, objectives, methods, resources, responsibilities, deliverables, and schedule for assessing a particular system. Acceptance criteria establish how results will be judged. The plan also identifies relevant regulatory requirements and organisational policies.

An organisational validation master plan provides the broader framework. Each project needs a plan suited to its requirements and constraints. The plan and supporting records form a validation package, retained according to organisational policy. Approval by the system owner and quality assurance function confirms alignment with project goals and quality expectations.

The system owner assesses whether the proposed work serves the system's purpose. Quality assurance examines its thoroughness and consistency with standards. Deliverables may include test records, analysis, and reports. Scheduling those outputs against milestones helps ensure that evidence is available when development decisions need to be made.

Validation examines stakeholder needs, system requirements, designs, documents, processes, and system behaviour. Stakeholder requirements describe desired outcomes, while system requirements translate those needs into technical, functional, and performance criteria that guide assessment.

Validation's central comparison is between actual and expected results. Assessment also considers whether the expected result is appropriate to the intended use.

The work follows a documented sequence:

1. The team defines the scope, exclusions, constraints, and expected outcomes.
2. It selects suitable methods and assesses trade-offs involving time and resources.
3. It obtains the necessary people, tools, and equipment.
4. It executes procedures and records conditions, results, defects, and deviations.
5. It analyses findings, takes corrective action, and consolidates the evidence.
6. It assesses the complete system before deployment and validates its performance in operation.

Simulation explores behaviour under selected conditions. Prototypes allow early designs to be tested and refined. User feedback helps establish whether the resulting system supports practical needs.

Validation records also preserve the reasoning behind compromises. Limits on resources may affect the methods selected or the coverage achieved. Documenting those choices makes their implications visible and helps maintain control when corrective action or changes to procedures become necessary.

## Verification methods and test levels

Different methods provide different kinds of evidence. Their selection depends on the requirement, the system, and the consequences of failure.

| Method | Basis of assessment |
| --- | --- |
| Inspection | Observation or measurement reveals physical conditions, defects, or departures from specifications. |
| Analysis | Calculations, logical reasoning, models, or simulations assess consistency and performance. |
| Analogy | Evidence from comparable systems supports a judgement when relevant similarities are established. |
| Demonstration | Observed operation shows that a function works under stated conditions. |
| Testing | Measurements under controlled conditions establish performance against defined criteria. |
| Sampling | A selected subset is examined using specified sample sizes, tolerances, and acceptance criteria. |

Analogy requires evidence that earlier conditions are relevant to the present system. Sampling requires a suitable basis for drawing conclusions about the wider population. Controlled test conditions support repeatability and meaningful comparisons.

Demonstration emphasises visible operation, while testing provides quantitative evidence. Analysis can examine numerical feasibility or logical consistency, and inspection can reveal physical defects. These approaches complement one another because observing successful operation does not answer every question about a system's performance.

Unit testing examines individual components. Integration testing examines their interactions. System testing assesses the assembled system. Functional, performance, and security testing address different aspects of its behaviour. Reviews, walkthroughs, and peer inspections complement these tests by examining requirements, designs, and implementation decisions. Verification procedures themselves also need review for suitability and coverage.

## Formal methods and supporting tools

Formal methods express system properties precisely, particularly where failure could have serious consequences. Model checking assesses whether a model satisfies specified properties. Safety properties concern avoidance of unacceptable behaviour. Liveness properties concern whether required progress or events eventually occur.

State machines represent system states and the transitions between them. Temporal logic expresses requirements about the order and timing of events. Clear specifications describe essential behaviour without unnecessary implementation detail.

Model-based systems engineering uses models to represent architecture and behaviour. Systems Modeling Language, or SysML, supports system descriptions. Modelling and diagramming tools help teams understand relationships, examine alternatives, and communicate designs. Useful capabilities include traceability, collaboration, reuse, simulation, and debugging.

Simulation tools range from general process models to specialised applications for electrical networks, fluid behaviour, and other engineering domains. Requirements management tools connect needs with designs and tests. Compliance tools support workflows, audits, and evidence management.

Traceability makes the relationship between a requirement and its implementation explicit. Collaboration helps participants maintain a shared understanding, while reusable models can inform later work. Tool selection follows the required analysis and engineering context, including the system's complexity and the evidence needed.

Safety analysis provides complementary views of risk. Failure mode and effects analysis examines possible failures and their consequences. Fault tree analysis examines combinations of events that could cause a defined failure. Event tree analysis follows possible outcomes from an initiating event. Hazard and operability studies examine hazards and operational deviations.

## Continuous verification

Continuous verification combines experimentation, monitoring, and data analysis as systems evolve. Measurements establish a baseline of expected behaviour. Later observations are compared with that baseline to identify changes, anomalies, and performance trends.

An experiment starts with a hypothesis about system behaviour. The independent variable is the factor deliberately changed. The dependent variable is the outcome measured to assess the effect. Defining both helps clarify the relationship being investigated, especially when many components interact.

Automation supports repeated collection, analysis, and experimentation. Simulation allows proposed changes to be explored before implementation in the actual system. Chaos engineering introduces controlled disruptions to examine resilience, such as removing a server from a load-balanced arrangement and observing the response.

Observability supports understanding of system behaviour through data collected from its components. Combined with monitoring, it helps teams investigate departures from expected operation. Continuous verification provides evidence for performance improvements and adaptation to changing requirements.

Complexity requires attention to interactions as well as individual measurements. A change in one component can affect the behaviour of others. Planned experiments help teams investigate those relationships, while routine observation provides a continuing record against which the effects of changes can be assessed.

## Analysing and reporting evidence

Results need to remain traceable to the requirements and purposes they assess. Plans establish the approach, procedures describe execution, and matrices map assessments to requirements or components. Records of configuration, resources, personnel, and timing establish the circumstances in which evidence was collected.

Reports identify successful assessments alongside defects, non-conformances, and unresolved issues. Lists of verified or validated items show which elements have met the relevant criteria. Analysis may prompt changes to requirements, designs, products, or services. Documented change requests connect those proposals with supporting findings.

A discrepancy may indicate an implementation fault, an unsuitable requirement, or a mismatch with user expectations. Analysis distinguishes these possibilities so that corrective work addresses the cause. Supporting records allow reviewers to examine how conclusions were reached and whether further investigation is warranted.

A useful report includes:

- Scope and objectives.
- Results and their relationship to acceptance criteria.
- Accurate supporting data and unresolved issues.
- Recommendations for correction, improvement, or further investigation.
- Test logs, datasets, and relevant supporting documents.
- An assessment of the methods, difficulties encountered, and lessons learned.

Reviewing both outcomes and methods allows later projects to benefit from earlier experience.

## Preventing validation failure and strengthening resilience

Validation can fail because requirements are incomplete, intended use is misunderstood, or testing overlooks important scenarios. Other causes include missing procedures, neglected compliance obligations, poor communication, insufficient expertise, and unmanaged requirement changes. Edge cases need attention because normal operating conditions do not represent every significant risk.

Effective practice begins with clear requirements and early assessment. A risk-based approach prioritises areas where failure could have the greatest consequences. Specialist advice, systematic issue tracking, and peer review improve the quality of assessment. Feedback and recorded lessons support continuous improvement.

Reliability also depends on operational measures that limit the likelihood or consequences of failure. Maintenance and upgrades address weaknesses. Redundant components support continuity when individual elements fail. Fail-safe mechanisms move a system towards a safe condition, including controlled shutdown where appropriate.

Disaster recovery plans define how data and systems will be restored after disruption. Regular backups provide a basis for data recovery. Monitoring supports early intervention, while staff training improves operation and response. Security measures, including firewalls, encryption, and audits, reduce exposure to malicious interference. These measures complement testing throughout the operational life cycle.

## Ethical responsibilities

System design and operation affect privacy, security, fairness, and wellbeing. Ethical assessment therefore considers consequences for individuals, organisations, and society alongside technical performance. Ongoing assessment helps maintain trust as technologies and their uses change.

Responsible handling of personal information involves transparency, informed consent, respect for usage rights, and protection against unauthorised access. Security standards and practices support these obligations, while differences between organisational practices require attention.

Emerging technologies, including artificial intelligence, require assessment of their broader effects. Algorithmic bias can arise unintentionally when training data misrepresent a population. For example, an unrepresentative subgroup with an unusual distribution of outcomes may lead a model to learn misleading associations. Evaluation needs to examine both the data and the resulting behaviour for discriminatory effects.

Applications that encourage prolonged engagement can also create risks to wellbeing. Behaviour tracking and information sharing may expose users to further harm. Responsible engineering considers these effects during design, testing, and operation, with attention to intended benefits and potential misuse.
