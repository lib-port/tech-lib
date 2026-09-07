# Business Requirements Document (BRD)

| Document field     | Details                                                                     |
| ------------------ | --------------------------------------------------------------------------- |
| File name          | `Capstone_Project_M01L01_BRD.md`                                            |
| Project            | HealthFirst Care - Patient Experience and Operational Efficiency Initiative |
| Version            | 0.1                                                                         |
| Document status    | Draft for stakeholder review                                                |
| Source-data period | 1-20 January 2024, depending on the dataset                                 |

## Executive summary

HealthFirst Care wants to improve patient experience and hospital operations. The main concerns identified in the project overview and stakeholder profiles are long patient wait times, appointment scheduling problems, poor visibility of staff and resource availability, and communication gaps between patients and departments. [SRC-01, SRC-02]

This BRD proposes improvements to outpatient appointment scheduling. The main requirements are automated conflict checks, current doctor and resource availability, online and staff-assisted booking, email/SMS notifications, wait-time tracking, appointment-related departmental updates, and basic management reports.

The main success target is a **20% reduction in average eligible patient wait time compared with an agreed baseline**. The supplied appointment data cannot provide this baseline because it does not include check-in or consultation-start times. Budget limitations, legacy systems, network downtime, and incomplete data are the main constraints.

## 1. Project overview

### 1.1 Purpose

The purpose of this BRD is to document the business needs, scope, requirements, assumptions, constraints, risks, and acceptance criteria for improving HealthFirst Care's outpatient appointment process.

### 1.2 Project goals

The project aims to:

- reduce patient wait times;
- prevent unauthorized double bookings;
- improve visibility of doctor, room, and equipment availability;
- provide patients with timely appointment information;
- improve appointment-related communication between departments;
- reduce manual work caused by disconnected systems; and
- provide reliable information for operational decisions.

The exact technology solution has not been selected. IT stakeholders suggested an integrated Hospital Information System (HIS), a cloud-based appointment system, notifications, and analytics, but these are suggestions that still require cost, security, and feasibility review. [SRC-02]

## 2. Background and problem statement

### 2.1 Background

HealthFirst Care is a multi-specialty hospital that has received increasing patient complaints and is experiencing operational challenges. Management has started an improvement initiative focused on patient experience, resource allocation, workflow efficiency, and communication. [SRC-01]

### 2.2 Problem statement

The supplied stakeholder profiles report that the current scheduling and record-management processes do not provide a reliable shared view of appointment and resource availability. Patients report difficult online booking, long waits, late cancellation notices, limited delay updates, and unclear follow-up instructions. Doctors and nurses report overbooking, limited access to rooms and equipment, delayed results, and weak handoffs. Administrative staff report double bookings, limited doctor availability information, slow record retrieval, and billing reconciliation problems. IT staff report disconnected systems, downtime, poor usability, and legacy security weaknesses. [SRC-02]

These issues may lead to patient dissatisfaction, administrative rework, staff pressure, and delays in care. The stakeholder profiles are useful evidence, but they represent a small number of individuals and should be validated with a wider group.

### 2.3 Likely contributing factors

The following factors require validation:

- scheduling and patient-record systems are not fully integrated;
- doctor and resource availability is not updated consistently;
- current processes do not adequately prevent overlapping bookings;
- communication responsibilities between departments are unclear;
- network downtime affects online services; and
- important operational data, such as wait-time timestamps and resource capacity, is incomplete.

## 3. Project scope

| In scope | Out of scope |
| --- | --- |
| Outpatient appointment booking, rescheduling, and cancellation | Clinical diagnosis or treatment decisions |
| Conflict checks for patients, doctors, rooms, and required equipment | Full replacement of every hospital system |
| Current appointment and resource availability | Emergency and inpatient workflow redesign |
| Online, phone, and in-person scheduling | Hospital-wide workforce, bed, or supply planning |
| Email/SMS confirmations, reminders, changes, cancellations, and delay updates | Recruitment, construction, or major equipment purchasing |
| Capture of scheduled time, check-in time, and consultation-start time | Full operating-room scheduling redesign |
| Basic appointment-related referral, result-status, and handoff updates | Prescription-management redesign |
| Essential appointment-data exchange with approved record and billing processes | Billing-policy redesign |
| Basic reports for wait time, appointment status, resources, and notifications | External integrations not approved for this project |
| User training, pilot, and user acceptance testing | |

Because the budget is limited, Must requirements should be delivered first. Record/billing integration and more advanced analytics may be phased if the technical assessment shows that they cannot be included within the available budget.

