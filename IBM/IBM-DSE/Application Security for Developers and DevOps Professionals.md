# Application Security for Developers and DevOps Professionals

## Introduction to Security for Application Development

Software security protects applications, information, and supporting infrastructure throughout their lifecycle. Its central goals are confidentiality, integrity, and availability: restricting disclosure, preventing unauthorised changes, and maintaining access to services. Effective protection combines secure design, controlled access, cryptography, testing, and operational monitoring. Development, security, and operations teams share responsibility for these controls.

### Identity, access, and data protection

Authentication verifies a user's identity. Authorisation determines which resources and actions that user may access. An authenticated user therefore still needs appropriate permissions. Role-based access control assigns permissions according to responsibilities, while two-factor authentication adds another identity check.

Encryption converts readable information into a protected form. Symmetric encryption uses the same key for encryption and decryption. Asymmetric cryptography uses a related public and private key pair. Protecting secret keys is essential to maintaining confidentiality.

Integrity concerns whether information has changed without authorisation. Cryptographic hashes produce digests that can be compared with trusted expected values. A changed digest indicates changed data. Digital signatures support checks of integrity and origin. Encryption, hashing, and signing perform different functions and need suitable implementation and key management.

### Security by design and DevSecOps

Security by design incorporates protection into initial requirements and architecture. Early collaboration helps teams address weaknesses before dependencies and deployment decisions make changes more difficult. Security specialists can explain common attacks and help developers create tests that expose those weaknesses.

The software development lifecycle, or SDLC, organises work into requirements, design, development, testing, and deployment. A secure SDLC embeds security activities throughout these stages.

| Stage | Security activities |
| --- | --- |
| Requirements | Teams identify sensitive information, security needs, attack scenarios, and risks. |
| Design | Teams model threats, review architecture, and plan safeguards for applications and delivery pipelines. |
| Development | Teams validate data, review code, and use static analysis to detect weaknesses. |
| Testing | Teams run vulnerability scans and security tests, investigate failures, and assess remaining risks. |
| Deployment | Teams apply secure configuration, automate deployment, support rollback, and monitor production. |

DevSecOps integrates development, security, and operations through shared practices and automation. It extends DevOps by making security an explicit responsibility across delivery and operation. Early detection can reduce rework and remediation costs, while integrating fixes into release cycles can shorten exposure to known vulnerabilities.

Continuous integration regularly builds, tests, and combines code changes. Continuous delivery keeps tested changes ready for release. Continuous deployment automates production releases. Security checks can accompany unit and functional tests, with independent checks running in parallel. Runtime monitoring continues after deployment.

Configuration management, orchestration, containers, immutable infrastructure, and serverless services can support repeatable processes and recovery. Immutable infrastructure replaces deployed components instead of changing them individually. These approaches require appropriate configuration, maintenance, and access controls.

Rollback reverses deployment changes, such as restoring a removed file or undoing a modification. Production security testing can simulate attack techniques to reveal weaknesses that earlier checks missed.

### Layers of application protection

Protection extends across four connected areas:

- Web applications require testing of browser interfaces, application programming interfaces, and back-end databases. Scanning, peer review, and functional tests cover different weaknesses.
- Cloud infrastructure requires restricted network access, suitable identity and access management, and permissions matched to operational needs. Application connections should avoid unnecessary administrator privileges.
- Communications require protected connections. Secure Shell supports remote administration and deployment, while HTTPS protects web traffic through Transport Layer Security.
- Delivery pipelines require repository permissions, account protection, and periodic access reviews. Secret storage services, such as HashiCorp Vault, hold passwords, certificates, and encryption keys.

Logs record events for investigation, including unusual login attempts and other anomalies. Access to logs should be limited to people who need it. Intrusion detection complements preventive controls through endpoint protection, network monitoring, and system-call auditing. These approaches examine activity on devices, across networks, and at operating system interfaces.

### Networks and secure communication

The Open Systems Interconnection, or OSI, model provides a seven-layer framework for understanding network communication.

| Layer | Main function |
| --- | --- |
| 1. Physical | Transmits raw bits through a communication channel. |
| 2. Data link | Organises local transmission into frames and supports error detection. |
| 3. Network | Routes packets between source and destination. |
| 4. Transport | Supports communication between endpoints, with reliability depending on the protocol. |
| 5. Session | Establishes and coordinates sessions, including synchronisation and recovery. |
| 6. Presentation | Handles data representation, translation, compression, and cryptographic transformations. |
| 7. Application | Provides network services for web communication, email, and file transfer. |

Application developers often work most directly with the upper three layers. The model helps distinguish responsibilities, while actual protection depends on the protocols and configurations involved.

Session synchronisation can allow interrupted exchanges to resume from a checkpoint. Presentation functions include serialisation and deserialisation, which convert information between transmitted and application formats.

Transport Layer Security, or TLS, succeeded Secure Sockets Layer, or SSL. References to SSL in contemporary web security often mean TLS. HTTPS uses TLS and commonly operates on port 443.

A TLS connection involves agreeing on a supported protocol version and cryptographic settings, authenticating the server through its certificate, and establishing session keys. These keys protect subsequent communication. The detailed exchange varies with the TLS version.

TLS maintenance includes renewing certificates before expiry, updating protocol support, and avoiding vulnerable cryptographic choices. Obsolete versions such as TLS 1.0 and TLS 1.1 should be excluded. Automated renewal can integrate certificate maintenance into delivery processes.

### Cryptography with OpenSSL

OpenSSL provides open-source libraries and command-line tools for encryption, hashing, digital signatures, certificates, key management, and pseudorandom number generation. Applications can incorporate its libraries or use its command-line interface. RSA is one supported public-key algorithm, with key size affecting cryptographic strength and processing requirements.

