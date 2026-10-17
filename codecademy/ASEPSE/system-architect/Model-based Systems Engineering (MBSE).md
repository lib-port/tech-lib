# Modern Systems Engineering: Model-based Systems Engineering (MBSE)

Model-based systems engineering (MBSE) uses digital models to support requirements, design, analysis, verification, and validation throughout a system's life cycle. It brings together models, systems thinking, and engineering methods to explain how components interact and contribute to overall performance.

Models represent structure, behaviour, and requirements. Systems thinking examines relationships and dependencies across the whole system. Systems engineering provides the methods for developing and managing it in line with stakeholder needs. Together, these approaches help teams assess alternatives, identify conflicts, and coordinate decisions across disciplines.

Shared models can improve communication, support automated analysis, and expose design weaknesses early. Potential benefits include reduced rework, more consistent designs, and more efficient development. These benefits depend on model quality, suitable tools, and effective working practices.

## Models and modelling languages

Different model types answer different questions about a system.

| Model type | Main purpose |
| --- | --- |
| Functional | Describes required functions and the roles of components. |
| Physical | Represents components, interfaces, and spatial arrangements. |
| Performance | Assesses capabilities and constraints, including throughput, reliability, and efficiency. |
| Behavioural | Represents responses to inputs, events, and interactions over time. |

Effective modelling combines language, structure, reasoning, and presentation. A language defines notation and meaning. Structure organises model elements. Reasoning connects design decisions with supporting evidence and trade-offs. Presentation makes complex relationships understandable. Executable models can also support simulation and automation.

Risk analysis complements this work by identifying potential failures and uncertainties. Models help engineers examine their consequences and consider measures to reduce them.

Systems Modeling Language (SysML) supports systems engineering, while Unified Modeling Language (UML) is associated with software-intensive systems. Architecture Analysis and Design Language (AADL) addresses real-time and embedded architectures, including timing properties. Other approaches include Arcadia for architecture development, EAST-ADL for automotive embedded systems, IDEF methods for processes and knowledge, and Object-Process Methodology for integrated representations of objects and processes.

Sequence diagrams show participants exchanging messages in order. In a simple conversation, Alice asks Bob two questions before he replies. The diagram shows which messages occur first and how responses relate to them. Activation bars indicate periods of activity, notes provide context, and loops represent repetition. The same approach can describe interactions between system components. Mermaid provides text-based notation for creating such diagrams.

## Requirements and traceability

Requirements connect stakeholder needs with engineering decisions. Business requirements establish organisational goals and constraints. User requirements describe the needs of people interacting with the system. System requirements define detailed functions, performance, and behaviour for design, implementation, and testing.

MBSE helps teams capture, analyse, prioritise, and communicate these requirements. Modelling, simulation, and prototyping can reveal conflicts or impractical expectations early. Requirements need to be clear, consistent, and achievable, with priorities reflecting importance, feasibility, and dependencies.

Requirements documentation preserves specifications, analyses, and the reasons for decisions. This record gives stakeholders a consistent basis for evaluating alternatives and understanding why particular constraints or priorities were adopted.

Different representations support this work. Requirements diagrams show relationships between requirements. Use cases describe interactions between actors and the system. Activity diagrams show actions and decisions, sequence diagrams show message exchanges, and state machine diagrams show states and transitions. Traceability matrices link requirements with design elements, tests, and verification activities.

Traceability allows engineers to follow a requirement through design and implementation to evidence that it has been met. It also helps identify which components, decisions, and tests need review when a requirement changes. Connecting requirements with functions, logical architecture, and physical implementation makes dependencies visible across disciplines.

Reliable traceability requires version control, collaboration, and enough context to explain each link. Outdated relationships or incomplete records can weaken change analysis even when the model appears well connected.

## System and model life cycles

The system development life cycle extends from initial planning to retirement. Planning defines scope, objectives, constraints, feasibility, and cost-effectiveness. Needs analysis establishes requirements, and architecture development defines components, interfaces, and behaviour. Detailed development includes design, coding, integration, and testing.

Verification and validation assess conformity with requirements and suitability for stakeholder needs. Implementation includes installation, configuration, training, and acceptance testing. Maintenance covers troubleshooting, fixes, updates, and enhancements. Decommissioning may require data migration, archiving, and disposal.

Model life cycle management keeps formal models and their relationships under control throughout these activities. Models support analysis, design, simulation, and documentation, alongside specifications and reports. As requirements or system elements change, related models and links need corresponding review.

Model maturity reflects the extent of checking, readiness for reuse, support for collaboration, and fitness for the intended purpose. An early model may have limited detail and validation. A more mature model has been assessed against requirements, documented, and refined for dependable use. Its level of detail should remain appropriate to the decisions it supports.

Reuse depends on sufficient refinement and documentation for another project or iteration. Collaborative models also need representations that stakeholders can understand and use when making decisions together.

## Simulation, verification, and validation

Simulation explores system behaviour under specified conditions. A useful simulation begins with clear objectives, questions, scope, and assumptions. Input parameters, boundary conditions, and simplifications determine what its results can reasonably establish.

Methods and software need to suit system complexity, the required detail, available data, and resources. Tool capabilities, compatibility, usability, and support also influence the choice. Understanding limitations is essential to interpreting the results.

Verification checks whether a model is correctly constructed, complete for its purpose, and consistent with specified requirements. Validation assesses whether it adequately represents the real system and its behaviour. A model can pass checks on its construction while still representing reality poorly, so both activities are necessary.