Patient support routing for prescription questions and other clinical follow-up enquiries is outside this phase, but it should be recorded as a future need with a responsible service owner.

## 4. Stakeholders

| Stakeholder group    | Main issues reported                                                                                                                                                            | Consolidated needs                                                                                                      |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Patients             | Difficult or confusing online booking, waits over 30 minutes or nearly one hour, late cancellation notices, limited delay updates, and difficulty getting follow-up information | Simple online booking; phone/in-person support; timely updates; email/SMS preference; clear next steps                  |
| Doctors              | Overbooked schedules, limited access to equipment and rooms, delayed test results, difficult referrals, and weak progress updates                                               | Accurate schedules, resource visibility, and clear appointment-related handoffs                                         |
| Nurses               | Uneven resources and staffing, delayed diagnostic results, late transfer notices, and transfer miscommunication                                                                 | Current resource information and consistent result/transfer updates                                                     |
| Administrative staff | Double bookings, limited visibility of doctor availability, difficult record retrieval, incomplete scheduling information, and billing reconciliation work                      | Automatic conflict checks, shared appointment information, easier appointment-history retrieval, and visible exceptions |
| IT team              | Scheduling and records are disconnected, network downtime, poor interface usability, and security weaknesses                                                                    | Supported integrations, better reliability and security, usable screens, notifications, and reporting                   |
| Hospital management  | Patient complaints and inefficient operations                                                                                                                                   | Clear priorities, measurable outcomes, funding decisions, and performance reports                                       |

The requirements below consolidate these stakeholder needs. They should be confirmed through a stakeholder review or workshop before final approval.

## 5. Business objectives

| ID | Objective | Success measure |
| --- | --- | --- |
| OBJ-01 | Reduce patient waiting | Average eligible patient wait time is reduced by at least 20% compared with the agreed baseline |
| OBJ-02 | Improve scheduling access, accuracy, and reliability | Patients and staff can use the agreed scheduling channels; unauthorized overlaps are prevented; and the service has an agreed outage process |
| OBJ-03 | Improve resource allocation | Current doctor, room, and equipment status is visible during scheduling |
| OBJ-04 | Improve communication | Appointment changes, cancellations, reminders, delays, and important departmental updates are communicated through an agreed process |
| OBJ-05 | Reduce administrative rework | Appointment information is consistent across included scheduling, record, billing, and reporting processes |

For OBJ-01, the proposed wait-time measure is consultation start minus the later of check-in time or scheduled appointment time. “Eligible” means appointments included under the agreed measurement rules. The final formula, late-arrival and other exclusions, baseline period, and comparison period must be agreed before measurement begins.

## 6. Requirements

### 6.1 Priority definitions

- **Must:** required for the initial release or for safe and secure operation.
- **Should:** important, but may be delivered in a later phase if budget or technical constraints apply.
- **Could:** useful enhancement if time and budget remain.

### 6.2 Business requirements

| ID | Business requirement | Priority |
| --- | --- | --- |
| BR-01 | HealthFirst Care shall automate appointment scheduling and prevent unauthorized double bookings. | Must |
| BR-02 | HealthFirst Care shall reduce average eligible patient wait time by at least 20% compared with an approved baseline. | Must |
| BR-03 | HealthFirst Care shall improve the allocation and visibility of appointment-related staff, rooms, and equipment. | Must |
| BR-04 | HealthFirst Care shall improve patient and appointment-related departmental communication. | Must |
| BR-05 | HealthFirst Care should reduce duplicate entry and reconciliation work between scheduling, records, billing, and reporting processes. | Should |

### 6.3 Functional requirements

