# Decision Analysis and Management: Technical Monitoring

System optimisation improves performance by adjusting designs, operating processes, and resource allocation. Reliability alone does not establish that a system uses resources efficiently or meets performance goals. Technical monitoring supplies evidence about actual behaviour, helping organisations identify bottlenecks, assess changes, and respond to evolving needs. Optimisation therefore continues throughout the system life cycle.

## Objectives, requirements, and design

Requirements define what a system must do and which attributes it must possess. They cover functions, external interfaces, and data needs. Design defines how those requirements will be met through architecture, technologies, and implementation methods.

Requirements need to align with the business case, address relevant risks, and support stakeholder objectives. They must also be testable and observable, so stakeholders can verify that the delivered system satisfies them.

Design documents translate these expectations into conceptual and logical descriptions of components and their interactions. Reviewing requirements against the business case helps maintain alignment throughout development.

Performance goals can receive different weights according to their importance. These priorities may change as evidence accumulates or operating conditions shift. Clear goals and constraints provide the basis for comparing designs and assessing trade-offs.

## Principles of optimisation

Modelling represents relevant features of a system, while simulation explores its behaviour under specified conditions. Together, they allow engineers to compare alternatives, measure performance, and refine designs before implementation. Examining adverse outcomes also helps identify vulnerabilities and prioritise risk reduction.

Common improvements include removing redundant work, improving algorithms and schedules, and reusing existing infrastructure. Other options include hardware upgrades, resource consolidation, and specialised components suited to particular tasks. Revisiting requirements can reduce unnecessary complexity and reveal poorly used resources.

The appropriate combination depends on operational needs. Higher throughput, lower costs, improved responsiveness, and greater resilience may compete, requiring explicit choices about priorities.

Risk assessment considers both the likelihood and the consequences of undesirable outcomes. Comparing adverse conditions with expected operation helps identify where additional protection or capacity could improve resilience. Simulation measurements can also reveal where one performance gain creates another limitation.

## Mathematical modelling and resource allocation

A mathematical model connects resource consumption with an objective such as profit. In a hypothetical bakery, each chocolate cake earns a $10 profit and requires two cups of flour and one cup of sugar. Each vanilla cake earns an $8 profit and requires one cup of flour and two cups of sugar.

Two possible production plans have different resource demands and returns:

| Chocolate cakes | Vanilla cakes | Flour used, cups | Sugar used, cups | Profit |
| --- | --- | --- | --- | --- |
| 125 | 100 | 350 | 325 | $2,050 |
| 100 | 125 | 325 | 350 | $2,000 |

The second plan saves 25 cups of flour but uses 25 more cups of sugar and earns $50 less. Its suitability depends on ingredient availability. A spreadsheet calculates these relationships by multiplying production quantities by ingredient requirements and unit profits. Identifying the best feasible plan also requires explicit resource limits.

If chocolate and vanilla quantities are represented by `c` and `v`, flour consumption is `2c+v`, sugar consumption is `c+2v`, and profit is `10c+8v`. Changing quantities immediately changes both resource requirements and financial returns.

## Uncertainty, sensitivity, and scenarios

Uncertainty analysis examines the overall variation in model outputs caused by uncertain inputs. Sensitivity analysis identifies how changes in particular inputs or assumptions affect results. This helps reveal influential variables, test the robustness of decisions, and direct attention towards assumptions needing better evidence.

Scenario analysis changes several assumptions together to explore plausible futures. Common scenarios include:

- Pessimistic conditions, with adverse developments and tighter constraints.
- Optimistic conditions, with favourable developments and opportunities.
- Realistic conditions, reflecting current trends and assumptions about likely outcomes.

Considering these alternatives helps organisations anticipate resource demands and prepare responses to changing conditions. Sensitivity and scenario analysis complement each other by examining both influential inputs and combinations of circumstances. Their usefulness depends on the quality of the model and its assumptions.

Results can guide model refinement, checks for potential error, and resource allocation. Exploring several futures also supports contingency planning for investments and operations when a single forecast provides too narrow a basis for action.

## Monitoring and data analysis

Analysis begins with collecting relevant data, cleaning it, and organising it for examination. Cleaning addresses invalid entries and records outside the intended scope. For example, an N/A grade may be excluded from calculations requiring a valid numerical grade.

Charts, pivot tables, and automated tools reveal distributions and relationships that visual inspection can overlook. In a small student dataset, an apparent division between men and women can obscure a non-binary category. Larger datasets make systematic analysis even more necessary.

