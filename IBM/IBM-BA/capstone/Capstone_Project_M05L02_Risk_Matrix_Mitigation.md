# Risk Mitigation Plan: Risk Matrix and Mitigation Strategies

| Document field     | Details                                                                                                                                                                               |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| File name          | `Capstone_Project_M05L02_Risk_Matrix_Mitigation.md`                                                                                                                                   |
| Project            | HealthFirst Care - Patient Experience and Operational Efficiency Initiative                                                                                                           |
| Version            | 0.1                                                                                                                                                                                   |
| Document status    | Draft for stakeholder review                                                                                                                                                          |
| Primary references | `Capstone_Project_M05L01_Risk_Register_SWOT.md`, version 0.1; BRD; RTM; stakeholder analysis; scope management plan; process models; dashboard analysis; cleaned operational datasets |
| Source-data period | Appointments: 2024-01-01 to 2024-01-20; feedback: 2024-01-01 to 2024-01-15; resources: 2024-01-01 to 2024-01-10                                                                       |
| Project scope      | Outpatient appointment scheduling, check-in, resource visibility, notifications, departmental handoffs, reporting, integration, and supporting change activities                      |
| Deliverable scope  | High-priority risk treatment, mitigation actions, contingency planning, ownership, triggers, monitoring, and residual-risk validation                                                 |

## Executive summary

The M05L01 Risk Register contains 13 risks: 10 High and 3 Medium. Seven High risks score 9 and require the earliest management attention: R-01, R-02, R-06, R-07, R-09, R-11, and R-12. Three additional High risks score 6: R-03, R-05, and R-08. All 10 High risks are included in the detailed mitigation and contingency plans in this document. [SRC-01]

The immediate priorities are to:

1. approve resource-data and scheduling rules before automated allocation or booking is relied upon;
2. confirm governance, release scope, funding, and decision rights;
3. complete interface discovery and end-to-end reconciliation testing;
4. establish tested downtime, cutover, rollback, and privacy/security procedures; and
5. approve the data definitions and timestamps needed to measure the 20% patient wait-time objective.

The lab examples have been mapped to the existing register rather than added as duplicate risks. Data-breach exposure is addressed by R-08, integration delay by R-06, and staff resistance by R-04. R-04 remains Medium (4) under the current assessment and is included in the watchlist; it should only be re-rated after a documented review. [SRC-01]

The requested decision is for the project sponsor and proposed risk owners to validate the ratings, confirm accountable individuals and deputies, approve the proposed treatments, and set milestone dates and operational thresholds. Until that validation occurs, all actions and owners remain proposed.

## 1. Purpose, scope, and audience

This plan develops the M05L01 risk assessment into practical treatment and continuity actions. It is intended to help the sponsor, Project Manager, operational and technical risk owners, Business Analyst, and test or readiness leads decide what must be completed before pilot and release approval.

The plan includes:

- the existing 3 × 3 assessment method and current matrix placement;
- an updated risk matrix containing mitigation strategies for all 13 risks;
- detailed preventive actions for every High risk;
- contingency triggers, containment, continuity, recovery, and closure evidence for every High risk;
- a watchlist for the three Medium risks; and
- monitoring, escalation, residual-risk, and validation guidance.

The plan does not replace a clinical safety assessment, legal opinion, detailed cybersecurity incident-response plan, technical disaster-recovery plan, or approved operational procedure. It also does not approve funding, accept residual risk, authorize go-live, or assign accountability to named individuals.

### 1.1 Evidence and limitations

- Risk IDs, descriptions, categories, and ratings are carried forward from M05L01. [SRC-01]
- Likelihood ratings are qualitative judgments, not measured probabilities.
- The available operational extracts are small and patterned. They support data-readiness observations but do not establish hospital-wide frequencies, wait-time performance, scheduling-conflict rates, or resource-utilization rates. [SRC-07, SRC-08, SRC-09]
- Individual owners, due dates, recovery objectives, risk tolerance, and escalation thresholds have not been approved. Role names and lifecycle milestones are therefore used.
- Privacy, security, accessibility, consent, retention, and notification obligations must be confirmed by authorized HealthFirst Care representatives.
- A risk that occurs should be managed as an issue while its related risk entry remains available for lessons, reassessment, and residual exposure.

### 1.2 Working assumptions and open decisions

