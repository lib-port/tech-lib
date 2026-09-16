# Continuous Integration and Continuous Delivery (CI/CD)
## CI/CD and infrastructure as code

CI/CD combines continuous integration with continuous delivery or deployment to make software changes easier to test and release. Infrastructure as code (IaC) automates provisioning and configuration of the resources applications need. Together, these practices support DevOps collaboration between development and operations teams.

### Integrating and releasing software

| Practice | Function |
| --- | --- |
| Continuous integration | Developers frequently merge small changes into a shared main branch. Automated builds and tests check the integrated code. |
| Continuous delivery | Software remains ready for production release through automated checks and repeatable deployment processes. Release timing can remain a human decision. |
| Continuous deployment | Every change that passes the required pipeline checks is automatically deployed to production, without a separate manual release decision. |

Continuous delivery can include production deployment, with a release decision made when appropriate. Pipelines may also test branches and pull requests before merging, while code reviews provide an additional check on proposed changes.

CI/CD extends across integration, building, testing, release preparation, and deployment. Small changes can reduce integration difficulties, while automation provides faster feedback and more repeatable releases. These benefits depend on effective tests and maintenance. Passing checks does not establish that software is free of defects.

### Platforms and tools

Teams within an organisation can use different platforms when these meet their needs and work together. Jenkins, CircleCI, Travis CI, and GitHub Actions automate build, test, and deployment workflows. Selection also depends on compatibility and maintenance.

CircleCI normally uses `.circleci/config.yml`, Travis CI uses `.travis.yml`, and GitHub Actions stores workflows in `.github/workflows`. Jenkins can distribute builds across worker machines.

### Infrastructure as code

IaC defines servers, networks, storage, and configuration in machine-readable files kept under version control. Reusable definitions can accelerate provisioning, improve consistency, preserve operational knowledge, and support scaling or removing resources. Identical results and cost savings still depend on controlled inputs and careful management.

Configuration management tools and scripts have long supported infrastructure automation. Configuration management can implement IaC by expressing system settings as code.

A declarative approach specifies desired state and lets a tool determine the actions required. An imperative approach specifies ordered actions. Tools can combine both approaches. IaC uses several languages and formats. Authors may still need to declare dependencies explicitly.

Terraform provisions infrastructure and previews changes through execution plans. Current releases use a source-available licence with restrictions. Ansible configures systems through YAML playbooks. Terraform and Ansible can work together, with Terraform creating resources and Ansible configuring software on them. Chef combines recipes with desired-state resources, Puppet uses declarative configuration, and Salt supports configuration management and remote execution.

Ansible inventories identify hosts and groups, variables provide settings, and playbooks organise tasks into plays targeting those hosts. Inventories may also be dynamic. Ansible's agentless design avoids a persistent Ansible agent on managed systems, although connection access and software requirements remain. Many modules are idempotent, meaning repeated execution leaves an already achieved desired state unchanged. This property is not guaranteed for every module or playbook.

## Continuous Integration

Continuous integration, or CI, is a software development practice in which developers frequently integrate small changes into a shared main branch. Automated builds and tests check the combined code and provide feedback about problems. CI supports collaboration across development and operations, commonly associated with DevOps.

Automation alone does not establish CI. Teams also need frequent integration, useful tests, and prompt attention to failures. Long-lived branches can accumulate integration problems even when automated checks pass on each branch separately.

### Frequent integration and reliable feedback

Delayed integration allows independent changes to diverge. Tests performed in isolation may miss interactions between those changes. Integrating earlier exposes problems while the work is still familiar and usually makes diagnosis easier.

Teams practising CI commonly integrate at least daily, either directly into the main branch or through short-lived branches. Pull requests support review before merging, but they are optional workflow mechanisms. Small, focused changes can simplify review, although their consequences depend on the affected behaviour rather than the number of edited lines.

CI can shorten feedback cycles and reduce integration delays. Passing tests provide evidence about the behaviour examined, without proving that an application is defect-free or ready for production. Keeping the main branch buildable requires suitable checks and an effective response to failures. Deployment requires additional configured steps.

Code coverage measures which parts of a program execute during tests. A falling percentage can reveal gaps, but high coverage does not establish that assertions are useful or important cases are covered. Coverage thresholds reflect project policy. Human review complements automation by assessing purpose, design, and test quality.

CI results also make the state of shared work visible to collaborators. A successful run reflects the workflow's success criteria, but it does not measure all remaining development effort or establish a delivery date.

### Collaboration and version control

Social coding combines shared repositories, discussion, issue tracking, and contribution review. InnerSource applies practices associated with open-source development within an organisation, including projects that remain private. Internal discoverability can encourage reuse and collaboration across teams, although contributions still require review, integration, and maintenance.

Collaboration does not require public access or unrestricted contributions. Organisations can retain access controls and assign responsibility to maintainers while encouraging work across team boundaries. Issues can record proposed changes and provide a place to agree on their purpose before implementation begins.

Version control records changes, supports comparisons, and helps recover earlier states. Git is a distributed version control system created in 2005 for Linux kernel development. GitHub, GitLab, and Bitbucket provide hosting and collaboration services around repositories.

