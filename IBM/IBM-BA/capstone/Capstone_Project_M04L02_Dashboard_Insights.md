# Dashboard Design and Insights

| Document field  | Details                                                                     |
| --------------- | --------------------------------------------------------------------------- |
| File name       | `Capstone_Project_M04L02_Dashboard_Insights.md`                             |
| Project         | HealthFirst Care - Patient Experience and Operational Efficiency Initiative |
| Version         | 1.0                                                                         |
| Document status | Draft for stakeholder review                                                |
|                 |                                                                             |

## Executive summary

A single-file interactive dashboard was created using the cleaned data from Capstone_Project_M04L01_Data_Analysis.xlsx. The default view reconciles to 20 appointment records, 15 feedback responses, and 10 resource records.

The dashboard is designed as a reporting prototype and data-readiness assessment. It displays supported descriptive measures and makes unsupported measures visible rather than filling missing values with assumptions. Average patient wait time cannot be calculated because every Wait Time value is N/A and the source does not contain physical check-in or consultation-start timestamps. Resource-utilization percentages by department cannot be calculated because the resource source has no Department field or capacity-hours denominator.

The supported findings are:

- 8 of 20 appointments are Completed, producing a sample completion rate of 40.0%;
- the average feedback score is 7.00, although the survey scale and target are not supplied;
- all 15 feedback records are High under the lab rule of score 4 or above;
- the 10 resource records contain 52 recorded Usage Hours; and
- average recorded hours by resource type range from 0 for Nurse to 10 for Technician, but these values are not utilization rates.

## 1. Purpose and intended audience

The dashboard supports a quick operational review by:

- hospital leadership;
- administrative and scheduling staff;
- clinical operations representatives; and
- IT and data teams.

It helps users review filtered appointment volumes, completion rate, feedback results, resource records, recorded hours, and data-quality gaps. It does not provide an approved hospital performance baseline.

## 2. Source datasets and variables

The lab instructions use plural logical names. The actual workbook sheets created in the previous lab use singular names. The dashboard uses the actual sheets shown below.

| Lab dataset name | Actual workbook sheet | Rows | Date coverage | Variables used |
| --- | --- | ---: | --- | --- |
| Cleaned_Appointments | Cleaned_Appointment | 20 | 01/01/2024-01/20/2024 | Appointment Date, Department, Status |
| Cleaned_Feedback | Cleaned_Feedback | 15 | 01/01/2024-01/15/2024 | Appointment Date, Feedback Department, Feedback Score, Wait Time, Satisfaction Level |
| Cleaned_Resources | Cleaned_Resource | 10 | 01/01/2024-01/10/2024 | Resource ID, Resource Type, Date, Availability, Usage Hours |

Only fields needed for the dashboard calculations are embedded in the HTML. Patient ID, Doctor ID, and free-text comments are excluded from the dashboard file because the visualizations use aggregated results.

### 2.1 Data-readiness assessment

| Requested measure or filter | Data readiness | Dashboard treatment |
| --- | --- | --- |
| Average wait time by appointment date | Not ready | Empty-state line-chart panel; no zero-minute values are plotted |
| Departmental resource utilization percentage | Not ready | Replaced with average recorded hours by resource type, clearly marked as not utilization |
| Resource-performance heatmap by department | Not ready | Replaced with resource record counts by Resource Type and Availability |
| Satisfaction High versus Low | Available under lab rule | Pie/donut chart showing High and Low counts and percentages |
| Department filter | Available for appointments and feedback | Updates appointment, feedback, wait-data coverage, and satisfaction panels |
| Date filter | Available | Applied independently to all three datasets |
| Resource Name filter | Not available | Resource ID and Resource Type are used because no Resource Name field exists |

The feedback-to-appointment relationship remains provisional because the original feedback source has no Appointment ID or approved encounter key. The dashboard does not use the provisional relationship to make causal claims.

## 3. Dashboard design process

### 3.1 Layout

The dashboard is arranged in the sequence requested by the lab:

1. **Top - KPI overview:** appointment count, completion rate, average feedback score, and resource-record count.
2. **Top trend panel - Wait time:** an average-wait-time line-chart area that displays an evidence-based empty state.
3. **Middle - Resource analysis:** an average recorded-hours bar chart and a resource status-count heatmap.
4. **Bottom - Satisfaction:** a High-versus-Low donut chart.
5. **Final decision note:** required data improvements before the dashboard is used for performance monitoring.

