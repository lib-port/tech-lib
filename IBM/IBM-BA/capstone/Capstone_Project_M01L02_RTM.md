# Requirements Traceability Matrix (RTM)

| Document field     | Details                                                                     |
| ------------------ | --------------------------------------------------------------------------- |
| File name          | `Capstone_Project_M01L02_RTM.md`                                            |
| Project            | HealthFirst Care - Patient Experience and Operational Efficiency Initiative |
| Version            | 0.1                                                                         |
| Document status    | Draft for stakeholder review                                                |
| Primary references | `Capstone_Project_M01L01_BRD.md`, version 0.1                               |
| Template reference | `RTM_Template.pdf`                                                          |

## 1. Purpose

This Requirements Traceability Matrix links the HealthFirst Care requirements to the stakeholders who raised them, the project objectives they support, and the available data or supporting evidence. It is based on the revised BRD, stakeholder profiles, RTM template, and three supplied datasets.

The RTM will help the project team:

- confirm that the main BRD requirements are covered;
- understand why each requirement is needed;
- maintain alignment between requirements and project objectives;
- identify requirements that need more evidence or clarification; and
- track approval status during stakeholder review.

## 2. Project context

HealthFirst Care is working to improve outpatient appointment scheduling and related hospital operations. The main challenges are long patient wait times, reported double bookings, limited visibility of doctors and resources, communication gaps between departments, difficult record retrieval, disconnected systems, and network downtime. [SRC-01, SRC-02]

The supplied datasets are small and highly patterned. They help identify requirement needs and data gaps, but they do not prove organization-wide performance, causes, true overlapping bookings, peak-hour shortages, or the required 20% wait-time improvement.

### 2.1 Stakeholder roles and priorities

| Stakeholder group | Role in the project | Main priorities |
| --- | --- | --- |
| Patients | Provide user needs, feedback, and user acceptance testing input | Easier booking, assisted support, shorter waits, timely updates, and clear next steps |
| Doctors | Validate schedule, consultation, room/equipment, referral, and result requirements | Avoid overbooking, improve resource access, and receive timely departmental updates |
| Nurses | Validate resource and handoff requirements | Current resource information, timely diagnostic updates, and clear transfer communication |
| Administrative staff | Perform scheduling, record, and billing-related activities | Prevent double bookings, view doctor availability, retrieve information, and reduce rework |
| IT team | Assess, deliver, secure, integrate, and support the solution | Integration, security, reliability, usability, notifications, and reporting |
| Hospital management | Sponsor, prioritize, fund, and approve the change | Improved patient experience, operational efficiency, measurable outcomes, and manageable risk |

### 2.2 Project objectives

| Objective ID | Project objective                                                                             |
| ------------ | --------------------------------------------------------------------------------------------- |
| OBJ-01       | Reduce average eligible patient wait time by at least 20% compared with an approved baseline. |
| OBJ-02       | Improve scheduling access, accuracy, and reliability.                                         |
| OBJ-03       | Improve appointment-related resource allocation and visibility.                               |
| OBJ-04       | Improve patient and appointment-related departmental communication.                           |
| OBJ-05       | Reduce administrative rework and improve consistency of appointment information.              |

## 3. Classification and prioritization

### 3.1 Requirement categories

- **FR - Functional requirement:** describes a feature or action the solution must provide.
- **NFR - Non-functional requirement:** describes how well the solution must operate, including usability, security, availability, performance, and data quality.

### 3.2 MoSCoW definitions

- **Must Have:** essential for project success or safe operation.
- **Should Have:** important and valuable, but may be phased if budget or technical constraints apply.
- **Could Have:** desirable but not essential for the current release.
- **Won't Have:** outside the agreed current scope.

The BRD's functional and non-functional requirements contain 14 Must Have and 2 Should Have requirements. It does not currently classify any active requirement as Could Have or Won't Have. Out-of-scope items are listed separately in Section 5.

