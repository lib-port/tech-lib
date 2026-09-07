# Data Cleaning, Manipulation, and Analysis Report

| Document field  | Details                                                                     |
| --------------- | --------------------------------------------------------------------------- |
| File name       | `Capstone_Project_M04L01_Data_Analysis.md`                                  |
| Project         | HealthFirst Care - Patient Experience and Operational Efficiency Initiative |
| Version         | 1.0                                                                         |
| Document status | Draft for stakeholder review                                                |

## Executive summary

The three supplied data files were reviewed, standardized, reconciled, and loaded into a supporting Excel workbook. The files contain 20 appointment records, 15 feedback records, and 10 resource records. No exact duplicate rows, blank cells, or invalid supplied dates/times were found, so no rows were deleted and no values were imputed.

The appointment sample contains 8 Completed records and 4 each for No Show, Rescheduled, and Cancelled. The five listed appointment times each occur four times, so the sample does not show a unique peak hour. The feedback sample has an average score of 7.00 and a median of 7, but the survey scale and performance benchmark were not provided. Cardiology and Neurology have the highest sample averages at 8.33, while General has the lowest at 5.33; each department has only three responses, so these values are descriptive and should not be used as a performance ranking. Resource records show four Available records and two each for Unavailable, In Use, and Under Maintenance.

The extracts are suitable for demonstrating cleaning, lookup, filtering, and reporting logic. They are not sufficient to calculate patient wait time, confirm overlapping double bookings, calculate resource-utilization percentages, or establish hospital-wide trends. The main business action is therefore to agree the missing data fields and measurement rules before using the reports as a performance baseline.

## 1. Purpose and scope

This report documents the cleaning and analysis of HealthFirst Care operational data and supports the following project objectives from the BRD and RTM:

| Objective | Analysis contribution |
| --- | --- |
| OBJ-01 - Reduce patient waiting | Identifies that scheduled time is present, but check-in and consultation-start timestamps are missing. |
| OBJ-02 - Improve scheduling access, accuracy, and reliability | Summarizes appointment statuses, listed times, and exact duplicate checks. |
| OBJ-03 - Improve resource allocation | Summarizes resource statuses and recorded hours and identifies the missing capacity denominator. |
| OBJ-04 - Improve communication | Identifies comments concerning a delayed response and long waits. |
| OBJ-05 - Reduce administrative rework | Demonstrates standardized fields, validation checks, controlled lookups, and exception reporting. |

The analysis addresses these business questions:

1. What appointment-status, time, and weekday patterns appear in the supplied sample?
2. What satisfaction-score and comment patterns appear?
3. What resource statuses and recorded-hour patterns appear?
4. Which requested measures can be calculated reliably?
5. Which additional fields are needed to support the BRD and RTM?

## 2. Data sources and method

| Source | Supplied rows | Date coverage | Main use |
| --- | ---: | --- | --- |
| appointment_data.csv | 20 | 01/01/2024-01/20/2024 | Appointment status, department, date, and listed-time analysis |
| feedback_data.csv | 15 | 01/01/2024-01/15/2024 | Satisfaction-score and comment analysis |
| resource_data.csv | 10 | 01/01/2024-01/10/2024 | Resource-status and recorded-hour analysis |

The following method was used:

1. Preserved the source values in three Raw sheets.
2. Checked headers, row counts, blanks, exact duplicate rows, duplicate identifiers, dates, times, and numeric fields.
3. Converted dates to true Excel dates displayed as MM/DD/YYYY.
4. Converted appointment times to true Excel times displayed as HH:MM AM/PM.
5. Retained source labels because they were already consistent.
6. Added auditable helper fields for weekday, time band, status summaries, join checks, and data-quality exceptions.
7. Applied the lab-required Patient ID lookup from feedback to appointments.
8. Created formula-based pivot-style summaries, filtered tables, a department selector, and charts.
9. Reconciled all summary totals to the cleaned tables and scanned the workbook for formula errors.

## 3. Data-cleaning results