The design uses responsive grids, readable labels, visible chart values, accessible summaries, and non-color labels. The HTML contains its data, style, and calculation logic and makes no external network calls.

### 3.2 Filters and interaction rules

| Filter | Values | Applies to | Does not apply to |
| --- | --- | --- | --- |
| Department | All, Cardiology, General, Neurology, Orthopedics, Pediatrics | Appointment KPIs, feedback KPI, wait-time availability, satisfaction | Resource panels |
| From and To dates | 01/01/2024-01/20/2024 | All datasets, using each dataset's available dates | - |
| Resource ID / Type | All, five resource types, R1-R10 | Resource KPI, recorded-hours bar, status-count heatmap | Appointment and feedback panels |

The active scope is displayed above the dashboard. A visible note explains that Department cannot filter the resource panels because Cleaned_Resource has no Department field. If the From date is later than the To date, the dashboard displays an inline error and replaces the current values with a clear invalid-state message.

### 3.3 KPI definitions

| KPI | Calculation | Default result | Limitation |
| --- | --- | ---: | --- |
| Appointment count | Count of filtered appointment rows | 20 | Supplied sample only |
| Completion rate | Completed appointments divided by filtered appointments | 40.0% | Outcome reasons are unavailable |
| Average feedback score | Mean of filtered Feedback Score | 7.00 | Survey scale and target are unknown |
| Average wait time | Consultation start minus approved check-in point | N/A | Required timestamps are missing |
| Resource records | Count of filtered resource rows | 10 | Not a full resource inventory |
| Recorded resource hours | Sum of filtered Usage Hours | 52.0 | Meaning and measurement interval require confirmation |
| Resource utilization rate | Used capacity divided by available capacity | N/A | Capacity denominator is missing |
| Satisfaction level | Score 4 or above = High; score below 4 = Low | High 15; Low 0 | Threshold does not differentiate the observed scores |

## 4. Visualization decisions

### 4.1 Wait-time line chart

The requested x-axis is Appointment Date and the requested y-axis is Average Patient Wait Time. No line is plotted in the HTML because 0 of 15 feedback rows contains a numeric wait time. Plotting a line at zero would incorrectly imply zero-minute waits.

The panel retains the requested axes and displays:

> No calculable wait-time values - check-in and consultation-start timestamps are missing.

The renderer is prepared to plot a line if valid wait-time values are added in the future.

### 4.2 Resource bar chart

Departmental utilization percentages are unavailable. The dashboard therefore displays Average Recorded Hours by Resource Type:

| Resource type | Records | Average recorded hours | Total recorded hours |
| --- | ---: | ---: | ---: |
| Doctor | 2 | 8.0 | 16.0 |
| Equipment | 2 | 6.0 | 12.0 |
| Nurse | 2 | 0.0 | 0.0 |
| Room | 2 | 2.0 | 4.0 |
| Technician | 2 | 10.0 | 20.0 |

The y-axis is recorded hours, not a percentage. The title and chart summary repeat that this is not utilization.

### 4.3 Resource heatmap

The requested department heatmap cannot be created because resources have no Department. The dashboard instead counts resource records by Resource Type and Availability.

| Resource type | Available | In Use | Unavailable | Under Maintenance |
| --- | ---: | ---: | ---: | ---: |
| Doctor | 2 | 0 | 0 | 0 |
| Equipment | 0 | 2 | 0 | 0 |
| Nurse | 0 | 0 | 2 | 0 |
| Room | 0 | 0 | 0 | 2 |
| Technician | 2 | 0 | 0 | 0 |

Every cell includes its count so interpretation does not depend on color. The heatmap describes source statuses; it does not classify high demand, underutilization, or performance.

### 4.4 Satisfaction pie chart

The pie/donut chart groups filtered feedback rows by Satisfaction Level:

| Satisfaction level | Count | Percentage |
| --- | ---: | ---: |
| High | 15 | 100.0% |
| Low | 0 | 0.0% |

All observed scores are 5-9. The lab threshold of 4 therefore labels every response High and provides no separation within the supplied sample.

## 5. Key findings and business implications

### 5.1 Appointment findings

- 8 appointments are Completed and 4 each are No Show, Rescheduled, and Cancelled.
- The default completion rate is 40.0%.
- Every department has four appointment records.
- The five listed appointment times each appear four times, so there is no unique peak time.
- Each date contains only one appointment row, which is not sufficient for identifying queue pressure or simultaneous booking demand.

