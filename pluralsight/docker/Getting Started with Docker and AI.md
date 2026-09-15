# Getting Started with Docker and AI

> [!NOTE]
> This guide explains how Docker Model Runner enables private, container-integrated local AI deployment while highlighting model management, application integration, hardware, security, and operational considerations.

Docker Model Runner, or DMR, connects local AI inference with Docker's application workflow. It manages model artefacts and inference engines, allowing applications to request responses from models on supported local hardware. Docker Compose can coordinate model requirements with application services, networks, and storage.

Local deployment can support control over sensitive information and reduce dependence on hosted inference services. It also transfers responsibility for hardware, electricity, maintenance, and capacity to the operator. Privacy and cost depend on the complete deployment, rather than simply on where the model runs.

## How local inference works

Three components have distinct roles. Model weights contain learned numerical values. An inference engine loads those weights and performs the computation. An application manages interactions and sends requests to the engine through a model-serving API.

DMR integrates with Docker Desktop, Docker Engine, Docker Hub, the command-line interface (CLI), and Compose. Its default engine is llama.cpp, with additional engines such as vLLM and Diffusers available for supported workloads. Capabilities and hardware requirements differ between engines. Suitable configurations can support text generation, numerical representations of content called embeddings, vision input, and image generation.

Execution also varies by platform. DMR uses native, sandboxed inference engines on macOS and Windows, while Linux deployments use containers. On Apple Silicon, native inference can use Metal GPU acceleration that ordinary Linux containers in Docker Desktop's virtual machine cannot directly access.

Containers can support GPU acceleration on suitable systems. Available technologies include NVIDIA CUDA, AMD ROCm, and other platform-specific backends. Support depends on the operating system, drivers, engine, and configuration. Some Linux GPU deployments require additional runtime components, such as the NVIDIA Container Toolkit, alongside compatible host drivers.

A GPU is not essential for every useful workload. CPU inference can suit smaller models and modest demand. Model size, quantisation, memory, context length, and concurrent requests influence performance. A GPU's presence alone does not establish that the selected engine can use it.

## Choosing and distributing models

Model selection involves parameter count, supported tasks, format, context limits, licence conditions, and measured performance. Variants within a family can have different memory requirements and capabilities. Qwen3-0.6B has approximately 0.6 billion parameters, while Gemma 3 includes a 4-billion-parameter variant. A family's name alone does not identify its exact capabilities.

Quantisation reduces the precision used to represent model weights, lowering storage and memory requirements. Its effect on response quality depends on the model, method, and task. `Q4_K_M`, for example, is a mixed quantisation scheme, rather than exactly four bits for every stored weight. Runtime memory also includes context and engine overhead beyond the model file.

Context settings cover both supplied text and generated output within the model's limits. Increasing context size can increase memory demand, and runtime flags must match the selected engine.

llama.cpp commonly uses GGUF model files. DMR also supports other formats through suitable engines and packaging, including Safetensors with vLLM. The documented direct Hugging Face pull workflow supports GGUF, which does not mean that DMR is limited to that format overall.

Docker packages models as artefacts compatible with the Open Container Initiative, or OCI. Manifests and configuration describe model components, allowing compatible registries to distribute them alongside other software artefacts. Model packaging does not turn the weights into an executable application container.

Cryptographic digests identify content precisely. Tags such as `latest` can move to different content, so they do not permanently identify a particular model variant. Content addressing can also support deduplication. Neither a matching digest nor a curated catalogue establishes a model's safety or accuracy.

Model cards, publisher identity, and licence information provide context for selection. Open weights do not imply unrestricted use. The organisation packaging a model may differ from its original developer. Repository names and tags therefore need to be read alongside the model card. A precise variant or digest helps identify what was evaluated and deployed.

Benchmarks describe particular evaluation conditions, while representative application testing establishes whether a model meets the intended quality and performance requirements.

## Installation and API access

Docker Desktop provides DMR on supported macOS and Windows systems, with current controls under its AI settings. Supported Linux installations can use Docker Engine and the Docker model plugin. Requirements should be checked for the relevant platform and features, since historical version numbers and beta menus can become outdated. Docker Desktop subscription conditions also apply to organisational use.

DMR exposes OpenAI-compatible endpoints. Compatible applications can often be adapted by changing their server address and model identifier, but supported parameters and behaviour still require validation. API compatibility does not reproduce every capability of a hosted provider.

Docker Desktop supplies `model-runner.docker.internal` for container access. Optional host-side TCP access commonly uses port 12434. Docker Engine connections may need an explicit host-gateway mapping and port, so the Desktop hostname is not a universal networking assumption.

The chat route is `/engines/v1/chat/completions` beneath the appropriate server address. Requests specify a model and conversational messages, with supported options for sampling and streaming.

DMR's API does not require authentication. Reachability depends on the listener, routing, and firewall configuration. Enabling TCP access is therefore separate from securing the endpoint, and a client that can reach it can use its exposed operations.

## Downloading, loading, and conversation context

Downloading a model makes its artefact available on disk. Loading it places the required data into memory for inference. These are separate stages, allowing several downloaded models to exist without all remaining loaded.

| Command | Purpose |
| --- | --- |
| `docker model pull` | Download a supported model artefact |
| `docker model list` | List locally available models |
| `docker model inspect` | Examine model metadata |
| `docker model run` | Submit a prompt or start interactive chat |