| Dataset | Source rows | Exact duplicate rows removed | Blank cells replaced | Cleaned rows | Date/time result |
| --- | ---: | ---: | ---: | ---: | --- |
| Appointment | 20 | 0 | 0 | 20 | All 20 dates and times valid |
| Feedback | 15 | 0 | 0 | 15 | All 15 dates valid |
| Resource | 10 | 0 | 0 | 10 | All 10 dates valid |

### 3.1 Duplicate handling

No exact duplicate rows or duplicate primary identifiers were found. The cleaned row counts therefore match the source row counts.

The appointment file also has no exact duplicate combination of Doctor ID, Appointment Date, and Appointment Time. This is only an exact-slot check. It does not prove that overlapping double bookings are absent because appointment duration, end time, room/equipment assignment, booking history, and override records are not supplied.

### 3.2 Missing-value handling

No literal blank cells were found in the supplied files. As a result:

- no feedback score required replacement with an average;
- no text field required an “N/A” placeholder; and
- source values were not changed unnecessarily.

“N/A” is used only for calculated fields that cannot be produced from the available data, particularly Wait Time.

### 3.3 Standardization

- Dates are stored as Excel date values and displayed as MM/DD/YYYY.
- Appointment times are stored as Excel time values and displayed as HH:MM AM/PM.
- Feedback Score and Usage Hours are stored as numeric values.
- Department, appointment status, resource type, and availability labels were retained because the supplied values were already consistent.
- The two Under Maintenance resource rows with two recorded usage hours were retained and flagged for definition review rather than changed.

## 4. Data manipulation and lookup

The lab requires feedback information to be linked to appointment information using Patient ID. A VLOOKUP-based combined table was created in the Cleaned_Feedback sheet with these main columns:

- Patient ID
- Appointment Date
- Appointment Time
- Department
- Feedback Score
- Comments
- Wait Time in minutes
- Satisfaction Level

Additional audit columns show Appointment Status, department agreement, join status, and a join caution.

### 4.1 Lookup reconciliation

| Lookup result | Count | Interpretation |
| --- | ---: | --- |
| Feedback rows with one Patient ID appointment match | 15 | All feedback rows found one sample appointment row. |
| Feedback rows with no Patient ID match | 0 | No unmatched feedback row in the supplied sample. |
| Appointment rows with one feedback row | 15 | Appointment records P1000-P1014 have feedback. |
| Appointment rows with no feedback row | 5 | Appointment records P1015-P1019 have no supplied feedback. |
| Ambiguous Patient ID matches | 0 | Patient IDs are unique in the supplied appointment file. |

The match is provisional. feedback_data.csv does not contain Appointment ID or another approved encounter key. Patient ID, date, and department happen to align in this small sample, but the lookup should not be treated as an authoritative production relationship.

### 4.2 Satisfaction categorization

The lab rule was implemented as:

- Feedback Score greater than or equal to 4 = High
- Feedback Score below 4 = Low

All 15 supplied scores are between 5 and 9, so all rows are classified High and none are classified Low. This rule is not useful for distinguishing satisfaction within this sample. The survey scale and an approved business threshold should be confirmed before the categories are used operationally.

### 4.3 Wait-time treatment

Wait Time is recorded as N/A for every combined row. appointment_data.csv contains the scheduled appointment time but does not contain physical check-in time or consultation-start time. The BRD definition linked to FR-07 and AC-01 cannot therefore be calculated.

## 5. Summary analysis

### 5.1 Appointment summary

#### Appointment status

| Status | Count | Share of supplied appointments |
| --- | ---: | ---: |
| Completed | 8 | 40.0% |
| No Show | 4 | 20.0% |
| Rescheduled | 4 | 20.0% |
| Cancelled | 4 | 20.0% |
| **Total** | **20** | **100.0%** |

Twelve of the 20 records have a non-completed status, but this does not prove that scheduling caused the outcome. The file does not include reasons, status history, or patient communication records.

#### Listed appointment time