Data selection needs to fit the question being investigated. Filtering changes the population represented by the results, so exclusions require care. Reliable preparation is particularly significant for machine learning and artificial intelligence. Cleaning can address errors, but it does not by itself establish that an analysis is free from bias.

## Decision analysis

Decision analysis compares alternatives against goals, possible outcomes, uncertainties, and probabilities. Framing establishes the problem, its boundaries, and the relevant stakeholder perspectives. Considering several viewpoints can expose overlooked risks and assumptions.

Probabilities express assessed likelihoods, while uncertainties identify gaps or variability in knowledge. Reviewing both helps clarify how strongly the available evidence supports a choice.

Decision trees show choices and possible outcomes, together with their probabilities. Expected value combines possible values or utilities, weighted by their probabilities, to support comparison.

A structured decision process follows six stages:

1. Problem definition establishes the objectives, constraints, and stakeholder preferences.
2. Alternative development identifies feasible courses of action.
3. Evaluation compares benefits, weaknesses, risks, and potential outcomes.
4. Selection identifies the option that best fits the objectives and constraints.
5. Implementation coordinates resources and stakeholder involvement.
6. Monitoring tracks outcomes and supports revisions when evidence warrants a change.

Current, relevant information supports each stage. Expected value is useful within this broader assessment, alongside practical constraints and the organisation's priorities. Continued review connects the initial choice with its actual consequences.

## Simulation and adjustment

Simulation explores conditions that may be difficult to reproduce directly, such as exceptionally high demand for an online service. Optimisation changes parameters or configurations to improve results. Further simulation then evaluates the proposed adjustment.

A simple spreadsheet can generate 1,000 outputs using `RAND()*a+b`, where `a` controls the range and `b` shifts it. With `a=100` and `b=0`, values range from zero to just below 100. Setting `a=50` and `b=25` confines them to 25 to just below 75.

A histogram makes the changed distribution visible. Changing parameters alters performance against a target, while repeated simulations show the resulting distribution of outputs.

## Managing resource constraints

Shortages of staff, funding, or materials can delay delivery and reduce quality. Deficits are shortages, limitations restrict availability or use, and risks concern uncertain future conditions.

Time, scope, and cost interact. Time covers deadlines and milestones, scope defines objectives and deliverables, and cost limits the available budget. A restriction on one may require changes to the others. Uncontrolled scope expansion, poor allocation, and unexpected events can intensify resource pressures.

Effective management combines clear project boundaries with priorities based on strategic importance and resource needs. Critical activities require adequate resources, while contingency plans provide alternatives if shortages occur. Historical data, expert judgement, and risk assessment improve estimates. Stakeholder participation helps reconcile priorities and identify additional resources. Monitoring actual use and progress enables timely adjustments.

## Continuous improvement across sectors

Optimisation combines technical changes with operational knowledge. Its objectives vary by setting, but monitoring and feedback remain central.

### Delivery logistics

UPS's ORION system uses delivery, customer, and traffic information to improve routes and schedules. GPS tracking supports adjustments, and drivers contribute feedback. Better routing can reduce travel distance, idling, fuel consumption, and operating costs. Collaboration helps route planning adapt to changing demand and conditions.

Reduced fuel use can also lower emissions. Operational improvements involve drivers, customers, and technology partners, whose experience helps identify further opportunities as delivery volumes grow.

### Wind farms

Wind speed, turbine performance, and grid conditions inform operating adjustments. Predictive maintenance helps reduce downtime, while coordinated turbine settings support energy production and grid stability. Decisions balance technical performance, operating costs, and environmental effects.

### Smart buildings

Building management systems coordinate controls using energy, occupancy, and environmental data. Adjustments based on occupancy can reduce unnecessary consumption, while renewable generation can supplement conventional supply. Energy savings need to be balanced with occupant comfort and wellbeing.

Demand forecasts help allocate resources before consumption peaks. Centralised control and automation support coordinated adjustments across building systems, with potential benefits for costs and environmental performance.

### Healthcare scheduling

Scheduling systems match patient needs with provider availability and limits on staff, equipment, and facilities. Current patient-flow data and demand forecasts help identify bottlenecks. Digital booking supports access, while better allocation can reduce waiting times and improve resource use. Patient preferences remain part of scheduling decisions.

### Bank branches

Customer behaviour informs online services, branch consolidation, redesign, and staff training. Digital access extends service beyond branch hours, while physical locations support in-person needs. Continued adjustment balances accessibility, customer experience, and operating costs as technology and preferences change.
