# Docker security implementation

> [!NOTE]
> This guide explains how to secure Docker across the container lifecycle through trusted images, vulnerability scanning, hardened Dockerfiles, protected hosts, encrypted access, secrets management, least privilege, and robust logging.

Docker security combines image maintenance, host protection, restricted application privileges, careful credential handling, and useful logging. Each control addresses different risks. Trusted publishers, small images, and successful scans provide evidence, but cannot establish complete security.

## Images and builds

Docker Official Images and Verified Publisher badges help identify curated repositories and verified publishers. Registry reputation, pull counts, and stars do not guarantee that an image is safe. Maintenance activity, supported versions, and application compatibility also require assessment.

Docker Scout and Trivy identify known vulnerabilities in detected software components. CVE identifiers, maintained through the Common Vulnerabilities and Exposures Program, provide common references for disclosed vulnerabilities. Findings depend on the image, advisory data, scanner coverage, and scan time. Zero findings do not exclude undiscovered or undetected defects.

A software bill of materials (SBOM) inventories detected components and versions. It supports dependency review, but does not establish runtime performance or complete detection. Trivy's `fixed` status indicates that a platform fix exists. The installed version must still be checked against the vendor's fixed version. Severity filters change the displayed findings, not the underlying exposure.

Minimal images reduce unnecessary software, but the base must suit the application. Alpine's use of the musl C library can affect compatibility with software expecting glibc. Image tags, including version tags, can change. Digest pinning identifies exact content, while reviewed updates and rebuilds incorporate security fixes.

Applications should run as non-root users where possible. Dockerfile `USER` sets the default execution identity, while `WORKDIR` sets the directory separately. Copied files need suitable ownership and permissions. Removing unnecessary packages reduces potential attack opportunities.

## Hosts and connections

The CIS Docker Benchmark provides configuration guidance. Docker Bench for Security automates checks against a particular benchmark version, which can differ from the current release. Its score requires interpretation because passes and warnings can offset one another. Zero does not establish an absence of serious findings. Manual checks and individual warnings still need review.

User-namespace remapping maps container users to unprivileged host IDs, while the Docker daemon remains root. Enabling it requires compatible ID ranges, storage ownership, and mount permissions. On existing installations, it can make previous Docker resources inaccessible under the new mapping.

Host configuration files and Docker data directories also need restricted access. Ownership requirements vary with installation mode, user remapping, and storage arrangements, so blanket permission changes can damage a working deployment.

Remote Docker API access needs authenticated protection, such as mutual TLS or SSH. TLS certificates must identify the intended endpoint, and private keys require restricted access. Authorised client credentials can provide administrative control of a rootful Docker host. Protecting this connection does not encrypt unrelated application traffic.

Swarm automatically uses mutual TLS for node control communications. Application traffic across overlay networks is not encrypted by default. Overlay encryption or application TLS requires separate configuration.

## Secrets and runtime privileges

Runtime secrets keep credentials out of Dockerfiles, image layers, and application source code. Access is granted to the services that need them, but storage and permissions differ:

| Mechanism | Protection and limitation |
| --- | --- |
| File-backed Compose secret | Bind-mounts a host file. Its source and permissions require protection. |
| Swarm secret | Encrypts transfer and storage, then supplies authorised Linux tasks through an in-memory file. |

Files under `/run/secrets` are not automatically restricted to root. Actual permissions determine who can read them, and administrators with sufficient access remain trusted. Printing a password can expose it through logs, even when its original delivery was protected.

Linux capabilities divide privileged operations into separate permissions. `--cap-drop ALL` removes the capability set, and `--cap-add` can restore specific requirements. Applications need testing under these restrictions. `NET_ADMIN` is already absent from Docker's default capability set.

## Logging and review

Container output, daemon diagnostics, and lifecycle events provide distinct evidence. `docker logs` normally retrieves captured standard output and standard error. `docker service logs` retrieves supported Swarm task logs, while `journalctl -u docker.service` accesses daemon diagnostics on systemd hosts. `docker events` reports Docker lifecycle events.

Empty output does not prove that no activity occurred. Applications may log elsewhere, and retrieval depends on the logging driver. Daemon verbosity does not control application verbosity. Driver changes normally require container recreation to affect existing workloads. Central collection, protected transport, appropriate retention, and rotation support investigation without allowing logs to consume unlimited storage.
