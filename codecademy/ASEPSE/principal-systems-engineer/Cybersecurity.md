# Systems Engineering Culture: Cybersecurity

Systems engineering develops systems that deliver defined capabilities. Cybersecurity protects those capabilities throughout design, development, deployment, operation, and retirement. Its central objectives are confidentiality, integrity, and availability: information remains accessible to authorised parties, protected against unauthorised changes, and available when required.

Security depends on interactions between technology, people, and processes. Its scope includes hardware, facilities, software, data, intellectual property, and organisational reputation. Internal risks include mistakes, configuration errors, and malicious insiders. External threats include malware, phishing, and espionage. Systems thinking examines these risks across components and organisational boundaries, including suppliers and partners.

A security-conscious culture connects engineering, operations, legal, compliance, and risk teams. Clear responsibilities, staff training, and effective communication support prevention and incident response. Security controls aim both to prevent losses and to limit the severity and duration of incidents that occur.

Physical safeguards protect facilities and equipment against theft, damage, and unauthorised access. Contracts and secure communications help manage exchanges with suppliers and partners. Information protection also supports confidence in organisational services and preserves commercially sensitive knowledge.

## Safety and hardware assurance

Safety engineering reduces the likelihood and consequences of harmful events. Security and safety overlap when a compromised system can disrupt operations or endanger people. Risk assessments consider both probability and severity, helping organisations direct resources towards consequential hazards.

A systematic safety process documents requirements, identifies hazards, selects controls, and tests their effectiveness. Stakeholders assess and accept residual risks after treatment. Monitoring incidents and safety indicators supports adjustments as conditions change.

Structured safety frameworks provide common concepts for describing hazards, failure consequences, and probability. Documenting assumptions and decisions helps stakeholders understand why particular controls were selected and what evidence supports their effectiveness.

Hardware assurance provides evidence that components satisfy functional, security, and reliability requirements. It addresses design flaws, manufacturing defects, supply-chain compromise, and tampering. Assessment covers individual components, integrated subsystems, and the complete system, including software dependencies.

Assurance begins with specifications and design, continues through manufacture and integration, and extends to maintenance and disposal. Testing and verification establish confidence in intended operation. Changes to software, configuration, or operating conditions can require renewed assessment because hardware security depends partly on these interactions.

Manufacturing assurance includes fabrication, packaging, and testing. Integration checks examine interoperability and interfaces, where individually sound components may interact in unexpected ways. Assurance also examines whether hardware could be accessed, modified, or used without authorisation.

## Threat modelling and risk management

Threat modelling identifies potential attacks and weaknesses before they become embedded in a design. System diagrams represent components, assets, data flows, and trust boundaries, where assumptions about access or control change. Attacker profiles describe motivations, capabilities, and possible methods. A threat catalogue records findings and their potential consequences.

Teams define the scope, examine attack scenarios, select controls, and evaluate their effectiveness. Checklists support consistent analysis, while qualitative and quantitative assessments consider likelihood, impact, and attacker capabilities. Traceability connects identified threats to requirements, controls, and tests, helping reveal gaps in protection.

Risk management maintains this analysis throughout a project:

1. Planning establishes objectives, methods, resources, and responsibilities.
2. Identification examines requirements, processes, and products for risks affecting delivery or operation.
3. Analysis evaluates likelihood and consequences to establish priorities.
4. Handling determines whether risks will be reduced, transferred, or accepted.
5. Monitoring tracks changes and checks whether responses remain effective.

A risk management plan defines terminology, assessment methods, records, escalation thresholds, and decision criteria. It also connects risk decisions to procurement, contracts, and other project processes. Risk records identify causes, potential consequences, relevant experience, and responsible personnel. Regular review keeps these records useful as systems and circumstances change.

Historical experience can reveal recurring causes and effective responses. Risk categories help organise related findings, while clear descriptions distinguish the cause of a risk from its possible consequences. Assigned responsibilities establish who will coordinate treatment and monitor its results.

## Secure coding

Secure coding reduces vulnerabilities introduced during implementation. Guidance from the Open Worldwide Application Security Project, or OWASP, covers complementary protections:

- Input validation checks incoming data against requirements. Output encoding prepares data for its destination context, reducing risks such as cross-site scripting.
- Authentication verifies identity. Multifactor authentication reduces reliance on a single credential, while protected session tokens, secure cookies, and session expiry reduce session-related attacks.
- Authorisation controls permitted actions. Role-based permissions and least privilege restrict access to what a person or process requires.
- Encryption protects stored and transmitted information. Secure communications, tokenisation, and data masking further reduce exposure of sensitive data.
- Secure configuration, patching, and removal of unnecessary services reduce weaknesses. Database and file permissions restrict access, while integrity monitoring helps detect unauthorised changes.
- Safe memory management reduces errors such as buffer overflows. Memory-safe languages, suitable libraries, and code reviews address related risks.

