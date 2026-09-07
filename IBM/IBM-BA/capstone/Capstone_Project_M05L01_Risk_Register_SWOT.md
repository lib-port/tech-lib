# Risk Management Plan: Risk Register and SWOT Analysis

| Document field  | Details                                                                                                                                                          |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| File name       | `Capstone_Project_M05L01_Risk_Register_SWOT.md`                                                                                                                  |
| Project         | HealthFirst Care - Patient Experience and Operational Efficiency Initiative                                                                                      |
| Version         | 0.1                                                                                                                                                              |
| Document status | Draft for stakeholder review                                                                                                                                     |
| Project scope   | Outpatient appointment scheduling, check-in, resource visibility, notifications, departmental handoffs, reporting, integration, and supporting change activities |

## Executive summary

This plan identifies **13 project risks** across operational, technical, and stakeholder categories. Ten risks are rated High and three are rated Medium. No risk is currently rated Low. The seven highest-scoring risks require particular attention:

- **R-01:** incomplete or outdated resource information;
- **R-02:** incomplete scheduling conflict rules;
- **R-06:** difficult legacy-system integration;
- **R-07:** network or application downtime;
- **R-09:** missing data needed for wait-time and performance measurement;
- **R-11:** unclear governance and decision rights; and
- **R-12:** budget limitations and scope pressure.

The cleaned data is useful for basic counts and for demonstrating reporting logic, but it is not an approved operational baseline. The appointment extract has 20 records but no physical check-in, consultation-start, duration, resource-assignment, or booking-history fields. The feedback extract has 15 records and an average score of 7.00, but its scale, benchmark, sampling method, and authoritative appointment key are missing. The resource extract has 10 records and 52 recorded usage hours, but it lacks department, location, capacity, demand, reservation, and comparable interval fields. These limitations directly support the data, resource, conflict-detection, and decision-quality risks in this register. [SRC-07, SRC-08]

The SWOT analysis shows that HealthFirst Care has a traceable project foundation, cross-functional stakeholder coverage, and clean sample extracts. However, manual workflows, disconnected systems, measurement gaps, and unconfirmed governance could prevent benefits from being demonstrated. The recommended response is a controlled, phased release supported by data governance, user involvement, tested fallback procedures, and formal scope and risk decisions.

## 1. Purpose and scope

The purpose of this plan is to:

1. identify threats to project delivery, service continuity, patient experience, data protection, adoption, and benefit realization;
2. assess each risk using a consistent 3 × 3 likelihood-and-impact method;
3. define practical mitigation and contingency actions;
4. assign proposed ownership and monitoring indicators;
5. summarize internal and external factors through a SWOT analysis; and
6. provide a repeatable process for reviewing, escalating, and closing risks.

The assessment covers the HealthFirst Care outpatient improvement initiative described in the BRD, RTM, stakeholder analysis, scope plan, process models, and dashboard analysis. It does not provide a clinical safety assessment, legal opinion, cybersecurity certification, or approval to release the solution. Applicable privacy, security, accessibility, consent, retention, and jurisdiction-specific obligations remain to be confirmed by authorized representatives. [SRC-01-SRC-08]

### 1.1 Evidence and limitations

- Stakeholder-reported issues and lab-simulated workflow steps are treated as discovery evidence, not confirmed event frequencies.
- The available extracts are small and patterned. They support descriptive checks but not hospital-wide trend, causation, wait-time, overlap-rate, or utilization claims.
- Likelihood ratings are qualitative judgments, not statistically measured probabilities.
- Impact refers to project and operational consequences. It is not a patient clinical-risk classification.
- Each risk has one primary category for reporting, although several risks affect more than one category.
- Proposed owners are role names because individual representatives and formal decision rights have not yet been confirmed.

## 2. Risk assessment method

### 2.1 Likelihood scale

| Level | Score | Working definition |
| --- | ---: | --- |
| Low | 1 | The event is not expected under normal delivery conditions, but it remains possible. |
| Medium | 2 | The event is reasonably possible because a dependency, control, or decision is incomplete. |
| High | 3 | The event or its driver is already present, repeatedly reported, or very likely without action. |

### 2.2 Impact scale

| Level | Score | Working definition |
| --- | ---: | --- |
| Low | 1 | Limited rework or delay; no material effect on a key objective, control, or service. |
| Medium | 2 | Noticeable operational disruption, rework, stakeholder concern, or delay that can be managed within the workstream. |
| High | 3 | Material effect on patient service, privacy/security, a Must Have requirement, project funding, release readiness, or the 20% wait-time objective. |

