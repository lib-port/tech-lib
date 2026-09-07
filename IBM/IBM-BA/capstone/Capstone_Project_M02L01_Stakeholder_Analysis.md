# Stakeholder Analysis and Engagement Plan

| Document field     | Details                                                                                      |
| ------------------ | -------------------------------------------------------------------------------------------- |
| File name          | `Capstone_Project_M02L01_Stakeholder_Analysis.md`                                            |
| Project            | HealthFirst Care - Patient Experience and Operational Efficiency Initiative                  |
| Version            | 0.1                                                                                          |
| Document status    | Draft for stakeholder review                                                                 |
| Primary references | `Capstone_Project_M01L01_BRD.md`, version 0.1; `Capstone_Project_M01L02_RTM.md`, version 0.1 |
| Template reference | `Stakeholders Matrix_Template.pdf`                                                           |

## 1. Executive summary

This document identifies the stakeholders involved in HealthFirst Care's outpatient appointment improvement project and provides a practical plan for engaging them. The project aims to reduce patient wait times, improve scheduling accuracy, improve resource visibility, strengthen communication, and reduce administrative rework. [SRC-01, SRC-03, SRC-04]

The initial influence-interest assessment places the stakeholders as follows:

- **Key Players:** hospital leadership, doctors and nurses, and administrative staff;
- **Keep Satisfied:** the IT team and the privacy/security or records-control representative;
- **Keep Informed:** patients and affected departmental contacts; and
- **Monitor:** support and training staff until preparation for the pilot or go-live increases their involvement.

These ratings are provisional. The supplied documents do not name the project sponsor, formal approvers, stakeholder representatives, or decision rights. HealthFirst Care should confirm these details at project kickoff and review the matrix after requirements approval, design, and pilot planning. IT is shown as High influence and Low interest in line with the lab example, but its profile indicates substantial delivery involvement; its interest may need to be changed to High during implementation.

## 2. Purpose, scope, and approach

### 2.1 Purpose

The purpose of this analysis is to:

- identify affected and influential stakeholder groups;
- record their roles, responsibilities, needs, influence, and interest;
- place them in the correct influence-interest quadrant;
- define suitable engagement and communication activities; and
- link engagement to the BRD objectives and RTM requirements.

### 2.2 Scope

This plan covers the outpatient appointment journey and the supporting scheduling, resource, notification, reporting, records/billing exchange, and appointment-related departmental communication included in the BRD. It does not extend the project into clinical decision-making, full hospital-system replacement, emergency or inpatient redesign, or other BRD exclusions. [SRC-03]

### 2.3 Assessment approach

- **Influence** means the stakeholder's ability to approve, fund, block, shape, operate, or enable the change.
- **Interest** means the degree to which the stakeholder is concerned with or directly affected by the project and its outcomes.
- Ratings use High or Low, as required by the matrix template and lab instructions.
- The analysis uses stakeholder profiles, the BRD, the RTM, the project overview, and the three supplied data files. [SRC-01 to SRC-08]
- The datasets are small, patterned samples. They are used to prepare engagement questions and identify data gaps, not to make hospital-wide performance claims.

## 3. Stakeholder identification and categorization

The source profiles describe example individuals, but this plan analyzes stakeholder groups because representatives and individual decision rights have not yet been assigned. The roles and needs below are consolidated from the stakeholder profiles, BRD, and RTM. [SRC-02, SRC-03, SRC-04]

### 3.1 Primary stakeholder groups

