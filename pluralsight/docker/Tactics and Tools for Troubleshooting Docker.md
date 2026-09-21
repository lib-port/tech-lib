# Tactics and Tools for Troubleshooting Docker

Docker troubleshooting begins by identifying the failing operation: starting the platform, building an image, retrieving it from a registry, or running an application. Logs and inspection results help locate the failure before configuration changes or resource removal begin.

In Docker, the daemon is the background service that manages images, containers, and other resources. An image packages application files and dependencies. A container adds runtime configuration and a writable filesystem layer. Docker Compose defines related services, networks, and storage. The host, build environment, and container have distinct paths, permissions, and network settings. Docker Desktop also uses a managed virtual machine for Linux containers on macOS and Windows, so daemon-reported paths may belong to that machine.

## Logs and inspection

`docker logs CONTAINER` retrieves captured standard output and standard error. Applications that write only to internal files may need separate log access. Availability also depends on the logging driver.

Useful options include `--tail` to limit recent output, `--follow` to stream new entries, and `--since` or `--until` to restrict the time range. `--timestamps` adds timestamps. Explicit time-zone offsets avoid ambiguity. `--details` adds configured attributes, such as labels, rather than increasing application verbosity.

Docker Desktop and Visual Studio Code's container tools provide interfaces for viewing logs and inspecting resources. Failures before a container starts require the relevant build output or daemon diagnostics.

`docker inspect CONTAINER` works with existing running or stopped containers. Its main fields have different purposes:

| Field | Diagnostic use |
| --- | --- |
| `State` | Status, exit information, and execution errors |
| `Config` | Application configuration and creation settings |
| `HostConfig` | Host interaction, resource limits, and networking mode |
| `Mounts` | Actual storage sources, destinations, and access modes |
| `NetworkSettings` | Network attachments, addresses, and published ports |

`RestartCount` records restarts, while the restart policy is configured separately. `LogPath` is driver-dependent and belongs to the daemon host. Supported logging configuration controls rotation and forwarding.

The `--format` option evaluates Go templates. For example, `docker inspect --format '{{json .Config}}' CONTAINER` extracts configuration as JSON, with quoting adjusted for the shell.

## Files and permissions

`docker exec -it CONTAINER /bin/sh` starts an interactive shell in a running container if that executable exists. The final argument names a command. Minimal images may lack shells and diagnostic utilities.

`docker cp` copies files from running or stopped containers. `docker export` produces a filesystem archive, but excludes mounted volume data and is therefore not a complete application backup.

A missing build-context path concerns files supplied by the client. `COPY` normally reads from that context, subject to `.dockerignore`. `RUN` executes during building, while `CMD` defines the default runtime command. A file available during building may be absent from the final image or hidden by a runtime mount.

Missing-file and permission errors call for checks of paths, working directories, interpreters, ownership, and execute permissions. Windows CRLF line endings can break Linux shell scripts. Selecting a container user does not automatically grant access to host files.

Tar-stream errors can follow earlier context, file-access, or pipe failures. The first substantive error provides a stronger diagnostic starting point than the final "can't close tar writer" message.

## Platform and Compose configuration

Docker Desktop requires a supported operating system and virtualisation backend. Windows features and permissions depend on the installation mode. Routine use does not require administrator access. Suspected endpoint-security conflicts need confirmation from diagnostics and vendor guidance.

A reset or reinstall can remove settings and data, and needs evidence of an installation problem. Pruning requires a functioning daemon and cannot repair every startup failure.

Compose files must satisfy both YAML syntax and the Compose model. YAML indentation uses spaces. Single and double quotes have different escaping rules. A schema-aware editor helps identify structural errors, while `docker compose config` resolves and validates the effective configuration before services start.

## Builds and caching

Docker's build cache retains reusable results from multiple steps and builds. Reuse depends on matching instructions and relevant inputs. A changed instruction or copied file invalidates the affected step and dependent later work, while independent stages may remain reusable.