### 2.3 Severity calculation and response

**Severity score = Likelihood score × Impact score**

| Severity | Score | Color code | Required response                                                                                        |
| -------- | ----: | ---------- | -------------------------------------------------------------------------------------------------------- |
| High     |   6-9 | Red        | Immediate attention, named action owner, and weekly review until reduced or formally accepted.           |
| Medium   |   3-4 | Yellow     | Monitor and manage through planned actions and review every two weeks or at the next project checkpoint. |
| Low      |   1-2 | Green   | Regular review, normally monthly, with escalation if likelihood or impact increases.                     |

Scores of 5, 7, and 8 cannot occur in this 3 × 3 model. Current ratings are pre-mitigation and do not assume proposed controls are operating; only a confirmed existing control may reduce a current rating.

## 3. Data-informed risk drivers

| Data source | Verified descriptive finding | Risk implication |
| --- | --- | --- |
| Cleaned appointments | 20 records: 8 Completed, 4 No Show, 4 Rescheduled, and 4 Cancelled. Each of the five listed times occurs four times, so no unique peak is established. | Status handling and exception workflows need attention, but the sample does not prove a peak period, overlap rate, or cause of non-completion. [R-02, R-09, R-13] |
| Cleaned appointments | Scheduled date and time are present; request, booking, physical check-in, consultation-start, duration, resource-assignment, history, and override evidence are absent. | Wait time and true full-period appointment conflicts cannot be calculated or validated from the extract. [R-02, R-09] |
| Cleaned feedback | 15 records; average score 7.00; observed scores range from 5 to 9; each department has three responses. Comments include concerns about long waits and delayed response. | Feedback supports further investigation, but the missing scale, target, sampling method, and small department counts limit interpretation. [R-10, R-13] |
| Cleaned feedback | The lab rule classifies all 15 responses as High satisfaction because every score is at least 4. No authoritative Appointment ID is available for the feedback-to-appointment link. | The High/Low split is non-discriminating and Patient ID alone should not support causal claims. [R-09, R-13] |
| Cleaned resources | 10 records and 52 recorded usage hours; availability statuses are 4 Available and 2 each Unavailable, In Use, and Under Maintenance. | Recorded hours and status counts can be described, but they are not utilization or shortage rates. [R-01, R-13] |
| Cleaned resources | Department, location, capacity, demand, reservations, comparable time interval, appointment link, and ownership are missing. Rooms marked Under Maintenance also have recorded usage hours. | Resource allocation may be based on incomplete or ambiguous information until definitions, ownership, and refresh controls are approved. [R-01, R-09] |

## 4. Risk register