A normal full Git clone includes versioned files and history, allowing local inspection and commits. Shallow or partial clones can omit history or objects. Even a complete clone does not automatically preserve hosting-service settings, issue discussions, or work that contributors have never shared. Centralised version control also permits local builds when working copies contain the necessary files.

Git distinguishes working files, the staging area, and committed history. The staging area, also called the index, holds the content selected for the next commit.

| Command | Purpose |
| --- | --- |
| `git status` | Shows staged changes, other tracked changes, and untracked files. |
| `git add` | Records selected content in the index without moving the working files. |
| `git commit` | Creates a local commit from staged content. |
| `git push` | Sends commits and updates remote references, subject to permissions. |
| `git fetch` | Downloads objects, including file content and history, and updates remote-tracking references without normally integrating changes. |
| `git pull` | Fetches changes and integrates a selected branch through merge, rebase, or fast-forward behaviour. |

Inspecting staged changes helps prevent unrelated files from entering a commit. A local commit remains local until shared, and pushing a feature branch does not integrate it into the main branch. `git push -u origin feature` also establishes upstream tracking for the local branch. The `-u` option is not required to create the remote branch.

Fetching permits inspection before integration. It does not eliminate conflicts, which may appear when branches are subsequently combined. Ignore rules help exclude suitable untracked files, but they do not automatically stop Git tracking files already committed.

Commands that restore files or move branch pointers require care. `git checkout -- .` discards unstaged changes in tracked files under the current directory by restoring their indexed content. `git reset --soft HEAD~1` moves the branch back one commit while preserving staged content and working files. A hard reset also resets the index and tracked files, discarding relevant uncommitted work. It can also overwrite untracked paths that obstruct restoration, although it does not remove every untracked file.

### Branches and pull requests

A feature-branch workflow begins from an updated base. Contributors make focused changes, run checks, stage intended content, and commit with descriptive messages. Pushing the branch makes it available for discussion and review.

Before merging, contributors incorporate relevant target-branch changes according to the team's merge or rebase policy, resolve conflicts, and test the result. Pull requests must identify the intended base branch and repository, particularly when contributions originate in forks.

Reviewers can approve changes, comment, or request revisions. Required approvals and status checks depend on repository rules, while permissions determine who can merge. Updated commits can trigger further checks when the workflow includes the appropriate events.

After merging, developers update their local main branch and can delete the completed feature branch. GitHub also supports browser-based file creation and editing, with changes committed directly to permitted branches or proposed through pull requests.

### CI platforms

CI platforms automate tasks such as obtaining code, preparing dependencies, running checks, and reporting results. Their configuration and operating responsibilities differ.

| Platform | Configuration and operation |
| --- | --- |
| Jenkins | An open-source automation server. Pipelines use a Groovy-based Jenkinsfile, with work performed on agents. Plugins extend functionality and require maintenance. Controller settings can be automated through Configuration as Code. |
| CircleCI | Normally uses `.circleci/config.yml`. It offers hosted execution and an enterprise Server edition for customer-managed Kubernetes environments. |
| Travis CI | Normally uses `.travis.yml`, including conditions for builds, stages, and jobs. Hosted and Enterprise deployment options are available. |
| GitHub Actions | Uses YAML workflows within a GitHub repository and integrates execution results with repository activity. |

Hosted services reduce some infrastructure responsibilities, while projects retain responsibility for configuration, dependencies, and access. Container support does not remove operating-system, architecture, or resource constraints.

Jenkins can declare some triggers within a Jenkinsfile, with webhooks or other integrations configured as needed. Its interface is therefore only one route to configuration. CircleCI and Travis CI likewise express substantial pipeline behaviour in repository files that can be reviewed alongside application changes.

### GitHub Actions workflows

Workflow files end in `.yml` or `.yaml` and reside in `.github/workflows`. YAML structure depends on indentation using spaces. A workflow's display `name` is optional.

Actions is enabled by default, but repository and organisation policies can restrict execution. Permissions, secrets, runner availability, and usage limits can also affect whether a workflow runs.

| Component | Function |
| --- | --- |
| Event | An occurrence that can trigger a workflow, subject to filters. |
| Job | A group of steps executed in a runner environment. |
| Runner | The machine and software environment executing a job. |
| Service | A supporting container, such as a database. |
| Step | Shell commands or an invocation of one action. |
| Action | A reusable component that can perform several operations. |

Jobs normally run independently when capacity permits. The `needs` keyword establishes dependencies, such as requiring successful tests before publishing. Steps within a job run in sequence and share its workspace. Separate step processes do not automatically retain shell variables from earlier steps.

Job identifiers must be unique, start with a letter or underscore, and contain only letters, numbers, hyphens, or underscores. Display names are separate from identifiers. Jobs calling reusable workflows use a different structure from jobs that directly declare their own steps.

The `on` field defines triggers, including pushes, pull requests, releases, schedules, or manual requests. A push filter for `main` selects pushes to that branch. A local commit alone does not trigger a remote workflow. Pull-request branch filters select the base branch receiving changes.

By default, `pull_request` responds to opening, reopening, and synchronising a pull request. Synchronising includes updates to its head branch. Explicitly selecting only opening and reopening excludes those subsequent updates.

