# Decision Analysis and Management: System Safety & Reliability

System safety depends on identifying hazards and controlling risk throughout design, development, operation, and maintenance. Relevant risks include physical injury, equipment damage, cyberattacks, data loss, and service disruption. Reliability concerns a system's ability to perform its intended function without failure over time. Both require continuing attention as systems and operating conditions change.

Organisations establish acceptable-risk criteria to guide decisions about safeguards. These criteria depend on the system's purpose and the consequences of failure. A laboratory computer system and a public banking service, for example, require different protections. Operational needs, cost, and schedules influence decisions, alongside relevant standards and regulatory requirements. Resource constraints do not remove responsibility for safety.

A documented safety strategy identifies hazards, prioritises risks, specifies controls, and establishes how their effectiveness will be assessed. Executives, technical teams, and stakeholders need a shared understanding of the strategy and their responsibilities.

Verification connects these plans with evidence. Maintenance records can reveal equipment deterioration, while incident statistics can indicate whether workplace controls are effective. A strategy needs both preventive measures and arrangements for responding when failures occur, including clear responsibilities for recovery.

## Why complex systems fail

Complex systems contain many components and dependencies. Their failures can arise from several interacting causes, making diagnosis difficult. Changes may introduce unfamiliar failure paths, while delivery pressure can encourage shortcuts. Maintaining these systems also requires specialist knowledge that may be scarce or expensive.

Analysis needs to distinguish faults in individual components from systemic failures arising through interactions across the whole system. Both can contribute to the same incident. Replacing defective equipment may correct a local problem without resolving weaknesses in coordination or design.

Training, consistent procedures, and competent maintenance reduce vulnerability. Redundant components can preserve essential functions after a failure. Incremental changes help teams assess effects before introducing further changes. Past incidents provide useful evidence, but their remedies cannot always be applied unchanged. Learning from patterns, investigating failures openly, and practising recovery improve responses to unfamiliar conditions.

Controlled failure exercises can expose weaknesses and help teams practise recovery. Their value lies in improving understanding of system behaviour and the effectiveness of the response.

## Assessing risk

Assessment considers the likelihood and consequences of failure, including low-frequency events with severe effects. Priorities need review when new evidence, system changes, or operating experience reveal weaknesses in safeguards.

Risk analysis extends beyond equipment failure. Strategic analysis examines threats to organisational goals. Threat analysis addresses dangers such as cyberattacks. Program analysis considers successful delivery, cost analysis examines expenditure uncertainty, and investment analysis considers potential losses. Tools need to suit the question, remain relevant as conditions change, and be understood by their users.

Fault tree analysis begins with an unwanted system event and works downwards through its possible causes. AND gates represent conditions that must occur together, while OR gates represent alternative causes. This approach reveals combinations of failures that could produce a serious outcome and can support preventive changes before an incident occurs.

At a road junction, analysis might trace collisions to drivers missing a stop sign, then examine visibility, vegetation, and sunlight. Identifying these causal combinations helps establish whether the proposed traffic controls adequately address the hazards.

Failure mode and effects analysis, or FMEA, identifies ways a system could fail and examines their consequences. Specialists record failure modes and prioritise action according to their effects. System FMEA examines overall functions, design FMEA examines design weaknesses, and process FMEA examines production or operational processes. These perspectives complement fault tree analysis.

Other methods address particular situations. Preliminary hazard analysis identifies dangers early. Job safety analysis examines risks within work tasks, while interface safety analysis examines hazards where people or system elements interact. Together, these methods connect broad safety objectives with specific weaknesses and practical controls.

## Designing and maintaining controls

Safety measures need to address technical performance, human limitations, and organisational practices. Early assessment helps avoid hazards becoming embedded in a design. Controls then require testing and continuing attention after deployment.