| Risk ID | Risk description | Risk category | Likelihood | Impact | Severity (Likelihood × Impact) | Mitigation strategy |
| --- | --- | --- | --- | --- | --- | --- |
| R-01 | If resource status, department, location, capacity, ownership, or refresh timing remains missing or ambiguous, staff may assign unsuitable or unavailable rooms, equipment, or personnel, causing rework and patient delay. | Operational | High (3) | High (3) | **High (9)** | Approve resource and status definitions; assign data owners; capture department, location, capacity, reservation, maintenance, and effective-time fields; validate required fields; flag stale or incomplete records; and review allocation exceptions. Do not present recorded hours as utilization without an approved capacity denominator. |
| R-02 | If appointment duration, buffers, resource relationships, concurrency behavior, and override rules remain incomplete, conflict detection may permit overlapping bookings or reject valid slots, reducing scheduling accuracy. | Operational | High (3) | High (3) | **High (9)** | Agree appointment-type duration, buffer, resource, hold, and override rules; perform full-period conflict checks and a final atomic recheck; record authorized override reasons and approvers; and test normal, concurrent, rescheduled, cancelled, and exception scenarios. |
| R-03 | If task ownership, acknowledgement, escalation, and closure rules remain unclear, interdepartmental resource, referral, result, or support requests may be misrouted or delayed. | Operational | High (3) | Medium (2) | **High (6)** | Validate the process maps and a simple RACI with affected departments; assign an accountable process owner; use standard task statuses, required details, aging reports, and escalation routes; and review overdue or reopened handoffs. |
| R-04 | If staff resist the new workflows or continue using unapproved parallel records, manual workarounds, or work outside the approved process, adoption, data completeness, and expected efficiency benefits may be reduced. | Operational | Medium (2) | Medium (2) | **Medium (4)** | Involve representative users in design and UAT; appoint department champions; provide role-based training and early-life support; run a controlled pilot; and monitor process use, workarounds, training attendance, and recurring support issues. |
| R-05 | If pilot, cutover, or recovery activities interrupt established appointment workflows, patient services may be delayed or records may remain unreconciled. | Operational | Medium (2) | High (3) | **High (6)** | Use a limited pilot; approve readiness, go/no-go, cutover, support, rollback, and reconciliation steps; rehearse critical scenarios and the controlled manual fallback; and assign one owner for post-recovery reconciliation. |
| R-06 | If legacy scheduling, record, billing, or departmental interfaces cannot exchange complete and accurate data, implementation may be delayed or produce duplicate entry, inconsistent records, and additional cost. | Technical | High (3) | High (3) | **High (9)** | Complete early interface discovery; confirm supported systems and first-release boundaries; define field mappings, identifiers, error handling, retries, and reconciliation; run end-to-end tests; and phase interfaces through change control where necessary. |
| R-07 | If network or application downtime occurs, online booking, check-in, notifications, status updates, and task routing may become unavailable. | Technical | High (3) | High (3) | **High (9)** | Agree service, recovery, and escalation expectations; implement monitoring and alerts; test backup communication, controlled manual logging, recovery, and reconciliation; and maintain an approved downtime procedure accessible to frontline staff. |
| R-08 | If role access, consent, contact, message, or audit controls are incorrectly configured, patient information may be accessed, changed, or sent to the wrong recipient. | Technical | Medium (2) | High (3) | **High (6)** | Use authenticated role-based access and least privilege; record preference and consent; validate recipients; use approved message templates; maintain audit trails; test normal and exception access; and approve privacy/security and incident-response controls before release. |
| R-09 | If required timestamps, encounter keys, data definitions, validation rules, or source-to-interface/report reconciliation remains missing or inaccurate, reports may be unreliable and HealthFirst Care may be unable to demonstrate the 20% wait-time objective. | Technical | High (3) | High (3) | **High (9)** | Approve a data dictionary, eligible population, wait-time formula, exclusions, baseline and comparison periods, and completeness threshold; capture scheduled, physical check-in, and consultation-start times; validate required fields; reconcile source, interface, and report totals; and prevent benefit claims until a representative baseline is approved. |
| R-10 | If digital journeys, accessibility needs, contact details, preferred channels, consent, and delivery exceptions are not handled correctly, some patients may be unable to manage appointments or may miss important updates. | Stakeholder | Medium (2) | Medium (2) | **Medium (4)** | Retain phone and in-person support; test assisted and accessible journeys with representative patients; validate contact details, preference, and consent; record delivery results; and route failed messages for approved follow-up. |
| R-11 | If the sponsor, approvers, process owners, deputies, and decision rights remain unconfirmed or unavailable, requirements, UAT, risk decisions, and release approval may be delayed or based on misaligned expectations. | Stakeholder | High (3) | High (3) | **High (9)** | Approve a governance and responsibility record; name the sponsor, owners, approvers, representatives, and deputies; schedule decision gates early; maintain a decision log; and escalate overdue decisions with their cost, schedule, scope, and risk effects. |
| R-12 | If the funding ceiling and first-release boundary remain unapproved, or if unapproved additions enter delivery, budget pressure may defer Must Have requirements or essential continuity, privacy, and data-quality controls. | Stakeholder | High (3) | High (3) | **High (9)** | Confirm the funding ceiling and release scope; retain MoSCoW priorities; estimate integration, support, training, and control costs; protect Must Have and mandatory control work; assess every scope change; and phase Should Have items and approved lower-priority change candidates when necessary. |
| R-13 | If prototype dashboard values or small patterned samples are treated as hospital-wide performance evidence, leaders may make unsuitable operational or investment decisions. | Stakeholder | Medium (2) | Medium (2) | **Medium (4)** | Keep prototype and data-readiness labels visible; prohibit unsupported wait-time and utilization claims; use report approval and data-quality gates; collect a representative operating period; and obtain Data Owner and leadership sign-off before adopting a management baseline. |

## 5. Risk Assessment Matrix

