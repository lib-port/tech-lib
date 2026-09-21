# Docker Basic Concepts and Configuration

Docker packages applications and their dependencies into images, which provide templates for containers. A container combines an image with runtime settings and a writable filesystem layer. It can be running or stopped.

Linux containers share a Linux kernel, which can reduce overhead compared with virtual machines that each run an operating system. Namespaces isolate processes and networking, while control groups account for resource use and enforce configured limits. Isolation is not absolute. Vulnerabilities and excessive privileges can weaken it.

Images support consistent deployment, but execution still depends on compatible operating systems, processor architectures, runtime settings, and external services. Containers can run brief tasks or long-lived services.

## Platform and installation

Docker Engine combines a background daemon (`dockerd`), an application programming interface (API), and the `docker` command-line client. The daemon manages images, containers, networks, and volumes.

Docker Desktop bundles these tools with a graphical interface. On macOS and Windows, it supplies a Linux virtual machine for Linux containers. Supported Windows configurations also run Windows containers.

On Ubuntu, Docker's public APT repository supplies Engine, runtime, Buildx, and Compose packages. Distribution packages offer another installation route. Conflicting packages must first be removed. Repository configuration enables updates through APT, but does not automatically install them. Access to a daemon running with administrative privileges through the `docker` group grants root-level privileges.

## Building and sharing images

A `Dockerfile` defines image-building instructions. `FROM` selects a base image, `RUN` executes build commands, and `COPY` adds files. `CMD` or `ENTRYPOINT` defines the container's startup command.

For an Apache image, build instructions install the server and copy `index.html` into its configured web directory. The server normally runs in the foreground to keep the container's main process active.

`docker build -t myserver .` builds an image using the current directory as its build context. The context supplies files available to the builder. Modern Docker supports both `docker build` and `docker buildx build`. An omitted image tag selects `latest`, a label that does not guarantee the newest release.

Registries store and distribute images. Docker Hub is the default registry, while private registries provide another option. Matching local layers can be reused during downloads.

## Running and inspecting containers

`docker run` creates and starts a container. By default, Docker retrieves the image from its registry if it is absent locally. `-d` detaches the terminal, `--name` assigns a name, and `-e` sets an environment variable.

For a web server, `-p 8080:80` maps host port 8080 to container port 80. `EXPOSE 80` in a Dockerfile records the intended port but does not publish it. Published ports bind to all host interfaces by default. Specifying `127.0.0.1:8080:80` restricts the host binding to the local machine. Remote access requires a reachable host address and appropriate network settings. The address `10.0.3.164` is within a private IPv4 range.

A browser or `curl` can check the service through the host's published port.

`docker ps` lists running containers, while `docker ps -a` includes stopped ones. `docker stop` stops a container without removing it. `docker logs` displays captured standard output and standard error, subject to logging configuration. Application log files may require separate inspection.

## Configuration and networking

`docker info` reports system details and settings. Regular Linux Engine installations use `/etc/docker/daemon.json` for daemon configuration. Some changes support reloading, while others require restarting. New logging defaults apply to newly created containers. On systems using systemd, `systemctl` checks, starts, and enables the Docker service. `journalctl` provides access to Docker daemon logs.

Storage defaults depend on the Engine version. Fresh Engine 29.0 and later installations use the containerd image store and snapshotters. `overlay2` remains relevant to classic storage configurations. AuFS and device-mapper storage drivers have been removed from current Engine releases.

Bridge networks connect containers on one host. Host networking shares the host's network stack. Overlay networks connect Docker hosts, including Swarm nodes. The default `json-file` logging driver stores captured output as JSON. Alternatives include `journald`, CloudWatch, and Splunk.

## Applications with multiple containers

Docker Compose defines services, networks, and volumes in YAML, commonly for one host. Swarm mode provides cluster management within Docker Engine. Kubernetes supports deployment, scaling, and recovery for containerised workloads. Selection depends on workload and operational requirements.
