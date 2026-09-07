# Generative AI in Business Analysis

> [!NOTE]
> Explains how business analysts can use generative AI to accelerate requirements, process modelling, data analysis and stakeholder communication while maintaining human oversight, traceability, privacy and accountable governance.

Generative artificial intelligence can help business analysts organise information, draft artefacts, explore alternatives and tailor communications. It does not establish facts, approve requirements or replace stakeholder judgement. Analysts remain accountable for the accuracy, relevance, security and lawful use of every output.

## Capabilities and limits

Generative AI produces responses from patterns in data and the context supplied in a prompt. It can accelerate early analysis, but it can also invent facts or sources, omit important conditions, reproduce bias and present uncertain content with unwarranted confidence.

Suitable uses include:

- Summarising approved source material
- Extracting candidate requirements from documents and notes
- Converting information into a defined template
- Identifying possible ambiguity, duplication and inconsistency
- Generating questions, scenarios and options for investigation
- Drafting process descriptions and stakeholder communications

Generative AI should not make accountable decisions, assign final priorities, approve requirements or provide unverified legal, regulatory, financial, safety or technical conclusions.

## Governance before use

The organisation should approve the tool, use case and information handling arrangements before an analyst enters project content. Publicly available tools may retain, process or expose information in ways that conflict with privacy, confidentiality, security, intellectual property or records obligations.

The analyst should confirm these controls before use:

| Control | Required decision |
| --- | --- |
| Purpose | Defines the business outcome and why generative AI is appropriate |
| Accountability | Names the person responsible for the use case and its outputs |
| Information | Identifies permitted data and excludes prohibited personal, sensitive, confidential or classified content |
| Tool approval | Confirms security, privacy, contractual, retention and access arrangements |
| Human oversight | Assigns reviewers with the authority and expertise to accept, change or reject outputs |
| Validation | Defines the evidence, tests and quality thresholds for acceptance |
| Transparency | Records when disclosure of AI assistance is required |
| Monitoring | Tracks errors, incidents, performance changes and emerging risks |

Australian organisations that handle personal information must assess their obligations under the Privacy Act 1988 and the Australian Privacy Principles. Government agencies must also apply the policies and controls that govern their jurisdiction. Analysts should seek specialist advice when legal or regulatory interpretation affects the use case.

## Requirements elicitation and documentation

### 1. Prepare the analysis

The analyst defines the objective, stakeholders, scope, terminology, decision rights and acceptance standards before using generative AI. The analyst also separates authoritative sources from commentary, assumptions and unresolved questions.

Common pressures in requirements work include:

- Incomplete or inconsistent information
- Conflicting stakeholder perspectives
- Limited time for exploration
- Large volumes of documents and notes
- Unclear terminology and decision authority

Generative AI can help organise these inputs, but it cannot determine which stakeholder is correct or which requirement creates the greatest value.

### 2. Extract candidate requirements

The analyst can ask an approved tool to extract explicit statements from policies, specifications, meeting notes and other authorised sources. Each extracted item should include a source location that a reviewer can inspect.

Inferred requirements require different treatment. The analyst labels them as hypotheses, records the reasoning and validates them with an authorised stakeholder. A model-generated quotation, page reference or source link does not count as evidence until a reviewer checks it against the original source.

A suitable extraction request specifies:

- A unique identifier
- Requirement type
- Concise requirement wording
- Exact source location
- Assumptions and dependencies
- Missing information
- Clarifying questions

### 3. Transform approved information

Generative AI can convert authorised notes into consistent draft artefacts, including:

- User stories with acceptance criteria
- Use cases with main, alternative and exception flows
- Functional and quality requirements
- Business rules and decision tables
- Data definitions and interface questions
- Stakeholder-specific summaries

Transformation can improve consistency, but it can also change meaning. The analyst compares the draft with the source, restores qualifications and confirms that acceptance criteria remain observable and testable.

### 4. Compare and classify requirements

The analyst can use generative AI to propose:

- Contradictions between documents or teams
- Duplicate or overlapping requirements
- Missing decisions and exception paths
- Inconsistent terminology
- Potential dependencies and integration points
- Candidate functional and quality classifications

The analyst checks every proposed conflict against the source and resolves genuine differences with stakeholders. The accountable team assigns priorities. A model may organise information for MoSCoW or another method, but it should not decide which requirements are Must Have, Should Have, Could Have or Won't Have.

### 5. Build traceability

Generative AI can suggest relationships between objectives, stakeholder needs, requirements, designs, delivery items, tests and outcomes. The analyst confirms those relationships in the organisation's controlled repository.

Reliable traceability includes:

- Stable identifiers
- Verifiable source locations
- Approved relationship types
- Version and status information
- Named owners
- Recorded decisions and changes

Similarity between two statements does not prove a traceability relationship. The analyst confirms the business or technical link before recording it.

## Prompt design

### Context and constraints

A useful prompt identifies the business objective, authorised sources, intended audience, scope, terminology, constraints and required output. It also instructs the model to distinguish source content from inference and to identify missing information.

### Structured output

The analyst specifies the artefact, fields, level of detail and conventions. A structured request can require a table with identifiers, wording, source locations, assumptions and questions.

### Incremental analysis

The analyst develops complex outputs in controlled passes:

1. The model extracts or drafts the core items.
2. The model identifies decisions, rules and exceptions.
3. The model proposes inputs, outputs, interfaces and dependencies.
4. The model checks for ambiguity, inconsistency and duplication.
5. The analyst verifies the result against sources and stakeholder decisions.
6. The analyst applies the glossary and documentation standard.

### Prompt examples

```text
Using only the authorised source below, extract candidate requirements into the specified table. Quote the source location for each item. Label every inference as a hypothesis. List missing information and clarifying questions. Do not invent facts or sources.
```

```text
Compare the two authorised requirement sets. Identify possible contradictions, overlaps, dependencies and terminology differences. For each finding, cite both source locations and explain why stakeholder review is needed.
```

```text
Transform the approved requirement into a user story and acceptance criteria. Preserve every condition and qualification. List any detail that cannot be represented without clarification.
```

Prompt quality can improve usefulness, but it cannot guarantee factual accuracy or safe output.

## Human review and quality control

The analyst separates verification from validation. Verification checks whether an artefact meets quality standards. Validation checks whether it represents the stakeholder need and supports the intended outcome.

### Verification checks

- Clarity: each requirement supports one reasonable interpretation
- Scope: each requirement has defined boundaries
- Testability: acceptance can be demonstrated through observable evidence
- Consistency: terms and rules align across the requirement set
- Completeness: necessary conditions, outcomes and exceptions are present
- Feasibility: relevant constraints and dependencies have been assessed
- Traceability: sources and relationships are verifiable

### Validation checks

- The requirement reflects an authorised stakeholder need
- The proposed outcome supports the business objective
- Stakeholders understand the effects and trade-offs
- The acceptance approach demonstrates the intended value
- The accountable stakeholder approves the result through the required governance process

The analyst records the model, tool or service used when organisational policy requires it. The record may also include the date, prompt version, source set, reviewer, material corrections and approval outcome. Sensitive prompts and outputs require the same access controls as the underlying information.

## Process modelling

### Draft a model from a narrative

Generative AI can identify candidate actors, activities, events, decisions, inputs, outputs, systems and exceptions from a process narrative. The analyst should request a structured process description before asking a modelling tool to render a diagram.

The analyst verifies:

- The start and end events
- The sequence and ownership of activities
- Every decision condition and outcome
- Exception, escalation and rework paths
- Data and system interactions
- Timing, volume and performance constraints

Process participants then walk through realistic scenarios and correct the draft.

### Select the notation for the purpose

| Representation | Suitable use |
| --- | --- |
| Business Process Model and Notation | Standardised process, collaboration and choreography models for business and technical readers |
| Flowchart | Simple sequences and decisions for broad audiences |
| Swimlanes | Responsibility across roles or systems within a process representation |
| Unified Modeling Language activity diagram | Behaviour and control flow in system-oriented analysis |

Swimlanes are an organising feature, not a separate process notation. The analyst applies the chosen notation consistently and checks the diagram against its governing standard or organisational convention.

### Analyse process improvements

Generative AI can propose options such as:

- Removing an approval where risk controls permit it
- Combining duplicate reviews
- Running independent activities in parallel
- Automating stable, rules-based decisions
- Automating routine data transfer with validation controls
- Adding status information to reduce avoidable enquiries

The analyst treats each option as a hypothesis. Evidence from process data, observation and stakeholders should confirm the cause of the problem before the organisation changes the process.

An option assessment can compare:

| Criterion | Evidence |
| --- | --- |
| Customer or user outcome | Satisfaction, effort, access or service quality |
| Performance | Cycle time, waiting time, throughput or error rate |
| Cost and capacity | Implementation cost, operating cost and resource demand |
| Risk and control | Safety, privacy, security, compliance and control effectiveness |
| Feasibility | Skills, technology, dependencies and organisational readiness |

The analyst establishes a baseline and defines measures before implementation. A pilot can test high-risk assumptions and reveal unintended effects.

## Data analysis and visualisation