| Stakeholder category | Role and responsibilities | Main needs and concerns | Objective alignment | Main BRD/RTM links |
| --- | --- | --- | --- | --- |
| Patients | Use appointment and communication services; explain their experience; validate accessibility, usability, messages, and assisted channels; participate in representative user acceptance testing | Easier booking; phone and in-person alternatives; shorter waits; timely email/SMS updates; clear next steps | OBJ-01, OBJ-02, OBJ-04 | FR-03, FR-04, FR-05, FR-07; NFR-01, NFR-03, NFR-04 |
| Doctors and nurses | Provide clinical operations input; validate appointment duration, resource rules, availability, wait-time capture, referrals, results, and handoffs; participate in workflow review and testing | Avoid overbooking; suitable rooms, equipment, and staff; timely results and transfers; workable handoffs | OBJ-02, OBJ-03, OBJ-04 | FR-02, FR-08, FR-09 |
| Administrative staff | Operate booking, rescheduling, cancellation, records, and billing-related processes; define fields, statuses, rules, and exceptions; test and adopt the new process | Conflict prevention; current doctor availability; faster record retrieval; complete appointment information; less reconciliation and rework | OBJ-01, OBJ-02, OBJ-03, OBJ-05 | FR-01, FR-02, FR-03, FR-04, FR-06, FR-08, FR-10, FR-11; NFR-01, NFR-03, NFR-04, NFR-05 |
| IT team | Assess feasibility; design, build, integrate, secure, test, deploy, monitor, recover, and support the service; advise on data and technical constraints | Integration; reliability; security; usability; notifications; performance; reporting; maintainability | Enables OBJ-01 to OBJ-05 | FR-05, FR-10, FR-11; NFR-01 to NFR-05 |
| Hospital leadership | Sponsor the initiative; approve scope, budget, priorities, baselines, risks, and release decisions; review benefits and performance | A 20% wait-time reduction against an approved baseline; better patient experience; operational efficiency; value within budget; reliable reporting | OBJ-01 to OBJ-05 | BR-01 to BR-05; FR-07, FR-11; NFR-02, NFR-05 |

### 3.2 Secondary stakeholder groups

| Stakeholder group | Why included | Expected contribution | Status |
| --- | --- | --- | --- |
| Privacy/security or records-control representative | NFR-02 requires role-based access, audit, and controlled use of patient and appointment information | Confirm privacy, access, consent, audit, retention, and release controls | Responsible person is TBD |
| Affected departmental contacts | Doctors and nurses report delayed lab/radiology results and weak referral, physiotherapy, and transfer handoffs | Define update statuses, ownership, timing, escalation, and test scenarios for FR-09 | Named contacts are TBD |
| Support and training staff | Users will need guidance, outage fallback support, issue routing, and training before release | Prepare procedures, training, first-line support, and feedback from early use | Membership and lead are TBD |

Records and billing representatives are included under Administrative Staff. Relevant resource owners and departmental contacts should participate in the doctors-and-nurses working group or in targeted sessions when their process is discussed.

## 4. Influence-interest analysis

### 4.1 Stakeholder matrix

| Influence level | High interest | Low interest |
| --- | --- | --- |
| **High influence** | **Key Players:** Hospital leadership; doctors and nurses; administrative staff | **Keep Satisfied:** IT team; privacy/security or records-control representative |
| **Low influence** | **Keep Informed:** Patients; affected departmental contacts | **Monitor:** Support and training staff during the early project stages |

### 4.2 Classification rationale

| Stakeholder group | Influence | Interest | Matrix classification | Rationale |
| --- | --- | --- | --- | --- |
| Hospital leadership | High | High | Key Players | Leadership sponsors the initiative and is expected to approve funding, priorities, measurement rules, risks, and release decisions. The named sponsor is still TBD. |
| Doctors and nurses | High | High | Key Players | They operate the affected clinical workflows and provide essential rules for scheduling, resource use, results, and handoffs. Their adoption will strongly affect the outcome, although formal sign-off authority must be confirmed. |
| Administrative staff | High | High | Key Players | They perform the daily scheduling and related record/billing work and are the main users of conflict checks, status history, exceptions, and data correction. |
| IT team | High | Low | Keep Satisfied | IT can enable or constrain delivery through integration, infrastructure, security, and support decisions. Low interest follows the lab example and is provisional because the IT profiles show active improvement proposals. |
| Privacy/security or records-control representative | High | Low | Keep Satisfied | This role may approve or block information-handling controls but is expected to participate mainly at control and release decisions. The role is not yet named. |
| Patients | Low | High | Keep Informed | Patients are highly affected by booking, waiting, notifications, and usability but have limited formal control over scope, funding, or delivery. Representative participation is still essential. |
| Affected departmental contacts | Low | High | Keep Informed | These groups are directly involved in referral, result, and handoff updates but are not expected to approve the full project. |
| Support and training staff | Low | Low | Monitor | They have limited involvement during early requirements work. Interest and influence will increase before pilot, training, go-live, and early support. |