- Simpler designs remove unnecessary complexity and reduce opportunities for failure. Clear interfaces and manageable tasks help staff operate systems safely.
- Redundancy provides backup capacity, such as hospital generators or alternative computing resources. Safe failure behaviour and limited dependencies help prevent local faults from spreading.
- Suitable components, safety ratings, and planned maintenance reduce deterioration and improve resistance to foreseeable operating conditions.
- Monitoring detects abnormal conditions and alerts responsible staff. Incident records help assess residual risk, which remains after controls are applied.
- Component testing and end-to-end testing examine different weaknesses. Software teams need suitable tools, clear quality requirements, and continuing validation.
- Audits, stakeholder feedback, and controlled changes support improvement. New features and configuration changes require assessment before implementation.

Documentation needs to explain the design, controls, and responsibilities at an appropriate level for each audience. Familiar tools and consistent practices across development and operation help staff apply requirements. Safety management continues throughout the system's life, with corrective action when evidence shows that controls are ineffective or risks have changed.

## Measuring reliability

RAMS describes four related qualities that support assessment of system performance.

| Quality | Meaning |
| --- | --- |
| Reliability | Performance of the intended function without failure over time. |
| Availability | Readiness for use when required. |
| Maintainability | Ease and efficiency of maintenance and restoration. |
| Safety | Control of risks that could cause harm. |

A system can fail infrequently yet remain unavailable for a long period after each failure. Efficient repair can improve availability, while safety assessment still needs to consider the consequences of a failure for people and equipment.

Reliability block diagrams represent how component performance contributes to successful system operation. Their connections show functional dependencies rather than necessarily reproducing the physical layout. Component data can include expected lifetime, failure characteristics, and repair time.

Mathematical models combine these relationships and data to estimate system reliability. They can support assessment before a working system exists and describe performance over time. Simpler models often treat components as non-repairable during the period being examined.

Simulation can represent more complicated failure and repair behaviour. Repeated runs generate possible sequences of events and help estimate their effects on the whole system. This flexibility can require substantial computing time. Both approaches depend on suitable data and assumptions.

## Communicating risk

Risk information becomes useful when it reaches people who can act on it. Clear communication aligns expectations, establishes responsibility, and brings different expertise into assessment. Staff need to understand their own duties instead of assuming that another team will address a problem.

Managers, operators, and customers may need different explanations of the same risk. Concrete examples and clear diagrams can connect technical findings with consequences relevant to each audience. Excessive numerical detail can obscure the decision required.

Meetings need clear agendas and suitable opportunities for participation. Distributed teams may require several discussions followed by shared decisions and actions. Automated notifications can alert relevant people to changing conditions. Effective communication connects each risk with its implications and the response required.

## Learning from failures

### Piper Alpha

Explosions and fire destroyed the [Piper Alpha](https://www.hse.gov.uk/offshore/piper-alpha-disaster-public-inquiry.htm) offshore platform on 6 July 1988. Failures in maintenance control and communication contributed to the disaster, including the loss of essential information during shift handover. Interacting failures allowed the incident to escalate.

Effective handovers, reliable maintenance records, and checks before equipment returns to service help address such weaknesses. Analysis also needs to examine how local failures could overwhelm protective barriers and affect connected systems. Prevention requires coordinated technical and organisational measures.

### Qantas flight 72

On 7 October 2008, [Qantas flight 72](https://www.atsb.gov.au/investigations/ao-2008-070), operated by an Airbus A330, experienced uncommanded nose-down movements that injured passengers and crew. Incorrect sensor-system data combined with a flight-control software limitation. Earlier reviews and testing had not identified that limitation. The crew responded appropriately, and the aircraft landed safely. The manufacturer subsequently changed the relevant algorithms.

Rare interactions can defeat safeguards despite extensive operating experience. Assessment of aircraft automation needs to include unusual combinations of inputs. Low observed failure frequency does not eliminate the consequences of failure.

Acceptable-risk decisions therefore require attention to likelihood, severity, and uncertainty. They also have ethical consequences for the people exposed to harm. Continuing analysis, testing, communication, and reassessment help organisations respond as knowledge improves.