A published release can trigger distribution of Python packages, Java artifacts, or container images. Publishing requires the appropriate build operations, credentials, and destination configuration.

### Runners, services, and reusable actions

The `runs-on` field selects a runner. GitHub provides hosted Linux, Windows, and macOS environments, while organisations can operate self-hosted runners. Most hosted jobs receive fresh virtual machines, although some runner types use containers on shared infrastructure.

Labels such as `ubuntu-latest` refer to stable GitHub images rather than necessarily the vendor's newest release. Version-specific operating-system labels do not freeze every installed tool. Matching development and CI environments can reduce differences, but repeatability also depends on dependencies and external inputs.

A job can run inside a container on a compatible Linux runner. The container's distribution can differ from the host's. Floating image tags can change, while image digests identify specific images.

Service containers supply dependencies such as Redis or PostgreSQL. Containerised jobs can address services by their configured service labels. Jobs running directly on the runner normally connect through localhost and mapped ports. These container features require Linux and Docker support.

A step invokes an action with `uses` or executes shell commands with `run`. A literal block introduced by `run: |` supports multiple command lines. Step names improve logs, while identifiers allow references to outputs. The `env` field, outputs, and environment files provide supported ways to configure or exchange values.

Configuration values such as a database address can be passed through environment variables. Sensitive values need appropriate secret handling. Reusing an action reduces duplicated configuration, but the project remains responsible for understanding the operations it performs and the access it receives.

Actions can check out code, configure runtimes, upload artifacts, or submit coverage. Inputs supplied through `with` depend on the selected action. Marketplace listings and starter workflows provide examples, but adoption still requires reviewing permissions, documentation, and maintenance. Pinning a trusted action to a full commit hash provides an immutable reference.

### A Python CI pipeline

A typical pipeline follows these stages:

1. Check out the repository and prepare a compatible Python interpreter.
2. Install application and test dependencies.
3. Run static checks to identify coding and style problems.
4. Execute tests and collect coverage when configured.
5. Report results and upload required artifacts.

These operations do not create a distributable package unless packaging is explicitly included. A workflow definition also needs executable work. An empty job cannot provide a functioning pipeline.

`actions/checkout` obtains repository files. A setup action or container can provide Python, with versions selected for compatibility with the application and its dependencies.

`python -m pip install -r requirements.txt` installs the specified requirements through the selected interpreter. Requirements files can include version constraints. Upgrading pip requires an existing pip installation, while `ensurepip` can bootstrap it in supported Python environments. Switching arbitrarily between `pip` and `pip3` does not resolve every installation failure.

Flake8 reports problems according to its installed tools and configuration. These can include syntax errors, undefined names, and style violations. The selection `E9,F63,F7,F82` includes programming errors beyond syntax alone. Broader checks still follow configured selection and ignore rules.

Flake8's `--count` reports violation totals, `--statistics` groups counts by code, and `--show-source` displays affected source lines. Complexity and line-length thresholds are project choices.

Separating essential error checks from broader style checks can help teams introduce enforcement without overlooking their existing codebase.

Tests check behaviour through execution and assertions. Coverage configuration must identify the application package so that measurements reflect the intended code. Coverage uploads to services such as Codecov or Coveralls require compatible reporting formats and uploader settings.

Python 3.9 reached end of life on 31 October 2025. Nose is also a legacy test runner whose documentation directs new projects towards alternatives such as pytest, nose2, or unittest. Updating an older pipeline requires reviewing interpreter, application, and test compatibility together.

Historical action, container, and uploader versions require compatibility checks before reuse. Updating an operating-system label alone does not ensure that an older application or test suite will run correctly.

GitHub CLI supports browser-based authentication as well as suitable tokens. Required permissions depend on the authentication method and operations, including workflow-file updates. Git author name and email settings identify commits and are separate from authentication. Credentials require suitable storage and must not be committed in workflow files.

Forking creates a hosted repository copy, while cloning creates a local working repository. GitHub CLI can assist with both. Fine-grained tokens use repository-specific permissions, while classic tokens use scopes, so their access requirements cannot be treated as interchangeable.

Workflow changes follow the normal staging, committing, and pushing process. The Actions interface provides runs, job results, and step logs for diagnosing failures. A completed cleanup step does not establish success. The overall conclusion and relevant check results determine whether the run passed, failed, or was skipped.

## Continuous Delivery

Continuous delivery keeps software ready for release through frequent integration, automated checks, and repeatable deployment procedures. Its purpose is to make changes available safely and promptly while providing evidence that they can operate in the intended environment. Tekton supports this work through reusable pipeline components that run on Kubernetes.

### Integration, delivery, and deployment

Continuous integration, continuous delivery, and continuous deployment describe related practices with different responsibilities.

| Practice | Main purpose | Production release |
| --- | --- | --- |
| Continuous integration | Combines changes frequently in a shared codebase and checks them through automated builds and tests. | Does not itself require a production deployment. |
| Continuous delivery | Keeps validated software ready for release through automated preparation and deployment procedures. | Can retain an approval or business decision about when to release. |
| Continuous deployment | Automatically deploys eligible changes after they pass the required checks. | Proceeds without a routine manual release decision. |