## 5. Completed stakeholder matrix

The table below retains the eight fields from `Stakeholders Matrix_Template.pdf`. [SRC-08]

| Stakeholder Name/Group | Role/Responsibility | Influence Level (High/Low) | Interest Level (High/Low) | Key Requirements | Engagement Strategy | Frequency of Interaction | Communication Method |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Patients | Service users and representatives who provide experience, usability, and acceptance feedback | Low | High | Easier multi-channel booking; shorter waits; timely updates; clear instructions | Keep informed through plain-language updates, surveys, prototype reviews, and representative UAT | Monthly; at prototype and UAT milestones | Email/SMS, phone or in-person option, surveys, demonstrations |
| Doctors and nurses | Clinical operations representatives who validate schedules, resources, results, and handoffs | High | High | Workable schedules; resource visibility; accurate wait capture; timely departmental updates | Involve in focused working sessions, walkthroughs, demonstrations, and UAT | Weekly during definition; at design and UAT milestones | Meetings, interviews, workflow walkthroughs, reports |
| Administrative staff | Scheduling, records, and billing users who define and operate the appointment process | High | High | Conflict checks; current availability; complete fields/statuses; visible exceptions; less rework | Co-design process and rules through workshops, demonstrations, UAT, and pilot huddles | Weekly; twice-weekly short huddles during pilot | Workshops, meetings, demonstrations, issue log, email summaries |
| IT team | Technical delivery and support team responsible for feasibility, integration, security, reliability, and support | High | Low | Supported integration; reliability; security; usability; performance; reporting | Keep satisfied through technical reviews, decision requests, and early risk escalation | Every two weeks; at design gates; urgent risks as needed | Technical meetings, email, design notes, risk and decision logs |
| Hospital leadership | Sponsor and decision makers for direction, budget, priority, risk, and release | High | High | Measurable outcomes; budget control; clear risks; benefits and status reporting | Engage through steering meetings, concise dashboards, decision papers, and approvals | Weekly during definition and pilot; at phase gates | Meetings, one-page dashboard, status report, decision papers |
| Privacy/security or records-control representative | Control adviser or approver for data access, consent, audit, and retention | High | Low | Controlled access; approved communications; auditable changes; compliant records handling | Keep satisfied through targeted control reviews and release checkpoints | Every two weeks when controls are being defined; at approval gates | Review meetings, control checklist, email, decision log |
| Affected departmental contacts | Lab, radiology, referral, physiotherapy, or handoff contacts who provide workflow details | Low | High | Clear update status, ownership, timing, and escalation | Keep informed and consult through targeted workflow sessions and milestone updates | Monthly; targeted sessions before design approval and UAT | Workshops, email summaries, demonstrations, meeting notes |
| Support and training staff | Prepare guidance, first-line support, outage fallback, and issue routing | Low | Low | Clear procedures, training material, support route, and known issues | Monitor during design; involve in readiness and early-support activities | As needed early; scheduled training before pilot/go-live; weekly early-support summary | Meeting notes, readiness bulletins, training sessions, support reports |

In this document, **every two weeks** is used instead of the potentially ambiguous term **bi-weekly**.

## 6. Engagement strategy by matrix position