**Business implication:** appointment outcomes can be summarized, but reasons, status history, volume by operating hour, and actual waiting require additional fields and a representative period.

### 5.2 Feedback findings

- There are 15 feedback responses with a mean score of 7.00.
- Cardiology and Neurology have sample averages of 8.33; General has 5.33; Orthopedics has 7.00; and Pediatrics has 6.00.
- Each department has only three responses.
- All responses are High under the lab threshold.

**Business implication:** the score calculation can be demonstrated, but the survey scale, target, response denominator, sampling method, and a meaningful satisfaction threshold must be agreed before department performance is assessed.

### 5.3 Resource findings

- Four resource records are Available and two each are In Use, Unavailable, and Under Maintenance.
- Total recorded Usage Hours are 52, with an average of 5.2 per resource row.
- Resource Type, Availability, and Usage Hours follow a fixed pattern in the supplied sample.

**Business implication:** the extract can show recorded status and hours, but it cannot show department-level utilization, shortage, workload, or demand.

## 6. Testing and validation

The single-file HTML was tested by executing its embedded calculations and triggering each filter programmatically.

| Test | Expected result | Result |
| --- | --- | --- |
| Default view | 20 appointments; 40.0% completed; feedback mean 7.00; 10 resources; 52 hours | Pass |
| Cardiology filter | 4 appointments; 100.0% completed; 3 feedback rows; mean 8.33 | Pass |
| 01/01/2024-01/05/2024 | 5 appointments; 40.0% completed; mean score 7.00; 5 resources; 26 hours | Pass |
| Room resource filter | 2 resource rows; 4 recorded hours; heatmap total 2 | Pass |
| 01/16/2024-01/20/2024 | 5 appointments; no feedback; no resources; clear no-data states | Pass |
| Invalid date range | Inline error and no stale KPI/chart values | Pass |
| Department filter scope | Resource measures remain unchanged | Pass |
| Reconciliation | Bar inputs total 52 hours; heatmap totals 10 rows; pie totals 15 responses | Pass |
| JavaScript syntax and runtime | No calculation or runtime errors in tested states | Pass |
| Offline dependency check | No external scripts, stylesheets, APIs, or data requests | Pass |

## 7. Mermaid representations

The Mermaid diagrams below represent the same evidence and limitations as the HTML dashboard.

### 7.1 Bar chart - average recorded resource hours

~~~mermaid
xychart-beta
    title "Average recorded hours by resource type - not utilization"
    x-axis ["Doctor", "Equipment", "Nurse", "Room", "Technician"]
    y-axis "Average recorded hours" 0 --> 10
    bar [8, 6, 0, 2, 10]
~~~

### 7.2 Heatmap - resource record counts

~~~mermaid
flowchart TB
    subgraph D["Doctor"]
        direction LR
        DA["Available<br/>2"]:::active
        DI["In Use<br/>0"]:::zero
        DU["Unavailable<br/>0"]:::zero
        DM["Maintenance<br/>0"]:::zero
    end

    subgraph E["Equipment"]
        direction LR
        EA["Available<br/>0"]:::zero
        EI["In Use<br/>2"]:::active
        EU["Unavailable<br/>0"]:::zero
        EM["Maintenance<br/>0"]:::zero
    end

    subgraph N["Nurse"]
        direction LR
        NA["Available<br/>0"]:::zero
        NI["In Use<br/>0"]:::zero
        NU["Unavailable<br/>2"]:::active
        NM["Maintenance<br/>0"]:::zero
    end

    subgraph R["Room"]
        direction LR
        RA["Available<br/>0"]:::zero
        RI["In Use<br/>0"]:::zero
        RU["Unavailable<br/>0"]:::zero
        RM["Maintenance<br/>2"]:::active
    end

    subgraph T["Technician"]
        direction LR
        TA["Available<br/>2"]:::active
        TI["In Use<br/>0"]:::zero
        TU["Unavailable<br/>0"]:::zero
        TM["Maintenance<br/>0"]:::zero
    end

    classDef zero fill:#eef2f6,stroke:#8a98a8,color:#25313c
    classDef active fill:#2878b5,stroke:#15527f,color:#ffffff
~~~