File encryption can combine AES-256-CBC with password-based key derivation function 2, or PBKDF2. PBKDF2 derives key material from a password. Its iteration count controls the computational work required for derivation and password guessing. OpenSSL's `-iter` option sets this count, including an explicit value such as `2500`. Higher counts require more derivation work than lower counts.

Decryption requires the correct password and compatible parameters. The `-d` option selects decryption, while `-in` and `-out` identify files. The `-a` option handles Base64 representation, which is encoding rather than encryption. Encryption does not protect any plaintext copies left alongside the encrypted file.

An encrypted file can be decrypted, edited, and encrypted again under a new password. The password prompt does not display entered characters. The new password must remain available for subsequent recovery.

### Reusable security patterns

Security patterns describe reusable solutions to recurring threats. Each pattern links an asset, service, or process to a threat and the controls intended to address it. Clear terminology and documentation preserve this connection and support reuse across technologies.

Catalogues organise patterns around topics such as authentication, authorisation, role-based access control, and network filtering. Diagrams and implementation examples explain how controls fit into an architecture. Separating the security problem from a particular vendor helps developers adapt solutions across applications. Patterns require review as threats and systems change.

Unified Modeling Language diagrams can represent a pattern's structure. Accessible documentation helps developers select appropriate controls, understand their restrictions, and avoid unnecessary coding.

### Threat modelling, scanning, and monitoring

Threat modelling identifies and classifies possible attacks, often using data-flow diagrams. Beginning during design helps teams address architectural weaknesses before implementation.

The Process for Attack Simulation and Threat Analysis, or PASTA, links risk analysis to business objectives and technical requirements. Visual, Agile, and Simple Threat modelling, or VAST, uses application and operational threat models within an agile approach. STRIDE organises threats into spoofing, tampering, repudiation, information disclosure, denial of service, and elevation of privilege. These approaches guide structured examination of potential failure and misuse.

Vulnerability scanning examines code, application behaviour, and supporting platforms. Common targets include SQL injection, cross-site scripting, and path traversal. Scans need to reflect actual configurations, patch levels, and dependencies. Authenticated scanning may be necessary to follow user workflows through the complete application.

Static application security testing examines code without running it. Coverity, CodeSonar, Snyk Code, and Static Reviewer are examples. Dynamic testing examines running applications. Different techniques provide complementary evidence.

Repository checks can assess pull requests, report vulnerabilities, and propose fixes. Code checkers may also flag syntax, style, and documentation issues. Cryptographic commit signatures help verify origin. A container packages application code with its libraries and other dependencies. Container scanning must cover application code, dependencies, base images, and additional layers because weaknesses can be inherited from packaged components.

Continuing these checks through development, testing, and deployment helps detect new vulnerabilities and configuration problems as software changes. Findings can include mishandled passwords, insecure protocols, and incorrect permissions. Integrating scanners into development environments brings feedback closer to coding work.

### Network discovery and assessment

Nmap, or Network Mapper, is an open-source discovery and auditing tool first released by Gordon Lyon in 1997. It identifies hosts, exposed ports, services, and possible operating systems. Administrators, security specialists, auditors, researchers, and educators use these findings for inventory, troubleshooting, and security assessment. Scanning requires permission and an appropriate scope.

Scanning methods address different network behaviours. Transmission Control Protocol, or TCP, and User Datagram Protocol, or UDP, support different forms of transport.

| Nmap capability | Purpose |
| --- | --- |
| TCP connect and SYN scans | Examine TCP ports using complete connections or connection-opening probes. |
| UDP scans | Look for UDP services. |
| ACK scans | Investigate filtering and firewall behaviour. |
| Version and operating-system detection | Gather information about services and host platforms. |
| Script scanning | Run scripts to collect additional information. |
| Host discovery and traceroute | Identify reachable hosts and examine network paths. |
| Null, FIN, and Xmas scans | Examine responses to different TCP flag combinations. |

Zenmap provides Nmap's graphical interface. Quick and Intense profiles vary scan detail, while output, port, topology, and host views organise results. Targets can be hostnames or IP addresses, including `127.0.0.1` for the local host. An open port identifies an accessible service, without by itself proving a vulnerability.

Related tools serve different purposes. ZMap and Masscan emphasise large-scale discovery, OpenVAS performs vulnerability assessment, and Wireshark analyses captured network traffic. Network findings complement application testing and operational monitoring, providing evidence for investigation and remediation.

## Security Testing and Mitigation Strategies

Security testing examines whether software meets its security requirements and identifies weaknesses that could expose applications, information, or services to attack. A tested baseline provides a reference for assessing later changes. New code can introduce vulnerabilities, while newly disclosed weaknesses can affect applications that have not changed.

Security therefore needs continuing attention throughout the software development lifecycle, or SDLC. Requirements, design, development, testing, deployment, and operation each contribute evidence about risk. Automated tools support this work, while developers and security specialists interpret findings, prioritise repairs, and verify results.

### Complementary testing methods

Different methods examine different aspects of an application.

| Method | Main focus | Typical use |
| --- | --- | --- |
| Static application security testing, or SAST | Source code or other program representations without execution | Early development checks and automated code review |
| Dynamic application security testing, or DAST | Inputs, outputs, and exposed behaviour of a running application | Assessment of deployed test environments and controlled runtime testing |
| Software composition analysis, or SCA | Components, dependencies, known vulnerabilities, and licence information | Dependency assessment throughout development and operation |