| ID | Assumption or open decision | Effect on this plan | Validation needed |
| --- | --- | --- | --- |
| A-01 | The M05L01 ratings remain the current approved working assessment. | The same 10 High and 3 Medium risks are used. | Sponsor and risk-owner review. |
| A-02 | Proposed role owners have sufficient authority or can nominate an accountable delegate. | Actions are assigned to roles rather than people. | Confirm one accountable person and deputy per risk. |
| A-03 | Lifecycle gates are available even though calendar dates are not. | Actions use milestones such as design sign-off, pilot readiness, and release approval. | Project Manager to add approved dates. |
| A-04 | Technical architecture, interface capability, recovery targets, and security standards are not yet fully confirmed. | Technical controls are proposed at a business-control level. | IT, system owners, and privacy/security review. |
| A-05 | Risk appetite and acceptance authority are not yet documented. | No High risk is treated as accepted and no residual score is claimed. | Sponsor to approve tolerance and acceptance route. |
| A-06 | The supplied data is not an approved performance baseline. | Mitigation evidence cannot rely only on the current sample. | Data Owner to approve definitions, quality thresholds, and representative periods. |

## 2. Risk assessment method

The method is unchanged from M05L01 so that the two documents remain comparable. [SRC-01]

### 2.1 Likelihood and impact scales

| Level | Score | Likelihood definition | Impact definition |
| --- | ---: | --- | --- |
| Low | 1 | Not expected under normal delivery conditions, but still possible. | Limited rework or delay with no material effect on a key objective, control, or service. |
| Medium | 2 | Reasonably possible because a dependency, control, or decision is incomplete. | Noticeable disruption, rework, stakeholder concern, or delay manageable within the workstream. |
| High | 3 | The event or its driver is present, repeatedly reported, or very likely without action. | Material effect on patient service, privacy/security, a Must Have requirement, funding, release readiness, or the wait-time objective. |

### 2.2 Severity and response

**Severity score = Likelihood score × Impact score**

| Severity | Score | Display | Required response                                                                              |
| -------- | ----: | ------- | ---------------------------------------------------------------------------------------------- |
| High     |   6-9 | Red     | Immediate attention, named action owner, and weekly review until reduced or formally accepted. |
| Medium   |   3-4 | Yellow  | Manage through planned actions and review every two weeks or at the next project gate.         |
| Low      |   1-2 | Green   | Review regularly, normally monthly, and escalate if likelihood or impact increases.            |

Scores of 5, 7, and 8 cannot occur in this 3 × 3 model. Color symbols are accompanied by written labels so that priority does not depend on color alone.

### 2.3 Priority selection and lab-example crosswalk

| Item                                          | Existing risk                                                           | Current rating | Treatment in this plan                                           |
| --------------------------------------------- | ----------------------------------------------------------------------- | -------------- | ---------------------------------------------------------------- |
| Data breach or privacy exposure during change | R-08 - incorrect access, consent, recipient, message, or audit controls | High (6)       | Included in detailed mitigation and contingency planning.        |
| Staff resistance to new workflows             | R-04 - resistance, parallel records, and workarounds                    | Medium (4)     | Retained in the Medium-risk watchlist; no unsupported re-rating. |
| Delays or failures in system integration      | R-06 - legacy-interface limitations and inaccurate exchange             | High (9)       | Included in detailed mitigation and contingency planning.        |

## 3. Current Risk Assessment Matrix

| Likelihood ↓ / Impact → | Low (1)                             | Medium (2)                         | High (3)                                                 |
| ----------------------- | ----------------------------------- | ---------------------------------- | -------------------------------------------------------- |
| **High (3)**            | **Medium - 3**<br>No risks assigned | **High - 6**<br>R-03               | **High - 9**<br>R-01, R-02, R-06, R-07, R-09, R-11, R-12 |
| **Medium (2)**          | **Low - 2**<br>No risks assigned    | **Medium - 4**<br>R-04, R-10, R-13 | **High - 6**<br>R-05, R-08                               |
| **Low (1)**             | **Low - 1**<br>No risks assigned    | **Low - 2**<br>No risks assigned   | **Medium - 3**<br>No risks assigned                      |

### 3.1 Priority summary

| Priority | Risks | Treatment expectation |
| --- | --- | --- |
| 1 - High, score 9 | R-01, R-02, R-06, R-07, R-09, R-11, R-12 | Confirm owners and start immediate actions; provide sponsor visibility and review weekly. |
| 2 - High, score 6 | R-03, R-05, R-08 | Complete mitigation during design and readiness work; review weekly and escalate control gaps. |
| 3 - Medium, score 4 | R-04, R-10, R-13 | Manage in the relevant workstream and review every two weeks or at project gates. |
| Low | None assigned | Continue to monitor for new or re-rated risks. |