### 3.3 Status definition

The RTM template defines requirement status as **Approved**, **Pending**, or **Rejected**. All requirements in this RTM are marked **Pending** because BRD version 0.1 is still a draft for stakeholder review and its approval section has not been signed.

## 4. Requirements Traceability Matrix

| Requirement ID | Requirement description                                                                                                     | Priority (MoSCoW) | Stakeholder(s)                                                 | Project objective                                                                                             | Related data file or supporting evidence                                                                                                                                                           | Status  |
| -------------- | --------------------------------------------------------------------------------------------------------------------------- | ----------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| FR-01          | Allow authorized staff to create appointments using all required appointment details.                                       | Must Have         | Administrative staff                                           | OBJ-02 - Scheduling access, accuracy, and reliability                                                         | `appointment_data.csv` contains appointment, patient, doctor, department, date, time, and status fields; stakeholder profiles report incomplete scheduling information.                            | Pending |
| FR-02          | Check the full appointment period and required resources and block unauthorized overlapping bookings.                       | Must Have         | Administrative staff; doctors                                  | OBJ-02 - Scheduling accuracy; OBJ-03 - Resource allocation                                                    | `appointment_data.csv` has no exact doctor/date/time duplicates but lacks duration, resource assignment, and booking history; stakeholders report double bookings and overbooked schedules.        | Pending |
| FR-03          | Support rescheduling and cancellation, release the previous slot, and record the reason and date of the change.             | Must Have         | Patients; administrative staff                                 | OBJ-02 - Scheduling accuracy and reliability                                                                  | `appointment_data.csv` contains 4 `Rescheduled` and 4 `Cancelled` records but no change reason or history.                                                                                         | Pending |
| FR-04          | Provide online appointment management while keeping phone and in-person scheduling available.                               | Must Have         | Patients; administrative staff                                 | OBJ-02 - Scheduling access                                                                                    | Stakeholder profiles report difficult or confusing online booking and a preference for assisted or in-person scheduling; the CSV files do not record channel preference.                           | Pending |
| FR-05          | Record communication preference and consent and send approved appointment messages by email or SMS.                         | Must Have         | Patients; IT team                                              | OBJ-04 - Communication                                                                                        | `feedback_data.csv` includes one “Delayed response” comment; stakeholder profiles report late cancellation notices, limited delay updates, and an email/SMS preference.                            | Pending |
| FR-06          | Use standard appointment statuses and retain a basic history of status changes.                                             | Must Have         | Administrative staff                                           | OBJ-02 - Scheduling reliability; OBJ-05 - Reduce rework                                                       | `appointment_data.csv` uses `Completed`, `No Show`, `Rescheduled`, and `Cancelled`, but it contains no status-change history.                                                                      | Pending |
| FR-07          | Record scheduled, check-in, and consultation-start times so patient wait time can be calculated.                            | Must Have         | Patients; hospital management                                  | OBJ-01 - Reduce waiting                                                                                       | `feedback_data.csv` contains one “Long wait times” comment; patient profiles report waits over 30 minutes or nearly one hour; `appointment_data.csv` lacks check-in and consultation-start fields. | Pending |
| FR-08          | Show current doctor, room, and equipment availability and prevent assignment of unavailable or already committed resources. | Must Have         | Doctors; nurses; administrative staff                          | OBJ-03 - Resource allocation                                                                                  | `resource_data.csv` shows 2 `Unavailable` nurse records, 2 `In Use` equipment records, and 2 `Under Maintenance` room records; the file does not include capacity or demand.                       | Pending |
| FR-09          | Allow departments to record and view appointment-related referral, test-result, and handoff status updates.                 | Must Have         | Doctors; nurses                                                | OBJ-04 - Departmental communication                                                                           | Stakeholder profiles report delayed lab/radiology results and weak referral and transfer handoffs; `feedback_data.csv` has one ambiguous delayed-response comment.                                 | Pending |
| FR-10          | Share essential appointment updates with approved record and billing processes and show failed updates for correction.      | Should Have       | Administrative staff; IT team; records/billing staff           | OBJ-05 - Reduce rework                                                                                        | Stakeholder profiles report disconnected systems, slow record retrieval, incomplete scheduling information, and billing reconciliation work; no supplied CSV tests system integration.             | Pending |
| FR-11          | Provide basic management reports for wait time, appointment status, conflicts, resources, notifications, and missing data.  | Must Have         | Hospital management; IT team; administrative staff             | OBJ-01 - Reduce waiting; OBJ-03 - Resource allocation; OBJ-04 - Improve communication; OBJ-05 - Reduce rework | All three CSVs provide basic reporting fields, but wait timestamps, capacity, notification results, and other required fields are missing.                                                         | Pending |
| NFR-01         | Use clear labels and instructions for patient self-service and staff-assisted booking.                                      | Must Have         | Patients; administrative staff; IT team                        | OBJ-02 - Scheduling access and usability                                                                      | Stakeholder profiles report confusing online booking and a lack of user-friendly interfaces; no usability-test dataset is supplied.                                                                | Pending |
| NFR-02         | Protect information through authenticated role-based access and audit important changes.                                    | Must Have         | IT team; hospital management; security/privacy representatives | OBJ-05 - Accurate and controlled information                                                                  | Stakeholder profiles identify security weaknesses in legacy systems; the supplied CSVs do not provide access-control evidence.                                                                     | Pending |
| NFR-03         | Make the service available during agreed operating hours and provide a tested outage fallback and recovery process.         | Must Have         | IT team; administrative staff; patients                        | OBJ-02 - Scheduling reliability                                                                               | Stakeholder profiles report frequent network downtime affecting online services; no availability or outage dataset is supplied.                                                                    | Pending |
| NFR-04         | Meet agreed response-time targets for common appointment searches and updates.                                              | Should Have       | IT team; patients; administrative staff                        | OBJ-02 - Scheduling access and reliability                                                                    | Stakeholder profiles report difficult online use and slow record retrieval; no performance baseline is supplied, so the target is still TBD.                                                       | Pending |
| NFR-05         | Validate required appointment and resource data and make incomplete or failed records visible for correction.               | Must Have         | Administrative staff; IT team; hospital management             | OBJ-01 - Wait measurement; OBJ-02 - Scheduling accuracy; OBJ-03 - Resource allocation; OBJ-05 - Reduce rework | `appointment_data.csv` lacks duration and wait fields; `resource_data.csv` lacks capacity and demand; `feedback_data.csv` lacks survey-scale and communication-preference fields.                  | Pending |