In `docker build .`, the final period selects the current directory as the build context, rather than a directory inside the container. Changing a dependency file copied before installation can invalidate that installation step. Changes to unrelated or ignored files need not affect it.

File contents and relevant metadata influence cache checks. Modification time alone does not invalidate a copied-file cache entry. Remote package updates and changes to build-secret contents do not automatically invalidate a matching `RUN` step.

`--no-cache` bypasses instruction-cache reuse for the selected build. It does not refresh the base image. `--pull` attempts to retrieve newer referenced images where the reference permits change. `--cache-from` imports supported external cache data. A digest-pinned base-image reference continues to identify the same content when `--pull` is used.

Build dependencies must be available before steps that use them. For example, a Node.js build script may require project packages installed through `npm install`, which itself already requires npm.

Current Linux builds normally use BuildKit. `--progress=plain` exposes plain-text output, and a named stage built with `--target` can provide a diagnostic image. Intermediate-container inspection is a legacy-builder technique. A removed container cannot be committed, and BuildKit cache entries are not generally runnable images.

## Registry access

A registry stores images, rather than running containers. Pull failures require checks of the registry address, repository, tag, and access permissions. Public images may allow anonymous pulls. Private access requires both accepted authentication and repository authorisation.

`docker login`, credential helpers, and cloud identity mechanisms support different environments. Amazon ECR and Azure Container Registry provide their own authentication integrations. Signing information from `docker trust inspect` and Swarm metadata from `docker secret inspect` do not validate registry credentials.

Proxy settings must apply to the component making the request. Docker Desktop uses its own proxy configuration, while a standalone daemon can use supported daemon settings or startup environment variables. Application-container settings are separate.

DNS failures, certificate errors, transfer timeouts, and rate limits need distinct diagnoses. Lower transfer concurrency may help a constrained connection. Docker Hub applies account-dependent pull quotas and separate abuse limits. Paid accounts remain subject to fair-use conditions.

## Exit codes

A container's `.State.ExitCode` needs interpretation alongside its state and logs. A running container has not produced a final exit status. Docker command failures must also be distinguished from application exit statuses.

| Code | Common interpretation |
| --- | --- |
| `0` | Successful process completion |
| `1` | General application failure, with program-specific meaning |
| `125` | Docker run invocation or startup error |
| `126` | Requested command could not be invoked |
| `127` | Requested command could not be found |
| `137` | On Linux, often termination by `SIGKILL` |
| `139` | On Linux, often `SIGSEGV`, indicating an invalid memory reference |
| `143` | On Linux, often termination by `SIGTERM` |

Code 137 can follow an explicit kill, an out-of-memory event, or an expired stop timeout. `OOMKilled` and host logs help distinguish these causes. Docker normally requests termination before forcibly killing a process that exceeds its stop timeout. Signal-based values are clues because applications can choose their own numeric exit codes.

## Mounts and storage

Linux bind mounts support files and directories with compatible source and destination types. Container destinations must be absolute, while host-path syntax depends on the platform and shell. Effective identity, ownership, permissions, and read-only settings determine access.

A mount can hide existing image contents without deleting them. Overlapping mounts therefore require inspection of actual destinations, rather than assumptions based on configuration order.

`docker volume ls` provides an inventory. `docker volume inspect` reports volume details, including a mountpoint on the daemon host. Container inspection's `Mounts` array shows the actual mappings. `Config.Volumes` describes declared destinations and is not a complete runtime map.

Volumes can survive container removal and may be shared. An unattached volume can still contain required data.

## Networks, ports, and DNS

Network behaviour depends on the driver and platform. For Linux containers, bridge networks connect containers on one host. User-defined bridges provide automatic name resolution. Native Linux host networking shares the host network namespace. Overlays connect workloads across swarm nodes, with attachable overlays allowing standalone containers to join.

IPvlan shares the parent interface's MAC address, while Macvlan assigns distinct MAC addresses. Custom plugins support specialised networks. The `none` driver retains loopback but removes external networking. Windows networking and Docker Desktop host networking have platform-specific behaviour.