## 4. Updated Risk Matrix with Mitigation Strategies

This table carries forward the current ratings and adds concise treatment actions. Detailed High-risk actions and contingencies follow in Sections 5 and 6.

| Risk ID | Risk description                                                                                                                                                  | Category    | Likelihood | Impact     | Severity       | Mitigation strategy                                                                                                                                                                                                                                  | Proposed owner(s)                                            |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ---------- | ---------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| R-01    | Incomplete, outdated, or ambiguous resource information may cause unsuitable or unavailable resources to be assigned.                                             | Operational | High (3)   | High (3)   | **High (9)**   | Approve resource definitions and ownership; require department, location, capacity, status, reservation, maintenance, and effective-time fields where applicable; validate changes; flag stale records; and review allocation exceptions.            | Resource Process Owner; Data Owner                           |
| R-02    | Incomplete duration, buffer, resource, concurrency, and override rules may permit overlapping appointments or reject valid slots.                                 | Operational | High (3)   | High (3)   | **High (9)**   | Document and approve scheduling rules; perform full-duration conflict checks and a final confirmation recheck; restrict and audit overrides; and test normal, boundary, concurrent, rescheduled, cancelled, and exception cases.                     | Clinical and Administrative Process Owners; Business Analyst |
| R-03    | Unclear ownership, acknowledgement, escalation, and closure rules may delay or misroute departmental requests.                                                    | Operational | High (3)   | Medium (2) | **High (6)**   | Approve a simple RACI; assign process owners; define task data, statuses, handling expectations, completion evidence, and escalation; and monitor overdue and reopened requests.                                                                     | Department Process Owners                                    |
| R-04    | Staff resistance, parallel records, or manual workarounds may reduce adoption, data completeness, and benefits.                                                   | Operational | Medium (2) | Medium (2) | **Medium (4)** | Involve representative users; appoint champions; provide role-based training and early-life support; use a controlled pilot; and monitor participation, system use, workarounds, and support themes.                                                 | Change/Training Lead; Operational Leads                      |
| R-05    | Pilot, cutover, or recovery activity may disrupt appointments or leave records unreconciled.                                                                      | Operational | Medium (2) | High (3)   | **High (6)**   | Use a controlled pilot; approve readiness and go/no-go criteria; rehearse cutover, rollback, downtime, and reconciliation; and confirm support and record ownership before release.                                                                  | Project Manager; Clinical Operations Lead; IT Operations     |
| R-06    | Legacy-interface problems may delay delivery or produce rejected, duplicate, missing, or inconsistent records.                                                    | Technical   | High (3)   | High (3)   | **High (9)**   | Complete interface discovery early; approve mappings and identifiers; define error, retry, and reconciliation rules; perform end-to-end testing; include an approved schedule contingency; and phase interfaces where necessary.                     | Integration Lead; System Owners                              |
| R-07    | Network or application downtime may interrupt booking, check-in, notifications, status updates, and task routing.                                                 | Technical   | High (3)   | High (3)   | **High (9)**   | Confirm service-recovery and escalation expectations; implement monitoring and alerts; maintain an accessible downtime procedure; and rehearse controlled manual logging, restoration, and reconciliation.                                           | IT Service Manager                                           |
| R-08    | Incorrect access, consent, contact, message, or audit controls may expose or misdirect patient information.                                                       | Technical   | Medium (2) | High (3)   | **High (6)**   | Apply least-privilege role access and approved encryption controls; record consent and preferences; validate recipients; retain audit trails; test normal and exception access; and approve privacy/security and incident procedures before release. | Information Security Lead; Privacy/Records-Control Lead      |
| R-09    | Missing timestamps, keys, definitions, validation, or reconciliation controls may make reports unreliable and prevent measurement of the 20% wait-time objective. | Technical   | High (3)   | High (3)   | **High (9)**   | Approve the data dictionary, wait-time formula, eligible population, exclusions, baseline period, and completeness threshold; capture required timestamps and keys; validate records; reconcile totals; and block unsupported benefit claims.        | Data Owner; Business Analyst; IT Lead                        |
| R-10    | Poor handling of accessibility, contact details, channels, consent, or delivery exceptions may exclude patients or cause missed updates.                          | Stakeholder | Medium (2) | Medium (2) | **Medium (4)** | Retain assisted channels; test accessible journeys; validate contact and consent; record delivery outcomes; and route failed messages for approved follow-up.                                                                                        | Patient Access Lead                                          |
| R-11    | Unconfirmed sponsors, approvers, owners, deputies, or decision rights may delay requirements, testing, risk, and release decisions.                               | Stakeholder | High (3)   | High (3)   | **High (9)**   | Approve governance and responsibility records; name decision owners and deputies; schedule gates; maintain a decision log; and escalate overdue decisions with their cost, scope, schedule, and risk effects.                                        | Project Sponsor; Project Manager                             |
| R-12    | Budget limitations or uncontrolled scope growth may displace Must Have requirements or essential continuity, privacy, and data-quality controls.                  | Stakeholder | High (3)   | High (3)   | **High (9)**   | Confirm the funding ceiling and first-release boundary; retain MoSCoW priorities; estimate integration, support, training, and control costs; protect Must Haves and mandatory controls; and assess changes through formal change control.           | Project Sponsor; Project Manager                             |
| R-13    | Treating prototype values or small patterned samples as hospital-wide evidence may lead to unsuitable operational or investment decisions.                        | Stakeholder | Medium (2) | Medium (2) | **Medium (4)** | Keep limitations visible; prohibit unsupported wait-time and utilization claims; use data-quality and report-approval gates; collect representative data; and require Data Owner and leadership approval before baseline use.                        | Data Owner; Hospital Leadership                              |

