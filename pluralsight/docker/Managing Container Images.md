# Managing Container Images

Container images package application files, dependencies, and configuration for deployment. Effective image management combines repeatable builds, controlled distribution, and security checks. It allows a tested software package to move between environments while keeping responsibility for runtime configuration, data, and access control explicit.

## Images, layers, and portability

An image combines read-only filesystem layers with configuration. A base image may supply the user-space components of Ubuntu or Alpine Linux, while additional layers introduce application software and files. Layers record filesystem changes in build order. They do not have to correspond to individual software components.

Starting a container adds a writable layer above the image. Changes outside mounted storage go into this layer without altering the image. Volumes, bind mounts, and logging systems can store data separately. Shared image layers reduce duplicated storage and network transfers, although application performance depends on more than image size.

A container is not a complete virtual machine. It requires a compatible runtime, kernel, and processor architecture. Multi-platform images provide variants for different platforms. Packaging dependencies improves consistency, but host capabilities, runtime settings, mounted files, and external services can still affect behaviour.

## Building and inspecting images

A Dockerfile describes how to build an image. Deployment descriptions, including Kubernetes manifests and cloud-service configurations, instead specify how existing images run. These files serve different purposes.

Common Dockerfile instructions have distinct roles:

| Instruction | Function |
| --- | --- |
| `FROM` | Starts a build stage from a base image. |
| `RUN` | Executes build commands. |
| `COPY` | Copies files from an allowed build source. |
| `ADD` | Adds files, with additional remote-source and local-archive handling. |
| `ARG` and `ENV` | Define build arguments and persistent environment settings, respectively. |
| `CMD` and `ENTRYPOINT` | Set the default command, arguments, or executable. |
| `USER` and `WORKDIR` | Select the execution identity and working directory. |
| `EXPOSE` | Records intended container ports without publishing them. |
| `VOLUME` | Declares a mount point without selecting a host directory. |
| `LABEL` | Records metadata, replacing the deprecated `MAINTAINER` instruction. |
| `HEALTHCHECK` and `STOPSIGNAL` | Configure health probing and the shutdown signal. |
| `ONBUILD` and `SHELL` | Register downstream build triggers and select the command shell. |

`ENTRYPOINT` can be overridden at runtime with `--entrypoint`. `USER` does not create an account. `ENV` affects subsequent build steps as well as containers, while `ARG` is not automatically a runtime setting. Neither provides appropriate secret storage.

`docker build -t webserver:1 .` builds an image using the current directory as its build context. `docker image ls` lists local images, and `docker history` shows recorded build steps. History is not a complete file inventory.

`docker search` finds public Docker Hub repositories. Curated images provide a useful starting point, but popularity does not replace checking the publisher, maintenance, and dependencies. `docker ps` lists running containers, and `docker stop` requests shutdown.

`docker run` creates and starts a container. Its `-d` option runs it in the background. A mapping such as `-p 8080:80` publishes container port 80 through host port 8080. The application must also listen on the appropriate container address. Server processes normally remain in the foreground to keep their containers running.

A `HEALTHCHECK` configures a probe whose exit code contributes to container health status. Diagnostic output is available through `docker inspect`, helping distinguish a running process from a responding application.

## Repeatable builds and updates

Dockerfiles provide a stronger build record than unrecorded interactive changes. `docker commit` can capture container changes for debugging, but it excludes mounted-volume data and does not document every action that produced the result.

Tags are labels that publishers can move to new content. `latest` does not guarantee the newest, safest, or most compatible release. A release tag narrows the intended version series but can still receive patched images.

A digest identifies specific content. Pinning an image by digest prevents a changed tag from silently selecting a replacement, but updates then require a deliberate change. Existing images and containers do not update themselves when an upstream tag changes.

Reliable maintenance involves monitoring dependencies, rebuilding, testing, and redeploying. Build inputs also require control. `--pull` checks for a fresh base image, while `--no-cache` prevents reuse of build-step results. These options address different sources of stale content. A fixed image reference alone cannot guarantee a reproducible build if downloaded dependencies remain uncontrolled.

## Efficient layers

Image size depends on retained files, rather than simply the number of Dockerfile instructions. Metadata-only instructions need not add filesystem layers. Useful cache reuse can also be lost when unrelated operations are combined.

Deleting a file in a later layer does not remove its bytes from an earlier layer. Downloading an archive, extracting it, and deleting it within one `RUN` instruction can avoid retaining the archive. Related shell commands can be joined with `&&`, which stops the sequence when a preceding command fails.

In Debian-based images, `apt-get update` refreshes package indexes. It does not upgrade installed packages or change the distribution release. Combining index refresh, installation, and package-list cleanup in one `RUN` instruction reduces stale-cache problems and retained data. Minimal suitable bases and necessary dependencies support efficient images without implying a fixed performance improvement.

