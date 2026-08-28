# System Development Process

Systems engineering coordinates technical work, project governance, and stakeholder decisions across a system's life cycle. An effective process connects business or mission needs to requirements, architecture, implementation, integration, verification, validation, operation, support, and retirement. It also adapts the development approach, controls changes, measures performance, and preserves knowledge for later work.

The Systems Engineering Body of Knowledge, known as SEBoK, provides a shared vocabulary and a generic reference model. Organisations still tailor that model to the system, domain, assurance obligations, acquisition strategy, and operating context.

## Life cycle stages and activities

The generic system life cycle covers concept, development, production, utilisation, support, and retirement. Decision gates connect these stages, but the model does not require every project to follow one rigid sequence. Iteration and concurrent work often link stages, especially when teams develop, deploy, and support capabilities in increments.

Concept work defines the problem or opportunity, mission, intended use, operating environment, business case, stakeholders, and available capabilities. Teams consider pre-existing non-developmental items when these components can reduce effort or risk without compromising fitness, security, supportability, or integration. Stakeholder needs then provide the basis for system requirements and later validation.

System definition converts approved needs into clear requirements and an architecture. Requirements describe necessary functions, performance, interfaces, quality attributes, constraints, and acceptance conditions. Architecture describes the system's elements, relationships, interactions, and design principles within its environment. Analysis compares alternatives and evaluates feasibility, cost, risk, performance, and other trade-offs.

System realisation implements and integrates system elements. Verification uses objective evidence to confirm that requirements, architecture, design properties, and other specified criteria have been satisfied. Validation uses objective evidence to confirm that the integrated system can fulfil its intended use and stakeholder needs in the intended environment. Teams plan both activities early and repeat them as the design evolves.

Production creates system instances and supporting assets, while acceptance confirms that delivered outcomes meet agreed criteria. Utilisation puts the system into operational service. Support sustains availability, performance, safety, security, and usefulness through maintenance, repairs, updates, training, and logistics. Retirement withdraws the system responsibly, protects data and people, meets legal and environmental duties, and recovers or repurposes viable components where appropriate.

Concurrency, iteration, and recursion help manage complexity. Concurrency allows related activities to proceed together when their dependencies permit. Iteration revises work at the same system level in response to evidence or feedback. Recursion applies similar life cycle processes at successive levels of the system hierarchy. Top-down decomposition establishes system elements and responsibilities, while bottom-up integration assembles and tests the realised elements.

## Development approaches

No development approach suits every system. Project uncertainty, criticality, technology, regulation, architecture, stakeholder access, and delivery needs determine the appropriate combination.

- A sequential approach establishes a largely ordered progression and suits work that requires strong baselines, formal reviews, and controlled change.
- The Vee model links definition and decomposition on its left side with integration, verification, and validation on its right side. It encourages early planning for the evidence that will demonstrate compliance and fitness for use.
- Incremental development delivers increasing subsets of capability. Early increments can provide operational value and generate evidence for later decisions.
- Evolutionary development starts when teams know only part of the requirements or solution. Repeated delivery, use, and feedback shape later versions.
- Agile development combines iterative work, incremental delivery, frequent inspection, stakeholder collaboration, and adaptation. Agile describes a family of approaches, not one fixed method. Scrum is a framework within that family. A Scrum Team aims to create a valuable, usable Increment each Sprint and applies a Definition of Done to establish quality and transparency.
- Spiral development organises iterations around explicit risk analysis. Lean engineering focuses on customer value, end-to-end flow, waste reduction, pull, continuous improvement, and respect for people.

Teams can combine approaches and tailor them across hardware, software, services, and organisational change. Incremental work does not remove the need for architecture, assurance, documentation, or governance. Sequential work can still include iteration and concurrent processes.

Waterfall commonly describes a strongly sequential approach in which each phase produces inputs for the next. Kanban visualises workflow and limits work in progress to improve flow. Scrum organises product work around a Product Goal, ordered Product Backlog, Sprints, inspection, and adaptation. These approaches address different concerns, so a team can use Kanban flow controls within a broader development model or apply iterative delivery within formal governance gates.

## Quality, scope, time, cost, and risk

Project decisions balance scope, schedule, cost, quality, benefits, resources, and risk. The familiar triple constraint describes interdependence among scope, time, and cost, but it does not impose a rule that decision-makers can choose only two. A change to one constraint can affect several others, and teams must evaluate each proposed change against objectives, stakeholder value, assurance needs, and organisational priorities.

Process choices influence quality, cost, and time to market without guaranteeing any one outcome. Short feedback cycles can expose incorrect assumptions and deliver useful capability earlier. They can also increase coordination and integration demands. Extensive up-front definition can strengthen assurance and supplier alignment, but it can delay feedback or lock in weak assumptions. Teams therefore match review depth, documentation, automation, release cadence, and assurance evidence to risk and system criticality.

Clear requirements reduce misunderstanding, but baselines require controlled change as knowledge develops. Early verification, validation, integration, and quality assurance can expose defects before correction becomes more expensive. Teams should assess rework rather than assume that all rework signals failure. Deliberate refactoring, prototyping, and iterative improvement can reduce technical risk or improve long-term value.