## 5. Detailed Mitigation Strategies for High-Priority Risks

All actions below are **Proposed - not yet confirmed**. The Project Manager should replace milestone wording with approved dates after owners and the delivery plan are confirmed.

| Risk ID | Preventive actions | Proposed responsible role(s) | Timing or gate | Completion and monitoring evidence |
| --- | --- | --- | --- | --- |
| R-01 | 1. Approve a resource-data dictionary, status meanings, refresh rules, and ownership.<br>2. Make applicable allocation fields mandatory and validate changes.<br>3. Flag stale or conflicting records and review overrides.<br>4. Test allocation, maintenance, reservation, and exception scenarios with representative records. | Resource Process Owner; Data Owner | Definitions before configuration sign-off; controls and tests before pilot. | Approved definitions and ownership; validation results; stale-record report; allocation exception log; passed scenario tests. |
| R-02 | 1. Facilitate workshops to agree appointment duration, buffers, linked resources, holds, concurrency, and override rules.<br>2. Trace approved rules to scheduling requirements and tests.<br>3. Apply full-period checks and a final atomic recheck before confirmation.<br>4. Restrict overrides and record reason, approver, and outcome. | Clinical and Administrative Process Owners; Business Analyst; Solution/Test Leads | Rules before scheduling design sign-off; conflict tests before pilot and release. | Approved rule catalogue; RTM links; positive, negative, boundary, reschedule, cancellation, and concurrent-booking test results; override audit. |
| R-03 | 1. Validate swimlanes and approve a simple RACI for request types.<br>2. Define required task data, ownership, acknowledgement, status, completion, and escalation rules.<br>3. Provide aging and reopened-task visibility.<br>4. Review handoff exceptions during the pilot. | Department Process Owners; Business Analyst; Project Manager | RACI and rules before task-dashboard pilot; exception review during pilot. | Approved RACI and workflow; task-aging report; escalation log; reopened-task trend; pilot review record. |
| R-05 | 1. Use a limited and representative pilot.<br>2. Approve readiness, go/no-go, rollback, communication, support, and reconciliation criteria.<br>3. Rehearse cutover, downtime, rollback, and recovery scenarios.<br>4. Assign one owner for in-flight and fallback-record reconciliation. | Project Manager; Clinical Operations Lead; IT Operations | Readiness controls before each pilot or release decision. | Completed readiness checklist; rehearsal results; critical-defect status; support roster; reconciliation plan; recorded go/no-go decision. |
| R-06 | 1. Inventory required interfaces, owners, source systems, identifiers, and first-release boundaries.<br>2. Approve field mappings, data rules, error handling, retry, duplicate prevention, and reconciliation.<br>3. Test normal, invalid, duplicate, delayed, retry, recovery, and volume scenarios end to end.<br>4. Phase interfaces or add schedule contingency through approved planning and change control. | Integration Lead; System Owners; Project Manager; Business Analyst | Discovery and mappings during design; end-to-end evidence before release approval. | Interface catalogue and specification; mapping approval; defect and milestone reports; passed end-to-end tests; source-to-target reconciliation. |
| R-07 | 1. Agree service, recovery, escalation, and business-priority expectations.<br>2. Implement monitoring and actionable alerts.<br>3. Publish an accessible downtime procedure and train affected frontline roles.<br>4. Rehearse manual logging, alternative communication, restoration, and transaction reconciliation. | IT Service Manager; Clinical Operations Lead; Support Leads | Procedure and training before pilot; recovery drill before release. | Approved downtime procedure; training record; availability and alert reports; recovery-test evidence; drill observations and actions. |
| R-08 | 1. Complete privacy and security review of access, consent, contact, messaging, storage, transmission, and audit controls.<br>2. Configure least privilege and approved encryption controls.<br>3. Test role access, recipient validation, consent exceptions, message failures, and audit visibility.<br>4. Restrict production access and approve incident handling before release. | Information Security Lead; Privacy/Records-Control Lead; System Owner | Control design before production-like testing; approval and retest before release. | Access matrix and review; security/privacy assessment; access and recipient test results; audit-log evidence; incident procedure; authorized approval. |
| R-09 | 1. Approve the eligible population, wait-time formula, exclusions, baseline and comparison periods, completeness threshold, and data ownership.<br>2. Capture scheduled, physical check-in, and consultation-start timestamps plus authoritative encounter keys.<br>3. Validate required fields and reconcile source, interface, and report totals.<br>4. Prevent performance claims until the Data Owner approves a representative baseline. | Data Owner; Business Analyst; IT Lead; Reporting Owner | Definitions before report design sign-off; reconciliation before baseline or benefit approval. | Data dictionary; measure specification; completeness report; reconciliation record; approved baseline; report approval record. |
| R-11 | 1. Confirm sponsor, decision owners, approvers, representatives, and deputies.<br>2. Define decision rights for requirements, risk, UAT, scope, funding, and release.<br>3. Schedule gates and circulate concise decision packs in advance.<br>4. Maintain and escalate an overdue-decision log showing impacts. | Project Sponsor; Project Manager; Business Analyst | Governance before requirements approval; attendance and decisions checked at every gate. | Approved governance record; named deputies; meeting attendance; decision log; overdue-decision report; approved gate outcomes. |
| R-12 | 1. Confirm the funding ceiling, scope baseline, and first-release boundary.<br>2. Estimate integration, testing, support, training, continuity, privacy/security, and data-quality work.<br>3. Protect Must Have requirements and mandatory controls.<br>4. Assess each change for value, cost, schedule, dependencies, and risk; phase lower priorities when needed. | Project Sponsor; Project Manager; Finance/Commercial representative where applicable | Baselines before delivery authorization; change review throughout delivery. | Approved budget and scope baseline; cost forecast; MoSCoW review; change log and impact assessments; sponsor decisions; updated plan and RTM. |