The matrix uses both color symbols and written labels so that priority does not depend on color alone.

| Likelihood ↓ / Impact → | Low (1) | Medium (2) | High (3) |
| --- | --- | --- | --- |
| **High (3)** | **Medium - 3**<br>No risks assigned | **High - 6**<br>R-03 | **High - 9**<br>R-01, R-02, R-06, R-07, R-09, R-11, R-12 |
| **Medium (2)** | **Low - 2**<br>No risks assigned | **Medium - 4**<br>R-04, R-10, R-13 | **High - 6**<br>R-05, R-08 |
| **Low (1)** | **Low - 1**<br>No risks assigned | **Low - 2**<br>No risks assigned | **Medium - 3**<br>No risks assigned |

### 5.1 Priority summary

| Priority order | Risks | Management treatment |
| --- | --- | --- |
| 1 - High, score 9 | R-01, R-02, R-06, R-07, R-09, R-11, R-12 | Confirm owners and immediate response actions; review weekly with sponsor visibility until exposure is reduced or formally accepted. |
| 2 - High, score 6 | R-03, R-05, R-08 | Begin mitigation during solution design and readiness work; review weekly and escalate ownership, control, continuity, or service-readiness gaps. |
| 3 - Medium, score 4 | R-04, R-10, R-13 | Manage within the affected workstream and review every two weeks or at project gates. |
| 4 - Medium, score 3 | None assigned | Record any newly identified Medium risks in the appropriate matrix cell and assign an owner. |
| 5 - Low | None assigned | Continue to display green matrix cells and record any new low risks during regular review. |

## 6. Ownership, warning indicators, and contingencies

The owners below are proposed roles. The sponsor must confirm the accountable person for each risk.

| Risk ID | Proposed owner(s) | Early warning indicator | Suggested contingency if the risk occurs |
| --- | --- | --- | --- |
| R-01 | Resource Process Owner; Data Owner | Missing or stale resource records, conflicting statuses, rising manual confirmation, or allocation overrides | Stop automatic assignment for affected resources and require controlled confirmation by the resource owner until data is corrected. |
| R-02 | Clinical and Administrative Process Owners; Business Analyst | Rules remain unapproved, conflict tests fail, or unauthorized overrides increase | Block final confirmation for affected appointment types and use an approved manual review until rules and defects are resolved. |
| R-03 | Department Process Owners | Overdue, misrouted, duplicated, or repeatedly reopened tasks | Assign a temporary coordinator, reroute affected items, and escalate aged requests to the accountable department lead. |
| R-04 | Change/Training Lead; Operational Leads | Low workshop, training, or UAT participation; continued parallel records; repeated manual workarounds | Extend the pilot and early-life support, provide targeted coaching, and delay wider rollout if critical adoption criteria are not met. |
| R-05 | Project Manager; Clinical Operations Lead; IT Operations | Critical UAT defects, failed cutover rehearsal, incomplete support coverage, or growing service backlog | Postpone go-live or roll back to the validated prior workflow; reconcile all affected records before normal processing resumes. |
| R-06 | Integration Lead; System Owners | Interface rejects, mismatched totals, duplicate identifiers, or failed reconciliation | Disable the affected interface and use an approved controlled transfer or manual process while defects are corrected. |
| R-07 | IT Service Manager | Increasing outage duration, transaction failures, delayed messages, or failed recovery testing | Activate the downtime procedure, restore service, reconcile transactions, and safely contact or reschedule affected patients. |
| R-08 | Information Security and Privacy/Records-Control Leads | Failed access tests, audit anomalies, consent exceptions, or a misdirected message | Disable the affected access or message function and activate the approved privacy/security incident process. |
| R-09 | Data Owner; Business Analyst; IT Lead | Missing timestamps or keys, failed validation or source-to-report reconciliation, or an unapproved baseline | Suspend affected reports and benefit claims; correct or recollect data and re-run validation before approval. |
| R-10 | Patient Access Lead | Undeliverable messages, accessibility complaints, increased assisted-channel requests, or abandoned digital journeys | Use validated alternative contact methods and provide phone or in-person assistance while the affected journey is corrected. |
| R-11 | Project Sponsor; Project Manager | Unnamed approvers, cancelled reviews, overdue decisions, or missing UAT representatives | Nominate authorized deputies, reschedule the affected gate, and pause dependent work where approval is required. |
| R-12 | Project Sponsor; Project Manager | Must Have items proposed for deferral, unresolved funding decisions, rising change requests, or cost estimates above available funding | Phase Should Have items and approved lower-priority change candidates, seek an explicit funding or scope decision, and rebaseline only through approved change control. |
| R-13 | Data Owner; Hospital Leadership | Prototype values appear in performance packs or decisions without limitation statements or baseline approval | Withdraw the measure from performance use, issue a corrected interpretation, and replace it with a data-readiness action until evidence is approved. |

