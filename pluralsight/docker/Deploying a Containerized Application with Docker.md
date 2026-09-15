# Deploying a Containerized Application with Docker

> [!NOTE]
> This guide explains how to build, run, share, update, configure, troubleshoot, and monitor a containerized Python application using Docker.

Docker packages application code, dependencies, and startup configuration into images. Containers run from these images, with settings such as network mappings and environment variables supplied at creation. Deployment combines preparing a working application, building and distributing an image, and managing the resulting containers.

### Preparing the Python application

An application's requirements include its runtime, dependencies, source files, configuration, and startup command. A Flask application may also need templates and static assets. Running it locally establishes a baseline for checking its containerised behaviour.

A Python virtual environment separates the project's packages from other Python installations. `python -m venv .venv` creates an environment, and `python -m pip install -r requirements.txt` installs dependencies into the selected environment. Activation depends on the operating system and shell. Alternatively, the environment's Python executable can be invoked directly.

Flask's built-in server supports local development. Production deployment requires a dedicated Web Server Gateway Interface (WSGI) server, such as Gunicorn or Waitress, or a suitable hosting platform. Running the development server inside Docker does not make it suitable for production.

### Building the image

A `Dockerfile` translates the application's setup into image-building instructions. A Python base image supplies Python and pip. Tags identify versions and variants, such as `python:3.12-slim-bookworm`. Slim variants contain fewer operating-system packages, so some dependencies require additional tools or libraries when built from source.

| Instruction | Function |
| --- | --- |
| `FROM` | Selects the base image. |
| `WORKDIR` | Sets the working directory. |
| `COPY` | Adds files to the image. |
| `RUN` | Executes commands during the build. |
| `CMD` | Defines the default container command. |
| `EXPOSE` | Records intended container ports as metadata. |

Copying `requirements.txt` and installing dependencies before copying application code allows unchanged dependency steps to reuse the build cache. A changed source file invalidates its relevant copy step and can require subsequent steps to run again. `.dockerignore` excludes unnecessary files, including the host's `.venv`.

A container is not a Python virtual environment. A dedicated image can install packages into its Python environment without a separate venv, but virtual environments remain useful in some container workflows.

`docker build -t flask-web .` builds an image using the current directory as its build context. The context supplies files available to the builder. The JSON-array form of `CMD` specifies an executable and arguments without an additional shell. The application starts when a container runs, rather than remaining active after the build.

### Using uv

The uv package manager offers another dependency workflow. Astral provides images through GitHub Container Registry, including Python-based variants. Alternatively, the uv binary can be copied into a Python image.

`pyproject.toml` describes the project, while `uv.lock` records resolved dependency versions. `uv sync` synchronises the project environment, normally creating or updating a virtual environment. `uv sync --locked` checks that the lockfile agrees with the project definition. Without a locking option, uv can update a stale lockfile.

Dependency definitions can be copied before application code to improve caching. `uv run` executes the application in its project environment. Both pip-based and uv-based images can run concurrently with different published host ports.

### Running and accessing containers

`docker run` creates and starts a container. It retrieves a missing image from the registry under the default pull policy. `-d` runs the container in the background, while `--name` assigns a name. Foreground execution displays attached output. The separate `-i` and `-t` options control standard input and terminal allocation.

For an application listening on `0.0.0.0:3000` inside the container, `-p 3001:3000` maps host port 3001 to container port 3000. A browser on the host uses `localhost:3001`. `EXPOSE 3000` does not establish this mapping or configure the application's listener.

Published ports normally bind to all host interfaces. `-p 127.0.0.1:3001:3000` restricts the published host binding to local access under normal networking settings. Remote access requires suitable routing and network permissions. A successful browser request checks application behaviour beyond whether the container has started.

### Sharing and identifying releases

Registries host repositories containing images. An image reference can include a registry, namespace, repository, and tag. A qualified reference could be `docker.io/namespace/flask-web:v2`. Docker Hub, at `docker.io`, is the default registry. GitHub Container Registry uses `ghcr.io`.

`docker tag` adds a reference to an existing image without rebuilding or uploading it. `docker login` authenticates to a registry, and `docker push` uploads an image where the account has permission. Unchanged layers already present can be reused. `docker pull` retrieves a published image, avoiding an unnecessary rebuild after local image removal.

Docker Hub normally uses a browser-based device-code flow for `docker login`. Other registries require their own supported credentials.

An image contains filesystem layers and separate configuration. Instructions such as `ENV` and `CMD` can change configuration without creating filesystem layers. Build-history entries therefore do not always correspond to layers.

Tags such as `v2` and `v3.0.1` distinguish releases, but tags can be reassigned. An omitted tag selects `latest`, which does not guarantee the newest build. A digest identifies specific image content.

### Stopping, replacing, and inspecting containers

`docker ps` lists running containers, while `docker ps -a` includes stopped ones. `docker stop` allows a graceful shutdown before forced termination if its timeout expires. `docker start` restarts the existing container with its existing image and configuration.

Deploying a newer image requires a replacement container. Rebuilding or retagging an image does not update an existing container. Names must remain unique on the daemon, including names held by stopped containers. Reusing a name and host port requires resolving those conflicts.

`--rm` automatically removes a container when it exits, including its writable layer and associated anonymous volumes. Images and named volumes remain. Data needed after replacement requires persistent storage. `docker rm -f` forcibly terminates a running container with `SIGKILL`, bypassing normal application cleanup.

### Debugging and runtime configuration

`docker logs` shows captured standard output and standard error, subject to logging configuration. Application log files may need separate inspection. A Flask endpoint returning a bare float produces a response-type error. Returning a string or supported JSON response resolves that specific issue.

Local Python execution can speed up development. Bind mounts or Compose Watch can instead make source edits available inside a development container. Host edits do not automatically change files already built into an image. Dependency changes can trigger an image rebuild through Compose Watch.

A release still requires testing from its built image, since local success does not establish correct packaging or startup behaviour.

Dockerfile `ENV` sets image defaults, while `docker run -e` supplies or overrides variables at container creation. `docker image inspect` shows image defaults, and `docker container inspect` shows a container's configuration.

Flask recognises the uppercase variable `FLASK_DEBUG`. Its development debugger and reloader can assist local diagnosis, but production deployments must keep them disabled. Disabling debug mode does not fix an underlying application error.

For Flask development, `-e FLASK_DEBUG=1` enables debugging, while `-e FLASK_DEBUG=0` overrides an enabled image default.

### Monitoring performance

`docker stats` reports CPU and memory use. On Linux, roughly 100% CPU represents one logical CPU, so workloads using several CPUs can exceed 100%.

ApacheBench, invoked as `ab`, generates HTTP requests. `-n` sets the total request count, while `-c` sets concurrent requests. Tests target the published host port. Low CPU use alone does not establish spare capacity. Response times, successful throughput, errors, resource limits, and bottlenecks also require assessment. Short tests and load-generator limits can distort results, and development-server measurements do not establish production capacity.
