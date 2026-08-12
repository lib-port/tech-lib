# Systems Engineering Process: Human Factors in System Design
# Human Factors in System Design
Human factors and ergonomics examine interactions among people and other system elements. The discipline applies evidence about physical, cognitive, organisational, and social capabilities to improve human wellbeing and overall system performance. It addresses products, services, tasks, workplaces, environments, procedures, teams, and organisations, not only user interfaces.
## Human-centred design
Human-centred design (HCD) develops interactive systems through an explicit understanding of users, tasks, goals, and contexts of use. User-centred design (UCD) commonly describes the same family of approaches. Neither term defines a strict contrast between individual products and social problems, and neither belongs exclusively to Agile, Waterfall, or another delivery method.

HCD involves users throughout design and development to an extent appropriate to the project. Multidisciplinary teams specify user requirements, create alternatives, evaluate designs against those requirements, and iterate. They consider the whole experience across acquisition, learning, routine use, support, maintenance, and retirement.

Human factors extends this work beyond expressed preferences. Specialists examine perception, memory, decision-making, workload, posture, reach, strength, fatigue, teamwork, communication, work organisation, environmental conditions, foreseeable misuse, and human error. Safety-critical systems also require rigorous task analysis, function allocation, alarm and control design, training analysis, and evaluation under realistic conditions.

HCD can improve usability, accessibility, safety, adoption, and service quality, but it does not guarantee lower costs, higher sales, ethical conduct, or sustainability. Teams must define and measure those outcomes separately. Privacy, fairness, accessibility, and protection from harm require explicit requirements and governance.
## Planning user research
Research begins with a decision, uncertainty, or assumption that the team needs to address. A sound plan:
1. Defines research questions, intended decisions, success measures, scope, and constraints.
2. Identifies direct users, potential users, non-users, support staff, operators, maintainers, purchasers, and people indirectly affected by the system.
3. Recruits relevant participants across important behaviours, contexts, abilities, access needs, experience levels, cultures, and other characteristics.
4. Selects methods that can answer each question and combines methods when one source cannot provide sufficient evidence.
5. Establishes informed consent, voluntary participation, privacy, data minimisation, retention, safeguarding, and accessible participation.
6. Pilots research materials, records assumptions, and plans how the team will analyse, share, and act on findings.

Incentives compensate participants for time, effort, and expenses. They do not ensure candid answers. Researchers set incentives fairly, avoid pressure, explain that payment does not depend on favourable responses, and accommodate disability-related participation costs.

No universal sample size suits every method. The required number depends on the research question, population diversity, design maturity, risk, desired statistical precision, and whether the work seeks discovery, comparison, or measurement. Small iterative rounds can expose usability problems, while surveys, experiments, benchmarks, and subgroup comparisons usually need larger samples and an appropriate sampling plan.
## Choosing research methods
| Method | Best use | Main cautions |
| --- | --- | --- |
| Contextual observation | Revealing real tasks, workarounds, interruptions, and environmental constraints | Observation can alter behaviour, and access may be difficult |
| Interview | Exploring experiences, goals, reasoning, and language in depth | Recall, interviewer influence, and stated behaviour can differ from actual behaviour |
| Focus group | Exploring attitudes, terminology, and contrasting perspectives through discussion | Group pressure, dominant voices, and social desirability can suppress dissent |
| Survey | Measuring reported characteristics or opinions across a defined sample | Poor questions, self-selection, non-response, and weak sampling can distort results |
| Card sorting | Investigating how participants group and label information | Results inform information architecture but do not determine it automatically |
| Usability testing | Observing whether representative participants can complete realistic tasks | Tests evaluate the selected design and tasks, not every aspect of user experience |
| Participatory design | Enabling users and other stakeholders to shape concepts and prototypes | Facilitation, power differences, representation, time, and synthesis need careful management |

Usability testing can use sketches, paper prototypes, interactive prototypes, existing services, or working systems. It does not require a near-final product. A moderator observes behaviour without teaching the interface, asks neutral follow-up questions, and distinguishes what participants did from what they said.

Research programmes can combine primary evidence from observation, interviews, tests, surveys, and experiments with secondary evidence from analytics, support records, prior studies, standards, and published research. Triangulation strengthens a finding when independent sources converge and exposes uncertainty when they conflict.
## Analysing research
Analysis returns to the research questions and intended decisions. Qualitative evidence supplies context, meaning, and explanations. Quantitative evidence estimates frequency, magnitude, association, or performance within the limits of the sample and method. Counts do not make a convenience sample representative, and quotations do not establish prevalence.