## 7. Requirements and evidence traceability

| Risk ID | Primary objective, requirement, process, or data links |
| --- | --- |
| R-01 | OBJ-03; FR-08, FR-11; NFR-05; AC-04; DQ-06, DQ-07, DQ-09 |
| R-02 | OBJ-02, OBJ-03; BR-01; FR-02, FR-06, FR-08; AC-02, AC-04; DQ-02 |
| R-03 | OBJ-03, OBJ-04, OBJ-05; FR-08, FR-09, FR-11; AC-08; AS-IS-COM-01; handoffs H-05, H-06, and H-08 |
| R-04 | OBJ-01-OBJ-05; NFR-01; AC-05; stakeholder engagement and deployment-readiness activities |
| R-05 | OBJ-02, OBJ-05; NFR-03, NFR-05; AC-05, AC-06; scope constraint C-10 and deployment WBS |
| R-06 | OBJ-05; BR-05; FR-10, FR-11; NFR-05; AC-09; scope constraints C-03 and C-08 |
| R-07 | OBJ-02, OBJ-04; FR-04, FR-05; NFR-03; AC-03, AC-05; scope constraint C-04 |
| R-08 | OBJ-04, OBJ-05; FR-05; NFR-02; AC-03, AC-07; stakeholder open item SA-07 |
| R-09 | OBJ-01, OBJ-04; BR-02; FR-05, FR-07, FR-11; NFR-05; AC-01, AC-06; DQ-01, DQ-04, DQ-05, DQ-08 |
| R-10 | OBJ-02, OBJ-04; FR-04, FR-05; NFR-01, NFR-02; AC-03, AC-05; patient stakeholder needs |
| R-11 | OBJ-01-OBJ-05; scope assumptions A-01 and A-08; dependency D-01; stakeholder items SA-01, SA-03-SA-05 |
| R-12 | OBJ-01-OBJ-05; BR-01-BR-05; MoSCoW priorities; scope constraints C-01, C-02, and C-08; change candidates PCM-01-PCM-04 and SWL-CR-01 |
| R-13 | OBJ-01, OBJ-03; FR-11; NFR-05; AC-01, AC-06; DQ-03-DQ-09; dashboard data-readiness findings |

Traceability links show why each risk is included. They do not mean the linked requirement or process has been approved or implemented. The RTM requirements remain Pending until an authorized decision is recorded. [SRC-02]

## 8. SWOT analysis

The SWOT separates verified findings from planned or stakeholder-reported conditions. “Strong leadership” is treated as a defined governance role and leadership attention to the initiative; the named sponsor and evidence of active sponsorship are still pending. “Reliable data” means the cleaned samples are internally reconcilable for basic counts, not that they are reliable operational baselines.

| Strengths | Weaknesses |
|---|---|
| **S1 - Defined leadership role:** The project documents assign leadership responsibility for budget, priority, risk, release, and benefit decisions, subject to a named sponsor being confirmed.<br><br>**S2 - Traceable project foundation:** The BRD, RTM, stakeholder plan, scope plan, process models, and dashboard use consistent objectives, requirements, and open items.<br><br>**S3 - Clean and reconcilable samples:** The cleaned extracts support repeatable counts and dashboard logic; reported totals reconcile to 20 appointments, 15 feedback records, and 10 resource records.<br><br>**S4 - Cross-functional stakeholder coverage:** Patients, clinical staff, administration, IT, leadership, affected departments, control roles, and support/training roles are recognized.<br><br>**S5 - Measurable business direction:** A 20% eligible wait-time reduction is defined as the principal outcome once the formula and baseline are approved. | **W1 - Manual and disconnected workflows:** Booking, check-in, departmental handoffs, and follow-up include reported or simulated manual activity and repeated entry.<br><br>**W2 - Important measurement gaps:** Wait timestamps, duration, resource capacity and relationships, notification results, and an authoritative encounter key are missing.<br><br>**W3 - Legacy technology limitations:** Stakeholders report disconnected systems, downtime, poor usability, and security weaknesses.<br><br>**W4 - Limited delivery capacity:** Budget limits, unconfirmed funding, and limited stakeholder availability may constrain integration, testing, training, and release scope.<br><br>**W5 - Weak analytical coverage:** The samples are short and patterned; the feedback scale and benchmark are unknown; the lab satisfaction rule produces no Low category. |