Functional security tests assess expected behaviour against explicit requirements. Unit tests examine individual classes or methods, including application programming interface contracts. Integration tests examine interactions across components and application tiers. Ad hoc tests investigate particular discoveries, while exploratory testing examines ideas and unexpected behaviour beyond a fixed sequence.

Frameworks such as BDD-Security, Mittn, and Gauntlt connect security checks with automated workflows. Behaviour-driven testing expresses expected behaviour, and continuous integration can run checks whenever code changes. No single method establishes complete coverage, so the choice of tests needs to reflect the application's functions and risks.

### Static analysis and code review

Static analysis can begin before an application is complete. Tools inspect code without running it, identify potential weaknesses, and often locate the relevant lines. Integration with development environments and delivery pipelines provides feedback while developers still have the code in mind.

Automation offers consistent checks across large codebases and can examine paths that ordinary execution tests miss. Earlier findings can reduce rework and remediation costs. Analysis depth, speed, and accuracy depend on supported languages, rules, and configuration. Thorough scans can take time, and findings still need assessment.

SonarQube separates scanning from the storage and presentation of results. A scanner examines project files and submits findings to a server, which provides the review interface. A database, such as PostgreSQL, holds analysis history. In a Docker arrangement, a shared network connects the services, while a mounted project directory makes source files available to the scanner.

Project settings identify the source location, project key, server address, and authentication token. Tokens need protection, and database persistence needs suitable storage configuration. Running the analysis locally shortens the cycle between editing code and reviewing results.

A passing overall result can coexist with a security hotspot requiring investigation. A Flask application, for example, may be flagged for missing cross-site request forgery protection. The reviewer examines the affected code, assesses the risk, applies suitable protection, and scans again. A suggested library integration still needs to fit the application's design.

Hotspot reports explain where a risk occurs, why it could be significant, and how it might be addressed. They support a review decision rather than automatically confirming that the application is exploitable.

Manual review complements automated checks by examining logic, control flow, implementation of requirements, and security-sensitive decisions. Experienced reviewers may find problems that existing rules or tests overlook. Reviewing manageable pull requests makes careful inspection easier than reviewing a large accumulated change. Shared policies help keep review expectations consistent across developers.

Automated checks can run before pull requests enter the main branch. Combining their results with reviewer comments allows developers to address findings while each change remains small and understandable.

### Dynamic analysis and web assessment

Dynamic analysis evaluates software during execution, commonly in staging or another controlled environment. It can reveal crashes, memory problems, and behaviour that source inspection alone does not establish. DAST approaches the application from the outside, using its exposed interfaces without needing access to source code.

A scanner can crawl links and forms, submit inputs, and inspect responses. This reveals how the application behaves along the paths actually reached. Intrusive testing needs suitable test data and an isolated database so that assessment does not damage live information. Runtime evidence complements static findings, but unreachable functions and untested conditions remain outside the scan's coverage.

Zed Attack Proxy, or ZAP, supports web crawling and passive or active assessment. Passive checks examine observed traffic. Active checks send probes intended to expose weaknesses. A baseline scan and an active scan therefore provide different evidence. OWASP Juice Shop supplies a deliberately vulnerable application for practising these methods in a controlled setting.

The training application and scanner can run in separate Docker containers. The application must finish starting and be reachable at the configured target address before useful scanning can begin.

ZAP reports can contain passing checks, warnings, and failures. Alerts identify a condition, its identifier, occurrence count, and affected addresses. Common findings concern missing security headers, cross-domain configuration, loosely scoped cookies, information disclosure, and suspicious JavaScript. Other alerts identify features that need review rather than a confirmed vulnerability.

Several occurrences may reflect the same configuration problem across multiple endpoints. The occurrence count does not establish severity. The alert's meaning and the affected functionality determine the significance of the finding.

An absence of failures does not cancel warnings or prove that an application is secure. Reviewers assess each relevant alert, examine the affected endpoint, and determine whether a change is justified. Rescanning helps verify the correction. Reports from interrupted scans represent only the activity completed before the interruption.

Burp Suite also supports automated and manual web assessment, including passive, active, and JavaScript analysis. Nessus provides vulnerability checks across systems through tests and plugins. Tool selection depends on the target and the evidence required.

### Dependencies and software composition

Applications inherit risks from frameworks, packages, container images, and other supporting components. SCA identifies these components and compares them with known vulnerability information. It also provides visibility into versions and licences, supporting decisions about updates and acceptable use.

Indirect dependencies require attention. An application may use a framework with no relevant advisory while one of the framework's own libraries is vulnerable. An inventory therefore needs to include these transitive dependencies. Outdated versions, weak maintenance, and reliance on external services can also influence component risk, although tools differ in what they assess.

A component's maintenance history and supporting community can inform its assessment. Matching packages against known advisories answers a narrower question and does not establish every aspect of component quality.

A software bill of materials, or SBOM, records the components used in a product. It supports transparency, customer enquiries, and investigation when a new vulnerability appears. Licence information helps organisations assess the obligations attached to third-party code. Those obligations depend on the licence and its use, so a scanner's classification needs interpretation.

SCA and SAST are distinguished by their analytical focus. SCA examines components and associated risks, while SAST examines code for weaknesses. The distinction does not depend on whether the application is open source or proprietary. Both methods can contribute to the same assessment.

Consistent identifiers help connect software with relevant records. Common Platform Enumeration, or CPE, identifies products. Software Identification, or SWID, tags describe software, while package URLs identify packages using details such as type, name, and version.

Verification extends beyond identifying a component. OWASP's Software Component Verification Standard addresses supply-chain risk, while Supply-chain Levels for Software Artifacts, or SLSA, focuses on integrity and resistance to tampering. Dependency-Check, Dependency-Track, GitHub dependency features, and Snyk support different parts of component discovery and assessment.