Continuous delivery includes production readiness and deployment on demand. It is not confined to development, test, or staging environments. Those environments provide opportunities to exercise deployment procedures and assess working software before release.

The shared branch, often named main, master, or trunk, should remain releasable. Frequent integration helps expose incompatible changes early. Pull requests, reviews, and automated checks support this goal, but neither a merge nor a successful test run proves that software has no defects.

Automation can shorten delivery times, reduce repetitive work, and lower the cost of diagnosing deployment failures. These benefits depend on reliable infrastructure, meaningful checks, and prompt responses to failures. Successful staging deployments increase confidence without guaranteeing identical production behaviour, where traffic, data, and configuration can differ.

### Principles and working practices

Five principles support reliable delivery:

- Quality throughout. Design, review, and testing accompany changes throughout development instead of becoming a final inspection.
- Small batches. Limited changes make review, integration, and diagnosis easier, although small changes can still carry significant risk.
- Automation of repetition. Computers perform routine builds, tests, and deployment steps, while people investigate problems and make decisions.
- Continuous improvement. Failures and operational feedback guide changes to the system and its delivery process.
- Shared responsibility. Development, testing, and operations contribute to release quality and examine failures without reducing them to personal blame.

A releasable change includes relevant documentation and operational knowledge. User documentation explains behaviour, while runbooks describe operation and recovery. Change records and test results help later investigation and audit. Release readiness therefore extends beyond executable code.

Short-lived branches and frequent merging reduce divergence from the shared codebase. Trunk-based development centres work on frequent integration with the trunk. Maintaining branches for long periods can delay feedback and make eventual integration harder.

Automation can cover environment provisioning as well as builds and deployments. Reusing deployment procedures across development, test, staging, and production reduces accidental variation. Environment-specific settings remain explicit. A deliberate release approval can coexist with automated execution.

Availability requires attention during updates. A new version can be validated before receiving normal traffic, and deployment arrangements can preserve service while instances change. Zero downtime depends on application design, deployment strategy, and compatibility with data and dependencies.

Components that must be tested together need compatible releases. Coordinated delivery can preserve a tested combination. Sufficiently decoupled components can be released independently when their interfaces and compatibility checks support that independence.

Frequent execution also creates opportunities to improve the delivery process itself. A team can examine which failures escape review, which checks provide slow feedback, and which deployment steps depend on undocumented knowledge. Reliability improves through acting on this evidence. Repeating an unchanged faulty procedure does not make it more reliable.

### The foundations of a pipeline

A delivery pipeline needs four main capabilities: versioned source, controlled build execution, orchestration, and artefact storage. These capabilities can share a platform rather than requiring four separate servers.

Version control records application code, build definitions, test configuration, and deployment manifests. Credentials require protected handling outside ordinary source files. A clean execution environment reduces dependence on leftovers from previous jobs, while controlled tool and dependency versions improve repeatability.

The orchestrator schedules work, enforces dependencies, and records results. An artefact repository stores build outputs such as packages, binaries, or container images. An image registry performs this role for container applications. Deploying the tested artefact preserves the connection between verification and release.

The source revision, build inputs, and resulting artefact need a clear relationship. Otherwise, a successful check can be associated with code or an image different from the one released. Controlled inputs and retained outputs help teams reproduce failures and understand what changed between deployments, while clean builds limit accidental dependence on earlier executions.

Security checks provide complementary evidence. Dependency scanning identifies known component vulnerabilities. Secret scanning looks for exposed credentials. Static application security testing examines code or related program representations, while dynamic application security testing examines a running application. Each technique has limits and can miss weaknesses. Newly disclosed vulnerabilities can also affect unchanged software.

These checks support review and risk assessment. A clean scan does not establish complete security, just as passing tests does not establish complete correctness. Failed checks need an explicit response before dependent release work proceeds.

### Delivery tools

Tool selection depends on the existing workflow, deployment targets, and the organisation's capacity to operate the system. Relevant features include audit records, secrets management, role-based access control, integration support, and useful failure reporting. Setup effort and continuing maintenance both contribute to cost.

Capabilities also vary by edition and configuration. A tool that fits a small workflow may need additional integrations as release coordination becomes more complex. Compatibility with established source management and operational practices can be as consequential as the length of its feature list.

Jenkins, GitLab CI/CD, Travis CI, and Concourse can coordinate automated development and delivery work. Jenkins provides extensible pipelines and pipeline visualisation. Its configuration and maintenance requirements vary with the installation and plugins in use. Concourse uses containers for task execution, while GitLab combines source management with CI/CD capabilities.

Spinnaker focuses on managing software delivery across cloud environments. GoCD provides visibility across connected pipeline stages through its value stream map. Their suitability depends on the required release process and integrations.

Argo CD follows a GitOps approach for Kubernetes. Git records the intended application configuration, and a controller compares it with the running cluster. Synchronisation can be manual or automated through policy. Automatically correcting changes made directly in the cluster requires suitable self-healing configuration.

Tekton provides modular pipeline building blocks within Kubernetes. Its tasks can invoke tools for different deployment targets, although pipeline execution itself takes place in the cluster. Portability depends on compatible APIs, container images, permissions, storage, and external services. Choosing an orchestrator does not automatically supply every check or deployment capability an application needs.