| Listed time | Appointment count |
| --- | ---: |
| 10:00 AM | 4 |
| 11:00 AM | 4 |
| 02:00 PM | 4 |
| 03:00 PM | 4 |
| 04:00 PM | 4 |

There is no unique busiest listed time. Each date contains only one appointment record, so the file cannot show simultaneous demand or queue pressure.

#### Day of week

| Day | Appointment count |
| --- | ---: |
| Monday | 3 |
| Tuesday | 3 |
| Wednesday | 3 |
| Thursday | 3 |
| Friday | 3 |
| Saturday | 3 |
| Sunday | 2 |

Monday through Saturday tie at three records. Sunday has two because the extract ends on Saturday, January 20. This boundary effect is not evidence that Sunday demand is lower.

### 5.2 Patient-feedback summary

| Metric | Result |
| --- | ---: |
| Response count | 15 |
| Mean score | 7.00 |
| Median score | 7 |
| Observed range | 5-9 |
| Scores 5-6 | 6 |
| High under the lab rule | 15 |
| Low under the lab rule | 0 |

Each score from 5 through 9 appears exactly three times. A score of 7.00 should not be described as 70% or judged as good/poor because the survey scale and target were not supplied.

#### Department sample averages

| Department | Responses | Average score | High | Low |
| --- | ---: | ---: | ---: | ---: |
| Cardiology | 3 | 8.33 | 3 | 0 |
| General | 3 | 5.33 | 3 | 0 |
| Neurology | 3 | 8.33 | 3 | 0 |
| Orthopedics | 3 | 7.00 | 3 | 0 |
| Pediatrics | 3 | 6.00 | 3 | 0 |

Cardiology and Neurology have the highest sample averages, and General has the lowest. Each department has only three responses and is tied to a fixed appointment time, doctor, and status pattern in the sample. The averages are useful for showing the calculation but are not a reliable department performance ranking.

#### Comments requiring follow-up

- “Long wait times” appears once, or 1 of 15 responses.
- “Delayed response” appears once, or 1 of 15 responses.
- “Room cleanliness issue” appears once.
- “Needs improvement” appears once, without a specific cause.

These comments support the need to investigate waiting, communication, environment, and service issues. They do not establish how common the issues are across HealthFirst Care.

### 5.3 Resource summary

| Resource type | Records | Recorded status | Average recorded hours | Total recorded hours |
| --- | ---: | --- | ---: | ---: |
| Doctor | 2 | Available | 8.0 | 16.0 |
| Equipment | 2 | In Use | 6.0 | 12.0 |
| Nurse | 2 | Unavailable | 0.0 | 0.0 |
| Room | 2 | Under Maintenance | 2.0 | 4.0 |
| Technician | 2 | Available | 10.0 | 20.0 |
| **Total** | **10** | - | **5.2 overall mean** | **52.0** |

Availability counts are:

| Availability | Records |
| --- | ---: |
| Available | 4 |
| Unavailable | 2 |
| In Use | 2 |
| Under Maintenance | 2 |

The values are recorded Usage Hours, not utilization percentages. Resource capacity, comparable time intervals, demand, reservations, department, and location are missing. It is therefore not valid to classify a resource as underutilized or overburdened from this file.

### 5.4 Cross-dataset trend assessment

The requested correlation between low satisfaction and peak appointment times cannot be completed reliably:

- the lab rule produces zero Low rows;
- all five appointment times tie at four records;
- feedback has no approved encounter key; and
- department, doctor, listed time, and appointment status follow a fixed pattern.

Resource outcomes also cannot be connected to appointments because resource_data.csv has no appointment, patient, department, location, or time-slot key.

## 6. Mermaid visualizations

The charts below show descriptive values for the supplied samples only.

### 6.1 Appointment status counts

~~~mermaid
xychart-beta
    title "Appointment status counts - supplied sample n=20"
    x-axis ["Completed", "No Show", "Rescheduled", "Cancelled"]
    y-axis "Records" 0 --> 8
    bar [8, 4, 4, 4]