Error handling and security logs support detection and investigation. Coding standards, training, and regular reviews help developers apply these practices consistently throughout the software development life cycle.

Database safeguards combine authentication, encryption, access restrictions, and activity auditing. File handling requires validation and permissions appropriate to user roles. Memory allocation, release, and sanitisation also influence security, with poor management contributing to buffer overflows or memory leaks.

## Testing, verification, and validation

Security testing begins with identifying valuable assets and assessing threats. It then examines weaknesses, evaluates controls, and informs remediation. Testing covers confidentiality, integrity, availability, authentication, authorisation, and non-repudiation, which concerns evidence supporting accountability for actions.

Verification and validation answer related questions:

| Activity | Purpose | Evidence |
| --- | --- | --- |
| Verification | Establish whether software conforms to specified requirements | Reviews, analysis, and tests against specifications |
| Validation | Establish whether software fulfils its intended purpose and stakeholders' needs | Evaluation of behaviour, performance, and use |

Static techniques examine code or documentation without executing software. They include formal inspections, collaborative walkthroughs, reviews, and individual desk checks. Dynamic techniques examine running software. Unit tests focus on individual components, while integration tests examine their interactions. Black box testing evaluates visible behaviour. White box testing uses knowledge of internal logic and execution paths.

Penetration testing simulates attacks to examine vulnerabilities and controls. Vulnerability scanning, configuration checks, and application testing identify other weaknesses. Security audits examine policies, procedures, and evidence of compliance.

Web application assessments examine issues such as SQL injection, cross-site scripting, and unsafe server settings. Broader security assessments connect technical findings to organisational strengths and weaknesses, helping teams allocate resources according to potential consequences.

Early testing allows corrections during development. Automation improves repeatability and coverage, while external interfaces, application programming interfaces, and third-party dependencies require explicit assessment. Findings need prioritised remediation and follow-up checks. Inadequate requirements can leave controls missing, so assurance examines both specifications and implementation.

## Standards and compliance

Compliance engineering connects system requirements to applicable laws, standards, contracts, and customer expectations. Documented decisions and evidence help demonstrate how obligations are addressed. Different instruments serve different purposes:

| Reference | Principal focus |
| --- | --- |
| US National Institute of Standards and Technology (NIST), Special Publication 800-160 | Systems security engineering across the life cycle |
| ISO/IEC 27001 | Requirements for an information security management system |
| General Data Protection Regulation | Personal data protection and privacy in the European Union |
| Health Insurance Portability and Accountability Act | Protected health information in the United States |
| Payment Card Industry Data Security Standard | Protection of payment card data |

NIST guidance treats security as a property of the complete system, shaped by interactions between its components. ISO/IEC 27001 connects risk assessment, treatment, monitoring, and continuing improvement within an information security management system.

Security documentation establishes a shared basis for decisions and review. Requirements guide architecture and control selection, while testing records support evaluation of the resulting safeguards. Monitoring then provides evidence for maintaining or revising those arrangements.

Technical safeguards and operational preparation support resilience. Access controls, encryption, intrusion detection, and network segmentation reduce exposure. Redundancy, failover, and recovery planning help maintain or restore services after disruption.

## DevSecOps and secure delivery

DevSecOps brings development, security, and operations together throughout requirements analysis, design, implementation, testing, and deployment. Shared responsibility helps teams identify weaknesses early and maintain protection during operation. Its effectiveness depends on skills, communication, change management, and clear processes as well as technology.

Requirements analysis identifies user needs, business goals, and constraints. Planning allocates resources and establishes delivery expectations. Architecture defines components and interfaces. Security specialists contribute throughout these activities, while operations teams bring knowledge of deployment conditions and ongoing service requirements.

Continuous integration and continuous delivery, or CI/CD, automate repeatable stages of building, testing, and preparing software for release. Security checks within these workflows provide rapid feedback through code analysis, vulnerability scanning, and other assessments. Threat modelling, training, and compliance management connect automated checks to broader engineering decisions.

Delivery pipelines also require protection. They may hold sensitive source code, credentials, and extensive permissions. Weak access controls, exposed secrets, insecure configuration, and compromised dependencies can enable unauthorised changes or the distribution of malicious software.

Pipeline safeguards protect repositories, build servers, communications, and produced software packages. Authentication and appropriately restricted permissions limit access. Reviews and automated tests examine code, while dependency analysis identifies risks in third-party components. Runtime monitoring extends protection into deployed environments.