`docker network ls` lists networks, and `docker network inspect` shows their configuration and attachments. Container inspection complements this with endpoint addresses and host port bindings.

A port conflict concerns a host address, port, and protocol. Containers can use identical internal ports independently. Docker run's `-p` and Compose's `ports` publish host bindings. Dockerfile `EXPOSE` does not publish a port by itself. In `8888:5000`, host port 8888 maps to container port 5000.

Windows `netstat -nao` and macOS `lsof` help identify listeners. Resolving the identified conflict or selecting another binding addresses the cause. Pruning unused resources cannot release a port held by a running process.

DNS translates names into network addresses. Docker's embedded DNS resolves container names and aliases on user-defined networks, including Compose service names. The network's name is not the application's hostname. Linux containers' `/etc/resolv.conf` lists resolver settings, commonly including `127.0.0.11` on user-defined networks.

A DNS server must be reachable and able to resolve the required names. Public DNS cannot guarantee success with private corporate names. Registry resolution by the daemon is separate from application resolution inside a container.

## Connectivity and certificates

Windows `route print` and macOS `netstat -rn` show routes, not every occupied IP address. Comparing Docker subnets with local and VPN routes can expose unintended overlap. Inside Linux containers, `ip addr show` displays interface addresses.

Ping tests Internet Control Message Protocol (ICMP) reachability. A working address with a failing hostname suggests a resolution or address-selection problem. Blocked ICMP can prevent replies despite a working application. Successful ping does not verify HTTP, Transport Layer Security (TLS), or application behaviour.

An unknown-certificate-authority error indicates that the relevant trust store cannot validate the certificate chain. Host trust and application-container trust are separate. Docker registry certificate directories interpret `.crt` as certificate authority (CA) certificates and `.cert` as client certificates requiring keys.

For a conventional native Linux daemon, registry-specific certificates sit under `/etc/docker/certs.d`, in a directory matching the registry hostname and any explicitly used port. Docker Desktop instead requires its documented host trust-store procedures and a restart after relevant certificate changes. The registry port is separate from the image tag.

An Ubuntu-based image can install a verified CA through its certificate store and `update-ca-certificates`. Other distributions and application runtimes may differ. Corporate TLS inspection may require the organisation's verified CA. Disabling verification does not repair the trust relationship.

## Cleanup and recovery

`docker system prune` removes stopped containers, unused networks, dangling images, and unused build cache by default. `--all` includes unused tagged images. `--volumes` includes eligible anonymous volumes, while `docker volume prune --all` also includes unused named volumes. Removal can destroy data and evidence, so eligibility alone does not establish that cleanup is appropriate.

Separate image, container, and network prune commands support time and label filters. Volume pruning supports label filters rather than an `until` timestamp. The `--force` option skips confirmation. Cleanup should address an identified resource problem instead of becoming an automatic response to every error.

A missing-network error can reflect an absent external network, an incorrect context, or a stale network ID. Recreating a network with the same name gives it a new ID. An existing container may still reference the old one.

`docker compose down` removes project containers and managed networks, while retaining named volumes by default and leaving external resources alone. A later `up` does not automatically reattach anonymous volumes by name. `docker compose up --force-recreate` can repair confirmed stale container configuration, but declared external networks must already exist.

Stopping a container leaves its object and configuration intact. By default, stopping the daemon stops containers, although supported live-restore configurations can keep them running. A daemon restart does not inherently delete networks or repair stale identifiers.

Recovery is established by successful application operations, including communication between dependent services.

## Support and continued learning

Docker's troubleshooting resources provide diagnostic procedures and service-status information. Paid support depends on subscription terms, while forums and community channels offer voluntary peer assistance. A useful report includes the exact error, platform and Docker versions, relevant configuration, and steps that reproduce the failure.

Training in image management, networking, and platform-specific administration can support more advanced investigation. Historical examples need comparison with current software and support requirements. Successful container creation alone does not establish production readiness.