~~~

### 6.2 Appointments by listed time

~~~mermaid
xychart-beta
    title "Appointments by listed time - no unique peak"
    x-axis ["10 AM", "11 AM", "2 PM", "3 PM", "4 PM"]
    y-axis "Records" 0 --> 4
    bar [4, 4, 4, 4, 4]
~~~

### 6.3 Average feedback score by department

~~~mermaid
xychart-beta
    title "Average feedback score by department - n=3 each"
    x-axis ["Cardiology", "General", "Neurology", "Orthopedics", "Pediatrics"]
    y-axis "Average score - scale unknown" 0 --> 10
    bar [8.33, 5.33, 8.33, 7, 6]
~~~

The department averages are descriptive only and should not be treated as a performance ranking.

### 6.4 Average recorded resource hours

~~~mermaid
xychart-beta
    title "Average recorded resource hours - not utilization"
    x-axis ["Doctor", "Equipment", "Nurse", "Room", "Technician"]
    y-axis "Recorded hours" 0 --> 10
    bar [8, 6, 0, 2, 10]
~~~

## 7. Supported and unsupported conclusions

| Business question | Current answer |
| --- | --- |
| What is the busiest appointment time? | No unique peak appears. All five listed times tie at four records. Operational peak demand is not measurable from one record per date. |
| What is average patient wait time? | Not available because physical check-in and consultation-start timestamps are absent. |
| Has the 20% wait-time target been met? | Cannot be assessed without an approved baseline, comparison period, exclusions, and complete wait timestamps. |
| Are there double bookings? | No exact doctor/date/time duplicates appear, but overlapping appointments cannot be tested without duration, end time, resource assignment, and booking history. |
| Which department has the best satisfaction? | The sample averages can be calculated, but three responses per department and a fixed data pattern do not support a performance ranking. |
| Is low satisfaction related to peak time? | Not assessable because there are no Low rows under the lab rule and there is no unique peak. |
| What is resource utilization? | Not available because capacity hours and a comparable measurement interval are absent. |
| Do resource shortages cause delays or cancellations? | Not assessable because resources cannot be linked to appointments and demand/capacity data is absent. |

## 8. Recommendations

| ID | Recommendation | Priority | Proposed owner | BRD/RTM traceability |
| --- | --- | --- | --- | --- |
| REC-01 | Approve a shared data dictionary covering identifiers, required fields, status definitions, timestamps, time zone, and validation rules. | Must | Business Analyst, Data Owner, IT | NFR-05 |
| REC-02 | Capture scheduled time, physical check-in time, and consultation-start time, and approve the wait-time formula and baseline period. | Must | Administrative and Clinical Operations, IT | FR-07, FR-11, AC-01 |
| REC-03 | Capture appointment duration, end time, required resources, status history, conflict result, and authorized override evidence. | Must | Scheduling Owner, Resource Owners, IT | FR-02, FR-06, FR-08 |
| REC-04 | Capture resource capacity, availability interval, reservation, demand, department, location, and maintenance definitions. | Must | Resource Owners, IT, Data Analyst | FR-08, FR-11 |
| REC-05 | Add an approved encounter key to feedback and document survey scale, benchmark, population, sampling method, consent, and privacy controls. | Should | Patient Experience, Privacy/Records, IT | FR-05, NFR-02, NFR-05 |
| REC-06 | Collect a representative baseline covering agreed departments, operating periods, weekdays/weekends, and exception types. | Must | Hospital Leadership, Data Analyst | OBJ-01-OBJ-05 |
| REC-07 | Use the current extracts to prototype reports and test validation logic, not as hospital-wide management baselines. | Must | Hospital Leadership, Data Analyst | FR-11, AC-06 |
| REC-08 | Reassess appointment, feedback, and resource relationships only after valid keys, representative records, and relevant control variables are available. | Later | Data Analyst with BA review | Benefits measurement |

## 9. Excel workbook guide