| Opportunities | Threats |
|---|---|
| **O1 - Scheduling automation:** Field validation, full-period conflict checks, status history, rescheduling, and delivery tracking can reduce rework and errors.<br><br>**O2 - Better resource visibility:** Agreed availability, capacity, ownership, maintenance, reservation, and effective-time data can improve allocation decisions.<br><br>**O3 - Stronger data governance:** Common definitions, event timestamps, keys, quality rules, and owners can make benefit and performance reporting credible.<br><br>**O4 - Phased pilot and staff training:** Co-design, champions, UAT, assisted channels, and controlled rollout can improve adoption and limit disruption.<br><br>**O5 - Evidence-based reporting:** The dashboard prototype can become an operational tool after measures, fields, representative periods, and approval controls are completed.<br><br>**O6 - Standard departmental handoffs:** Clear ownership, statuses, escalation, and task tracking can reduce miscommunication and repeated follow-up. | **T1 - Privacy or security incident:** Incorrect access, consent, or message controls could expose patient information.<br><br>**T2 - Service or integration failure:** Network outages or legacy-system limitations could interrupt or delay core workflows.<br><br>**T3 - Stakeholder resistance or exclusion:** Staff may retain manual workarounds, and patients may face digital or communication barriers.<br><br>**T4 - Budget pressure and scope creep:** Integration costs or unapproved additions may displace essential requirements or controls.<br><br>**T5 - Misleading decisions:** Small samples or unsupported wait-time and utilization measures could be mistaken for hospital-wide evidence.<br><br>**T6 - Late control decisions:** Privacy, security, accessibility, consent, retention, or jurisdiction-specific requirements confirmed late may cause redesign or delay. |

### 8.1 SWOT response actions

| Strategy | SWOT connection | Recommended action | Proposed owner | Linked risks |
| --- | --- | --- | --- | --- |
| SO-01 | S1, S2 + O1, O4 | Use the approved RTM and stage-gate evidence to authorize a phased Must Have release and controlled pilot. | Sponsor; Project Manager | R-02, R-05, R-06, R-12 |
| SO-02 | S3 + O2, O3, O5 | Extend the clean data model with approved timestamps, keys, capacity fields, data owners, and quality rules. | Data Owner; IT; Business Analyst | R-01, R-09, R-13 |
| WO-01 | W1, W3 + O1, O6 | Redesign scheduling and handoffs with operational users and IT, including an approved outage fallback and reconciliation process. | Process Owners; IT | R-02, R-03, R-06, R-07 |
| WO-02 | W2, W5 + O3, O5 | Make measurement readiness an entry condition for baseline reporting and a release condition for benefits tracking. | Leadership; Data Owner | R-09, R-13 |
| ST-01 | S1, S2 + T1, T2, T6 | Require access, audit, notification, recovery, reconciliation, and authorized control approval before release. | IT; Privacy/Security Lead | R-06, R-07, R-08 |
| ST-02 | S4 + T3 | Use representative walkthroughs, training, assisted channels, UAT, and pilot feedback to manage adoption and access. | Business Analyst; Change/Training Lead; Patient Access Lead | R-04, R-10, R-11 |
| WT-01 | W3, W4 + T2, T4 | Protect Must Have and essential control work, phase lower-priority integration, and assess every scope change against cost, schedule, benefit, and risk. | Sponsor; Project Manager | R-06, R-11, R-12 |
| WT-02 | W2, W5 + T5 | Keep prototype limitations visible and prevent benefit or utilization claims until an approved representative baseline exists. | Data Owner; Hospital Leadership | R-09, R-13 |

## 9. Risk monitoring and control process