Generative AI can suggest segments, anomalies, relationships and possible explanations. These suggestions guide investigation. They do not establish causation or confirm that a calculation is correct.

The analyst should:

- Use approved data and tools
- Confirm field definitions, units, filters and missing-value rules
- Reproduce calculations in a controlled analysis tool
- Review generated formulas, code and queries before execution
- Test outputs against known cases and independent calculations
- Distinguish observations from hypotheses
- Protect personal, confidential and sensitive information
- Record transformations and assumptions

For visualisation, the analyst selects a chart according to the relationship, audience and decision. The analyst checks labels, units, scales, colour contrast and accessibility. A polished chart does not correct unreliable data or weak analysis.

### Integration with spreadsheets and business intelligence tools

A controlled workflow divides responsibilities clearly:

| Stage | Responsibility |
| --- | --- |
| Context | The analyst defines objectives, rules, data limits and quality criteria |
| Preparation | Approved tools support cleaning suggestions, classification and draft calculations |
| Analysis | The analyst verifies formulas, queries, calculations and statistical assumptions |
| Interpretation | The analyst explains results in the business context and identifies uncertainty |
| Publication | The accountable owner approves the decision artefact and access settings |

The analyst should not upload a workbook or dataset to an unapproved service. An organisation should also assess whether prompts, uploaded files and generated outputs enter model training, logs or external retention systems.

## Stakeholder communication

Stakeholder communications should preserve consistent facts while adapting detail, terminology, format and requested action to each audience.

### Audience and purpose

| Audience | Primary need | Typical content |
| --- | --- | --- |
| Executive sponsor | Decision, value and exposure | Recommendation, impact, options, risk and deadline |
| Technical team | Buildable detail | Scope, interfaces, constraints, dependencies and test effects |
| End users | Practical preparation | Change, timing, workflow effects, training and support |
| Cross-functional group | Alignment | Decisions, responsibilities, dependencies and actions |

The analyst establishes a shared brief before drafting audience versions. The brief records the context, objective, approved facts, decision, owner, deadline, risks and dependencies.

### Executive communication

An executive decision request contains:

- Subject: [initiative] - decision required by [date]
- Recommendation and decision required
- Quantified impact where reliable evidence exists
- Material risks, trade-offs and dependencies
- Options considered
- Owner, deadline and success measures

A status update uses agreed Green, Amber and Red thresholds rather than unexplained colour labels. It identifies progress, forecast milestones, variance, issues that require sponsor action and the recommended response.

### Technical communication

A requirements change notice contains:

- Change summary and source
- Approval status and decision record
- Requirements added, changed or removed
- Effects on scope, architecture, interfaces, security, testing, schedule and resources
- Updated dependencies and milestones

An integration note contains:

- Systems and business purpose
- Data direction, ownership and classification
- Interface, authentication and security controls
- Mapping and validation rules
- Error handling, recovery and monitoring
- Performance targets and test scenarios

### End-user communication

A system change notice contains:

- The change and effective date
- The reason and expected benefit
- Effects on tasks, access and support
- Required preparation, training and job aids
- Feedback and escalation channels

A training announcement contains the audience, learning outcomes, format, dates, registration method, prerequisites, accessibility arrangements and follow-up support.

### Cross-functional communication

A requirements review agenda contains the purpose, items for review, decision authority, approval criteria, preparatory material and questions. The meeting record captures decisions, actions, owners and dates.

An escalation note contains the issue, evidence, impact, options, trade-offs, recommendation, required approval and decision deadline.

### Communication prompt patterns

```text
Analyse the communication needs of [role] for [topic]. Recommend a format, level of detail, decision request and key messages. Use only the approved facts in the shared brief.
```

```text
Adapt the approved [content type] for [audience]. Preserve facts, dates, owners, risks and commitments. Adjust terminology and detail for the audience. List any missing information instead of filling gaps.
```

```text
Create executive, technical and end-user drafts from the shared brief. Keep the core facts and decisions consistent. Tailor the action, detail and terminology to each audience.
```

The analyst verifies names, dates, owners, figures, commitments and actions before distribution. The analyst also checks that the communication discloses AI assistance when policy, contract, risk or stakeholder expectations require disclosure.

## Operating checklist

- The organisation has approved the tool and use case
- The analyst has removed prohibited information
- The prompt defines the objective, sources, constraints and output
- The output separates evidence, inference and uncertainty
- A qualified reviewer has checked the content against authoritative sources
- Stakeholders have validated needs, priorities and decisions
- The controlled repository contains approved requirements and traceability
- The analyst has tested formulas, code, diagrams and claims
- The communication suits its audience and preserves approved facts
- The organisation records and monitors the use case according to policy