| Matrix position | Engagement purpose | Standard methods | Standard frequency | Application to HealthFirst Care |
| --- | --- | --- | --- | --- |
| Key Players | Gather input, resolve conflicts, obtain decisions, and maintain commitment | Regular meetings, workshops, detailed progress reports, demonstrations, decision papers | Weekly and at key approvals | Leadership, doctors/nurses, and administrative staff should shape rules, validate requirements, review risks, and approve or support testing outcomes. |
| Keep Satisfied | Confirm feasibility and controls without creating unnecessary meeting load | Periodic email updates, targeted technical/control reviews, exception escalation | Every two weeks and at decision gates | IT and the privacy/security representative should review integration, reliability, security, data, performance, and release controls. |
| Keep Informed | Explain progress, gather experience feedback, and show how feedback was handled | Newsletters, dashboards, surveys, demonstrations, targeted workshops | Monthly and at user-feedback milestones | Patients and affected departments should validate usability, communication, and workflow impacts through accessible channels. |
| Monitor | Maintain awareness and involve the group when project impact increases | Meeting notes, readiness bulletins, published reports | As needed | Support and training staff should receive early awareness and become more involved before pilot, go-live, and early support. |

## 7. Stakeholder communication and engagement plan

| Stakeholder group | Purpose of engagement | Methods and information shared | Frequency | Engagement owner | Expected input or output |
| --- | --- | --- | --- | --- | --- |
| Patients | Validate booking channels, usability, delay messages, next-step information, and patient impact | Plain-language email/SMS updates, phone/in-person option, short surveys, prototypes, and selected UAT scenarios | Monthly; targeted sessions at prototype and UAT milestones | Business Analyst with patient-experience liaison (TBD) | Confirmed channel and accessibility needs, message feedback, usability findings, and UAT observations |
| Doctors and nurses | Agree appointment duration, buffer and override rules; define resource statuses; validate referrals, results, and handoffs | Short clinical working meetings, interviews, workflow scenarios, demonstrations, and UAT | Weekly 45-minute session during definition; targeted design and UAT sessions | Business Analyst with clinical operations representative (TBD) | Validated business rules, resource responsibilities, workflow decisions, and UAT results |
| Administrative staff | Confirm current workflow, required fields, statuses, assisted booking, exceptions, record/billing exchange, and training needs | Process workshops, scheduling walkthroughs, data examples, demonstrations, UAT, and pilot issue review | Weekly 45-60-minute workshop; twice-weekly short pilot huddles | Business Analyst with administrative operations lead (TBD) | Validated process, field/status definitions, exception scenarios, requirements comments, and UAT evidence |
| IT team | Confirm feasibility, integration scope, estimates, data ownership, NFR measures, outage recovery, and support | Technical review, interface/data workshop, architecture walkthrough, risk and decision log | Every two weeks; milestone reviews; urgent risks escalated within one business day | IT Manager with Business Analyst coordination | Feasibility assessment, constraints, data mapping, agreed NFR measures, estimates, and technical decisions |
| Hospital leadership | Approve scope, priority, budget, baseline, risks, and release decisions; resolve escalations | Weekly steering meeting, one-page objective dashboard, budget/risk summary, and decision papers | Weekly during definition and pilot; formal approval at phase gates | Project sponsor or project lead (TBD); Business Analyst prepares requirement/evidence updates | Decisions, approvals, priority changes, funding direction, and resolved escalations |
| Privacy/security or records-control representative | Confirm information-handling, consent, access, audit, retention, and release controls | Control review, data-flow summary, access matrix, message/consent review, and release checklist | Every two weeks while controls are defined; at design and release gates | Privacy/security or records-control lead (TBD) | Reviewed controls, conditions, risks, and a recorded decision from the authorized approver |
| Affected departmental contacts | Define appointment-related update status, ownership, timing, and escalation; validate FR-09 | Targeted handoff workshops, scenario review, demonstrations, and summary email | Monthly; targeted workshops before design approval and UAT | Business Analyst with departmental process owner (TBD) | Confirmed responsibilities, status definitions, escalation rules, and UAT comments |
| Support and training staff | Prepare guidance, outage fallback, first-line support, FAQs, and issue routing | Readiness bulletins, procedure walkthroughs, training, known-issue list, and early-support report | As needed during design; training before pilot/go-live; weekly during early support | Change/training or IT support lead (TBD) | Training records, support scripts, readiness confirmation, and recurring issue trends |