## 6. Detailed Contingency Plans for High-Priority Risks

Contingencies are activated when prevention is insufficient and a defined warning condition becomes an event or issue. Exact service thresholds and notification times must be confirmed by authorized owners.

| Risk ID | Activation trigger | Immediate containment | Continuity and recovery actions | Communication and authority | Recovery and closure evidence |
| --- | --- | --- | --- | --- | --- |
| R-01 | Resource records cannot be trusted, or an unsuitable or unavailable resource is assigned. | Stop automatic assignment for the affected resource or record set; prevent further use of questionable data. | Use a controlled manual allocation log and obtain resource-owner confirmation; correct the data; inspect affected appointments; reconcile changes; retest validation before resuming automation. | Resource Process Owner decides operational fallback; Data Owner approves corrected data; affected scheduling and clinical teams are informed. | Corrected records; affected bookings reconciled; validation passed; Resource Process Owner and Data Owner approval recorded. |
| R-02 | A conflict is confirmed, conflict detection fails, or a booking rule produces unsafe or inaccurate results. | Block automated confirmation for the affected appointment type or rule; preserve relevant booking and override evidence. | Identify affected bookings; use approved manual review; contact and reschedule patients where required; correct the rule; repeat conflict and regression tests before reinstatement. | Clinical and Administrative Process Owners authorize the fallback and patient-contact approach; Project Manager tracks the issue. | Affected bookings reconciled; defect retested; rule reapproved; override review completed; automation reinstatement approved. |
| R-03 | Requests become materially overdue, unowned, repeatedly misrouted, or reopened. | Appoint a temporary coordinator; stop further routing to a known incorrect queue. | Triage and reassign affected tasks; escalate aged items; conduct daily backlog review until controlled; correct ownership, required fields, or routing rules. | Accountable Department Process Owner sets priorities and escalation; affected departments receive backlog and service updates. | Ownership confirmed; aged items resolved or accepted; backlog returns to an agreed tolerance; corrected routing verified. |
| R-05 | Readiness criteria fail, service is disrupted during cutover, or in-flight records cannot be reconciled. | Invoke the no-go or rollback decision and stop further cutover activity. | Return to the validated prior workflow; activate support; communicate status; reconcile every in-flight and fallback record; resolve defects; repeat readiness assessment before another attempt. | The authorized go/no-go group decides postponement or rollback; Project Manager coordinates staff and patient communication. | Service stable; records reconciled; critical defects resolved; lessons recorded; new go/no-go approval completed. |
| R-06 | An interface produces rejected, duplicate, missing, delayed, or inconsistent transactions, or reconciliation fails. | Disable or isolate the affected interface; retain transaction and error evidence. | Use the approved controlled transfer or manual process; log every fallback transaction; correct the defect; reconcile source and target systems; complete end-to-end and recovery retesting. | Integration Lead and System Owners authorize isolation and restoration; Project Manager communicates schedule and scope effects. | Transaction totals match; duplicates and exceptions resolved; tests pass; System Owner approval to re-enable is recorded. |
| R-07 | Monitoring confirms an outage or users cannot complete a critical workflow. | Activate the approved downtime procedure and incident escalation route. | Use controlled manual logs and approved alternative communication; prioritize cases under operational and clinical procedures; restore service; reconcile failed and manual transactions; contact or reschedule affected patients where required. | IT Service Manager leads recovery; Clinical Operations controls service priorities; authorized communications roles update staff and affected patients. | Service restored; transactions reconciled; affected parties addressed; incident review completed; corrective actions assigned. |
| R-08 | Suspected unauthorized access, disclosure, audit anomaly, consent failure, or misdirected patient communication is identified. | Isolate the affected function; suspend affected access; preserve logs and evidence; do not continue the exposed process. | Activate the approved privacy/security incident process; assess scope; correct access, consent, recipient, encryption, or logging controls; retest before controlled restoration. | Information Security and Privacy/Records-Control Leads direct the response and determine any required notification with authorized legal/compliance input. | Incident record; impact and root-cause assessment; corrective-action evidence; control retest; authorized restoration approval. |
| R-09 | Critical data fails validation or reconciliation, or an issued report or benefit claim is found unreliable. | Suspend affected reports, dashboards, and benefit claims; quarantine questionable data. | Identify affected records and outputs; correct or recollect data where possible; reconcile totals; re-run measures; issue corrected outputs and explain material changes to recipients. | Data Owner decides report suspension and reissue; Business Analyst records requirement, decision, and stakeholder impacts. | Validation and reconciliation pass; corrected report approved; affected decisions reviewed; baseline or claim reauthorized. |
| R-11 | A required decision is overdue and blocks dependent work, testing, or release. | Escalate to the authorized deputy or sponsor; pause work that requires explicit approval. | Issue a concise decision pack with options and cost, scope, schedule, risk, and service impacts; record the decision; update affected requirements, plans, risks, and dependencies. | Project Sponsor or authorized deputy makes the decision; Project Manager manages escalation and replanning. | Decision log updated; dependent work released or stopped; any rebaseline approved; stakeholders notified. |
| R-12 | Forecast cost exceeds available funding, unapproved scope enters delivery, or essential work cannot fit the approved release. | Freeze nonessential additions and prevent removal of Must Have or mandatory control work without approval. | Validate the forecast; prepare funding, scope, phasing, and schedule options; phase Should Have or lower-priority items; update baselines only after sponsor decision. | Project Sponsor approves funding or scope trade-offs; Project Manager administers change control and communications. | Approved funding or scope decision; updated scope, budget, plan, and RTM; affected stakeholders informed. |