The companion workbook is titled Capstone_Project_M04L01_Data_Analysis.xlsx and includes:

| Sheet | Purpose |
| --- | --- |
| 00_Guide | Scope, definitions, limitations, sheet guide, and optional desktop Excel steps |
| Raw_Appointment | Original appointment source values |
| Raw_Feedback | Original feedback source values |
| Raw_Resource | Original resource source values |
| Cleaned_Appointment | Standardized dates/times and appointment quality checks |
| Cleaned_Feedback | Lab-required VLOOKUP, combined fields, categorization, and join controls |
| Cleaned_Resource | Standardized resource data and definition flags |
| Pivot_Appointments | Formula-based appointment pivot-style summaries and chart |
| Pivot_Feedback | Formula-based feedback pivot-style summaries and chart |
| Pivot_Resources | Formula-based resource pivot-style summaries and chart |
| Dashboard | Department selector, KPIs, and appointment-status chart |
| Data_Quality | Cleaning reconciliation, data gaps, and join audit |
| Lookups | Controlled values and the satisfaction threshold |

The clean datasets are Excel Tables with header filters. The Dashboard department selector provides slicer-like interaction and updates the appointment and feedback figures. The workbook-authoring environment did not create native PivotTable or slicer objects, so the workbook labels its formula-based summaries and selector transparently. The 00_Guide sheet includes steps for creating native PivotTables and slicers in desktop Excel from the prepared tables if those objects are required.

## 10. Validation checklist

| Check | Status | Evidence |
| --- | --- | --- |
| Three source files loaded and retained | Complete | Raw_Appointment, Raw_Feedback, and Raw_Resource sheets |
| Exact duplicates checked | Complete | Zero removed in all three datasets |
| Dates standardized to MM/DD/YYYY | Complete | Cleaned date columns use true Excel dates and the required display format |
| Times standardized to HH:MM AM/PM | Complete | Cleaned appointment time columns use true Excel times and the required display format |
| Missing values checked | Complete | No source blanks; no imputation required |
| Cleaned sheets created with required titles | Complete | Cleaned_Appointment, Cleaned_Feedback, and Cleaned_Resource |
| Patient ID lookup implemented | Complete | VLOOKUP-based combined fields plus match-status controls |
| Satisfaction Level implemented | Complete | IF rule uses score greater than or equal to 4 as High |
| Appointment summaries created | Complete | Status, time, weekday, department, and department/time tables |
| Feedback summaries created | Complete | Department, score, and satisfaction-level summaries |
| Resource summaries created | Complete | Resource type, status, recorded-hour summaries |
| Filters and interactive control provided | Complete | Excel Table filters and Dashboard department selector |
| Charts created | Complete | Native Excel charts plus Mermaid charts in this report |
| Totals reconciled | Complete | 20 appointments, 15 feedback rows, and 10 resource rows |
| Formula errors checked | Complete | No formula-error cells found in the final workbook |
| Limitations documented | Complete | Data Quality sheet and Sections 5-8 of this report |

## Appendix A - Cleaned appointment dataset

