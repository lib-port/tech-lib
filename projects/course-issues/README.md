# GitHub Milestone Issue Creator

`course-issues-bulk-creator.sh` creates or reuses a GitHub milestone and then
creates milestone-linked issues from a validated YAML file. The YAML file
defines the milestone name, optional due date, and issue titles. The script
supports interactive safeguards for existing milestones and repository-wide
duplicate detection.

## Features

- Defines milestone settings and issue titles in YAML.
- Creates different title patterns from `notes-and-project`, `notes-only`, and
  `project-only` lists.
- Creates a missing milestone and optionally assigns a due date.
- Prompts before adding issues to an existing open milestone.
- Refuses to use a closed milestone.
- Skips exact-title duplicates across all open and closed issues in the
  repository, regardless of milestone.
- Rejects concurrent runs against the same repository using a temporary label.
- Validates all command-line and YAML input before making GitHub changes.

## Requirements

- Bash
- Python 3
- [PyYAML](https://pyyaml.org/wiki/PyYAMLDocumentation)
- [GitHub CLI](https://cli.github.com/) (`gh`)
- A GitHub account or token with access to the target repository and permission
  to read and create milestones and issues. A fine-grained token should have
  **Issues: Read and write** permission.

The target repository must have GitHub Issues enabled.

## Setup

Make the script executable:

```bash
chmod +x course-issues-bulk-creator.sh
```

Install PyYAML in a virtual environment:

```bash
python3 -m venv .venv
source .venv/bin/activate
python3 -m pip install PyYAML
```

Install the GitHub CLI if necessary, then authenticate it:

```bash
gh auth login
gh auth status
```

Run the script from the target repository. The repository is resolved through
`gh repo view` using the current Git repository context.

## YAML input

The YAML document must be a mapping. It must contain `name`, may contain
`due-date`, and may contain any combination of the three optional issue-group
keys.

| Key | Required | Value |
| --- | --- | --- |
| `name` | Yes | Exact milestone name. |
| `due-date` | No | Milestone due date in `YYYY-MM-DD` format, or `null` for no date. |

| Key | Issues created for each item | Example item | Generated title(s) |
| --- | ---: | --- | --- |
| `notes-and-project` | 2 | `Database Course` | `Database Course Notes`; `Database Course Final Project` |
| `notes-only` | 1 | `Career Preparation` | `Career Preparation Notes` |
| `project-only` | 1 | `Data Engineering Capstone Project` | `Data Engineering Capstone Project` |

Example `issues.yaml`:

```yaml
name: "IBM DE PC"
due-date: "2026-12-31"

notes-and-project:
  - "Introduction to Relational Databases"
  - "Data Warehouse Fundamentals"

notes-only:
  - "Data Engineering Career Guide and Interview Preparation"

project-only:
  - "Data Engineering Capstone Project"
```

### YAML validation rules

- The file must contain a single YAML document whose root is a mapping.
- Only `name`, `due-date`, `notes-and-project`, `notes-only`, and `project-only`
  are supported as top-level keys.
- Repeated and unknown keys are rejected.
- `name` is required and must be a non-empty string without leading, trailing,
  whitespace or ASCII control characters.
- `due-date` may be omitted or `null`. Any other value must be a quoted string
  containing a real calendar date in exact `YYYY-MM-DD` format.
- Each issue-group key may be omitted, `null`, or a list. A `null` value is
  treated like an empty list.
- At least one issue item is required across all three issue-group keys;
  configurations containing only missing keys, `null`, or empty lists are
  rejected.
- Every list item must be a non-empty string without leading, trailing, or
  whitespace or ASCII control characters.
- Each list item must occur only once across all three issue-group lists.
  Repeats within one list or across different lists are rejected.
- If different list items generate the same issue title, the collision is
  reported and only the first occurrence is retained.
- Items are generated in `notes-and-project`, `notes-only`, then `project-only`
  order. Item order within each list is preserved.

Quote YAML string values, especially the due date and values such as numbers,
`yes`, `no`, `on`, or `off`. PyYAML may otherwise interpret them as non-string
values, which the script rejects deliberately.

At least one of the issue-group keys must contain an item. This prevents the
script from creating or updating a milestone without creating any issues.

## Usage

```text
course-issues-bulk-creator.sh <issues.yaml>
```

The command accepts exactly one positional argument: the location of the YAML
input file. It has no command-line options, including no help option.

```bash
./course-issues-bulk-creator.sh "./issues.yaml"
```

The script sends a non-null YAML due date to GitHub as the end of that UTC day,
for example `2026-12-31T23:59:59Z`.

## Milestone behaviour

| Milestone state | Behaviour |
| --- | --- |
| Does not exist | Creates an open milestone. If `due-date` is non-null, the milestone receives that due date. |
| Exists and is open | Prompts before adding issues. Declining exits non-zero without changing milestones or issues. |
| Exists and is closed | Warns and exits non-zero without changing milestones or issues. The script never reopens milestones. |

If an existing open milestone is accepted, due dates are handled as follows:

| Existing due date | YAML `due-date` | Behaviour |
| --- | --- | --- |
| None | Missing or `null` | Leaves the milestone without a due date. |
| None | Date | Sets the supplied date without another prompt. |
| Same calendar date | Date | Leaves the date unchanged without another prompt. |
| Different calendar date | Date | Prompts before replacement. Declining keeps the old date and continues. |
| Any date | Missing or `null` | Leaves the existing date unchanged. |

Confirmation prompts accept `y` or `yes`, regardless of letter case. `n`,
`no`, a blank response, or end-of-input means no. Other responses cause the
prompt to repeat.

## Duplicate handling

Before creating issues, the script reads every open and closed issue in the
repository. A proposed title is skipped when it exactly matches an existing
issue title:

- Matching is case-sensitive.
- The existing issue may belong to any milestone or no milestone.
- Closed issues still count as duplicates.
- Pull requests do not count as issues for this check, even though GitHub's
  Issues API also returns pull requests.

Titles successfully created earlier in the same run are also recorded, so a
later collision cannot create a second issue. These rules make rerunning the
script safe after a partial failure: already-created titles are skipped on the
next run.

Duplicate detection is a point-in-time check, so each run first creates the
reserved temporary repository label
`course-issues-bulk-creator--run-lock`. GitHub's unique label names make this an
atomic repository-wide lock: another copy targeting the same repository exits
before reading or changing milestones and issues. The script removes the label
when it exits.

If the process is forcibly terminated or GitHub rejects the cleanup request,
the label can remain and block later runs. Confirm that no copy is active, then
remove the stale label before retrying:

```bash
gh api --method DELETE \
  "repos/{owner}/{repo}/labels/course-issues-bulk-creator--run-lock"
```

## Output and exit status

The script prints milestone actions, created or skipped issue titles, and a
final count. Prompts, warnings, and errors are written to standard error.

| Status | Meaning |
| ---: | --- |
| `0` | The run completed, including runs that created zero issues or skipped every proposed issue. |
| `1` | A script-detected validation or runtime failure, a closed milestone, or a declined existing-milestone prompt. |
| `2` | Invalid command-line usage: zero, multiple, or an empty YAML file argument. |
| Other non-zero value | A failing external command may propagate its own status. |

## Failure and retry considerations

GitHub changes are not transactional. The script validates its local input
before the first write, but it cannot roll back a milestone, due-date update,
or issue that GitHub has already accepted. If issue creation fails part-way
through a run, the error reports how many issues were created before the
failure.

The temporary run-lock label is the first GitHub write. It is normally deleted
on every exit, including runtime failures after repository resolution. A lock
cleanup failure changes an otherwise successful exit status to `1`.

Run the command again after resolving the problem. Repository-wide duplicate
detection will skip issues created by the earlier attempt. Creating many issues
quickly may also encounter GitHub primary or secondary rate limits.

Issue bodies are intentionally empty. The script does not currently provide a
dry-run mode, a non-interactive confirmation override, or a way to select a
repository explicitly.

## Troubleshooting

### `PyYAML package is required`

Activate the virtual environment in which PyYAML was installed, or install it
for the `python3` executable on `PATH`:

```bash
python3 -m pip install PyYAML
```

### GitHub authentication fails

Check the active account and token permissions:

```bash
gh auth status
```

If necessary, authenticate again with [`gh auth login`](https://cli.github.com/manual/gh_auth_login).

### The repository cannot be determined

Change into the target repository before running the script, then confirm that
GitHub CLI can resolve it:

```bash
cd /path/to/repository
gh repo view
```

### A YAML item is reported as a non-string

Quote the value so PyYAML treats it as text:

```yaml
project-only:
  - "2026-12-31"
  - "yes"
  - "123"
```

### An expected issue is skipped

Search both open and closed repository issues for the exact title. An issue
linked to another milestone, or to no milestone, still occupies that title in
the script's global issue namespace.

## Related documentation

- [GitHub CLI: `gh issue create`](https://cli.github.com/manual/gh_issue_create)
- [GitHub REST API: milestones](https://docs.github.com/en/rest/issues/milestones)
- [GitHub REST API: labels](https://docs.github.com/en/rest/issues/labels)
- [PyYAML documentation](https://pyyaml.org/wiki/PyYAMLDocumentation)