## 5. Current-scope exclusions

These items are treated as **Won't Have for the current project scope**. They are not active FR or NFR entries and would require a separate scope decision before being added to the RTM.

| Scope item | MoSCoW classification | Reason |
| --- | --- | --- |
| Clinical diagnosis or treatment decisions | Won't Have | The project supports appointment administration and communication, not clinical decision-making. |
| Full replacement of every hospital system | Won't Have | The BRD focuses on appointment-process improvements and approved integrations. |
| Emergency and inpatient workflow redesign | Won't Have | The current scope is the outpatient appointment journey. |
| Hospital-wide workforce, bed, and supply planning | Won't Have | The scheduling project may show related data but does not redesign workforce or inventory planning. |
| Recruitment, construction, or major equipment purchasing | Won't Have | These require separate funding and business cases. |
| Full operating-room scheduling redesign | Won't Have | This requires separate clinical and operational rules. |
| Prescription-management redesign | Won't Have | Clinical follow-up support is a future need outside the current appointment scope. |
| Billing-policy redesign | Won't Have | Only essential appointment-data exchange is considered. |
| External integrations not approved for this project | Won't Have | Any additional integration requires separate approval, technical assessment, and scope control. |

No active requirement is currently classified as Could Have. This can be reconsidered during stakeholder prioritization if new desirable features are proposed.

