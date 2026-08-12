# Systems Engineering Process: System Analysis & Modeling
System analysis uses models to examine a system's purpose, boundary, structure, behaviour, environment, and life-cycle concerns. A model selects features that serve a defined question. It does not reproduce every feature of the real system. Engineers use models to communicate, compare alternatives, expose assumptions, analyse trade-offs, support decisions, and connect requirements with design and evidence.
## Model-based systems engineering
Model-based systems engineering (MBSE) applies modelling formally to requirements, design, analysis, verification, and validation from conceptual design through later life-cycle stages. It places managed models at the centre of engineering work and links them with specialist analyses, simulations, documents, and physical evidence.

A coherent model can connect stakeholder needs, requirements, functions, logical and physical architecture, interfaces, behaviour, risks, verification cases, and decisions. Different viewpoints let specialists inspect relevant concerns while preserving relationships with the wider system. This structure helps teams identify omissions, conflicts, interface problems, and change impacts earlier than disconnected documents often allow.

Systems thinking complements MBSE by treating system behaviour as the result of interactions, feedback, delays, constraints, and decisions across the whole life cycle. It discourages local optimisation that transfers cost, risk, or failure to another subsystem, stakeholder, or stage. Engineers examine the system in its operating environment, including people, organisations, external services, and physical conditions, rather than analysing components in isolation.

Models also support structured trade studies. Teams define evaluation criteria, compare alternatives against requirements and uncertainty, record rationale, and revisit decisions when evidence changes. Cost and schedule estimates can use model information, but a model does not make those estimates accurate automatically. Their credibility still depends on sound data, assumptions, methods, and calibration.

MBSE supports:
- Requirements definition, allocation, traceability, and change control
- Architecture exploration and comparison of design alternatives
- Integration planning and analysis of component interactions
- Verification planning, simulation, test design, and evidence management
- Capture of assumptions, rationale, configuration history, and reusable knowledge
- Communication, collaboration, training, maintenance, and future upgrades

The model can serve as an authoritative source, but it does not become true by designation. Governance, configuration control, validation, and evidence determine its reliability. MBSE also changes the role of documents rather than eliminating them. Contracts, safety cases, operating instructions, certification records, and other deliverables may still require controlled documents generated from or linked to the model.

Verification checks whether a model or realised system satisfies its specified requirements. Validation checks whether the model represents its intended use adequately or whether the realised system fulfils stakeholder needs in its operational context. Reviews, analysis, simulation, demonstration, and testing can all contribute, but no single technique guarantees quality.
## Model forms and quality
Engineers choose model forms according to purpose:
- Physical models include mock-ups, prototypes, test articles, and scale models.
- Abstract models include diagrams, equations, algorithms, state machines, and conceptual frameworks.
- Descriptive models express structure, relationships, interfaces, or behaviour.
- Analytical models support calculation, optimisation, estimation, or formal reasoning.
- Static models represent a selected state, while dynamic models represent change over time.
- Deterministic models produce the same result from the same inputs, while stochastic models represent uncertainty probabilistically.
- Informal models support exploration and communication, while formal models use defined syntax and semantics.
- System models span multiple concerns, while domain models focus on a discipline or application area.

A simulation conducts experiments on an executable model. The model provides the representation and rules, while the simulation evaluates behaviour under selected inputs and conditions. Visualisation presents model structure or results in an accessible form. A diagram can visualise a model without making it executable, and a simulation can produce results that require separate visualisation.

Model quality depends on fitness for purpose, not maximum detail. Effective models state their purpose, audience, scope, boundary, assumptions, sources, units, and limitations. They use a suitable level of abstraction and fidelity, maintain internal consistency and traceability, and represent uncertainty honestly. Teams verify correct implementation, validate the representation against relevant evidence, control versions, and review the model whenever the system or its environment changes. Completeness always relates to the declared purpose and boundary.
## UML and SysML
The Unified Modeling Language (UML) and Systems Modeling Language (SysML) are modelling languages, not software tools or methodologies. Tools implement these languages with varying levels of conformance, usability, analysis, interchange, and collaboration support.