## 7. Medium-Risk Watchlist

The lab highlights staff resistance, but the source register rates it Medium. All three Medium risks remain under active monitoring because their likelihood or impact may change as the project approaches pilot and release.

| Risk ID                                                | Current rating | Early warning                                                                                                              | Continuing mitigation                                                                                                                                              | Contingency if the risk occurs                                                                                                                       |
| ------------------------------------------------------ | -------------- | -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| R-04 - staff resistance and workarounds                | **Medium (4)** | Low design, training, or UAT participation; continued parallel records; repeated workarounds; recurring support issues.    | Involve representative users; appoint champions; provide role-based training, job aids, and early-life support; run a controlled pilot; monitor adoption evidence. | Extend the pilot and support; provide targeted coaching; simplify approved guidance; delay wider rollout if critical adoption criteria remain unmet. |
| R-10 - inaccessible or failed patient communication    | **Medium (4)** | Undeliverable messages, accessibility concerns, abandoned digital journeys, or increased assisted-channel demand.          | Retain phone and in-person support; test accessible and assisted journeys; validate contact, preference, and consent; monitor delivery exceptions.                 | Use validated alternative contact methods and provide assisted service while the affected journey is corrected and retested.                         |
| R-13 - unsupported use of prototype or sample measures | **Medium (4)** | Prototype figures appear in performance packs or decisions without limitations, representative data, or baseline approval. | Keep prototype and data-readiness labels visible; use report approval and data-quality gates; prohibit unsupported performance claims.                             | Withdraw the measure; issue a corrected interpretation; review affected decisions; replace the measure with a data-readiness action until approval.  |

