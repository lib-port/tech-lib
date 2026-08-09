# *Getting Started with Git and GitHub* Final Project
## Part 1: GitHub UI
You recently got hired as a developer in a micro-finance startup with a mission to empower and provide opportunities for low income individuals. The core team currently uses Subversion (SVN) for managing code. They want to slowly move their code to Git. You are asked to host their sample code to calculate simple interest on GitHub in a new repository as the first step in this journey. You will not only host the script, but also follow best practices introduced in this course and create supporting documents for the open source project including a code of conduct, and contribution guidelines. Additionally, the repository should be available to the community under the Apache License 2.0.
### Solution
#### Preparation
```shell
# Authentication
gh auth login --web --git-protocol https
gh auth setup-git
gh auth status

# Configure commit identity
git config --global user.name "Your Name"
git config --global user.email "your-verified-github-email@example.com"

# Store username for later use
GH_USER="$(gh api user --jq .login)"
echo "$GH_USER"
```
#### 1. Create a new repository and select the appropriate license.
```shell
gh repo create github-final-project \
  --public \
  --description "A Bash calculator for simple interest" \
  --add-readme \
  --license apache-2.0 \
  --clone

cd github-final-project
git branch --show-current
```
#### 2. Create a README.md file
```shell
nano README.md
```
#### 3. Create a **Code of Conduct** file
```shell
gh api /codes_of_conduct/contributor_covenant \
--jq .body > CODE_OF_CONDUCT.md
nano CODE_OF_CONDUCT.md
```
#### 4. Create a **Contribution Guidelines** file
```shell
nano CONTRIBUTING.md
```
#### 5. Add the calculator script
```shell
nano simple-interest.sh
```
Make script executable:
```shell
chmod +x simple-interest.sh
bash -n simple-interest.sh
./simple-interest.sh
```
#### 6. Commit the new files
```shell
git status --short
git diff --check
git diff
```
Verify:
```shell
gh api "repos/$GH_USER/github-final-project" \
  --jq '{url:.html_url, visibility, license:.license.spdx_id, default_branch}'

gh api "repos/$GH_USER/github-final-project/contents" \
  --jq '.[].name'
```
Confirm the output includes:
- `README.md`
- `LICENSE`
- `CODE_OF_CONDUCT.md`
- `CONTRIBUTING.md`
## Part 2: Git CLI
Congratulations on starting the journey with your company by creating an open-source Simple Interest Calculator bash script on GitHub. Your changes have been accepted and merged and the company has created a new global [repository](https://github.com/ibm-developer-skills-network/mcino-Introduction-to-Git-and-GitHub) for the teams to collaborate. Other developers have contributed to this repository over time. Your team has found a mistake in one of the markdown files. You are asked to fork this repository and fix the mistake by using Git CLI in the provided lab environment and open a pull request (PR).
### Solution
#### 1. Fork and clone the upstream repository
```bash
cd ..

gh repo fork \
  ibm-developer-skills-network/mcino-Introduction-to-Git-and-GitHub \
  --clone

cd mcino-Introduction-to-Git-and-GitHub
git remote -v
```
You should see:
- `origin` pointing to your fork.
- `upstream` pointing to `ibm-developer-skills-network`.
#### 2. Create `bug-fix-typo`
```bash
git switch main
git status
git switch -c bug-fix-typo
```
Edit the README:
```bash
nano README.md
```
Change only:
```text
© 2022 XYZ, Inc.
```
to:
```text
© 2023 XYZ, Inc.
```
Verify the change:
```bash
grep -n "XYZ, Inc" README.md
git diff -- README.md
```
#### 3. Commit and push the fix
```bash
git add README.md
git commit -m "Fix README copyright year"
FIX_COMMIT="$(git rev-parse HEAD)"
git push -u origin bug-fix-typo
```
Keep that terminal open so `$FIX_COMMIT` remains available.
#### 4. Merge the branch into your fork’s `main`
```bash
git switch main
git merge --no-ff bug-fix-typo \
  -m "Merge bug-fix-typo into main"
git push origin main
```
Display evidence of the successful merge:
```bash
git branch --show-current
grep -n "XYZ, Inc" README.md
git log --oneline --graph --decorate -6
```
#### 5. Open the fix pull request
Use the pushed `bug-fix-typo` branch as the PR source:
```bash
gh pr create \
  --repo ibm-developer-skills-network/mcino-Introduction-to-Git-and-GitHub \
  --base main \
  --head "$GH_USER:bug-fix-typo" \
  --title "Fix README copyright year" \
  --body "Changes the README footer year from 2022 to 2023 as required by the project."
```
#### 6. Revert the earlier change
Start from your local `main`, which contains the fix:
```bash
git switch main
git status
git switch -c bug-fix-revert
```
Revert the original fix commit:
```bash
git revert "$FIX_COMMIT" --no-edit
```
If you opened a new terminal and `$FIX_COMMIT` is empty, find the commit manually:
```bash
git log --oneline --all -- README.md
```
Then use its hash:
```bash
git revert FIX_COMMIT_HASH --no-edit
```
Verify that the footer is back to 2022:
```bash
grep -n "XYZ, Inc" README.md
git log --oneline --decorate -5
git status
```
Push the revert branch:
```bash
git push -u origin bug-fix-revert
```