This is a Mermaid flowchart representation of the HTML heatmap because Mermaid does not provide a native heatmap chart in the selected syntax. The highlighted cells contain two records; muted cells contain zero.

### 7.3 Bar chart - satisfaction by feedback score

~~~mermaid
xychart-beta
    title "Feedback responses by score and satisfaction level"
    x-axis ["5", "6", "7", "8", "9"]
    y-axis "Feedback responses" 0 --> 3
    bar [3, 3, 3, 3, 3]
    bar [0, 0, 0, 0, 0]
~~~

The first bar series represents High responses and the second represents Low responses. Every observed score has three High responses and zero Low responses, so the Low series has no visible height.

## 8. Recommendations

| ID | Recommendation | Priority | Proposed owner | Traceability |
| --- | --- | --- | --- | --- |
| REC-01 | Capture scheduled time, physical check-in time, and consultation-start time and approve the wait-time formula. | Must | Administrative and Clinical Operations, IT | FR-07, FR-11, AC-01 |
| REC-02 | Add resource Department, location, capacity hours, demand, availability interval, and reservation fields. | Must | Resource Owners, IT, Data Analyst | FR-08, FR-11 |
| REC-03 | Define Resource Name or confirm that Resource ID and Resource Type are sufficient for operational filtering. | Should | Resource Owners, IT | NFR-05 |
| REC-04 | Approve the feedback scale, target, population, sampling method, and meaningful satisfaction bands. | Must | Patient Experience, Hospital Leadership | FR-11, NFR-05 |
| REC-05 | Add an approved appointment/encounter key to feedback while applying privacy and access controls. | Should | Patient Experience, Records/Privacy, IT | FR-05, NFR-02 |
| REC-06 | Collect a representative baseline before using the dashboard to monitor the 20% wait-time objective or resource performance. | Must | Hospital Leadership, Data Analyst | OBJ-01, OBJ-03, AC-01 |

## 9. Assumptions, limitations, and open decisions

### Assumptions

- The cleaned workbook is the approved source for this lab.
- Dates are interpreted as local operating dates without time-zone conversion.
- The lab's High/Low satisfaction rule is implemented exactly as instructed.
- Usage Hours is retained as supplied and is not converted to a percentage.

### Limitations

- The samples are small, short, and highly patterned.
- Wait time and progress against the 20% target are unavailable.
- Resource data cannot be connected to departments, appointments, or feedback.
- Department feedback averages use only three responses each.
- The dashboard is descriptive and does not establish causes.

### Open decisions

1. What event and exclusion rules define an eligible patient wait?
2. What period and capacity measure define resource utilization?
3. Which organizational field owns each resource?
4. What satisfaction scale, target, and bands should be approved?
5. What baseline period is representative enough for operational monitoring?

## 10. Completion checklist

| Deliverable requirement | Status | Evidence |
| --- | --- | --- |
| Single self-contained HTML dashboard | Complete | Capstone_Project_M04L02_Dashboard.html |
| Cleaned datasets imported | Complete | Required aggregate fields embedded from the three cleaned workbook sheets |
| KPI overview | Complete | Appointment, completion, feedback, and resource KPIs |
| Wait-time trend area | Complete with data limitation | Required axes and explicit empty state; no fabricated line |
| Resource bar chart | Complete with documented substitute | Average recorded hours by Resource Type |
| Resource heatmap | Complete with documented substitute | Resource Type by Availability count matrix |
| Satisfaction pie chart | Complete | High and Low counts and percentages |
| Department filter | Complete | Applies to appointment and feedback panels |
| Date filters | Complete | Inclusive From and To dates |
| Resource filter | Complete with source-field substitute | Resource ID and Resource Type used because Resource Name is absent |
| Dynamic updates | Complete | Tested across department, date, and resource scenarios |
| Data reconciliation | Complete | Dashboard totals match the cleaned workbook |
| Mermaid representations | Complete | Line, bar, heatmap proxy, and pie included in Section 7 |
| Data-quality implications documented | Complete | Sections 2, 4, 5, 8, and 9 |

## Source register

| Source ID | File                                       |
| --------- | ------------------------------------------ |
| SRC-01    | Capstone_Project_M04L01_Data_Analysis.xlsx |
| SRC-02    | Capstone_Project_M04L01_Data_Analysis.md   |
| SRC-03    | appointment_data.csv                       |
| SRC-04    | feedback_data.csv                          |
| SRC-05    | resource_data.csv                          |