### Tekton's resources and execution model

Tekton extends Kubernetes with custom resource definitions, or CRDs. These define additional resource types that Kubernetes can manage. The main distinction is between reusable definitions and records of individual executions.

| Component | Role |
| --- | --- |
| Step | Runs a command or script using a specified container image. |
| Task | Defines an ordered set of Steps and their inputs. |
| Pipeline | Combines tasks and declares their dependencies. |
| TaskRun | Records and manages one execution of a Task. |
| PipelineRun | Records and manages one execution of a Pipeline. |
| EventListener | Receives external events through Tekton Triggers. |
| TriggerBinding | Extracts event data into named parameters. |
| TriggerTemplate | Describes resources to create using those parameters. |

For an ordinary container Task, the Steps execute in order within one Kubernetes Pod, a group of containers managed together. Separate Tasks normally run in separate Pods. Independent pipeline tasks can execute concurrently when resources and scheduling permit.

A PipelineRun supplies concrete parameters, storage bindings, and execution settings. Tekton's controllers then create and manage the required TaskRuns. Applying a Task or Pipeline manifest creates its definition without starting its workload. Creating a run initiates execution.

Parameters, workspaces, and results serve different purposes. Parameters carry input values, such as repository addresses or image names. Workspaces expose files required by the work. Results publish defined outputs that other tasks can consume. Keeping these interfaces explicit makes a reusable Task easier to connect to different Pipelines.

Kubernetes handles the underlying scheduling and resources. Tekton can therefore operate on supported cloud or on-premises clusters without a separate external pipeline execution server. The cluster still needs installation, capacity planning, permissions, and maintenance.

### Reusable tasks and explicit dependencies

Tekton manifests commonly use YAML. Each identifies an API version, resource kind, name, and specification. A Step identifies the image containing its tools and the command or script to execute.

A simple Task can print a fixed greeting. Replacing that greeting with a string parameter named message makes the Task reusable. The expression `$(params.message)` supplies the value inside the Task. A Pipeline declares its own inputs and maps them into the inputs expected by its tasks.

The pipeline task name identifies a particular use within the Pipeline, while `taskRef` identifies the reusable Task definition. The names can differ. Similarly, a Pipeline's `repo-url` parameter can supply a Task's `url` parameter through an explicit mapping.

A minimal checkout Task uses an image containing Git and invokes `git clone` with a repository address and branch argument. A reusable implementation documents those inputs with names, types, and descriptions. Defaults reduce repeated configuration only when they suit the intended repository. Changing a resource's name creates a separate identity rather than automatically replacing or deleting the earlier named object.

A basic delivery sequence retrieves source code, checks quality, runs tests, builds an image, and deploys it. Placeholder tasks that print messages can establish the pipeline structure during development. Their successful execution does not show that testing, building, or deployment actually occurred.

Dependencies determine execution order. The `runAfter` field makes a task wait for named predecessors. YAML list position alone does not establish that ordering. When linting and testing are independent, both can follow checkout and run concurrently.

| Stage | Required predecessor |
| --- | --- |
| Checkout | None within this sequence |
| Lint | Checkout |
| Tests | Checkout |
| Build | Lint and tests |
| Deploy | Build |

Waiting for both checks prevents a build from starting while one remains unfinished. Under normal failure handling, a failed prerequisite blocks dependent work. Already running parallel tasks can still finish, and explicit error-handling settings can change the response.

### Events and triggers

Repository events can start pipelines automatically. A webhook sends an event, such as a push or pull request, to an EventListener. The listener's trigger configuration connects the event to a TriggerBinding and a TriggerTemplate.

The binding extracts fields from the payload. A simple event might provide a repository address and a revision. Binding parameter names must match the receiving template's parameter names. The template can then map those values into differently named PipelineRun inputs, such as mapping repository into `repo-url` through `$(tt.params.repository)`.

A TriggerTemplate describes the PipelineRun to create. It identifies the Pipeline and supplies its required parameters and workspace bindings. A generated name prefix allows successive events to create distinct runs. Additional required Pipeline inputs, such as an image reference or application name, also need values in event-generated runs.

The listener and pipeline workloads require suitable service accounts and permissions. An account used to receive events and create runs has a different role from one used by a deployment task. A preconfigured account named pipeline is an environment convention, not a universal guarantee.

Bindings must match the real event format. GitHub push events commonly use full references such as `refs/heads/main`, rather than a short branch name. A checkout implementation may need a transformation, and the repository field must contain a usable clone address.

Manual execution provides a useful check before connecting external events. The command `tkn pipeline start` identifies the Pipeline, repeated `-p` options provide named parameter values, and `-w` options bind workspaces. The `--showlog` option displays logs as they become available. Successful manual execution verifies the supplied execution configuration without establishing that external webhook filtering and event mappings are correct.

A local port-forward and a JSON POST request can test event handling. An external webhook also needs a reachable endpoint and configuration at the repository service. Interceptors can verify webhook secrets, filter events, and transform values before binding. An acknowledgement from the listener establishes reception or acceptance, while the resulting run status establishes what happened afterwards.