Verification can involve analysis, review, and simulation. Validation can draw on empirical testing, historical data, and expert judgement. Calibration, sensitivity analysis, and cross-validation can contribute to assessing simulation credibility. Documentation records the assumptions, methods, data sources, and findings.

Assessment requires clear objectives, test methods, a suitable environment, relevant conditions, and acceptance criteria. Test configurations establish resources and conditions, while verification events identify when checks occur. Criteria define the results or thresholds required for acceptance.

The Naylor and Finger approach to validation has three steps:

1. An initial assessment establishes face validity: the model appears credible to people familiar with the system.
2. Assumption testing examines whether the model's underlying assumptions are justified.
3. The model's inputs and outputs are compared with those of the real system.

Statistical analysis and visualisation help interpret simulation results. Regression, hypothesis testing, and Monte Carlo methods can examine relationships and variability. Charts and histograms can reveal patterns and unusual outcomes. Interpretation must account for uncertain inputs and modelling assumptions.

Regular reviews keep simulations aligned with changing requirements and new evidence. Sharing results with sufficient context allows stakeholders to assess limitations, question interpretations, and contribute improvements.

## Integration and engineering tools

Integration connects requirements, architecture, behaviour, and discipline-specific information into a coherent representation. It helps mechanical, electrical, and software teams coordinate their work and assess the whole system. Connected models support simulation, change analysis, compliance activities, and documentation.

Logical architecture describes components and their relationships, while physical architecture relates them to implementation elements. Connecting these views helps teams examine how hardware and software work together, including in embedded systems, and assess requirements for safety, security, and performance.

Virtual integration can expose compatibility problems before physical assembly and reduce dependence on prototypes. Updated outputs can reflect design changes, provided the underlying models and relationships are maintained. Integration supports confidence in the system through verification and validation.

The supporting toolset spans several roles. Valispace links requirements and components for data-driven engineering. Sparx Enterprise Architect and MagicDraw support system modelling. Siemens NX, SolidWorks, and PTC Creo contribute detailed design and analysis capabilities. Altium Designer supports electronic hardware development, including schematics and printed circuit board layout.

Specialist analysis can include structural assessment, fluid behaviour, and manufacturing considerations. Effective use depends on connecting these detailed representations with system requirements and exchanging information consistently between tools.

## Adoption and collaboration

Adoption involves technical and organisational challenges. Complex systems can be difficult to represent at an appropriate level of detail. Tools may exchange data poorly, offer uneven hardware support, or impose substantial training demands. Technology readiness, computing capacity, staffing, and delivery expectations also affect what an organisation can achieve.

Processes and tools need to accommodate projects of different sizes. Extending simulation to edge devices, which process data near its source, introduces limits on processing capacity, communication latency, and reliability. Sharing models across organisations or jurisdictions raises issues of ownership, privacy, security, and intellectual property.

Effective practices include defining scope and responsibilities, selecting suitable modelling languages, and establishing consistent conventions. Dividing systems into manageable elements helps control complexity when interfaces and dependencies remain explicit. Models need continuing maintenance and links to requirements, design documents, and tests. Training and organisational support help teams develop the necessary skills and address resistance to change.

Policies and agreements establish how models may be shared and protected. Regular verification and validation check whether models remain suitable as designs evolve, while interoperability conventions support consistent exchanges between teams and tools.

Collaboration gives these practices practical effect. Shared goals, clear roles, and agreed workflows support coordinated decisions. Meetings, workshops, and online platforms provide opportunities to resolve uncertainties. Active listening, constructive feedback, and clear diagrams help stakeholders understand different perspectives. Trust and respect encourage participation across disciplines and support shared responsibility for results.

## Evidence of benefits

Sandia National Laboratories' examination of the transition from document-based to model-based systems engineering included 21 case studies with quantitative metrics and 67 without them. The uneven availability of measurements limited consistent comparison of outcomes.

Reported benefits included better performance, more efficient development, and reduced costs and time to market. The leading improvements were completeness, consistency, and communication. Other reported gains involved testing, verification and validation, concept exploration, design reuse, system margin analysis, and early defect prevention.

Completeness concerns the coverage of requirements and design considerations. Consistency concerns agreement between models and associated documentation. Better communication helps stakeholders understand system architecture and behaviour, supporting discussion of alternatives and the resolution of discrepancies.

Skilled systems engineers in leadership roles were associated with better outcomes. Shortages of experienced practitioners, training needs, tool integration, model maintenance, and resistance to change remained obstacles. Effective adoption required investment in skills, suitable tools, and processes for maintaining models.

## Developing capabilities

Larger and more interconnected systems create increasing demands for data management and clear communication. Analytics, cloud-based environments, and interactive visualisation can help engineers organise information and identify dependencies, bottlenecks, and emerging behaviour.

Artificial intelligence and machine learning offer ways to analyse previous projects and simulations, identify patterns, refine model parameters, and share engineering knowledge. Their potential applications include preserving expertise in repositories that teams can use across projects.

Digital twins connect representations of physical systems with operational data. Executable digital twins and real-time simulations can support monitoring, analysis, and investigation of alternative operating conditions. They provide opportunities to test hypotheses and assess changes as systems evolve.

Generative design uses simulation and optimisation to explore alternatives. Additive manufacturing can produce complex components with reduced waste in suitable applications. Digital representations of materials help material specialists and product designers explore new compositions, structures, and properties together and assess their suitability for products.