### Interpreting dependency scans

The Python Packaging Authority's `pip-audit` checks Python dependencies against known vulnerability databases, including the Python Advisory Database. A virtual environment separates the assessment's packages from the wider system. Installing an application's `requirements.txt` establishes the dependency set for inspection.

Results identify affected packages, installed versions, and vulnerability or advisory identifiers. Associated information can indicate patched versions. Remediation commonly involves updating dependency declarations, installing the revised packages, and scanning again. Older dependencies in Flask applications such as Hit Counter need version-specific checks, despite the framework's familiarity. Findings can change as advisory databases develop, even when project files remain unchanged.

The installed environment and the dependency declaration serve different purposes. Changing a requirements file records an intended update, while a further installation and scan establish which versions are actually assessed.

OWASP Dependency-Check examines project dependencies and attempts to match them with publicly disclosed vulnerabilities. Its reports connect components with possible CPE matches and Common Vulnerabilities and Exposures, or CVE, records. These matches require review against the actual package and version.

Configuration identifies the scan location, vulnerability-data directory, output directory, and any required credentials. The National Vulnerability Database, or NVD, supplies relevant information. An initial update can take longer than subsequent runs because the local data has not yet been populated.

JSON reports support automated processing, while HTML reports are easier to inspect visually. Reports can include scan dates, tool versions, dependency counts, vulnerability identifiers, and severity information. The JSON expression `.dependencies[].filePath` extracts every dependency path. It does not isolate vulnerable components without an additional check of their vulnerability records.

Warnings and processing errors need examination alongside findings. Producing a report does not establish that every intended component was analysed. After vulnerable dependencies are upgraded or replaced, further scanning and application checks help verify the result.

### Assessing and managing findings

Vulnerability analysis connects discovery with decisions about risk. A scanner detects conditions within its scope and available knowledge. It does not establish that an unreported weakness cannot exist. Regular reassessment is necessary because new advisories can change the significance of an existing component.

Defect-tracking systems such as Jira and Bugzilla centralise findings, record severity, assign responsibility, and track repairs. Vulnerabilities affecting mission-critical functions need urgent attention. High-severity findings generally take priority over medium- and low-severity work, with the application's role and exposure informing the decision.

Penetration testing adds controlled investigation of possible exploitation. Internal security teams or external specialists can provide this assessment. A bug bounty can reward reports of qualifying weaknesses within an agreed scope. Neither approach removes the need for an organised process to assess findings and implement repairs.

The remediation cycle includes identification, assessment, correction, and verification. Reports need enough detail to connect a finding with the affected component or endpoint. Teams then establish whether a fix, upgrade, replacement, or other mitigation addresses the actual cause. A finding remains unresolved until its treatment has been checked.

### Interactive testing and runtime protection

Interactive application security testing, or IAST, examines behaviour during testing and supplies context for locating vulnerabilities. It can run alongside other tests and integrate with build and quality-assurance workflows. Runtime context can reduce some false positives and support earlier repairs, although effectiveness depends on the application, configuration, and exercised paths.

Runtime application self-protection, or RASP, operates with an application in production. It assesses activity in context and can respond to suspected exploitation, including SQL injection or malicious automated requests. Depending on the implementation, responses include blocking an operation, terminating a session, and alerting the security team.

IAST primarily supports discovery during testing, while RASP supports detection and response during operation. Both can fit into container, cloud, and DevOps environments. Their precision and coverage require assessment, and runtime protection does not replace repairs to vulnerable code.

IAST can help developers locate a problem while its implementation remains familiar. RASP provides continuing visibility into application activity, including when the underlying infrastructure is operated by a cloud provider.

### Continuous analysis and mitigation

Continuous security analysis integrates recurring checks from requirements through production. Incorporating them into continuous integration and continuous delivery pipelines makes security part of routine development. Earlier feedback can reduce late-stage disruption, while shared ownership connects findings with the people responsible for correcting them.

Snyk Open Source provides ongoing dependency monitoring. It can report newly disclosed vulnerabilities and licence information, provide remediation guidance, and propose fixes through pull requests. Automated proposals still need review and verification within the application.

Effective practice combines developer training, maintained policies, planned audits, and secure development environments. Operating systems and supporting software need appropriate updates. Assessment should cover the full application stack, using static analysis, composition analysis, dynamic testing, review, and runtime checks where relevant.

Mitigation also includes shared coding standards, automated vulnerability scanning, threat modelling, and awareness of the OWASP Top 10 categories of web security risk. Threat modelling examines possible attacker behaviour and containment options. Simpler payload formats such as JSON can reduce processing complexity compared with elaborate XML structures, but format choice alone does not secure an interface.

Continuous analysis is useful when findings lead to action. Recurring scans, contextual review, tracked repairs, and verification help maintain protection as code, dependencies, and threats change.

## OWASP Application Security Risks

Web application security protects information, user accounts, and services against misuse. Weaknesses can arise in architecture, code, configuration, dependencies, or operation. Effective protection therefore combines access controls, safe handling of data, cryptography, testing, and monitoring throughout the application's lifecycle.

OWASP supports software security through shared guidance, tools, and community contributions. Its Top 10 provides a framework for recognising important categories of web risk. The 2021 edition identified ten risk categories, providing a historical classification rather than a permanent ranking of every possible threat.