For example, local port 8090 can forward to the listener service's port 8080 while a second terminal sends the test request. The request body must contain the fields expected by the binding, and its content type identifies JSON. This checks the configured event path. A handcrafted payload alone does not establish compatibility with the repository provider's complete webhook format.

### Catalogue tasks and shared files

The Tekton catalogue provides community tasks for common operations, including source retrieval, quality checks, image creation, and deployment. Reuse can reduce implementation effort, but teams still need to assess compatibility, permissions, dependencies, and maintenance.

Task documentation defines the interface: parameters, defaults, workspaces, outputs, and supported execution conditions. Catalogue resources can be discovered through services such as Artifact Hub and installed from their manifests. Different versioned manifests can contain different implementations. Recording the selected version improves repeatability.

The `git-clone` Task commonly accepts a repository `url`, a `revision`, and an `output` workspace. The Pipeline can map its own repository and branch parameters into those inputs. Private repositories also require appropriate authentication. A default branch must match the repository, since main and master are different names.

A workspace gives a Task access to a filesystem location. The Pipeline declares shared workspaces, individual tasks map their expected workspace names to them, and the PipelineRun binds them to concrete storage.

For example, the clone Task's output workspace and the test and build Tasks' source workspaces can all map to `pipeline-workspace`. This makes the checked-out files available across separate TaskRun Pods. Files do not automatically move between those Pods.

A PersistentVolumeClaim, or PVC, requests Kubernetes storage. A run can use an existing claim or a claim created from a template. Capacity, storage class, and access mode depend on the cluster. `ReadWriteOnce` permits read-write access from one node and can still serve multiple Pods on that node.

A claim requesting `1Gi` asks for one gibibyte of storage. The named storage class must exist in the target cluster. Declaring a workspace in a Pipeline does not itself allocate that storage. The run's binding connects the abstract workspace name to an available volume, and storage or scheduling failures can prevent tasks from starting.

Workspaces can also use other volume sources, including Secrets, ConfigMaps, and temporary storage. An `emptyDir` volume can share files among Steps in one TaskRun, but it cannot share files between separate Task Pods. Reusing writable storage across runs also requires attention to old files and concurrent changes.

### Tests and environment configuration

Custom tasks can wrap existing scripts when a catalogue Task does not fit. A Python test task selects an image containing the interpreter, installs the required dependencies, and invokes the project's test runner. Setting its working directory to `$(workspaces.source.path)` places execution in the checked-out source directory.

Using consistent commands locally and in the pipeline reduces differences between environments. Toolchain and dependency versions still need control. Automatically installing the newest versions on every run can change behaviour independently of the application code.

Linting identifies style issues and selected coding mistakes. Unit tests examine smaller components, while integration tests examine interactions. These checks can appear at different points in a delivery process. Their placement depends on feedback needs and required environments, rather than a rigid separation between integration and delivery.

Environment configuration can supply values such as a test database address without changing application code. A Step can populate `DATABASE_URI` from a Kubernetes Secret using `valueFrom.secretKeyRef`. The reference selects the Secret and its key, and Kubernetes supplies the decoded value to the process.

Base64 encoding in a Secret's data field is reversible and provides no encryption. Access controls and appropriate cluster configuration protect the secret. Credentials also need protection from accidental logging or inclusion in source files.

Parallel linting and testing can shorten feedback time when they do not alter shared files or compete for incompatible external resources. Their independence depends on their actual behaviour. Maintained interpreters and test runners are also essential. Python 3.9 has reached end of life, and nose is a legacy runner with longstanding maintenance limitations.

Flake8 is one option for Python linting. A custom Task can invoke it through the same script used during development, with arguments exposed as parameters when projects need different settings. Tasks that use a test database also need suitable connection configuration and database availability. A missing dependency can fail execution before the application tests begin.

### Building a container image

The build stage packages application code and runtime dependencies into a container image, then pushes it to a registry. Buildah can perform this work from a Dockerfile or Containerfile. Other approaches include Docker-based builders, Cloud Native Buildpacks, and Source-to-Image. The latter two can build applications without an application-specific Dockerfile.

A Buildah Task commonly expects a source workspace and an `IMAGE` parameter. The Pipeline maps its shared source directory into that workspace and passes an image reference, perhaps through a parameter named `build-image`. The builder requires suitable execution permissions and registry access.

The image reference identifies its registry and repository, together with a tag or digest. An internal OpenShift registry address and a training account's namespace are environment-specific values. Access to push an image is separate from permission to deploy workloads. Both capabilities may be needed in one Pipeline, but they authorise different operations.

Building follows all required quality checks. Pushing an image makes it available for deployment, but does not deploy the application. The deployed reference needs to identify the image that passed the checks. A digest identifies specific image content more reliably than a mutable tag such as latest.

Legacy Tekton configurations can use the deprecated ClusterTask resource and `tekton.dev/v1beta1` Pipelines APIs. Current configurations generally use v1 Task and Pipeline APIs with supported task references or resolvers. Tekton Triggers has a separate API group whose version must be checked independently. Manifest fields, catalogue interfaces, and discovery commands depend on the installed versions.

### Deployment and verification

Deployment tasks can invoke `kubectl` for Kubernetes or `oc` for OpenShift. The OpenShift client supports Kubernetes operations and additional OpenShift features. Those additions can depend on OpenShift-specific APIs.