Model storage paths vary by platform and configuration. A direct inference request should not be assumed to download a missing model automatically. CLI and Compose workflows can arrange provisioning, while the inference service loads available models as needed.

The first response can take longer because of model loading. DMR can unload a model after five minutes of inactivity, with behaviour depending on the engine, configuration, and version. Unloading from memory does not delete the downloaded artefact.

Conversation context is managed by the client or application. Earlier messages can accompany a new prompt, enabling follow-up questions within the model's context limit. Persisted chat history can restore an exchange after an application restart. This is application-level storage, rather than permanent learning within the model weights.

System instructions can request concise answers or another style, but they do not guarantee compliance or factual correctness. A successful response establishes that one inference request worked, rather than proving general reliability.

Testing through the CLI, Docker Desktop, and the API can help isolate connection or application problems. Response timing also varies with output length, hardware load, and simultaneous requests.

## Coordinating services with Compose

A custom chatbot can separate browser interaction, application logic, and inference. An illustrative arrangement uses a Remix frontend on port 3000, a FastAPI backend on port 8000, and DMR. The backend prepares model requests and passes responses to the frontend, potentially streaming output as it arrives.

Frontend and backend containers can share a Compose network. The frontend's port can be published on the host while the backend's port remains unpublished. Remote reachability depends on the published address and network controls.

Compose can build frontend and backend images from separate source directories. Their configuration must agree with the code about model identifiers, variable names, and connection addresses. A repository checkout still requires compatible dependencies.

Docker Compose introduced model declarations in version 2.38.0. A top-level `models` element identifies required models and supported runtime settings. A service's `models` attribute associates that service with a model definition and supplies endpoint and model configuration. Other platforms can implement this abstraction, but general Compose support does not guarantee support for models.

The association is not an access-control rule. A client without it can still contact a reachable, unauthenticated DMR endpoint. Explicit `endpoint_var` and `model_var` settings can provide the environment-variable names expected by an application without relying on version-sensitive defaults.

A `.env` file supplies values for Compose interpolation. Containers receive those values when the configuration passes them through mechanisms such as `environment` or `env_file`. The file's presence alone does not inject every value into every container.

Service startup order and readiness are also distinct. The short `depends_on` form waits for a dependency to start, while a healthcheck with `service_healthy` can express readiness. Model provisioning does not guarantee that weights are already loaded for inference.

`docker compose up` starts the configured application, with detached mode available for background operation. `docker compose down` removes its containers and associated non-external networks. Image removal, volume deletion, and model-artefact management are separate lifecycle decisions.

## A chatbot with Open WebUI

Open WebUI provides a self-hosted interface for compatible local and remote model services. It offers account management, chat history, and response controls, reducing the application code needed for a chatbot. A familiar interface does not establish equivalence with a commercial model service. Open WebUI also has its own licence conditions, including branding requirements.

A Compose deployment can combine an Open WebUI service, a model declaration, and persistent storage. The application's container listens on port 8080. A mapping such as `3001:8080` publishes it on host port 3001, avoiding a clash with another application using port 3000.

The `main` image tag is a moving reference, rather than a special OpenAI-only edition. Supported release images also provide the compatible connection. A tested release tag or digest gives greater control over deployment versions.

Connection settings must identify DMR's compatible API address and the intended model. Relevant Open WebUI settings include `OPENAI_API_BASE_URL` and `DEFAULT_MODELS`. Saved application settings can influence the effective configuration, so an environment value alone may not describe the running application's selection.

The default model setting chooses an initial selection. It does not restrict access to that model, and the available list depends on backend configuration and application permissions.

A volume mounted at `/app/backend/data` preserves application data, including settings, account information, and conversation history. Recreating the container with the same volume can retain that state. Ordinary `docker compose down` retains named volumes, while adding `--volumes` can delete Compose-managed data. External volumes are not removed by that command.

Initial startup can involve downloading supporting assets, depending on the image and enabled features. Container creation or completed download progress does not prove readiness. Logs, health status, and a successful connection distinguish normal initialisation from failures.

Open WebUI account authentication is separate from DMR's unauthenticated API. Disabling it removes an application access control and is not a general default for shared deployments.

## Privacy and operational readiness

Local inference can keep prompts and responses within local infrastructure when the application uses local endpoints. Fully offline operation additionally requires the necessary images, models, and supporting assets to be available, with online dependencies removed or disabled. The complete application needs testing without connectivity.

Local generation can avoid a hosted model's per-request fees, but downloads and optional connected services retain their own conditions and limits. Memory and processing capacity also constrain how many users a local service can support.

Optional integrations, update checks, downloads, and product usage requests can still involve external services. DMR can make model-name and usage-related requests under certain conditions. Docker's usage-collection policy excludes prompt content and model responses, but that does not imply the absence of outbound traffic.

Persistent conversations and logs can also contain sensitive information. Access controls, storage protection, and retention choices affect privacy even when inference stays local.

A functioning chatbot is a starting point for assessing deployment suitability. Model accuracy, response latency, capacity, application readiness, network exposure, and persistent-data handling determine whether it meets operational needs. Local execution avoids some hosted-service dependencies while retaining the costs and limitations of the infrastructure that serves it.