Researchers prepare and secure the data, review notes or recordings, code relevant material, compare participants and segments, and group related evidence. Affinity mapping supports collaborative clustering. Thematic analysis develops patterns of shared meaning. Content analysis classifies material systematically and may include counts. The term context analysis does not describe this general coding process.

The team checks contradictory cases, alternative explanations, bias, missing groups, and limitations before drawing conclusions. It links each finding to evidence and distinguishes observations, interpretations, recommendations, and open questions. An issue catalogue can record affected users, task, context, severity, frequency, risk, confidence, and supporting evidence. Priority should reflect user impact, safety, accessibility, strategic value, effort, and dependencies, not frequency alone.

Clear reports use concise findings, representative evidence, journey maps, charts, or service maps where they aid understanding. Teams maintain traceability from research questions to findings and design decisions, then monitor whether changes improve the intended outcomes.
## Personas and scenarios
Personas are optional synthesis artefacts that represent evidence-based patterns among relevant users. Useful personas emphasise goals, behaviours, tasks, contexts, capabilities, constraints, and access needs. Decorative biographies and unsupported demographic details can encourage stereotypes. A fictional name or image can aid recall, but it cannot replace evidence.

Proto-personas record hypotheses when research remains limited. Teams must label and test them as assumptions rather than present them as validated users. Project participants cannot validate a persona by agreement alone. Research with actual or likely users must support it. Teams keep the number manageable, identify differences that affect design, preserve links to source evidence, and update or retire personas as understanding changes.

Scenarios describe how a user pursues a goal in a context. They can include the actor, trigger, environment, goal, constraints, relevant emotions, actions, decision points, barriers, and intended outcome. Broad scenarios explore an end-to-end journey, while task scenarios focus evaluation on a particular goal.

A usability task should provide motivation and a realistic goal without revealing the required interface steps. Prescribing every action can mask navigation and comprehension problems. User stories serve a different purpose. They express a concise backlog need and acceptance context, while research scenarios explore behaviour and conditions in richer detail.
## Designing and evaluating the system
Interaction design supports the user's task, communicates system status, uses familiar and precise language, matches reasonable expectations, supports learning, preserves appropriate user control, and enables recovery from errors. Designers account for individual differences and provide alternatives where one interaction cannot serve everyone.

Accessibility forms a requirement, not a favourable side effect of empathy. Digital teams apply relevant standards, including WCAG 2.2 for web content, and test with disabled people who use appropriate assistive technologies. Conformance checks and automated tools cannot replace usability evaluation with users.

Iterative work moves from research to requirements, concepts, prototypes, evaluation, and refinement. Teams record design rationale and assess effectiveness, efficiency, satisfaction, accessibility, safety, error rates, workload, and operational performance where relevant. They continue research after release because users, tasks, technology, and environments change.
## Constraints and safeguards
Human-centred work faces competing schedules, budgets, recruitment, stakeholder resistance, and changing needs. Research can also reproduce exclusion when teams recruit convenient participants, interpret behaviour through their own assumptions, or treat vocal users as representative. Conflicting needs may prevent one design from satisfying every group, while extensive customisation can increase complexity and maintenance costs.

Teams respond by prioritising high-risk uncertainties, conducting smaller research rounds, and testing assumptions early with low-cost prototypes. Diverse research teams, reflexive notes, neutral questions, multiple methods, and peer review reduce bias without removing it. Inclusive recruitment and accessible sessions reveal barriers that mainstream samples miss. Product, engineering, legal, security, safety, operations, and support specialists contribute constraints and evidence that users may not know.

Designers balance user evidence with technical feasibility, system safety, public interest, business viability, and legal duties. They document unresolved conflicts and explain trade-offs instead of claiming universal agreement. Clear outcome measures reveal whether a change improves real use after release. When evidence remains weak, the team records uncertainty, limits exposure, monitors consequences, and schedules further research.
## Applied example
A roadside-assistance or repair service should not begin with an assumed app solution or a single invented traveller. Research needs to include motorists with varied vehicle knowledge and access needs, repairers, towing providers, support staff, and people in unsafe or low-connectivity situations. It should examine service availability, location accuracy, pricing, trust, privacy, emergency escalation, and communication under stress.

The team can compare concepts such as guided fault descriptions, verified provider matching, booking, towing requests, telephone support, and low-connectivity alternatives. Early prototypes can test plain language, accessibility, error recovery, provider information, and task completion. Operational trials can then measure successful connections, time to assistance, failed matches, cancellations, safety incidents, user comprehension, and satisfaction. Evidence, feasibility, safety, and service capacity determine the final design.