An `openshift-client` Task can accept deployment commands through a `SCRIPT` parameter, with its workspace and other inputs determined by the selected Task version.

A simple command can create a Deployment from an application name and image reference. The deploy task waits for the build and uses the intended image. Repeating a create command for an existing Deployment normally fails, so recurring delivery needs an update mechanism.

Declarative manifests describe the desired resources and can be applied with `kubectl apply` or `oc apply`. A deployment task can read these files from the shared source workspace. Kustomize supports environment-specific customisation of common manifests. The resulting configuration must still refer to the image intended for that release.

Manifest-based deployment requires access to the relevant files. A client Task can map its expected manifest workspace to the Pipeline's shared source, then apply files from the repository's deployment directory. This gives the deployment stage access to versioned configuration alongside the code used for the build.

Applying an unchanged manifest commonly leaves its declared configuration unchanged. This does not mean every Kubernetes command is idempotent or that every repeated operation is harmless. The requested changes, permissions, and cluster behaviour determine the result.

Verification extends beyond creating a Deployment. Rollout status, ready replicas, readiness checks, and application tests provide evidence that the intended version is serving correctly. A Pod's Running phase alone does not establish application readiness or functional correctness.

A deployment script can apply manifests, wait for the rollout, and inspect the resulting Pods. It needs to preserve failures from each required operation. Otherwise, a later successful diagnostic command could conceal an earlier error. Resource creation, rollout completion, and application behaviour are separate observations that together provide a clearer picture of deployment success.

The Tekton client can start a PipelineRun, supply parameters and workspace bindings, and display logs. `tkn pipelinerun ls` shows executions, while `tkn pipelinerun logs --last` retrieves the latest run's logs. A specific run identifier avoids ambiguity when several runs overlap.

Messages such as created, configured, or unchanged describe updates to resource definitions. Task and Step names in execution logs identify which operation produced an output. Generated run names and elapsed times vary between executions, so example values cannot serve as fixed success criteria.

A successful run establishes that its configured tasks completed under their success conditions. Confidence in the release depends on those conditions, the artefact deployed, and the application's observed behaviour in its destination environment.

## DevOps and GitOps with OpenShift

### CI/CD pipelines

A DevOps pipeline is an automated workflow for building, testing, deploying, and releasing software. By standardising these activities, it supports continuous integration and continuous delivery or deployment, reduces manual coordination, and helps teams identify defects and integration conflicts earlier.

The continuous integration (CI) portion validates changes, builds components, and produces versioned artefacts such as binaries, container images, and Helm charts. Pull requests can trigger tests and static analysis against code held in an application repository. Issue trackers connect changes to planned work, while communication services notify teams of results. Quality and risk tools assess maintainability, coverage, vulnerabilities, and other concerns. Secrets managers supply authorised access to credentials, and evidence stores preserve logs, reports, and test results. Inventory systems record applications, dependencies, and infrastructure configurations.

The continuous delivery (CD) portion promotes approved artefacts into target environments. Change-management tools can require documented and validated changes before release. Key-management and secrets services protect cryptographic material and credentials. Security services enforce policies, scan for vulnerabilities, and perform compliance checks. Together, these controls support consistent deployment, traceability, and operational oversight.

CI and CD have distinct responsibilities but form one delivery system. CI prepares deployable, versioned outputs and demonstrates that a proposed change meets quality expectations. CD takes those outputs through controlled environments and verifies that their configuration is correct. Analytics across both stages can expose delays, failure patterns, and opportunities to improve the workflow. Automation does not remove human governance. Reviews, approvals, and change records remain available where risk or policy requires them.

A separate continuous compliance pipeline may assess application and infrastructure changes throughout development and deployment. It can apply predefined security and regulatory rules, collect audit evidence, manage secrets and keys, and report compliance status. This makes compliance an ongoing automated activity rather than a final checkpoint.

### OpenShift Pipelines and Tekton

Red Hat OpenShift Pipelines is a Kubernetes-native CI/CD service built on Tekton. Tekton supplies reusable definitions for pipelines, tasks, and steps, while OpenShift adds an integrated web console, catalogue, event-based triggers, access controls, templates, and connections to platform services such as image registries, storage, and networking. Pipelines can therefore run consistently across on-premises, cloud, and hybrid environments while retaining Kubernetes scalability and portability.

Important execution objects include PipelineRuns, which represent particular pipeline executions, and TaskRuns, which represent individual task executions. Parameters customise behaviour without changing task definitions. Workspaces provide shared files or volumes. Conditions or equivalent control logic determine whether work should run according to branches, environments, errors, or other criteria. The Pipeline Builder presents these relationships visually, while generated Tekton resources preserve the underlying declarative model. Logs from each task support monitoring and diagnosis.

Tasks encapsulate one unit of work and contain ordered steps executed in containers. Pipelines connect tasks and define their sequence or dependencies. Events such as commits, image updates, timers, or responses from external systems can trigger runs. Inputs and outputs can include source repositories, images, configuration, secrets, and other artefacts. The task catalogue supplies community and Red Hat definitions, while organisations can add their own. This combination permits reuse without preventing local control.