### 7.1 Engagement records and controls

The Business Analyst should use simple controls to keep engagement traceable:

1. Send a short agenda and pre-read before each workshop or review.
2. Record decisions, actions, owners, and due dates after each session.
3. Update the RTM when a requirement is approved, rejected, changed, or deferred.
4. Keep requirement status as Pending until an authorized stakeholder records a decision.
5. Record material disagreement and escalate it with options, impacts, and a recommended decision date.
6. Use aggregated or anonymized patient information in project materials and obtain appropriate consent for interviews, surveys, or recordings.
7. Offer accessible digital and assisted channels so online-only engagement does not exclude patients or staff.
8. Close the feedback loop with a short summary of feedback received and action taken.
9. Reassess influence, interest, and engagement frequency after requirements approval, design, and pilot planning.

## 8. Data findings and engagement implications

### 8.1 Appointment data

Source: `appointment_data.csv` [SRC-05]

- The extract contains 20 appointments from 1-20 January 2024: 8 `Completed` and 4 each `No Show`, `Rescheduled`, and `Cancelled`.
- The five listed times each occur four times, so there is no single peak appointment time in this sample.
- There are no exact doctor/date/time duplicates.
- Duration, end time, resource assignment, booking history, override details, check-in time, and consultation-start time are missing. The extract therefore cannot establish a double-booking rate or calculate patient wait time.

**Engagement action:** Administrative staff, doctors/nurses, IT, and leadership should agree appointment duration, buffers, resources, override rules, wait-time fields, and a suitable baseline dataset before making scheduling or wait-time decisions.

### 8.2 Patient feedback data

Source: `feedback_data.csv` [SRC-06]

- The extract contains 15 responses. The mean score is 7.00, the median is 7, and the observed range is 5-9.
- Six responses (40%) have a score of 5 or 6.
- One comment reports long wait times and one reports a delayed response. Each is 1 of 15 responses.
- The survey scale, benchmark, sampling method, communication preference, and consent fields are not supplied.

**Engagement action:** Use these findings as discussion prompts, then gather wider patient feedback through short, accessible surveys and representative interviews. Do not treat the sample as proof of hospital-wide satisfaction or complaint rates.

### 8.3 Resource data

Source: `resource_data.csv` [SRC-07]

- The extract contains 10 records: 4 `Available`, 2 `Unavailable`, 2 `In Use`, and 2 `Under Maintenance`.
- Both nurse records are `Unavailable`, both equipment records are `In Use`, and both room records are `Under Maintenance`.
- The room records marked `Under Maintenance` also show two usage hours each, so the timing and meaning of the fields need clarification.
- Capacity, demand, reservations, departments, locations, and detailed time intervals are absent. Shortage and utilization rates cannot be calculated.

**Engagement action:** Doctors/nurses, administrative staff, resource owners, and IT should define each resource status, who updates it, when it applies, and how errors are corrected. A larger operational extract is needed before leadership uses the information for resource decisions.

## 9. Stakeholder issues and potential conflicts

| Issue or potential conflict | Stakeholders affected | Engagement response | Escalation point |
| --- | --- | --- | --- |
| Some patients prefer online self-service while others need phone or in-person assistance | Patients; administrative staff; IT | Test both self-service and staff-assisted journeys and keep agreed channels in scope | Escalate a proposed channel removal to leadership with accessibility and cost impacts |
| Appointment access may conflict with consultation time, resource limits, and overbooking controls | Patients; doctors/nurses; administrative staff | Agree duration, buffer, resource, and authorized-override rules using normal and exception scenarios | Leadership decides unresolved service-level or capacity trade-offs |
| Budget limits may conflict with integration, performance, and reporting expectations | Leadership; IT; administrative staff | Present Must/Should priorities, technical dependencies, cost impacts, and phased options | Sponsor approves scope, funding, or deferral |
| The 20% wait target cannot be measured from the supplied appointment extract | Leadership; patients; administrative staff; IT | Agree the wait definition, exclusions, baseline period, fields, data owner, and reporting method | Leadership approves the baseline and measurement rules |
| Communication improvements must be balanced with consent, access, and information-handling controls | Patients; IT; privacy/security representative | Review message types, preferences, consent, access, audit, and retention before testing | Privacy/security representative records conditions or escalates unresolved risk |
| Frequent workshops may place extra demand on clinical and operational staff | Doctors/nurses; administrative staff | Use representatives, short time-boxed sessions, focused pre-reads, and consolidated questions | Project lead resolves ongoing availability constraints |