Project managers can structure and analyse work with several complementary techniques:

- A work breakdown structure decomposes the complete project scope into deliverable-oriented components. It supports estimating and control, but it is not a schedule.
- A Gantt chart displays activities, milestones, durations, and dependencies across time.
- The critical path method identifies the longest path through the schedule network. Under the stated durations and logic, that path determines the earliest calculated completion date. The critical path can change as work progresses.
- The Program Evaluation and Review Technique uses probabilistic duration estimates to represent uncertainty. Its assumptions require care, especially in schedules with converging parallel paths.
- Earned value management integrates scope, schedule, and cost baselines to compare planned value, earned value, and actual cost.
- Dashboards, burndown or burnup charts, cumulative flow, cycle time, defect trends, and milestone reports provide different views of progress. Managers should choose measures that support decisions and interpret them within context.

Tool selection follows the work rather than fashion. Teams assess whether a platform supports the required planning method, permissions, audit trail, traceability, reporting, integrations, data location, accessibility, security, and cost. A small team may need a simple board and shared repository, while a regulated or multi-team program may need baselines, approvals, portfolio views, requirements links, test evidence, and controlled records. Configuration and training determine whether a capable tool improves delivery or creates administrative burden.

## Project charter and requirements

A project sponsor or initiator issues the project charter to authorise the project and give the project manager authority to apply organisational resources. The charter normally records the purpose, strategic alignment, measurable objectives, high-level scope and requirements, assumptions, constraints, major risks, summary milestones, budget, key stakeholders, approval criteria, sponsor, and project manager. Detailed scope, schedules, requirements, and management plans develop during subsequent planning. A charter clarifies authority and direction, but active scope and change control still prevent uncontrolled expansion.

Requirements engineering elicits, analyses, specifies, verifies, validates, traces, prioritises, and controls needs and requirements throughout the life cycle. Terminology should distinguish a system requirements specification from a software requirements specification when both exist. A useful specification provides the information needed for its context rather than relying on one universal template.

Individual requirements should be necessary, clear, singular, feasible, traceable, verifiable, and appropriately free of implementation detail. The specification can include functional behaviour, performance, interfaces, safety, security, reliability, usability, interoperability, environmental conditions, constraints, assumptions, external standards, and acceptance criteria. Models, use cases, scenarios, prototypes, and interface definitions can clarify interactions and expose gaps. Bidirectional traceability links needs to requirements, architecture, implementation, verification evidence, and validation evidence. Baseline and change controls preserve an agreed reference while allowing justified change.

## Stakeholder engagement and plan refinement

Teams identify individuals, groups, and organisations that can affect the system or experience its effects. A stakeholder register, mapping technique, or power-interest grid can support analysis, but teams must revisit the stakeholder community as responsibilities and needs change.

An engagement plan aligns each stakeholder's information needs, influence, accessibility, and preferred channels with suitable activities and timing. Interviews, workshops, observation, surveys, demonstrations, prototypes, and reviews can reveal needs and test assumptions. Feedback loops continue across the life cycle. Teams assess each request for value, feasibility, risk, cost, schedule, dependencies, and alignment before changing a baseline. The refined plan records priorities, release criteria, responsibilities, decision rationale, and realistic implementation timing.

## Monitoring, learning, and development platforms

Monitoring compares actual performance with approved plans and tolerances. Project leaders track deliverables, milestones, expenditure, quality, risk, issues, dependencies, resources, benefits, and scope. They assign clear ownership, review trends, investigate variance, and take proportionate corrective action. Effective reporting combines accurate data with concise explanation, forecast impacts, decisions, and actions. Communication keeps stakeholders informed and enables timely escalation.

A monitoring plan defines what the team will measure, where the data originates, who owns each measure, how often reviews occur, and which tolerances trigger action. Measures need consistent definitions and an appropriate baseline. A single figure rarely explains project health, so leaders examine related indicators and the reasons behind change. They also record decisions, owners, due dates, and follow-up actions. This discipline converts reporting from passive status collection into active control.

Teams capture lessons throughout the project as well as at closure. A useful process identifies positive and negative experience, documents the context and recommendation, analyses causes and patterns, stores the result in a searchable repository, and retrieves relevant lessons during planning and delivery. Regular reviews and named owners turn recorded observations into changed practices.

Azure DevOps provides connected services for software delivery rather than a single generic project management application. Azure Boards tracks backlogs, work items, iterations, and workflow. Teams can describe a user story, record testable acceptance criteria, divide it into tasks, assign ownership, and move work through configured states. State names vary among the Agile, Basic, Scrum, CMMI, and customised processes.

Azure Repos manages Git or centralised version control, branches, commits, and pull requests. Azure Pipelines automates build, test, and deployment workflows. Azure Test Plans supports test management, while Azure Artifacts manages package feeds. Project wikis store Markdown content in Git repositories and provide a shared, versioned knowledge base. Configurable dashboards present charts, widgets, and reports for work, code, builds, deployments, and tests. An Azure DevOps organisation can contain multiple projects, which allows teams to separate work while retaining organisation-level administration.