| Language | Scope | Distinctive features |
| --- | --- | --- |
| UML 2.5.1 | Primarily software-intensive systems | Standard graphical notation for structure, behaviour, and interactions, with profiles for extension |
| SysML v1.x | General systems engineering based on a UML profile | Requirements, blocks, internal structures, allocations, constraints, parameters, activities, interactions, states, and use cases |
| SysML v2.0 | General-purpose systems modelling based on KerML | Integrated semantics, complementary graphical and textual notation, analysis and verification cases, libraries, and a standard API |

UML structure diagrams include class, component, composite structure, deployment, object, package, and profile diagrams. Behaviour diagrams include activity, use case, and state machine diagrams, plus interaction diagrams such as sequence, communication, interaction overview, and timing diagrams. A profile can define stereotypes, tagged properties, and constraints that tailor UML for a domain. A stereotype extends a model element. It does not classify a person.

SysML v1.x reuses and adapts parts of UML for systems that can include hardware, software, data, people, processes, and facilities. Block definition and internal block diagrams describe structure. Requirement diagrams show requirements and relationships. Parametric diagrams express constraint relationships. Activity, sequence, state machine, use case, and package diagrams provide behavioural and organisational views. Tables and matrices can present allocations or relationships, but an allocation table is not a separate SysML diagram type.

SysML v2.0 received final OMG adoption in 2025. It is not a UML profile. KerML provides its semantic and syntactic foundation, while graphical and textual notations present the same underlying model. Its standard API supports model navigation, queries, updates, and tool integration. Organisations still need a transition strategy because tool support, migration quality, conformance, and user capability vary.

Neither UML nor SysML automatically removes ambiguity or validates a design. Precise definitions, controlled requirements language, domain rules, executable constraints, reviews, and evidence remain necessary. Diagram consistency depends on a shared underlying model and tool behaviour, while interoperability concerns exchange between tools and connected engineering systems.
## Causal loop diagrams
Causal loop diagrams (CLDs) belong to systems thinking and system dynamics. They are not UML diagrams. A CLD records a dynamic hypothesis about how variables influence one another through feedback.

A CLD contains:
- Variables whose values can increase or decrease over time
- Directed causal links that state which variable influences another
- Link polarities marked + or -
- Reinforcing loops marked R and balancing loops marked B
- Delay marks where an effect follows its cause after a significant interval

A positive link means that, with other conditions unchanged, the affected variable moves above or below what it would otherwise have been in the same direction as the causal variable. A negative link means that it moves in the opposite direction. Positive does not mean beneficial, and negative does not mean harmful. A negative link also does not constitute a balancing loop by itself.

Loop polarity follows the complete closed path. A loop with no negative links or an even number of negative links reinforces change. A loop with an odd number of negative links balances change. Multiplying the link signs gives the same result. Delays affect timing and can contribute to overshoot or oscillation, but they do not determine loop polarity.

Reinforcing feedback amplifies movement in a direction, including growth or decline. It produces exponential behaviour only under additional structural and mathematical conditions. Balancing feedback opposes change or pursues a goal, but delays, nonlinear relationships, shifting goals, and external forces can prevent smooth convergence.
### Product-growth feedback example
Each variable needs a clear direction of increase. Higher product quality tends to raise customer satisfaction, so that link is positive. Higher satisfaction tends to raise sales volume, which is also positive. If higher sales increase marketing effort, that link is positive. Under a fixed resource constraint, greater marketing effort may reduce engineering capacity, while greater engineering capacity directly supports quality.

The closed path from quality to satisfaction, sales, marketing, engineering capacity, and back to quality contains one negative link. It is therefore a balancing loop, not a reinforcing loop. A separate corrective loop might connect reported defects positively to corrective effort, corrective effort positively to quality, and quality negatively to reported defects. That loop also contains one negative link and is balancing.