| 2021 category | Main concern |
| --- | --- |
| 1. Broken access control | Users can perform actions or access information beyond their permissions. |
| 2. Cryptographic failures | Sensitive information lacks suitable protection in storage or transmission. |
| 3. Injection | Untrusted data changes the meaning of commands, queries, or browser content. |
| 4. Insecure design | The architecture lacks effective controls against relevant threats. |
| 5. Security misconfiguration | Settings expose unnecessary information, permissions, or functionality. |
| 6. Vulnerable and outdated components | Applications inherit weaknesses from unsupported or unpatched software. |
| 7. Identification and authentication failures | Credential and session weaknesses allow impersonation or unauthorised access. |
| 8. Software and data integrity failures | Code, updates, or data are trusted without adequate verification. |
| 9. Security logging and monitoring failures | Inadequate records and alerts hinder detection and response. |
| 10. Server-side request forgery | An attacker causes a server to make unintended requests. |

The 2021 selection process combined submitted data, industry surveys, analysis, public review, and consensus. Eight categories came from data analysis and two from survey results. Supporting measures included weakness classifications, incidence rates, and testing coverage. The framework can guide security work, while each application still requires assessment of its own functions and exposure.

Common Weakness Enumeration, or CWE, provides categories used to describe underlying software weaknesses. Mapping findings to these categories helps organise evidence from different contributors. Incidence and testing coverage provide context for interpreting how often a weakness was observed.

### Access, identity, and sessions

Authentication establishes identity. Authorisation determines which resources and actions that identity may use. Broken access control occurs when an application fails to enforce those boundaries. For example, changing a record identifier in a request should not allow a user to retrieve another person's information.

The principle of least privilege limits permissions to the work an account needs to perform. Reviews should examine horizontal boundaries between users with similar roles and vertical boundaries between ordinary and privileged roles. Unnecessary directory listings and public configuration details can help attackers explore a system, although hiding them does not replace permission checks.

Regular access reviews connect permissions with current responsibilities. Administrators need visibility into the access each role requires and whether the application continues to enforce those limits.

Authentication controls also need to address automated attacks. Credential stuffing uses previously obtained username and password combinations, while brute-force attacks repeatedly guess credentials. Multifactor authentication adds another check, and removing default credentials closes an avoidable route into the application.

After login, session management preserves the connection between the authenticated user and subsequent requests. Session identifiers need secure generation and storage and should not appear in URLs. Server-side controls can invalidate sessions after logout, inactivity, or a maximum duration. An unattended device with an active session can otherwise expose an account despite a legitimate initial login.

Access-control failures and suspicious authentication activity need logging and a response process. Recording a rejected request without examining significant patterns leaves an important part of the control incomplete.

### Secure design, configuration, and components

Insecure design concerns the absence or inadequacy of controls in the architecture. Correct implementation cannot supply protection that the design never required. Threat modelling helps identify how authentication, application logic, network boundaries, and information flows could be abused before those decisions become embedded in code.

An application can correctly implement a login screen and still lack controls against repeated guessing or bypasses of one-time-password checks. Those protections require explicit design decisions linked to the relevant threats.

Secure error handling balances usability and protection. Users need understandable failure messages, while administrators need diagnostic detail. Database structures, server versions, configuration paths, and sensitive internal information belong in appropriately protected logs. Login errors should avoid confirming which part of a credential pair was correct.

Security misconfiguration can affect every layer, including the platform, web server, application server, database, and custom code. Debugging features, test interfaces, default credentials, excessive permissions, and unnecessary functionality can create exposure in production. Developers and system administrators need to coordinate configuration review and maintenance.

Dependencies create another source of risk. An inventory should identify client-side and server-side components, installed versions, and nested dependencies. Updates need a process that brings relevant fixes into deployed applications. Unused libraries and features add maintenance obligations without contributing required functionality.

Component scanning helps identify known weaknesses, but its results depend on the software examined and the vulnerability information available. An unchanged application can require action when a new advisory affects an existing dependency. Removing unnecessary components and maintaining version awareness support continuing assessment.

### Cryptography and secret management

Cryptography protects information through mechanisms with different purposes. Encryption supports confidentiality, while integrity checks help detect alteration. Authenticated encryption combines confidentiality with an integrity check. Sensitive data may need protection both at rest and in transit, including encrypted web communication through HTTPS.

Security does not depend on an algorithm being obscure. Weak or obsolete mechanisms, unsuitable configuration, and exposed keys create risk. Keys should have defined purposes and a managed lifecycle covering creation, storage, access, backup, replacement, and retirement. They should not be embedded in ordinary application code.

Secrets management applies similar controls to passwords, tokens, application programming interface keys, cryptographic keys, and other confidential values. Applications need these values for databases, service connections, and cloud resources. Central management can reduce uncontrolled copies and provide records of access.

HashiCorp Vault manages secrets through authentication, credential validation, authorisation policies, and permitted access. Authentication may rely on an internal or external identity system. A token supports subsequent requests, while policies determine which paths and operations it permits. Possession of a valid token need not confer access to every secret.

Vault supports centralised key management, encryption services, secret storage, and database credential rotation. Users and applications can interact through a browser interface, command-line tools, or an HTTP API. Auditing records how access is used, supporting investigation and accountability.

Vault's development server is a local learning and testing environment with in-memory storage. It is not a production deployment. Its root token grants extensive access, while unsealing information serves a different purpose related to protected storage. Client configuration identifies the server and supplies the appropriate authentication.

The Python `hvac` library can create a client and write, read, or delete secrets in Vault's versioned key-value store. A write supplies a path and key-value pairs. A read retrieves a selected version, while an invalid path produces an error. Deleting the latest version is distinct from removing the entire history. These operations need suitable policies and verification throughout the secret's lifecycle.

The `create_or_update_secret` operation writes values under an application path. The `read_secret_version` operation retrieves a version, and `delete_latest_version_of_secret` marks the latest version as deleted. A subsequent read can expose the deletion status. Checking both the response and the stored version helps distinguish a successful operation from an incorrect path or configuration.