| Appointment ID | Patient ID | Doctor ID | Department | Appointment Date | Appointment Time | Day | Time Band | Status |
| ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | P1000 | D10 | Cardiology | 01/01/2024 | 10:00 AM | Monday | Morning | Completed |
| 2 | P1001 | D11 | Orthopedics | 01/02/2024 | 11:00 AM | Tuesday | Morning | No Show |
| 3 | P1002 | D12 | Neurology | 01/03/2024 | 02:00 PM | Wednesday | Afternoon | Rescheduled |
| 4 | P1003 | D13 | Pediatrics | 01/04/2024 | 03:00 PM | Thursday | Afternoon | Cancelled |
| 5 | P1004 | D14 | General | 01/05/2024 | 04:00 PM | Friday | Afternoon | Completed |
| 6 | P1005 | D10 | Cardiology | 01/06/2024 | 10:00 AM | Saturday | Morning | Completed |
| 7 | P1006 | D11 | Orthopedics | 01/07/2024 | 11:00 AM | Sunday | Morning | No Show |
| 8 | P1007 | D12 | Neurology | 01/08/2024 | 02:00 PM | Monday | Afternoon | Rescheduled |
| 9 | P1008 | D13 | Pediatrics | 01/09/2024 | 03:00 PM | Tuesday | Afternoon | Cancelled |
| 10 | P1009 | D14 | General | 01/10/2024 | 04:00 PM | Wednesday | Afternoon | Completed |
| 11 | P1010 | D10 | Cardiology | 01/11/2024 | 10:00 AM | Thursday | Morning | Completed |
| 12 | P1011 | D11 | Orthopedics | 01/12/2024 | 11:00 AM | Friday | Morning | No Show |
| 13 | P1012 | D12 | Neurology | 01/13/2024 | 02:00 PM | Saturday | Afternoon | Rescheduled |
| 14 | P1013 | D13 | Pediatrics | 01/14/2024 | 03:00 PM | Sunday | Afternoon | Cancelled |
| 15 | P1014 | D14 | General | 01/15/2024 | 04:00 PM | Monday | Afternoon | Completed |
| 16 | P1015 | D10 | Cardiology | 01/16/2024 | 10:00 AM | Tuesday | Morning | Completed |
| 17 | P1016 | D11 | Orthopedics | 01/17/2024 | 11:00 AM | Wednesday | Morning | No Show |
| 18 | P1017 | D12 | Neurology | 01/18/2024 | 02:00 PM | Thursday | Afternoon | Rescheduled |
| 19 | P1018 | D13 | Pediatrics | 01/19/2024 | 03:00 PM | Friday | Afternoon | Cancelled |
| 20 | P1019 | D14 | General | 01/20/2024 | 04:00 PM | Saturday | Afternoon | Completed |

## Appendix B - Cleaned feedback and appointment lookup dataset

| Patient ID | Appointment Date | Time | Department | Feedback Score | Comments | Wait Time (min) | Satisfaction Level | Appointment Status | Join Status |
| --- | --- | --- | --- | ---: | --- | --- | --- | --- | --- |
| P1000 | 01/01/2024 | 10:00 AM | Cardiology | 8 | Good service | N/A | High | Completed | Unique Patient ID match - provisional |
| P1001 | 01/02/2024 | 11:00 AM | Orthopedics | 6 | Long wait times | N/A | High | No Show | Unique Patient ID match - provisional |
| P1002 | 01/03/2024 | 02:00 PM | Neurology | 9 | Excellent care | N/A | High | Rescheduled | Unique Patient ID match - provisional |
| P1003 | 01/04/2024 | 03:00 PM | Pediatrics | 7 | Child-friendly staff | N/A | High | Cancelled | Unique Patient ID match - provisional |
| P1004 | 01/05/2024 | 04:00 PM | General | 5 | Average | N/A | High | Completed | Unique Patient ID match - provisional |
| P1005 | 01/06/2024 | 10:00 AM | Cardiology | 8 | Great doctors | N/A | High | Completed | Unique Patient ID match - provisional |
| P1006 | 01/07/2024 | 11:00 AM | Orthopedics | 7 | Helpful staff | N/A | High | No Show | Unique Patient ID match - provisional |
| P1007 | 01/08/2024 | 02:00 PM | Neurology | 9 | Highly recommended | N/A | High | Rescheduled | Unique Patient ID match - provisional |
| P1008 | 01/09/2024 | 03:00 PM | Pediatrics | 6 | Room cleanliness issue | N/A | High | Cancelled | Unique Patient ID match - provisional |
| P1009 | 01/10/2024 | 04:00 PM | General | 5 | Delayed response | N/A | High | Completed | Unique Patient ID match - provisional |
| P1010 | 01/11/2024 | 10:00 AM | Cardiology | 9 | Amazing team | N/A | High | Completed | Unique Patient ID match - provisional |
| P1011 | 01/12/2024 | 11:00 AM | Orthopedics | 8 | Efficient process | N/A | High | No Show | Unique Patient ID match - provisional |
| P1012 | 01/13/2024 | 02:00 PM | Neurology | 7 | Satisfactory | N/A | High | Rescheduled | Unique Patient ID match - provisional |
| P1013 | 01/14/2024 | 03:00 PM | Pediatrics | 5 | Needs improvement | N/A | High | Cancelled | Unique Patient ID match - provisional |
| P1014 | 01/15/2024 | 04:00 PM | General | 6 | Very good | N/A | High | Completed | Unique Patient ID match - provisional |