## 6. BRD business-requirement coverage

| BRD requirement | Summary                                                      | RTM requirements that provide coverage                    |
| --------------- | ------------------------------------------------------------ | --------------------------------------------------------- |
| BR-01           | Automate scheduling and prevent unauthorized double bookings | FR-01, FR-02, FR-03, FR-04, FR-06, NFR-01, NFR-03, NFR-05 |
| BR-02           | Reduce average eligible patient wait time by at least 20%    | FR-07, FR-11, NFR-05                                      |
| BR-03           | Improve resource allocation and visibility                   | FR-02, FR-08, FR-11, NFR-05                               |
| BR-04           | Improve patient and departmental communication               | FR-05, FR-09, FR-11                                       |
| BR-05           | Reduce duplicate entry and reconciliation work               | FR-06, FR-10, FR-11, NFR-02, NFR-05                       |

## 7. Related deliverable mapping

| Related deliverable or work product | Requirement coverage |
| --- | --- |
| Appointment scheduling workflow and user acceptance tests | FR-01, FR-02, FR-03, FR-04, FR-06, NFR-01, NFR-03, NFR-04, NFR-05 |
| Patient notification workflow and message tests | FR-05, NFR-02 |
| Wait-time measurement and management reports | FR-07, FR-11, NFR-05 |
| Resource availability and allocation rules | FR-02, FR-08, FR-11, NFR-05 |
| Departmental update and handoff workflow | FR-09, NFR-02, NFR-05 |
| Record/billing interface and exception handling | FR-10, NFR-02, NFR-05 |
| Training, outage fallback, and support procedures | NFR-01, NFR-03 |

## 8. Data findings

### 8.1 Appointment data findings

Source: `appointment_data.csv` [SRC-03]

- The file contains 20 records from 1-20 January 2024.
- Statuses are 8 `Completed` (40%), 4 `No Show` (20%), 4 `Rescheduled` (20%), and 4 `Cancelled` (20%).
- Twelve of 20 records (60%) have a non-completed status. This is a sample status mix and does not prove a scheduling-system failure.
- The five recorded times - 10:00, 11:00, 14:00, 15:00, and 16:00 - each appear four times. There is **no single peak appointment time** in this sample.
- Afternoon appointments account for 12 of 20 records (60%), but this reflects the repeated set of three afternoon and two morning time values.
- There are no exact doctor/date/time duplicates in the sample.
- True double bookings cannot be assessed because duration, end time, room/equipment assignment, capacity, booking history, and override details are missing.
- Patient wait time cannot be calculated because check-in and consultation-start timestamps are missing.
- Doctor, department, time, and status follow a fixed pattern, so the sample cannot show that a department or time causes an outcome.

### 8.2 Feedback data findings

Source: `feedback_data.csv` [SRC-04]

- The file contains 15 responses from 1-15 January 2024, with three responses for each department.
- The mean satisfaction score is 7.00, the median is 7, and the observed range is 5-9. The survey scale and benchmark are not documented.
- Six responses (40%) have a score of 5 or 6.
- One comment states “Long wait times” and one states “Delayed response”; each represents 1 of 15 responses (6.7%).
- Other comments include one room-cleanliness issue and one unspecified “Needs improvement” comment.
- Department means are Cardiology 8.33, Neurology 8.33, Orthopedics 7.00, Pediatrics 6.00, and General 5.33. Each is based on only three responses and should not be used to rank departments.
- The file does not capture appointment-channel preference, consent, objective delay duration, or the cause of the delayed response.

### 8.3 Resource data findings

Source: `resource_data.csv` [SRC-05]