Secure delivery therefore involves checking software and protecting the systems that produce it. Continuing assessment remains necessary as code, dependencies, and operating conditions change.

## Cloud security

Cloud security combines policies, configuration practices, technical controls, and monitoring. Providers and customers share responsibility, with the boundary varying between infrastructure, platform, and software services. Providers protect the infrastructure and services they operate. Customers retain responsibilities for their data, identities, and relevant settings and applications.

Limited visibility, complex permissions, misconfiguration, and changing workloads create challenges. Central management can improve consistency, while continuous monitoring helps controls keep pace with changes. Audit records support investigation and compliance assessment.

Workload growth and movement can alter exposure and access needs. Security administration therefore requires coordination between configuration, identity management, and monitoring, with controls adjusted as services and their dependencies change.

Identity and access management coordinates accounts and permissions. Data loss prevention monitors or restricts sensitive information transfers. Public key infrastructure supports authentication and encrypted communications. Security information and event management systems collect and analyse event records to support detection and response.

These controls need coordinated operation. Encryption protects information, access restrictions govern its use, and monitoring helps reveal misuse. Automation can reduce administrative effort and support timely adjustments across changing cloud environments.

## Virtualisation security

Virtualisation allows multiple virtual machines to share physical infrastructure. Each depends on its guest operating system, the host, and the hypervisor that manages virtual workloads. Weaknesses at any level can expose information or disrupt services.

Risks include malware, unauthorised access, denial of service, and escape from a virtual machine into its host. Snapshots preserve a machine's saved state and may contain sensitive information or configurations. Competition for shared resources can also affect performance and availability.

Segmentation separates workloads and traffic to contain incidents. Microsegmentation provides finer control over communication, reducing opportunities for attackers to move between systems. Isolation, virtual firewalls, encryption, and access controls provide complementary safeguards.

Controls must remain effective when workloads move between local infrastructure and cloud services. Consolidation can reduce costs and simplify administration, but shared infrastructure introduces dependencies requiring continuing assessment of hosts, snapshots, and resource allocation.

## Changing threats and defensive approaches

Remote work increases reliance on secure access, protected endpoints, and communications. Mobile devices face malware, insecure applications, theft, and loss. Internet-connected devices and vehicles extend exposure into systems whose compromise can affect physical safety. Cloud and supply-chain dependencies create further paths for attack.

Ransomware can deny access to critical services and information. Prevention, incident response, and backups support resilience. Social engineering exploits human judgement, making staff awareness and effective reporting channels valuable alongside technical controls. Nation-state activity can involve espionage, sabotage, and disinformation.

Artificial intelligence and automation can assist anomaly detection, analysis, and response while also changing the threat environment. Zero trust approaches emphasise least privilege and continuing evaluation of access. More capable quantum computing creates concerns for some cryptographic protections and motivates quantum-resistant approaches.

Privacy management connects information protection, consent practices, and design decisions. Changing threats and obligations require organisations to reassess controls, develop staff skills, and maintain clear responsibility for security decisions.

## Incidents and continuing improvement

A construction company suffered unauthorised banking transfers after an employee responded to a phishing email. Malware captured credentials, enabling transfers despite additional challenge questions for higher-value transactions. The absence of a comprehensive cybersecurity plan complicated the response. Forensic investigation, closure of the compromised account, and recovery efforts addressed the aftermath, but only part of the stolen funds was recovered.

In a healthcare incident, an executive's unencrypted laptop was stolen from a locked car, placing medical records at risk. The organisation disabled remote access, monitored network activity, notified authorities, and reviewed its policies. The incident generated regulatory, legal, and notification costs and prompted stronger device and information safeguards.

These failures connected staff practices, technical weaknesses, and response preparation. Training, access controls, encryption, and incident plans address different parts of such risks.

Investigation and recovery also reveal weaknesses that routine operation may conceal. Reviewing policies after an incident helps organisations connect immediate corrective action to longer-term improvements in information handling and accountability.

Assessment tools can help organise improvements. In a March 2024 Microsoft Azure assessment, Identity Secure Score recorded full credit for multifactor authentication and an outstanding recommendation concerning application consent. Recommendations included their effect on the score, user impact, and implementation effort. Decisions could record risk acceptance or treatment through a third party.

Assessment results can change after configuration updates and may take time to refresh. Score history helps track changes, while recommended actions require consideration of operational effects. Decisions about acceptance or third-party treatment need clear ownership so that unresolved risks remain visible and can be reassessed when circumstances or supporting controls change.

Scores support prioritisation within the controls and scope assessed. Requirements, testing, operational evidence, and accountable risk decisions provide the broader basis for continuing assurance.
