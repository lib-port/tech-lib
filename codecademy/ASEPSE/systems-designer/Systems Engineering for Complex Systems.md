# Systems Engineering for Complex Systems

Systems engineering integrates technical and management disciplines to realise, use, support, and retire engineered systems across their life cycles. It connects stakeholder needs, requirements, architecture, implementation, integration, verification, validation, operation, and change.

Complexity does not arise from size alone. Complex systems contain diverse, interdependent elements whose non-linear interactions, feedback, open boundaries, adaptation, and emergent behaviour can obscure cause and effect. A large but stable system may be complicated rather than complex. Statistical methods can handle some disorganised complexity, while organised complexity requires analysis of interactions and feedback. No single metric captures every relevant dimension of complexity, so engineers should characterise structural, dynamic, organisational, and socio-technical sources separately.

## Engineering process

Systems thinking examines the whole system, its environment, its purpose, and the relationships among its parts. The engineering process should:

- Identify stakeholders, operational contexts, constraints, hazards, and measures of success.
- Elicit and validate needs, then transform them into clear, feasible, verifiable, and traceable requirements.
- Develop logical and physical architectures, allocate requirements, define interfaces, and compare alternatives.
- Implement or acquire elements, integrate them in controlled increments, and manage configuration and data.
- Verify compliance with specified requirements, validate fitness for intended use, and transition the accepted system into service.
- Monitor operation, learn from evidence, manage change, and plan support and retirement.

These activities interact. ISO/IEC/IEEE 15288:2023 allows projects to apply life cycle processes iteratively, concurrently, and recursively, rather than as one fixed sequence. Teams should expose assumptions, test them with evidence, and explore plausible scenarios instead of claiming certainty about the future. Prototypes, simulations, incremental releases, and operational feedback help reveal interactions that decomposition can hide. Automated checks improve speed and repeatability only when their coverage, data, expected results, and maintenance remain sound.

Managing complexity requires both decomposition and synthesis. Decomposition assigns responsibilities and makes analysis tractable, while synthesis tests whether the assembled system produces the required whole-system outcomes. Teams should limit simultaneous changes, keep work in progress visible, integrate high-risk interfaces early, and preserve margins for uncertainty. They should design observability, fault containment, graceful degradation, recovery, and adaptation into the architecture instead of relying on maintenance to add them later. Regular technical reviews should bring disciplines together to resolve conflicting assumptions, requirements, interfaces, and priorities. When evidence invalidates a baseline, controlled change should update requirements, models, architecture, plans, tests, training, and operational procedures together.

## Models and architecture

A system model is a purpose-specific abstraction, not a complete copy of reality. Models can document requirements and interfaces, explain behaviour, estimate cost and performance, compare trade-offs, rehearse operations, and test assumptions. Engineers may use descriptive diagrams, formal mathematical models, analytical models, dynamic simulations, visualisations, digital representations, and physical prototypes. A simulation is computational or conceptual, while a physical model is tangible.

Models can address components, subsystems, complete systems, or systems of systems. Each model should declare its purpose, scope, viewpoint, assumptions, inputs, fidelity, uncertainty, validity limits, and configuration. A model that supports one decision may not support another. Verification checks that a model was implemented correctly, while validation checks whether it represents the real system closely enough for its intended use.

Architecture concerns the system's fundamental organisation and design concepts. An architecture description represents that architecture through viewpoints and models that address stakeholder concerns. Logical models describe functions, behaviour, information, and relationships. Physical models allocate those concepts to hardware, software, people, facilities, and procedures. Engineers should maintain consistency and traceability between both views.

A complex adaptive system is a subtype of complex system whose agents interact, learn, or adapt, often without central control. Not every complex system is adaptive. Modularity, cohesive elements, and stable interfaces can limit coupling and support change, but standardisation and reuse do not guarantee interoperability or lower risk. Reused elements carry assumptions and constraints from their original context. Architecture reviews should therefore examine emergent behaviour, failure propagation, security, resilience, human interaction, and evolution.

A system of systems combines constituent systems that can retain operational or managerial independence. Its membership, interfaces, goals, and environment may evolve. Central control may remain limited, so engineers must coordinate shared capabilities through agreements, interface governance, interoperable data, and aligned incentives. Local optimisation can degrade overall performance, and a change in one constituent system can trigger effects elsewhere. Evaluation should therefore include cross-system scenarios, end-to-end measures, external dependencies, and the capacity to adapt safely.

## Stakeholders, risk, and decisions

Stakeholders include customers, users, operators, maintainers, acquirers, suppliers, regulators, affected communities, and project teams. Their relevance can change across the life cycle. Teams should assess influence, impact, knowledge, rights, obligations, and exposure to harm, then tailor engagement without excluding low-power groups that may bear serious consequences. Agreed needs, operational scenarios, constraints, and measures of effectiveness should form a controlled baseline. Transparent communication, accessible evidence, ethical analysis, and constructive conflict resolution support informed participation.

Risk represents uncertainty that can affect objectives through threats or opportunities. A useful technical risk statement identifies a scenario, the affected objective, the likelihood, the consequence, and uncertainty in both estimates. Risk management should plan the approach, identify risks, analyse and evaluate exposure, select treatments, assign owners, monitor indicators, and communicate decisions. Treatments can avoid, reduce, share, transfer, exploit, enhance, or accept risk, depending on context. Teams should track residual and secondary risks, triggers, contingencies, and treatment effectiveness throughout the life cycle.