- The file contains 10 records from 1-10 January 2024, with two records for each resource type.
- Status counts are 4 `Available`, 2 `Unavailable`, 2 `In Use`, and 2 `Under Maintenance`.
- Both nurse records are `Unavailable`, both equipment records are `In Use`, and both room records are `Under Maintenance`.
- Doctor records total 16 usage hours; nurse records 0; equipment records 12; room records 4; and technician records 20. Total recorded usage is 52 hours.
- The file does not prove resource shortages or utilization rates because capacity hours, demand, reservations, departments, locations, and detailed time intervals are missing.
- Room records marked `Under Maintenance` also show two usage hours each, so the status and usage definitions need clarification.

### 8.4 Overall evidence conclusion

The supplied extracts identify additional fields needed for measurement and reporting; the project team must confirm whether existing source systems already hold them. The stakeholder profiles provide the main evidence for the operational need, including double bookings, booking-channel needs, security weaknesses, system downtime, record/billing integration, and cross-department communication.

The data does **not** validate the 20% wait-time target, prove peak-hour shortages, establish true overlapping-booking frequency, or confirm a specific legal compliance standard. The BRD's privacy and security requirement is therefore included without assuming HIPAA or another named regulation until the applicable jurisdiction and policy are confirmed.

## 9. Validation checklist

| Validation check | Result | Notes |
| --- | --- | --- |
| All BRD functional requirements are included | Complete | FR-01 through FR-11 are mapped. |
| All BRD non-functional requirements are included | Complete | NFR-01 through NFR-05 are mapped. |
| Requirement IDs are unique | Complete | 16 unique active requirement IDs. |
| Requirement category is clear | Complete | FR and NFR prefixes show the category. |
| MoSCoW priority is assigned | Complete | 14 Must Have and 2 Should Have. |
| Could Have and Won't Have treatment is explained | Complete | No active Could Have; current-scope exclusions are documented as Won't Have. |
| Stakeholders are mapped | Complete | Each active requirement names the relevant stakeholder group(s). |
| Project objectives are mapped | Complete | OBJ-01 through OBJ-05 have linked requirements. |
| Related evidence is identified | Complete | Each requirement references a dataset or supporting stakeholder evidence. |
| BRD business requirements are covered | Complete | BR-01 through BR-05 are mapped in Section 6. |
| Related deliverables are identified | Complete | Section 7 groups requirements by deliverable/work product. |
| Requirement status is assigned | Complete | All requirements are Pending because stakeholder approval is not recorded. |
| Data findings and limitations are documented | Complete | Section 8 includes all three datasets and evidence limits. |

## 10. Open items before approval

1. Confirm the project sponsor, requirement owners, and approval authority.
2. Validate the RTM with representative patients, doctors, nurses, administrative staff, IT, records/billing, and affected departments.
3. Agree the wait-time definition, baseline and comparison periods, exclusions, and minimum data completeness.
4. Agree appointment duration, resource, buffer, and authorized-override rules.
5. Confirm first-release scope and available budget, especially for FR-10 and NFR-04.
6. Confirm notification timing, availability, recovery, performance, accessibility, privacy, security, and record-retention expectations.
7. Complete a technical assessment for legacy-system integration and network reliability.
8. Obtain a larger, representative operational dataset before making conclusions about peaks, conflicts, wait performance, or shortages.
9. Update each status from Pending only after the appropriate stakeholder decision is recorded.

## 11. Source register

| Source ID | Source                                                |
| --------- | ----------------------------------------------------- |
| SRC-01    | `Project Overview.txt`                                |
| SRC-02    | `Stakeholders Profile_for Requirement Gathering.docx` |
| SRC-03    | `appointment_data.csv`                                |
| SRC-04    | `feedback_data.csv`                                   |
| SRC-05    | `resource_data.csv`                                   |
| SRC-06    | `Capstone_Project_M01L01_BRD.md`, version 0.1         |
| SRC-07    | `RTM_Template.pdf`                                    |