## 8. Risk Monitoring, Escalation, and Residual-Risk Control

### 8.1 Review cadence and status

| Risk group | Review cadence | Minimum review content | Escalation condition |
| --- | --- | --- | --- |
| High | Weekly until reduced or formally accepted | Current rating; trigger indicators; action status; blockers; evidence; contingency readiness; decisions needed. | Trigger occurs, action is overdue, control test fails, exposure increases, or a required decision remains unresolved. |
| Medium | Every two weeks or at the next project gate | Indicator trend; mitigation progress; stakeholder feedback; need for reassessment. | Likelihood or impact may increase, repeated events occur, or mitigation is ineffective. |
| Low or newly identified | Monthly unless a higher cadence is assigned | Description, owner, rating basis, and required action. | Reassessment moves the risk to Medium or High. |

Suggested risk statuses are **Open - proposed**, **Assigned**, **Mitigation in progress**, **Monitoring**, **Occurred / issue**, **Accepted**, and **Closed**. A status should be supported by an owner, evidence, and decision record rather than changed only for reporting appearance.

### 8.2 Roles and decision rights

| Role | Responsibility in this plan |
| --- | --- |
| Project Sponsor | Confirms risk tolerance and accountable owners; approves funding, scope trade-offs, formal acceptance, and major release decisions. |
| Risk Owner | Owns the risk response; approves operational activation of the contingency within delegated authority; provides evidence; recommends closure or acceptance. |
| Project Manager | Maintains action dates and dependencies; chairs reviews; tracks escalation, issues, decisions, and plan changes. |
| Business Analyst | Maintains traceability; facilitates rule, process, data, and stakeholder clarification; records decisions; supports evidence and impact analysis. The BA does not own technical security, clinical, funding, or service-recovery decisions. |
| IT, Integration, Data, Privacy/Security, and Operational Leads | Design, implement, test, and operate controls within their areas; report exceptions and recovery evidence. |
| Hospital Leadership or authorized approver | Reviews material residual exposure and decides whether to accept, further reduce, transfer, defer, or stop affected work. |

### 8.3 Residual-risk assessment

Residual ratings are **TBD**. A current rating may be reassessed only when:

1. the mitigation has an accountable owner and approved scope;
2. the control has been implemented in the intended environment;
3. test or operating evidence shows that the control works;
4. open defects and exceptions are understood;
5. likelihood and impact are reassessed using the same 3 × 3 definitions; and
6. the authorized owner records whether the residual exposure is accepted or requires further action.

Planned actions, training attendance, or document completion alone do not prove that exposure has been reduced.

## 9. Traceability to Project Requirements and Evidence

| Risk ID | Primary traceability carried forward from M05L01 |
| --- | --- |
| R-01 | OBJ-03; FR-08, FR-11; NFR-05; AC-04; DQ-06, DQ-07, DQ-09 |
| R-02 | OBJ-02, OBJ-03; BR-01; FR-02, FR-06, FR-08; AC-02, AC-04; DQ-02 |
| R-03 | OBJ-03, OBJ-04, OBJ-05; FR-08, FR-09, FR-11; AC-08; AS-IS-COM-01; handoffs H-05, H-06, H-08 |
| R-05 | OBJ-02, OBJ-05; NFR-03, NFR-05; AC-05, AC-06; scope constraint C-10; deployment WBS |
| R-06 | OBJ-05; BR-05; FR-10, FR-11; NFR-05; AC-09; scope constraints C-03, C-08 |
| R-07 | OBJ-02, OBJ-04; FR-04, FR-05; NFR-03; AC-03, AC-05; scope constraint C-04 |
| R-08 | OBJ-04, OBJ-05; FR-05; NFR-02; AC-03, AC-07; stakeholder open item SA-07 |
| R-09 | OBJ-01, OBJ-04; BR-02; FR-05, FR-07, FR-11; NFR-05; AC-01, AC-06; DQ-01, DQ-04, DQ-05, DQ-08 |
| R-11 | OBJ-01-OBJ-05; scope assumptions A-01, A-08; dependency D-01; stakeholder items SA-01, SA-03-SA-05 |
| R-12 | OBJ-01-OBJ-05; BR-01-BR-05; MoSCoW priorities; scope constraints C-01, C-02, C-08; approved change candidates |