Production secrets management also needs to account for changing credentials. Database credential rotation replaces credentials over time, while application integration must ensure that authorised services can obtain the values they currently need.

### SQL injection and database protection

Injection occurs when untrusted data changes instructions passed to an interpreter. SQL injection exploits this boundary in database queries written in Structured Query Language, commonly when an application concatenates request values with query text. Inputs intended as names, passwords, or search terms can then alter the query's meaning.

Several mechanisms can contribute to a database attack:

- Query manipulation changes a filtering condition or set operation. An attacker may make an authentication condition accept records it should reject or use a UNION to combine information from another query.
- Added statements introduce database commands where the database and driver permit them. Consequences can include modified records, deleted tables, or altered accounts.
- Function-call injection causes an expression to invoke an unintended function, potentially performing a sensitive operation through the permissions available to it.
- Vulnerable database functions can contain memory-safety defects, including buffer overflows. These are distinct implementation flaws that require patching as well as attention to application queries.

Quotes, statement separators, and comment syntax can change how a concatenated query is interpreted. Their effect depends on the database and interface. Blocking selected characters is therefore an incomplete defence and may also reject legitimate data.

Parameterised queries separate the statement's structure from its values. The application passes SQL and parameter values separately through the database driver. Placeholder syntax varies, with forms such as `%s` or `?`. The driver treats supplied values as data instead of interpreting them as additional query syntax. Application-side string formatting does not provide the same separation.

In an unsafe login query, an injected condition that always evaluates as true can change which records are returned, defeating the intended password comparison. Parameter binding prevents that condition from becoming query syntax. The supplied text remains an input value, even when it contains words that resemble a database command.

Server-side validation checks whether values meet the application's requirements. Client-side checks can improve usability but cannot enforce a boundary against a requester who bypasses them. Least-privilege database accounts further limit the consequences of a flaw. A read-only task should not unnecessarily receive permission to change tables or accounts.

Static analysis examines code without running it. Dynamic application security testing exercises the running application and observes its responses, providing evidence about behaviour that source inspection alone may not reveal.

Bandit provides static security analysis for Python. Its B608 check can flag possible SQL injection through string-based query construction, reporting location, severity, and confidence. A vulnerable query can be changed to use placeholders and a separate parameter tuple, followed by another scan and appropriate application tests.

A scan reporting no identified issues shows the outcome of its checks, not the absence of every vulnerability. Database patching, dependency review, secure interfaces, and dynamic testing address risks beyond a single source-code pattern.

Severity and confidence also describe different aspects of a static finding. Severity concerns the potential consequence, while confidence concerns the scanner's assessment of the reported pattern. Reviewing the identified source location connects the warning with the application's actual use of the database.

### Cross-site scripting

Cross-site scripting, or XSS, occurs when untrusted content executes as code in a user's browser within the context of an affected website. Potential consequences include actions through the user's session, capture of exposed information, altered page content, and redirection to another site. Browser protections and the site's handling of data influence what the script can access. Compromise of one site does not automatically disclose cookies belonging to unrelated sites.

| Form or description | How execution arises |
| --- | --- |
| Stored XSS | Malicious content is saved, then executed when another user views it. |
| Reflected XSS | Request data is incorporated unsafely into an immediate response. |
| DOM-based XSS | Client-side code passes untrusted data into an operation that interprets it as markup or code. |
| Blind XSS | Execution occurs somewhere the attacker cannot directly observe, such as a staff interface. This can overlap with stored XSS. |

Stored attacks can affect many visitors through one submission to a forum, message feed, or similar service. Reflected attacks can use crafted links distributed through phishing messages. DOM-based attacks exploit unsafe flows from sources such as an address, search string, or fragment into browser operations that interpret the value.

The Document Object Model, or DOM, represents a page as objects that client-side scripts can read and modify. Unsafe handling of data within those objects can turn an ordinary page update into script execution.

A stored message can remain harmless while sitting in a database yet become dangerous when a page renders it as executable content. This links storage and display: accepting a value, saving it, and presenting it safely are separate operations. Protection must remain effective when the value is retrieved later.

Prevention requires controls suited to the point where data is used. Validation checks whether input is appropriate. Output encoding preserves text in its intended context. Sanitisation removes disallowed elements when an application intentionally accepts limited markup. Searching for a script tag or blocking a few keywords does not cover every route to execution.

HTML encoding converts relevant characters into character references so that they display as text in an HTML text context. The JavaScript `he` library supplies an `encode` function for this purpose. The encoded value must be used at the actual output point. HTML encoding alone is not interchangeable with the protection required inside JavaScript, URLs, or other contexts.

Client-side code should avoid passing untrusted strings to unnecessary HTML-interpreting operations. A plain-text interface such as `textContent` is appropriate when only text is required. Frameworks including React, Vue, and Angular provide protective defaults, but unsafe rendering options can bypass those protections.

A Content Security Policy can restrict script sources and forms of execution. Its effectiveness depends on its settings, and it complements safe data handling. Browser safeguards and removal of unnecessary server features also help, but they do not replace application controls. Verification needs to check the running application's output after the relevant code changes.

A policy allowing scripts from any HTTPS source still trusts a broad set of sources. Encrypted delivery does not establish that a script is appropriate for the application.

### Integrity, logging, and response

Software integrity controls address whether code, updates, and data come from expected sources and remain unaltered. An automated update can distribute malicious code if a compromised delivery process supplies it without adequate verification. Previously trusting an application does not establish the trustworthiness of every later update.

