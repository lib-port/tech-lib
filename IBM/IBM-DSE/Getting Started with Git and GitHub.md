# Getting Started with Git and GitHub

> [!NOTE]
> A practical beginner’s guide to Git and GitHub covering core version-control concepts, commands, repositories, branching, merging, forks, remotes, pull requests, and collaborative workflows.

## Git and GitHub Fundamentals

Git is a free, open-source distributed version control system created by Linus Torvalds in 2005 for Linux development. It records project history as commits, supports independent branches, and allows each clone to contain a local copy of the repository and its history. Contributors can work locally, then exchange changes with other repositories or hosted remotes.

Git uses hashes to identify objects and detect changed content. Contributors can sign commits and tags so others can verify them against a trusted key. Git handles source code particularly well, although it can track many file types. Text files usually support more useful comparisons and merges than binary files.

| Term | Meaning |
| --- | --- |
| Repository | Tracked project files and their Git history |
| Working tree | The checked-out files available for local editing |
| Commit | A recorded snapshot with associated metadata and a message |
| Branch | A movable reference that supports a separate line of development |
| Clone | A local copy of a repository, normally including its history |
| Fork | A new GitHub repository based on another repository |
| Merge | Integration of changes from one development history into another |
| Pull | A Git operation that fetches remote changes and integrates them locally |
| Pull request | A GitHub proposal to review and merge changes between branches |
| SSH | A secure protocol that can authenticate access to remote repositories |

### GitHub collaboration

GitHub hosts Git repositories and adds access controls, issues, discussions, projects, pull requests, reviews, automated checks, and security features. A repository may be public or private and commonly includes a README, a software licence, source files, and project documentation. The browser interface can create, edit, and upload files, then record those changes as commits.

A typical collaborative workflow follows these stages:

1. A contributor creates, forks, or clones a repository.
2. The contributor creates a branch from the default branch, edits files, and records focused commits with clear messages.
3. The contributor pushes the branch to GitHub and opens a pull request against the intended base branch.
4. Collaborators discuss and review the changes, while configured checks and branch protection rules enforce any required tests or approvals.
5. An authorised contributor resolves conflicts and merges accepted changes using an available merge method. The team may then delete the source branch.

The default branch often carries the primary development line, but Git does not require it to contain deployable code. Repository policy determines deployment, review requirements, permissions, merge methods, and branch deletion.

## Git Commands and Managing GitHub Projects

Git records project history, while GitHub hosts Git repositories and supports collaboration. A sound workflow separates unfinished work, preserves coherent commits, and integrates contributions without overwriting colleagues' changes. Teams may adapt the workflow to their permissions, release strategy, and review rules.

### Working with repositories

An existing-project workflow usually follows these stages:

1. A contributor runs `git clone URL` to create a local repository and configure the source as the `origin` remote.
2. The contributor creates and switches to a descriptive branch, such as `user-auth`, with `git switch -c user-auth`.
3. The contributor edits and tests files, checks them with `git status`, and stages selected content with `git add`.
4. The contributor records a focused snapshot with `git commit -m "Add user authentication"` and pushes the branch with `git push -u origin user-auth`.
5. The contributor opens a GitHub pull request that compares the feature branch with the intended base branch.
6. Reviewers discuss and test the change, resolve any conflicts, and merge accepted work. Repository rules determine whether the pull request requires approvals or automated checks.

Starting a project requires a different opening sequence. A project lead creates a directory, runs `git init`, adds files, stages the intended snapshot, and makes an initial commit. The lead then creates an empty remote repository, links it with `git remote add origin URL`, and pushes the initial branch. Other contributors can then clone that remote. The remote host still enforces access permissions, so cloning a repository does not grant permission to push.

### Core commands

| Command | Purpose |
| --- | --- |
| `mkdir` and `cd` | Create a directory and move into it in the shell |
| `git init` | Initialise a Git repository in an existing directory |
| `git status` | Report the working tree and staging area's state |
| `git add PATH` | Place selected file content in the index for the next commit |
| `git commit -m "MESSAGE"` | Record staged content with a descriptive message |
| `git log` | Display commit history |
| `git branch` | List, create, rename, or delete branches |
| `git switch BRANCH` | Switch branches, with `-c` creating the new branch first |
| `git merge BRANCH` | Integrate the named branch into the current branch |
| `git clone URL` | Copy a repository and ordinarily its Git history |
| `git remote -v` | List configured remotes and their URLs |
| `git fetch REMOTE` | Download objects and update remote-tracking references without integrating them |
| `git pull REMOTE BRANCH` | Fetch and integrate remote work into the current branch |
| `git push REMOTE BRANCH` | Publish local commits and update a remote branch, subject to permission |
| `git revert COMMIT` | Create a new commit that reverses an earlier commit |

`git checkout` can switch branches, but `git switch` expresses that purpose more clearly. Git's `git request-pull` command prints a request summary. It does not create a GitHub pull request.

### Branches, merges, and releases

A branch is a movable reference to a commit, not a separate copy of every file. Git creates a branch from the selected starting point, which need not be `main`. Names such as `release-1.0` work, while names containing spaces do not.

A merge integrates another development history into the current branch. Git may fast-forward the branch, create a merge commit, or stop for conflict resolution. Git does not require the default branch to hold deployable code, and teams do not need a release branch. A team that chooses release branches can stabilise a release there, merge approved fixes according to its policy, and tag the release commit.

### Cloning, forking, and remotes

A clone places Git data on a local machine. Downloading a ZIP archive copies files without Git history. The conventional name `origin` refers to the clone's source remote, although Git allows any remote name. A contributor with write permission can push directly, subject to repository rules. A contributor without write permission generally needs a fork or another authorised contribution path.

A GitHub fork is a separate repository connected to its upstream repository. It supports independent work, contributions through pull requests, and derivative projects when the software licence permits them. A public repository does not automatically grant permission to reuse its code outside the rights supplied by its licence or applicable law.

After cloning a fork, `origin` conventionally names the fork. The contributor can add the original repository as `upstream`, run `git fetch upstream`, integrate the appropriate upstream branch, and push the updated branch to `origin`. `git pull` combines fetching with integration, which may use a fast-forward, merge, rebase, or squash according to the command and configuration.

### Collaboration roles

GitHub does not require fixed developer, integrator, and administrator roles. Organisations assign repository roles and permissions to fit their governance. Contributors create branches, commits, and pull requests. Reviewers assess changes and authorised maintainers merge them. Administrators manage access, branch rules, security settings, integrations, and automation. GitHub Actions can automate build, test, and deployment workflows for continuous integration and continuous delivery.