Decision management starts with a clearly framed decision, decision authority, objectives, criteria, constraints, and viable alternatives. Evidence may combine measurements, models, expert judgement, stakeholder values, and cost and schedule estimates. Teams should compare trade-offs, analyse uncertainty and sensitivity, test scenarios, and record assumptions and limitations. Independent review, diverse perspectives, explicit criteria, and checks against confirmation, anchoring, and availability biases can reduce systematic error. Decision tools support the accountable authority, but do not replace judgement. Records should preserve the recommendation, rationale, dissent, final decision, and conditions for review.

## Verification and validation

Verification and validation have distinct objectives. Product verification establishes evidence that an implemented or integrated system satisfies its approved requirements and specifications. Product validation establishes that the verified system fulfils its intended purpose in its intended environment and meets stakeholder expectations. Requirements validation occurs earlier and checks that the requirements accurately express stakeholder needs, the concept of operations, constraints, and success criteria.

A verification and validation plan should define scope, baselines, system levels, responsibilities, methods, facilities, configurations, environments, schedules, entry and exit criteria, acceptance criteria, evidence, reporting, and change authority. Traceability should connect each need to requirements, architecture, verification evidence, validation evidence, anomalies, and corrective action.

Verification commonly uses inspection, analysis, demonstration, and test. Validation uses representative users, scenarios, workloads, interfaces, and environments. Projects should perform activities at component, subsystem, system, and external-interface levels according to risk. They should investigate anomalous results, control test configurations, assess measurement and model uncertainty, verify corrections, repeat affected tests, and check that changes introduce no new failures. Continuous operational monitoring supports assurance but does not replace formal verification, validation, certification, or acceptance.

## Autonomous drone delivery architecture

An autonomous drone delivery service provides a notional example, not evidence of a successfully deployed system. Relevant stakeholders include customers, operators, maintainers, business owners, software teams, airspace authorities, emergency services, communities, and people whose property or privacy may be affected.

The architecture may include aircraft, payload mechanisms, navigation, command and control, communications, ground stations, order processing, route planning, weather and airspace data, identity and access controls, maintenance systems, operational logs, and customer interfaces. It should also define human oversight, degraded modes, lost-link behaviour, emergency landing, cyber controls, data protection, and recovery.

Applicable authorities set aviation and operational requirements, while the developer and operator remain responsible for demonstrating compliance. The verification and validation plan should combine requirements and design reviews, unit and component tests, software-in-the-loop and hardware-in-the-loop simulation, integration tests, ground tests, controlled flight tests, security tests, failure injection, operator evaluation, and operational validation. Evidence should cover navigation accuracy, containment, communications loss, weather limits, payload release, ground risk, privacy, usability, maintenance, and safe response to faults. No architecture can claim stakeholder trust, regulatory approval, or operational success before evidence supports those conclusions.

## Standards and guidance

Standards distinguish requirements, recommendations, and permissions through normative wording. Conformance means satisfying the specified provisions of a standard. Certification is third-party attestation against defined criteria, while legal and contractual compliance depends on the applicable obligations. A standard does not automatically require or provide certification.

| Reference | Correct scope |
| --- | --- |
| ISO/IEC/IEEE 15288:2023 | System life cycle processes |
| ISO/IEC/IEEE 42010:2022 | Architecture descriptions, viewpoints, and model kinds |
| ISO/IEC/IEEE 16085:2021 | Risk management for systems and software engineering |
| ISO/IEC/IEEE 15026 series | Systems and software assurance, assurance cases, and integrity levels |
| ISO 10303-233:2012 | Representation and exchange of systems engineering data |

ISO 9001:2015, with Amendment 1:2024, superseded ISO 9001:2008 and specifies quality management system requirements. ISO 31000:2018 superseded the 2009 edition and provides non-certifiable risk management guidance. ECSS-E-ST-10C Rev.1 provides general systems engineering requirements for European space projects. EIA-748E addresses earned value management for integrated scope, schedule, and cost control, not the technical engineering process as a whole. Projects should select, tailor, and record applicable standards according to domain, jurisdiction, contract, assurance needs, and risk.

## Sources

- Skillsoft Ireland Limited. Course Transcript: Systems Engineering for Complex Systems. 2025. Supplied HTML file.
- [INCOSE, Complex Systems Working Group](https://www.incose.org/group/complex-systems-working-group/)
- [SEBoK, System of Systems and Complexity](https://sebokwiki.org/wiki/System_of_Systems_and_Complexity)
- [NASA, Fundamentals of Systems Engineering](https://www.nasa.gov/reference/2-0-fundamentals-of-systems-engineering/)
- [NASA, Verification and Validation Plan Outline](https://www.nasa.gov/reference/appendix-i-verification-and-validation-plan-outline/)
- [NASA, Technical Risk Management](https://www.nasa.gov/reference/6-4-technical-risk-management/)
- [NASA, Decision Analysis](https://www.nasa.gov/reference/6-8-decision-analysis/)
- [ISO, ISO/IEC/IEEE 15288:2023](https://www.iso.org/standard/81702.html)
- [ISO, ISO/IEC/IEEE 42010:2022](https://www.iso.org/standard/74393.html)
- [ISO, ISO/IEC/IEEE 16085:2021](https://www.iso.org/standard/74371.html)
- [ISO, ISO 9001:2015](https://www.iso.org/standard/62085.html)
- [ISO, ISO 31000:2018](https://www.iso.org/standard/65694.html)
- [ECSS, ECSS-E-ST-10C Rev.1](https://ecss.nl/standard/ecss-e-st-10c-rev-1-system-engineering-general-requirements-15-february-2017/)
- [SAE International, EIA-748E](https://saemobilus.sae.org/standards/eia748e-earned-value-management-systems)