| ID    | Functional requirement                                                                                                                                                                                                                     | Source / stakeholder                   | Priority | Acceptance measure                                                                              |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------- | -------- | ----------------------------------------------------------------------------------------------- |
| FR-01 | Authorized staff shall be able to create appointments using required patient, doctor, department, date, time, appointment type, and status information.                                                                                    | Administrative staff                   | Must     | A valid appointment can be created and required fields cannot be left blank.                    |
| FR-02 | The system shall check the full appointment period and required resources before confirmation. It shall block an unauthorized overlap for the same patient, doctor, room, or equipment.                                                    | Administrative staff, doctors          | Must     | Overlapping test bookings are blocked unless an authorized override is used and recorded.       |
| FR-03 | The system shall support rescheduling and cancellation, release the previous slot, and record the reason and date of the change.                                                                                                           | Patients, administrative staff         | Must     | The old slot becomes available and the appointment history shows the change.                    |
| FR-04 | Patients shall be able to request or manage appointments online, while phone and in-person scheduling remain available.                                                                                                                    | Patients                               | Must     | Representative online and staff-assisted scenarios can be completed in user acceptance testing. |
| FR-05 | The system shall record each patient's communication preference and consent and send confirmation, reminder, change, cancellation, delay, and approved next-step messages by approved email/SMS channels.                                  | Patients, IT                           | Must     | The correct test message is generated and its delivery status is recorded.                      |
| FR-06 | The system shall use standard appointment statuses, including `Scheduled`, `Confirmed`, `Checked In`, `Completed`, `Cancelled`, `Rescheduled`, and `No Show`, and maintain a basic history of changes.                                     | Administrative staff, appointment data | Must     | Reports show the current status and previous changes for test appointments.                     |
| FR-07 | Staff shall record scheduled time, check-in time, and consultation-start time so that patient wait time can be calculated and reported.                                                                                                    | Patients, management                   | Must     | A test report calculates wait time correctly from approved test data.                           |
| FR-08 | Scheduling staff shall be able to view current availability of relevant doctors, rooms, and equipment. A resource that is unavailable, under maintenance, reserved, or in use during an overlapping requested period shall not be offered. | Doctors, nurses, resource data         | Must     | An ineligible or already assigned resource cannot be assigned to an overlapping appointment.    |
| FR-09 | Participating departments shall be able to record and view appointment-related referral, test-result, and handoff status updates.                                                                                                          | Doctors, nurses                        | Must     | A test update shows its status, responsible department, and date/time.                          |
| FR-10 | Essential appointment identifiers and status changes should be shared with approved record and billing processes, and failed updates should be visible for correction.                                                                     | Administrative staff, IT               | Should   | Test changes are received correctly or shown in an exception list.                              |
| FR-11 | Authorized managers shall have basic reports for wait time, appointment status, conflicts, resource status, notification results, and missing data.                                                                                        | Management, IT                         | Must     | Report totals match the approved test records.                                                  |

### 6.4 Non-functional requirements

| ID | Non-functional requirement | Priority | Acceptance measure |
| --- | --- | --- | --- |
| NFR-01 | The booking screens and messages shall use clear labels and instructions and support both patient self-service and staff-assisted use. | Must | Representative patients and staff complete common tasks without a critical usability issue. |
| NFR-02 | Patient and appointment information shall be protected through authenticated, role-based access, and important changes shall be recorded in an audit trail. | Must | Users can access only the functions and data allowed for their test role. |
| NFR-03 | The service shall be available during agreed operating hours and have a documented manual fallback and recovery process for outages. | Must | The fallback and recovery process is tested before release. |
| NFR-04 | Common searches and appointment updates shall meet response-time targets agreed with IT after current demand is measured. | Should | Performance testing meets the approved target; the target is currently TBD. |
| NFR-05 | Required dates, statuses, identifiers, and resource information shall be validated, and incomplete or failed records shall be visible for correction. | Must | Invalid test data is rejected or placed in a visible correction list. |

## 7. Acceptance criteria

| ID | Acceptance criterion |
| --- | --- |
| AC-01 | Using an agreed baseline and a comparable post-implementation period, average eligible patient wait time is at least 20% lower. The baseline, period, exclusions, and minimum data completeness are to be agreed before implementation. |
| AC-02 | During user acceptance testing, an unauthorized overlapping booking for the same patient, doctor, room, or required equipment is blocked. An authorized override requires a reason and is recorded. |
| AC-03 | When a reminder is due or an appointment is confirmed, changed, cancelled, materially delayed, or supplied with an approved next-step message, the correct email/SMS message is generated using the patient's recorded preference and consent, and delivery status is stored. |
| AC-04 | A resource marked `Unavailable` or `Under Maintenance`, or marked `In Use`, reserved, or already assigned during an overlapping period, cannot be assigned to the requested appointment. |
| AC-05 | Representative patients and scheduling staff can complete booking, rescheduling, and cancellation scenarios without a critical error. |
| AC-06 | Reports calculate wait time and appointment-status totals correctly from approved test records and display missing required data. |
| AC-07 | Users without an approved role cannot access restricted patient or appointment information. |
| AC-08 | An appointment-related referral, test-result, or handoff update shows its status, responsible department, and date/time to authorized users. |
| AC-09 | A test appointment status change is received correctly by each included record/billing process, and a failed update appears in a visible correction list. |

## 8. Assumptions

- Department representatives will review and validate the requirements.
- Existing systems can provide or exchange the essential appointment information needed for the approved scope.
- Doctors and resource owners will keep availability information current.
- Patients will provide valid contact details and communication consent where required.
- HealthFirst Care will make staff available for workshops, testing, training, and the pilot.
- Comparable baseline and post-implementation data can be collected.
- If an assumption is incorrect, the project scope, budget, or schedule may need to change.