Continuous integration and continuous delivery pipelines require controlled access, suitable separation, and secure configuration. Digital signatures and integrity checks provide evidence about origin and modification. Encryption protects confidentiality and does not by itself establish an update's authenticity. Component vulnerability scanning supplies another form of evidence, concerning known weaknesses in included software.

Logging records events for detection and investigation. Useful events include logins, failed logins, access-control failures, intrusion attempts, and server-side validation failures. Entries need consistent formats and enough context to connect the account, action, and system involved.

Central collection supports analysis across services. Logstash, Elasticsearch, and Kibana provide one possible collection, storage, and visualisation arrangement. Retention must allow investigation of incidents discovered after a delay. Records overwritten too quickly may remove the evidence needed to establish what occurred.

Monitoring uses thresholds, dashboards, and alerts to identify significant activity. Alerts need an assigned response process, while periodic reviews help reveal missing events or attempted log manipulation. Logging, monitoring, and investigation operate together rather than as isolated features.

### Server-side request forgery

Server-side request forgery, or SSRF, causes a server to make a request controlled by an attacker. The server may reach internal services that the attacker cannot contact directly, allowing the attack to exploit trust between systems or cross a network boundary through an otherwise permitted connection.

Possible consequences include probing services, discovering internal addresses, retrieving information, and reaching other vulnerable systems. The outcome depends on the server's permissions and connectivity. Blind SSRF exposes no direct response content, partially visible cases expose some information, and non-blind cases return more of the response. Limited feedback can still assist an attacker.

Controls include validation of client-supplied destinations and allowlists for intended URLs, ports, and services. Redirects need restriction so they cannot bypass those controls. Applications also need to handle fetched responses according to their purpose, instead of returning arbitrary remote content directly to a requester.

A firewall may reject an external connection while allowing the application's server to reach the same internal destination. SSRF exploits that difference in access, making application-level destination controls significant even within a protected network.

### Repository scanning and continuing assessment

Snyk supports assessment of code, dependencies, containers, and infrastructure definitions. Integrations with repositories, delivery pipelines, and issue-tracking systems bring security findings into development workflows. Continuous monitoring can identify newly disclosed vulnerabilities affecting existing projects.

Founded in 2015 by Guy Podjarny, Danny Grander, and Assaf Hefetz, Snyk initially focused on open-source dependency weaknesses. Its scope expanded to include container assessment and wider development integrations. Its role reflects the increasing use of security checks within routine software delivery.

Repository access begins with authentication and explicit authorisation of the required scope. Signing in through GitHub and granting repository access are distinct decisions. Access may be limited to public repositories or extended to authorised private repositories. Imported projects, custom dependency-file locations, and supported folder exclusions determine what a scan examines.

Automation can include pull-request checks, proposed vulnerability fixes, dependency-upgrade requests, and source-code analysis. Reports organise findings by project and categories such as critical, high, medium, and low severity. Dependency files, including Ruby's `Gemfile.lock`, provide package information relevant to assessment.

Severity, exploit maturity, fixability, and issue status describe different aspects of a finding. Suggested updates or patches need evaluation within the application. Retesting checks a changed project or applies updated vulnerability information. Counts belong to a particular scan and can change without edits to the repository itself.

Developers, security specialists, DevOps teams, and application owners use this information for different responsibilities. Policies can establish acceptable risk and escalation requirements. Related tools address static code quality, component and licence risks, container weaknesses, or binary artifacts, so selection needs to follow the analysis required.

| Tool or group | Relevant area of assessment |
| --- | --- |
| SonarQube | Code quality and static security analysis |
| Nexus Lifecycle and Black Duck | Component vulnerabilities and software supply-chain risks |
| Veracode and Checkmarx | Application security testing across supported analysis methods |
| GitHub and GitLab security features | Security checks integrated with repository and delivery workflows |
| Trivy | Container images and related software components |
| JFrog Xray | Binary artifacts, vulnerabilities, and compliance information |

These capabilities overlap without being interchangeable. A dependency scan, a source-code review, and a container-image assessment examine different evidence. Organisations need to connect the findings rather than assume that one report covers the entire application.

Across these activities, a security finding begins an investigation. Effective remediation connects evidence with the affected component, applies a suitable change, and verifies the result. Continuing maintenance keeps these controls aligned with changing applications, dependencies, and threats.

## Security Best Practices

Secure software development addresses risks in application code, dependencies, development systems, and delivery processes. Security introduced early can reduce later redesign, service disruption, and recovery work. Developers, operations staff, and security specialists share responsibility for identifying weaknesses and maintaining protection throughout the software's life.

DevSecOps integrates security into development and operations. A secure development lifecycle combines security requirements, coding standards, testing, training, and continuing review. Assessed libraries and reusable code can improve consistency, while controlled updates help prevent changes from introducing weaknesses. These practices extend to repositories, build pipelines, and the machines used to create software.

Training helps developers recognise common weaknesses and apply controls consistently, particularly when changes affect exposed interfaces or security-critical components.

### Input, output, and error handling

Input validation checks whether data meets an application's expectations for type, range, length, and permitted characters. Server-side validation remains necessary because a requester can bypass browser checks or manipulate values arriving through apparently trusted interfaces.

Allowlists define acceptable values for particular fields. Removing selected characters or suspicious words cannot establish safety across every context. Punctuation can belong to legitimate data, and different interpreters assign different meanings to it.

Output encoding represents data safely for its destination. Sanitisation removes disallowed content when an application accepts restricted markup or structured input. Safe interfaces for database queries, directory queries, and operating-system operations help keep data separate from instructions. Each control needs to match the intended use.