### Building an OpenShift pipeline

An illustrative pipeline prepares a Python application, verifies it, builds a container image, and deploys it. Before construction, the cluster needs two custom tasks: a cleanup task that safely removes workspace contents, and a `nose` task that installs requirements and runs unit tests. A PersistentVolumeClaim (PVC) provides storage shared across tasks. It can be created in the Administrator perspective with the `skills-network-learner` storage class, a 1 GB allocation, and the name `oc-lab-pvc`. A terminal-created equivalent can use a `ReadWriteOnce` filesystem claim.

The custom task definitions are applied to the cluster with `kubectl apply -f tasks.yaml` and checked with `oc get tasks`. The cleanup implementation should verify that the workspace directory exists and remove its contents rather than deleting the mount point itself. This precaution reduces the risk of targeting a filesystem root. The test task uses a Python 3.9 image, upgrades its packaging tools, installs `requirements.txt`, and passes configurable arguments to Nose. If the catalogue does not expose Flake8, its task manifest can be installed from the Tekton catalogue before the pipeline is edited.

In the Developer perspective, the operator creates `ci-cd-pipeline` in Pipeline Builder and adds an `output` workspace. The tasks then run in this order:

1. `cleanup` clears the `output` workspace so earlier files cannot affect the run.
2. Red Hat's `git-clone` task clones `https://github.com/ibm-developer-skills-network/wtecc-CICD_PracticeCode` into `output`.
3. The community `flake8` task lints the source with Python 3.9 and the arguments `--count`, `--max-complexity=10`, and `--max-line-length=127`.
4. The custom `nose` task runs the unit tests against the shared source.
5. Red Hat's `buildah` task builds the image from `output`. Its image parameter refers to `$(params.build-image)`.
6. Red Hat's `openshift-client` task deploys the built image under the display name `deploy`.

The pipeline parameter `build-image` should identify the internal registry and project namespace, for example:

```text
image-registry.openshift-image-registry.svc:5000/NAMESPACE/tekton-lab:latest
```

The parameter `app-name` defaults to `cicd-app`. The deployment task can create or update the Kubernetes Deployment idempotently:

```bash
oc create deployment $(params.app-name) --image=$(params.build-image) --dry-run=client -o yaml | oc apply -f -
```

When starting the pipeline, the `output` workspace is bound to the PVC. Successful tasks appear as completed in the PipelineRun view, where their logs reveal lint results, test outcomes, build activity, and deployment status. The resulting application can be inspected from the Topology view. A `SERVICERUNNING` log entry confirms that the example application is running.

The sequence is deliberate. Cleanup establishes a known workspace, cloning supplies the exact source revision, linting checks static quality, unit tests examine behaviour, Buildah creates the deployable image, and the OpenShift client applies the deployment. A failure stops unreliable output from moving further through the workflow. Re-running the pipeline provides a consistent route from repository to cluster.

### GitOps principles and workflow

GitOps extends established software-development practices to infrastructure and application configuration. Declarative files, commonly YAML, record the desired system state in Git. The repository becomes the authoritative, versioned record, and pull requests provide review, testing, approval, and an auditable history. Reverting a Git change offers a controlled path to rollback without distributing cluster credentials broadly.

A GitOps controller continuously compares the deployed state with the desired state in Git. When it detects drift, it can notify operators or reconcile the environment automatically. This model supports continuous deployment, repeatable environments, collaboration, auditability, regulatory compliance, and infrastructure as code.

In a typical workflow, developers merge reviewed application changes, prompting CI to build and store an artefact. Site reliability engineers manage desired environment configuration in a separate repository. After reviewed configuration changes are merged, a GitOps agent retrieves the latest state, selects the required artefact, and updates the target environment. Recovery can follow the same controlled process by reverting configuration in Git.

### Argo CD and OpenShift GitOps

Argo CD is an open-source continuous delivery controller for Kubernetes. It monitors manifests in Git, compares them with live resources, reports out-of-sync applications, and synchronises them automatically or on request. It supports controlled rollouts and rollback, reusable configuration patterns, deployment history, audit trails, a web interface, a command-line interface, and role-based access control. Single sign-on options include OAuth 2.0, LDAP, SAML 2.0, GitHub, and Microsoft identity services.

Source-control repositories hold application manifests. Webhooks can alert Argo CD to merged pull requests, branches, tags, or other changes. Its API supports application management, access configuration, and deployment queries. Sync hooks run actions such as database migrations, tests, or notifications before or after synchronisation. Argo CD then uses the Kubernetes API to create or update pods, services, Deployments, ConfigMaps, and related resources.

Two reconciler patterns are common on OpenShift. An on-cluster reconciler runs inside the target cluster and compares local resources with configuration in Git. An external reconciler uses custom resource definitions to identify repositories and clusters, allowing central management across multiple repositories and environments. Argo CD follows the external pattern.

OpenShift GitOps packages Argo CD for OpenShift. An administrator installs its operator from OperatorHub or the Software Catalog, depending on the OpenShift version, launches it from the console, and signs in with OpenShift credentials. Teams can then manage repositories, clusters, permissions, synchronisation, and deployment history through a consistent GitOps workflow.