## Appendix C - Cleaned resource dataset

| Resource ID | Resource Type | Availability | Usage Hours | Date | Availability Group | Data Quality Note |
| --- | --- | --- | ---: | --- | --- | --- |
| R1 | Doctor | Available | 8.0 | 01/01/2024 | Available | - |
| R2 | Nurse | Unavailable | 0.0 | 01/02/2024 | Not marked Available | - |
| R3 | Equipment | In Use | 6.0 | 01/03/2024 | Not marked Available | - |
| R4 | Room | Under Maintenance | 2.0 | 01/04/2024 | Not marked Available | Clarify status/hour definition |
| R5 | Technician | Available | 10.0 | 01/05/2024 | Available | - |
| R6 | Doctor | Available | 8.0 | 01/06/2024 | Available | - |
| R7 | Nurse | Unavailable | 0.0 | 01/07/2024 | Not marked Available | - |
| R8 | Equipment | In Use | 6.0 | 01/08/2024 | Not marked Available | - |
| R9 | Room | Under Maintenance | 2.0 | 01/09/2024 | Not marked Available | Clarify status/hour definition |
| R10 | Technician | Available | 10.0 | 01/10/2024 | Available | - |

## Appendix D - Data-quality log

| ID | Dataset / field | Gap | Impact | Workbook treatment | Recommended action |
| --- | --- | --- | --- | --- | --- |
| DQ-01 | Appointment timestamps | No request, booking, physical check-in, or consultation-start timestamps | Booking cycle and patient wait are unavailable | Wait Time = N/A | Capture event timestamps and approve the calculation |
| DQ-02 | Appointment duration/resources/history | No duration, end time, assignment, history, or override log | True overlaps cannot be assessed | Exact duplicate check only | Add duration, assignments, history, and override evidence |
| DQ-03 | Appointment pattern | Department, doctor, time, and status follow a fixed pattern | Apparent associations are confounded | Descriptive counts only | Obtain representative multi-row daily data |
| DQ-04 | Feedback metadata | Scale, benchmark, sampling method, and response denominator are absent | Scores have limited context | Descriptive summaries only | Define scale, benchmark, population, and sampling |
| DQ-05 | Feedback linkage | No Appointment ID or approved encounter key | Lookup is not authoritative | Provisional Patient ID lookup per lab | Add an approved encounter key with privacy controls |
| DQ-06 | Resource denominator | No capacity, demand, reservation, department, location, or interval | Utilization and shortage rates are unavailable | Recorded hours only | Capture capacity and interval-level demand/assignment |
| DQ-07 | Resource definitions | Under Maintenance room rows contain two Usage Hours | Meaning is ambiguous | Flagged for clarification | Approve Availability and Usage Hours definitions |
| DQ-08 | Coverage | Short and highly regular samples | Trends and baselines are unsupported | Sample-only captions | Collect a representative approved period |
| DQ-09 | Resource relationship | No appointment, patient, department, location, or slot key | Resources cannot be linked to outcomes | No cross-file resource join | Add approved department/location/interval keys |

## Appendix E - Source register

| Source ID | File                           |
| --------- | ------------------------------ |
| SRC-01    | Capstone_Project_M01L01_BRD.md |
| SRC-02    | Capstone_Project_M01L02_RTM.md |
| SRC-03    | appointment_data.csv           |
| SRC-04    | feedback_data.csv              |
| SRC-05    | resource_data.csv              |