Customer feedback needs a precise definition. Positive feedback, negative feedback, total feedback volume, and actionable defect reports behave differently. An ambiguous variable cannot support a defensible polarity. Evidence must also support the proposed causal mechanism. Correlation, stakeholder agreement, or a polished diagram alone does not establish causation.
## Developing and analysing a causal model
1. Define the decision or behaviour of interest, the reference pattern over time, the system boundary, the time horizon, and the required level of aggregation.
2. Name variables as quantities that can move up or down. Distinguish actual conditions from perceived conditions, and record units where relevant.
3. Add causal links only when a mechanism explains the influence. Assign polarity using the other-conditions-unchanged test, and mark significant delays.
4. Trace closed paths, calculate loop polarity, name important loops, and consider how loop dominance may shift over time.
5. Gather primary evidence from observations, experiments, interviews, surveys, and operational data, and assess secondary evidence from research, reports, and historical records.
6. Review the model with affected stakeholders and domain specialists. Challenge the boundary, assumptions, missing variables, causal claims, signs, delays, and unintended consequences.
7. Convert the hypothesis into stocks, flows, equations, and parameter values when the decision requires quantitative simulation. Test dimensions, extreme conditions, sensitivity, historical behaviour, and alternative structures.

A CLD supports qualitative reasoning and communication. It does not calculate outcomes. Quantitative claims require an executable model with justified equations, parameters, initial conditions, and tests. Primary and secondary evidence can strengthen or refute links, but teams should preserve uncertainty and competing explanations instead of forcing agreement.
## Systems archetypes
Systems archetypes describe recurring feedback structures and characteristic behaviours. They help teams recognise hypotheses worth testing, but they do not forecast an outcome or replace analysis of the actual system.

| Archetype | Recurring structure |
| --- | --- |
| Fixes that fail | A quick remedy relieves a symptom before delayed side effects worsen the problem |
| Shifting the burden | A symptomatic response weakens commitment or capacity to apply a fundamental solution |
| Limits to growth | Reinforcing growth activates a constraint that slows further growth |
| Escalation | Competing actors respond to relative disadvantage by intensifying actions |
| Eroding goals | Pressure to close a gap lowers the goal instead of improving performance |
| Success to the successful | Early advantage attracts resources, which increases the advantage of one option over another |
| Tragedy of the commons | Independent users overexploit a shared, limited resource |
| Growth and underinvestment | Capacity investment lags demand, degrades performance, and suppresses future demand or growth |

Established names promote consistent diagnosis. A recurring story does not become a formal archetype simply because it has a memorable label. Analysts should map the actual feedback structure, compare it with an archetype, test the fit, and look for disconfirming evidence.
## Limitations and responsible adoption
MBSE requires investment in tools, integration, training, governance, and model maintenance. Large models can become difficult to navigate, review, and update. Weak assumptions, incomplete boundaries, inconsistent semantics, stale data, and missing links can spread error across connected views. Tool lock-in, uneven standards conformance, and imperfect interchange can obstruct collaboration. A visually coherent model can also create unjustified confidence.

These risks do not make MBSE inherently rigid, and systems modelling has a long technical history. Standards exist, although methods, tools, and organisational maturity remain uneven. Effective adoption combines structure with iteration and professional judgement.

An organisation should define valuable use cases and measurable outcomes before selecting a language or platform. It should establish modelling conventions, ownership, access control, configuration management, review criteria, and links to authoritative evidence. Modular architecture, purposeful viewpoints, automated consistency checks, scenario analysis, sensitivity analysis, independent review, and regular updates help control complexity and uncertainty.

A phased rollout can train a small team, test integrations, migrate representative information, and evaluate a bounded pilot before expansion. Useful measures include defect discovery, change-impact effort, trace coverage, review time, reuse, data quality, and stakeholder comprehension. Continuous support and governance keep the model aligned with the evolving system. Tools accelerate disciplined practice, but they cannot substitute for sound reasoning, evidence, or collaboration.