## 10. Assumptions, representation risks, and open items

| ID | Assumption, risk, or open item | Required action |
| --- | --- | --- |
| SA-01 | The sponsor, requirement approvers, process owners, and formal decision rights are not named. | Leadership must name the accountable sponsor and approve the decision and escalation route. |
| SA-02 | The profile document contains only two example individuals for each profiled group and may not represent the wider hospital. | Validate needs with a broader and representative sample, including different departments, shifts, accessibility needs, and service channels. |
| SA-03 | Doctors and nurses are combined as one Key Player group, but their formal influence and concerns may differ. | Confirm separate clinical representatives and record unresolved differences rather than assuming agreement. |
| SA-04 | IT is rated Low interest to follow the lab example, although its profiles show direct delivery interest. | Review IT interest at kickoff and again when implementation begins; move IT to Key Players if appropriate. |
| SA-05 | Privacy/security, affected departmental contacts, and support/training roles are not fully named in the source profiles. | Identify responsible representatives before control review, workflow design, and readiness planning. |
| SA-06 | The supplied data is too limited to establish wait-time, conflict, peak, shortage, or utilization baselines. | Agree additional fields and obtain representative data before approving baselines or operational conclusions. |
| SA-07 | Applicable privacy, security, accessibility, and record-retention standards are not confirmed. | Obtain confirmation from authorized HealthFirst Care representatives; do not assume a named standard such as HIPAA. |

## 11. Validation checklist

| Validation check | Result | Notes |
| --- | --- | --- |
| All five required primary stakeholder categories are identified | Complete | Patients, doctors/nurses, administrative staff, IT, and hospital leadership are included. |
| Relevant secondary stakeholders are recognized | Complete | Privacy/security, affected departments, and support/training are included provisionally. |
| Roles and responsibilities are documented | Complete | Sections 3, 5, and 7 describe each group's contribution. |
| Influence and interest are assigned | Complete - provisional | High/Low ratings are provided and must be validated with HealthFirst Care. |
| All four matrix classifications are represented | Complete | Key Players, Keep Satisfied, Keep Informed, and Monitor are included. |
| Template fields are populated | Complete | Section 5 contains all eight fields from the PDF template. |
| Engagement purpose, method, and frequency are documented | Complete | Sections 6 and 7 provide the strategy and communication plan. |
| Engagement owners and expected outputs are identified | Complete - roles TBD | Owner roles are named; specific people remain to be assigned. |
| Plan aligns with BRD objectives and RTM requirements | Complete | Section 3 includes objective and requirement links. |
| Data findings and limitations inform engagement | Complete | Section 8 covers all three datasets without treating the samples as hospital-wide evidence. |
| Representation, conflict, and escalation risks are documented | Complete | Sections 9 and 10 identify gaps and required actions. |

## 12. Source register

| Source ID | Source                                                |
| --------- | ----------------------------------------------------- |
| SRC-01    | `Project Overview.txt`                                |
| SRC-02    | `Stakeholders Profile_for Requirement Gathering.docx` |
| SRC-03    | `Capstone_Project_M01L01_BRD.md`, version 0.1         |
| SRC-04    | `Capstone_Project_M01L02_RTM.md`, version 0.1         |
| SRC-05    | `appointment_data.csv`                                |
| SRC-06    | `feedback_data.csv`                                   |
| SRC-07    | `resource_data.csv`                                   |
| SRC-08    | `Stakeholders Matrix_Template.pdf`                    |