These links explain why each treatment is included; they do not indicate that the linked requirement or control is approved or implemented. [SRC-01, SRC-02, SRC-03]

## 10. Immediate Next Actions

| Sequence | Action | Proposed owner | Timing | Output |
| ---: | --- | --- | --- | --- |
| 1 | Validate the 13 current ratings and confirm the 10 High risks in scope for immediate treatment. | Project Sponsor; proposed Risk Owners | At the next risk review | Approved ratings or documented changes with rationale. |
| 2 | Name one accountable owner and deputy for each High risk. | Project Sponsor; Project Manager | Before the next dependent approval gate | Updated risk register and responsibility record. |
| 3 | Convert the mitigation rows into dated actions aligned with the delivery plan and available budget. | Project Manager; Risk Owners | After owner confirmation | Action log with dates, dependencies, and status. |
| 4 | Approve measurable operating thresholds, including data completeness, task aging, recovery objectives, interface reconciliation, and funding tolerance. | Relevant Risk Owners; Sponsor where required | Before pilot-readiness assessment | Approved thresholds and escalation triggers. |
| 5 | Test each High-risk contingency during walkthroughs, tabletop exercises, UAT, cutover rehearsal, or recovery drills as applicable. | Risk Owners; Test/Readiness Leads | Before release approval | Test evidence, defects, decisions, and corrective actions. |
| 6 | Reassess ratings only after implementation and evidence review. | Risk Owners; Project Sponsor or authorized approver | At the applicable readiness gate | Recorded residual rating, rationale, and acceptance or further action. |

## 11. Validation and Completion Checklist

| Check | Status | Evidence or action needed |
| --- | --- | --- |
| Current IDs, descriptions, categories, and ratings reconcile to M05L01. | Complete | 13 risks mapped; 10 High and 3 Medium. |
| All High risks appear once in the mitigation and contingency sections. | Complete | R-01, R-02, R-03, R-05, R-06, R-07, R-08, R-09, R-11, and R-12. |
| Staff resistance is not incorrectly shown as High. | Complete | R-04 remains Medium (4) in the watchlist. |
| Each High risk has preventive actions, a proposed owner, lifecycle timing, and monitoring evidence. | Complete for draft | Owners and dates require confirmation. |
| Each High risk has a trigger, containment, continuity/recovery steps, authority, and closure evidence. | Complete for draft | Operational procedures and thresholds require owner validation. |
| Current and residual ratings are clearly separated. | Complete | Residual ratings remain TBD until controls are evidenced. |
| Privacy/security, clinical, funding, and service-recovery accountability is assigned to appropriate roles. | Complete for draft | Named representatives and decision rights remain pending. |
| Mitigation actions are funded and incorporated into the project plan. | Pending | Sponsor, Project Manager, and owners to confirm. |
| Contingencies have been exercised and defects resolved. | Pending | Complete before release approval where applicable. |
| Sponsor and risk owners have approved the plan. | Pending | Record approvals and changes in the decision log. |

## 12. Source Register

| Source ID | Source                                                                                                     |
| --------- | ---------------------------------------------------------------------------------------------------------- |
| SRC-01    | `Capstone_Project_M05L01_Risk_Register_SWOT.md`, version 0.1                                               |
| SRC-02    | `Capstone_Project_M01L01_BRD.md`, version 0.1                                                              |
| SRC-03    | `Capstone_Project_M01L02_RTM.md`, version 0.1                                                              |
| SRC-04    | `Capstone_Project_M02L01_Stakeholder_Analysis.md`, version 0.1                                             |
| SRC-05    | `Capstone_Project_M02L02_Scope_Management.md`, version 0.1                                                 |
| SRC-06    | `Capstone_Project_M03L01_Process_Model.md` and `Capstone_Project_M03L02_Swimlane_Diagrams.md`, version 0.1 |
| SRC-07    | `Capstone_Project_M04L01_Data_Analysis.md` and supporting workbook, version 1.0                            |
| SRC-08    | `Capstone_Project_M04L02_Dashboard_Insights.md` and dashboard, version 1.0                                 |
| SRC-09    | `appointment_data.csv`; `feedback_data.csv`; `resource_data.csv`                                           |