## Registries and persistent storage

A registry stores repositories of images. Docker Hub provides public and private repositories, while managed services and self-hosted registries offer other arrangements. Google Cloud Artifact Registry replaced the earlier Container Registry service.

Sharing typically involves authentication, tagging, and pushing. A registry-qualified reference identifies the server, optional port, repository, and version. `docker tag` adds a reference to an existing image without copying its layers. `docker push` uploads it, and `docker pull` retrieves it. Removing a local image reference does not remove the registry copy.

Docker Personal includes up to one private repository. Privacy does not establish software safety. Docker Hub Automated Builds can build configured source branches and tags, but the feature is deprecated and scheduled for retirement on 1 April 2027. Supported build automation can test images before publishing them.

CNCF Distribution provides an open-source registry server, normally listening on container port 5000. Self-hosting gives operators control over access and storage while leaving them responsible for maintenance and recovery. Local hosting does not automatically ensure security or speed.

Registry data needs storage that can be retained and reattached during container replacement, commonly a named volume or a bind mount at `/var/lib/registry`. A bind mount exposes a host directory directly. It does not create a separate copy.

Stopping or killing a registry container does not itself delete its images. Container removal, volume deletion, and storage failure are separate events. A restart policy can restart the registry after a process exits or Docker restarts, but it cannot recover lost data. Persistent storage therefore needs an appropriate backup and recovery arrangement.

## Transport, credentials, and image trust

Transport Layer Security, or TLS, protects registry traffic and supports verification of the server's identity. The certificate must match the endpoint and be trusted by clients. An unprotected HTTP registry is suitable only for isolated testing.

Certbot can obtain and renew Let's Encrypt certificates. `fullchain.pem` contains the server certificate and intermediate chain, while `privkey.pem` contains the private key. Renewal must update the certificate actually served by the registry. Files copied elsewhere require a process to deploy renewed certificates, and private keys require restricted access.

Authentication and authorisation are separate from transport encryption. Distribution supports basic authentication using an `htpasswd` file containing bcrypt password hashes. Hashing is not reversible encryption. TLS protects credentials in transit, while repository permissions determine permitted operations.

Basic authentication controls entry to the registry. Fine-grained repository permissions can require a token service or another authorisation component.

Docker can store credentials through an operating-system credential helper. Without one, credentials may be saved as base64-encoded data in `config.json`. Base64 is not encryption. Passwords supplied as command arguments can also appear in shell history or process listings. On rootful Linux installations, membership of the `docker` group grants root-level privileges.

Image signatures associate content with an accepted signing identity. Verification requires trusted public information and an explicit policy. A digest establishes content identity but does not independently identify its publisher. Neither a valid signature nor official-image status establishes that software is free of vulnerabilities.

Docker Content Trust uses Notary v1 and is being retired. The Docker-hosted Notary v1 service is scheduled to close on 8 December 2026. Sigstore/Cosign and Notation provide current alternatives. Signing and verification remain separate from vulnerability assessment, and signatures provide protection only where the relevant verification policy is enforced.

## Kubernetes image access

Kubernetes runs containers in Pods using image references in resource manifests. Private registry credentials can be held in a Secret of type `kubernetes.io/dockerconfigjson`. The Pod's `imagePullSecrets` field refers to that Secret, which must exist in the same namespace. It is an API object, not a system environment variable.

Secret data needs protection beyond its base64 representation. Upstream Kubernetes stores Secrets unencrypted in etcd unless encryption at rest is configured. Role-based access control and carefully restricted namespace permissions are also needed. Authority to create Pods can provide indirect access to Secrets in their namespace.

Applying a manifest does not prove that an image was retrieved or that its application is healthy. Pod status and events help identify authentication, image-reference, and startup failures.

`ImagePullBackOff` indicates an image-pull failure with delayed retries. Pod events can reveal the cause.

## Kubernetes admission controls

Admission controllers inspect relevant API requests after authentication and authorisation and before resource persistence. Mutating controllers can change objects, while validating controllers can reject them. These controls can enforce image policies alongside other deployment requirements.

Mutating admission runs before validation. A rejection prevents the request from proceeding.

`AlwaysPullImages` sets new Pods to use `imagePullPolicy: Always`. The runtime contacts the registry but can reuse cached layers, so a full download is not required every time. This helps enforce private-image credentials in shared clusters, where cached images might otherwise be reused without a fresh registry check.

`ImagePolicyWebhook` sends image-review requests to an external HTTPS service for an admission decision. Its configuration defines the connection and failure behaviour. Signature or vulnerability checks depend on the backend policy, rather than following automatically from enabling the plugin.