Error messages should explain failures without exposing unnecessary implementation details. Protected diagnostic logs can retain information needed for investigation. Relevant events include input failures, authentication attempts, access-control failures, and suspected tampering. Error paths also need correct resource cleanup, including memory management where the program controls memory directly.

### Browser security controls

Flask-Talisman helps Flask applications configure browser security headers and HTTPS behaviour. Application-wide settings provide consistent coverage, with route-specific settings available where required.

| Control | Purpose |
| --- | --- |
| Content Security Policy | Restricts supported categories of resource loading and execution. |
| `X-Frame-Options: SAMEORIGIN` | Restricts framing by pages from other origins. |
| `X-Content-Type-Options: nosniff` | Prevents the browser from inferring a different content type. |
| Referrer Policy | Controls address information sent with navigation and other requests. |

A Content Security Policy using `default-src 'self'` makes the application's origin the default permitted source for covered resources. An origin comprises a scheme, host, and port. External scripts, fonts, and images require deliberate policy choices. HTTPS protects communication in transit, and application settings must reflect any proxy that terminates encrypted connections.

Cross-origin resource sharing, or CORS, controls when browser scripts can read responses from another origin. Flask-CORS allows a back end to specify permitted front-end origins. It does not replace authentication or server-side authorisation, and it does not prevent other clients from requesting publicly reachable endpoints.

A front end on port 3000 and a Flask back end on port 5000 occupy different origins. The front end needs the correct data endpoint, while the back end needs the intended front-end origin in its CORS configuration. A successful direct request proves the endpoint responds, but does not prove browser scripts can read it. Development, staging, and production may require different origin settings.

Testing should distinguish an unavailable service, an incorrect endpoint, a browser policy restriction, and an authorisation failure. Package compatibility and the actual response headers also need checking.

### Dependencies and signed data

Dependencies supply functionality that applications would otherwise need to implement. Reuse can accelerate delivery, add features, and improve performance. Missing, incompatible, outdated, or vulnerable packages can also cause failures or expose information. Third-party code may impose licence obligations.

Assessment covers interface design, documentation, code quality, tests, known issues, and maintenance. Adoption and commit activity provide context without proving security. A mature package may need few changes, so age alone cannot establish suitability. Reviews also need to consider untrusted input and the privileges available to a package.

Inventories should cover direct dependencies and the further packages they require. Updates can introduce new indirect dependencies, making review necessary beyond the application's immediate choices.

Flask's supporting components have distinct roles: Werkzeug provides web utilities, Jinja provides templates, MarkupSafe supports markup escaping, ItsDangerous signs data, and Click supports command-line applications.

ItsDangerous can serialise data and attach a cryptographic signature. Its `dumps` operation creates a token, while `loads` verifies and recovers the data. A salt can separate signing contexts, but does not grant authorisation. Signing supports integrity verification. It does not encrypt the payload or conceal sensitive information.

### CodeQL and repository checks

CodeQL creates a database representation of program code and runs queries to identify potential weaknesses. Findings appear as code-scanning alerts. Supported languages include Python, JavaScript, Java, C, and C++.

GitHub's default setup detects supported languages and selects a configuration. Advanced setup uses a YAML workflow for greater control. Default queries emphasise precision, while security-extended queries broaden coverage and can require additional review. Precision concerns the reliability of findings, rather than the severity of a weakness.

Configured scans can run on pushes, pull requests, and schedules. Scheduled checks can apply updated queries even during periods of limited development. Repository protection rules can connect alert severity with pull-request checks.

Code scanning, dependency alerts, security advisories, and private vulnerability reporting serve different purposes. Enabling one feature does not establish that the others are active. Actual configuration and scan results provide the relevant evidence.

### Protecting development systems

Development machines can hold source code, intellectual property, credentials, encryption keys, and access to production systems. Compromise can expose information, alter software, or provide access to deployment infrastructure.

Protection covers networks, computing resources, storage, repositories, and services on premises or in the cloud. Software updates, removal of unnecessary services, physical security, and maintained endpoint protection reduce exposure. Firewall rules control incoming and outgoing traffic, while port reviews identify services that should not be reachable.

Remote access needs protection suited to the network, including a VPN where appropriate. Policies for external repositories help control incoming third-party code.

Containers, virtual machines, or separate computers can separate development from routine business activity. Shared configurations also improve consistency. Isolation depends on configuration, including exposed ports and access to host resources.

Strong authentication and multifactor authentication protect accounts. Developer access to production requires controls appropriate to its privileges. Repositories and build pipelines need controlled access, monitoring, and auditing.

Commit histories record source changes, and pre-commit checks can detect credentials before publication. Useful logs and a response process support investigation. Controls also need to accommodate legitimate work, since excessive restrictions can encourage unsafe workarounds.

### Encrypted local secret storage

Plaintext files leave API keys and passwords exposed to anyone able to read them. The `pass` utility stores secrets using GNU Privacy Guard, or GPG, encryption.

Setup involves generating or selecting a GPG key and initialising the store with its identifier. A passphrase can protect use of the private key. The identifier selects the encryption recipient and is distinct from the passphrase.

The `pass init` command initialises the store, `pass insert` saves a named secret, and `pass show` decrypts and displays an entry. Retrieval can expose plaintext in the terminal, so protection of the computer and authenticated session remains necessary. Cached decryption credentials can allow access without a fresh passphrase prompt.

Migration also requires attention to unnecessary plaintext files, backups, and other copies. Encrypting one copy does not protect copies elsewhere. File deletion does not establish that historical copies have disappeared.

Encrypted storage reduces exposure, but cannot guarantee protection when an attacker controls an unlocked system. Key protection, account controls, endpoint security, and repository practices support the secret store's effectiveness.