1. **Validate:** Review the register with the sponsor, process owners, administrative and clinical representatives, IT, Data Owner, privacy/security representative, Patient Access, and Change/Training leads.
2. **Assign:** Confirm one accountable owner for each risk and record supporting action owners.
3. **Plan:** Convert each mitigation into dated actions with evidence of completion. Do not reduce a rating only because an action is planned.
4. **Monitor:** Review High risks weekly, Medium risks every two weeks or at project gates, and Low risks monthly. Review R-05 again before pilot and go-live regardless of its current rating.
5. **Escalate:** If a risk occurs, create an issue, execute the approved contingency, identify the decision owner, and record service, scope, cost, schedule, control, and stakeholder effects.
6. **Reassess:** Update likelihood, impact, triggers, mitigation progress, and residual exposure when evidence changes.
7. **Control change:** Update the BRD, RTM, scope baseline, process models, test evidence, and this register when an approved change alters requirements or risk exposure.
8. **Close or accept:** Close a risk only when the exposure no longer exists and evidence is recorded. Material residual risk must be formally accepted by the authorized sponsor or control owner.

### 9.1 Suggested status values

| Status | Meaning |
| --- | --- |
| Open | Risk is active and requires action or monitoring. |
| Monitoring | Mitigation is operating and indicators are being reviewed. |
| Escalated | Exposure exceeds tolerance or requires a sponsor/control decision. |
| Occurred / Issue | The event has happened and is managed through the issue and contingency process. |
| Closed | Exposure no longer applies and closure evidence is recorded. |

## 10. Validation and completion checklist

| Validation item | Status | Comment |
| --- | --- | --- |
| Operational, technical, and stakeholder risks identified | Complete | All required categories are represented. |
| Likelihood, impact, calculated severity, and color coding included | Complete | A defined 3 × 3 method is used consistently. |
| High, Medium, and Low response rules defined | Complete | High = immediate attention; Medium = monitor/manage; Low = regular review. |
| Mitigation strategies documented | Complete | Each risk has an actionable mitigation. |
| Risk Assessment Matrix completed | Complete | Every register risk appears once in the matrix; empty cells remain visible. |
| Proposed owners, indicators, and contingencies included | Complete - confirmation pending | Role-based owners are proposed; named people are TBD. |
| BRD, RTM, stakeholder, scope, process, and dashboard insights traced | Complete | Requirements and evidence links are listed for each risk. |
| Cleaned operational data used | Complete with limitations | Descriptive counts are used; unsupported wait-time, overlap, shortage, utilization, and causal claims are excluded. |
| SWOT strengths, weaknesses, opportunities, and threats included | Complete | Leadership and data strengths are appropriately qualified. |
| SWOT actions linked to risks | Complete | SO, WO, ST, and WT actions are documented. |
| Ratings approved by authorized stakeholders | Pending | Requires a risk-validation workshop and recorded decision. |
| Residual ratings and action dates approved | Pending | Add only after owners, funding, timing, and mitigation evidence are confirmed. |

## 11. Recommended next steps

1. Name the sponsor, risk owners, approvers, and deputies.
2. Hold a cross-functional risk workshop to validate descriptions, categories, ratings, warning indicators, and contingencies.
3. Assign target dates and evidence for all High-risk mitigations, starting with the score-9 risks.
4. Approve the wait-time definition, baseline rules, data dictionary, resource definitions, and minimum data-completeness threshold.
5. Complete early integration, privacy/security, downtime-recovery, and workflow-rule assessments before baselining the first release.
6. Update the register at least weekly during requirements, design, pilot, and go-live preparation, then move to the agreed operational review cycle.

## 12. Source register

| Source ID | Source                                                                                       |
| --------- | -------------------------------------------------------------------------------------------- |
| SRC-01    | `Capstone_Project_M01L01_BRD.md`                                                             |
| SRC-02    | `Capstone_Project_M01L02_RTM.md`                                                             |
| SRC-03    | `Capstone_Project_M02L01_Stakeholder_Analysis.md`                                            |
| SRC-04    | `Capstone_Project_M02L02_Scope_Management.md`                                                |
| SRC-05    | `Capstone_Project_M03L01_Process_Model.md`                                                   |
| SRC-06    | `Capstone_Project_M03L02_Swimlane_Diagrams.md`                                               |
| SRC-07    | `Capstone_Project_M04L01_Data_Analysis.md` and `Capstone_Project_M04L01_Data_Analysis.xlsx`  |
| SRC-08    | `Capstone_Project_M04L02_Dashboard_Insights.md` and `Capstone_Project_M04L02_Dashboard.html` |
| SRC-09    | `appointment_data.csv`, `feedback_data.csv`, and `resource_data.csv`                         |