## 9. Constraints

- **Budget limitations for system upgrades** may require phased delivery.
- Legacy systems may limit integration and may introduce reliability or security issues.
- Network downtime may affect online booking and notifications.
- Implementation must minimize disruption to patient care.
- Staff availability for workshops, testing, and training is limited.
- The supplied sample data is too small and incomplete to establish reliable operational baselines.
- HealthFirst Care's approved privacy, security, accessibility, and record-handling requirements must be followed; the applicable details are still to be confirmed.

## 10. Supporting data

The analysis below is descriptive. The datasets are small and highly regular, so the results should be used to identify questions and requirements rather than to claim organization-wide performance or causes.

### 10.1 Appointment data

Source: `appointment_data.csv` [SRC-03]

| Finding | Result | Meaning / limitation |
| --- | ---: | --- |
| Records and dates | 20 records, 1-20 January 2024 | One appointment appears on each date. |
| `Completed` | 8/20 (40%) | Descriptive sample result. |
| `No Show` | 4/20 (20%) | The reason is not provided. |
| `Rescheduled` | 4/20 (20%) | The reason and original slot are not provided. |
| `Cancelled` | 4/20 (20%) | The reason is not provided. |
| Non-completed status mix | 12/20 (60%) | This does not prove a scheduling failure. |
| Exact doctor/date/time duplicates | 0 | The sample does not show an exact double booking. |
| Appointment times | Five times, each used 4 times | There is **no single peak time** in the sample. |
| Afternoon appointments | 12/20 (60%) | This occurs because three of the five repeated time values are in the afternoon. |
| Wait-time fields | Not available | The file cannot provide a wait-time baseline. |

The doctor, department, time, and status follow a fixed pattern in the sample. For example, every Orthopedics appointment is at 11:00 and has a `No Show` status, while every Neurology appointment is at 14:00 and is `Rescheduled`. Therefore, the file should not be used to claim that a department or time causes an appointment outcome.

Appointment duration, room/equipment assignment, booking history, and override information are missing. As a result, true overlapping bookings cannot be assessed even though no exact doctor/date/time duplicate appears.

### 10.2 Feedback data

Source: `feedback_data.csv` [SRC-04]

| Finding                  |                                                                  Result | Meaning / limitation                                    |
| ------------------------ | ----------------------------------------------------------------------: | ------------------------------------------------------- |
| Records and dates        |                                         15 responses, 1-15 January 2024 | Three responses appear for each department.             |
| Satisfaction score       |                                          Mean 7.00; median 7; range 5-9 | The survey scale and benchmark are not documented.      |
| Scores of 5 or 6         |                                                              6/15 (40%) | This describes only the supplied responses.             |
| Long wait comment        |                                                             1/15 (6.7%) | Direct evidence of a concern, not its wider prevalence. |
| Delayed response comment |                                                             1/15 (6.7%) | The responsible process is not identified.              |
| Other issues             | One cleanliness comment and one unspecified “Needs improvement” comment | More structured feedback categories would help.         |

The observed department means are Cardiology 8.33, Neurology 8.33, Orthopedics 7.00, Pediatrics 6.00, and General 5.33. Each mean is based on only three responses, so the departments should not be ranked using this sample.

The CSV does not capture scheduling feedback or communication preferences. Email/SMS and in-person preferences come from the stakeholder profiles, not from the feedback dataset.

### 10.3 Resource data

Source: `resource_data.csv` [SRC-05]

| Resource type | Records | Status in both records | Total usage hours | Average hours |
| --- | ---: | --- | ---: | ---: |
| Doctor | 2 | `Available` | 16 | 8 |
| Nurse | 2 | `Unavailable` | 0 | 0 |
| Equipment | 2 | `In Use` | 12 | 6 |
| Room | 2 | `Under Maintenance` | 4 | 2 |
| Technician | 2 | `Available` | 20 | 10 |

There are 10 records covering 1-10 January 2024. Four records are `Available`; two are `Unavailable`; two are `In Use`; and two are `Under Maintenance`. These are record counts, not hospital-wide availability rates.

Utilization percentages cannot be calculated because available capacity hours, demand, reservations, and downtime periods are not included. A room marked `Under Maintenance` also has two usage hours, so the meaning of `UsageHours` and the timing of the status need clarification.

### 10.4 Data needed for future measurement

HealthFirst Care should collect:

- scheduled start/end time, duration, appointment type, change reason, and status history;
- patient check-in and consultation-start time;
- assigned doctors, rooms, equipment, capacity, reservations, and downtime;
- patient communication preference, consent, notification time, and delivery result; and
- appointment identifiers in feedback and approved record/billing interfaces.

## 11. Risks and dependencies

### 11.1 Key risks

| Risk | Rating | Response |
| --- | --- | --- |
| Integration with legacy systems is more difficult or expensive than expected | High | Complete an early technical assessment and phase integrations if needed. |
| Staff or patients do not adopt the new process | Medium | Involve users, run a pilot, provide training, and collect feedback. |
| Resource availability information is missing or outdated | High | Assign responsibility for updates and report missing or old data. |
| Network downtime interrupts booking or notifications | High | Improve monitoring and test a manual fallback and recovery process. |
| Inadequate baseline data prevents measurement of the 20% target | High | Add or identify the required timestamps and approve the measure before go-live. |
| The available budget cannot support the full scope | Medium | Prioritize Must requirements and agree what moves to a later phase. |
| Patient information is accessed or sent incorrectly | High | Apply role-based access, consent checks, testing, and audit trails. |

### 11.2 Key dependencies

- agreed appointment types, durations, buffers, and override rules;
- accurate doctor and resource availability;
- valid patient identity, contact, preference, and consent information;
- technical access to included scheduling, record, billing, and departmental systems;
- approved wait-time definition and baseline data; and
- named business, IT, testing, training, and support contacts.

## 12. Requirements traceability

| Objective                                                   | Main evidence                                                         | Linked requirements                                        | Verification        |
| ----------------------------------------------------------- | --------------------------------------------------------------------- | ---------------------------------------------------------- | ------------------- |
| OBJ-01 Reduce waiting                                       | Patient profiles, feedback, lab target                                | BR-02, FR-07, FR-11, NFR-05                                | AC-01, AC-06        |
| OBJ-02 Improve scheduling access, accuracy, and reliability | Patient and administrative profiles, appointment analysis, IT profile | BR-01, FR-01-FR-04, FR-06, NFR-01, NFR-03, NFR-04, NFR-05, | AC-02, AC-05, AC-07 |
| OBJ-03 Improve resource allocation                          | Doctor/nurse profiles, resource analysis                              | BR-03, FR-02, FR-08, FR-11, NFR-05                         | AC-04, AC-06        |
| OBJ-04 Improve communication                                | Patient, doctor, and nurse profiles                                   | BR-04, FR-05, FR-09                                        | AC-03, AC-08        |
| OBJ-05 Reduce rework                                        | Administrative and IT profiles                                        | BR-05, FR-06, FR-10, FR-11, NFR-02                         | AC-06, AC-07, AC-09 |

## 13. Next steps and open items

1. Confirm the project sponsor, requirement owners, departments, sites, and first-release scope.
2. Review the requirements with representative patients, doctors, nurses, administrative staff, IT, records, billing, and affected departments.
3. Agree the wait-time formula, baseline period, comparison period, exclusions, and minimum data completeness.
4. Agree appointment duration, resource, buffer, and authorized override rules.
5. Confirm the budget and complete a technical, integration, security, and network assessment.
6. Agree notification timing, system availability, performance, accessibility, privacy, and retention expectations.
7. Prioritize any Should requirements that cannot fit within the first release.
8. Prepare user acceptance test cases, training, pilot, fallback, and support plans.

## 14. Conclusion

This BRD defines a practical improvement scope focused on outpatient appointment scheduling, patient communication, resource visibility, and operational reporting. The requirements address the main concerns raised by the supplied patient, clinical, administrative, and IT stakeholder profiles.

The data supports further investigation but does not establish a wait-time baseline, true double-booking rate, or resource-utilization rate. Before approval, HealthFirst Care should validate the requirements with a wider stakeholder group, collect the missing baseline data, confirm technical feasibility, and prioritize the requirements against the available budget.

## 15. Source register

| Source ID | File                                                  |
| --------- | ----------------------------------------------------- |
| SRC-01    | `Project Overview.txt`                                |
| SRC-02    | `Stakeholders Profile_for Requirement Gathering.docx` |
| SRC-03    | `appointment_data.csv`                                |
| SRC-04    | `feedback_data.csv`                                   |
| SRC-05    | `resource_data.csv`                                   |
| SRC-06    | `Business Requireements Document Template.docx`       |

## 16. Approval and change history

| Role | Name | Decision / date |
| --- | --- | --- |
| Executive sponsor | TBD | Pending |
| Clinical Operations representative | TBD | Pending |
| Administrative Operations representative | TBD | Pending |
| IT representative | TBD | Pending |
