#!/usr/bin/env bash

set -euo pipefail

usage() {
  printf 'Usage: %s <issues.yaml>\n' "${0##*/}"
  printf '\n'
  printf 'YAML keys:\n'
  printf '  name               Milestone name (required).\n'
  printf '  due-date           Milestone due date in YYYY-MM-DD format (optional).\n'
  printf '  notes-and-project  Creates "<item> Notes" and "<item> Final Project".\n'
  printf '  notes-only         Creates "<item> Notes".\n'
  printf '  project-only       Creates "<item>" unchanged.\n'
  printf '\n'
  printf 'Issue-group keys may be null, but at least one item is required.\n'
  printf 'Duplicate list items in or across issue-group keys are rejected.\n'
  printf 'Exact-title duplicates are skipped across all issues in the repository.\n'
  printf 'Concurrent runs are rejected using a temporary repository label.\n'
  printf 'Requires GitHub CLI (gh), Python 3, and the PyYAML Python package.\n'
}

usage_error() {
  printf 'Error: %s\n\n' "$1" >&2
  usage >&2
  exit 2
}

confirm() {
  local prompt="$1"
  local response

  while true; do
    printf '%s [y/N] ' "$prompt" >&2
    if ! IFS= read -r response; then
      printf '\nNo response received; treating the answer as no.\n' >&2
      return 1
    fi

    response="${response#"${response%%[![:space:]]*}"}"
    response="${response%"${response##*[![:space:]]}"}"

    case "$response" in
      [Yy]|[Yy][Ee][Ss])
        return 0
        ;;
      ''|[Nn]|[Nn][Oo])
        return 1
        ;;
      *)
        printf 'Please answer yes or no.\n' >&2
        ;;
    esac
  done
}

(( $# == 1 )) || usage_error 'exactly one YAML file argument is required.'

YAML_FILE=$1
[[ -n "$YAML_FILE" ]] || usage_error 'the YAML file location must not be empty.'
readonly YAML_FILE

if ! command -v python3 >/dev/null 2>&1; then
  printf 'Error: Python 3 is not installed or is not on PATH.\n' >&2
  exit 1
fi

if [[ ! -f "$YAML_FILE" || ! -r "$YAML_FILE" ]]; then
  printf 'Error: YAML file is missing, unreadable, or not a regular file: %s\n' \
    "$YAML_FILE" >&2
  exit 1
fi

parsed_records=''
if parsed_records=$(python3 - "$YAML_FILE" <<'PYTHON'
from datetime import date
import re
import sys

try:
    import yaml
except ImportError:
    print(
        "Error: the PyYAML package is required. "
        "Install it for this Python 3 environment before running the script.",
        file=sys.stderr,
    )
    raise SystemExit(1)


class UniqueKeySafeLoader(yaml.SafeLoader):
    pass


def construct_unique_mapping(loader, node, deep=False):
    if not isinstance(node, yaml.MappingNode):
        raise yaml.constructor.ConstructorError(
            None, None, "expected a mapping", node.start_mark
        )

    mapping = {}
    for key_node, value_node in node.value:
        key = loader.construct_object(key_node, deep=deep)
        try:
            duplicate = key in mapping
        except TypeError as error:
            raise yaml.constructor.ConstructorError(
                "while constructing a mapping",
                node.start_mark,
                "found an unhashable mapping key",
                key_node.start_mark,
            ) from error

        if duplicate:
            raise yaml.constructor.ConstructorError(
                "while constructing a mapping",
                node.start_mark,
                f"found duplicate key {key!r}",
                key_node.start_mark,
            )

        mapping[key] = loader.construct_object(value_node, deep=deep)

    return mapping


UniqueKeySafeLoader.add_constructor(
    yaml.resolver.BaseResolver.DEFAULT_MAPPING_TAG,
    construct_unique_mapping,
)

path = sys.argv[1]

try:
    with open(path, "r", encoding="utf-8") as stream:
        document = yaml.load(stream, Loader=UniqueKeySafeLoader)
except (OSError, UnicodeError, yaml.YAMLError) as error:
    print(f"Error: could not parse YAML file {path!r}: {error}", file=sys.stderr)
    raise SystemExit(1)

if document is None:
    document = {}

if not isinstance(document, dict):
    print("Error: the YAML document root must be a mapping.", file=sys.stderr)
    raise SystemExit(1)

issue_keys = ("notes-and-project", "notes-only", "project-only")
allowed_keys = ("name", "due-date", *issue_keys)

for key in document:
    if not isinstance(key, str):
        print(
            f"Error: top-level YAML keys must be strings; found {key!r}.",
            file=sys.stderr,
        )
        raise SystemExit(1)

unknown_keys = [key for key in document if key not in allowed_keys]
if unknown_keys:
    rendered = ", ".join(repr(key) for key in unknown_keys)
    print(f"Error: unsupported top-level YAML key(s): {rendered}.", file=sys.stderr)
    raise SystemExit(1)


def validate_string(location, value):
    if not isinstance(value, str):
        print(
            f"Error: {location} must be a string; "
            f"found {type(value).__name__}. Quote ambiguous YAML scalars.",
            file=sys.stderr,
        )
        raise SystemExit(1)

    if not value.strip():
        print(f"Error: {location} must not be empty or whitespace-only.", file=sys.stderr)
        raise SystemExit(1)

    if value != value.strip():
        print(
            f"Error: {location} has leading or trailing whitespace.",
            file=sys.stderr,
        )
        raise SystemExit(1)

    if any(ord(character) < 32 or ord(character) == 127 for character in value):
        print(f"Error: {location} contains a control character.", file=sys.stderr)
        raise SystemExit(1)

    return value


if "name" not in document:
    print("Error: required YAML key 'name' is missing.", file=sys.stderr)
    raise SystemExit(1)

milestone_name = validate_string("YAML key 'name'", document["name"])

due_date = None
if document.get("due-date") is not None:
    due_date = validate_string("YAML key 'due-date'", document["due-date"])
    if not re.fullmatch(r"[0-9]{4}-[0-9]{2}-[0-9]{2}", due_date):
        print(
            f"Error: YAML key 'due-date' value {due_date!r} is not in "
            "YYYY-MM-DD format.",
            file=sys.stderr,
        )
        raise SystemExit(1)

    try:
        date.fromisoformat(due_date)
    except ValueError:
        print(
            f"Error: YAML key 'due-date' value {due_date!r} is not a real "
            "calendar date.",
            file=sys.stderr,
        )
        raise SystemExit(1)


generated_titles = []
seen_items = {}

for key in issue_keys:
    if key not in document:
        continue

    items = document[key]
    if items is None:
        continue

    if not isinstance(items, list):
        print(
            f"Error: YAML key {key!r} must contain a list or null.",
            file=sys.stderr,
        )
        raise SystemExit(1)

    for index, raw_item in enumerate(items):
        location = f"{key}[{index}]"
        item = validate_string(location, raw_item)

        if item in seen_items:
            print(
                f"Error: duplicate list item {item!r} at {location}; "
                f"first appeared at {seen_items[item]}.",
                file=sys.stderr,
            )
            raise SystemExit(1)

        seen_items[item] = location

        if key == "notes-and-project":
            generated_titles.extend((f"{item} Notes", f"{item} Final Project"))
        elif key == "notes-only":
            generated_titles.append(f"{item} Notes")
        else:
            generated_titles.append(item)

if not seen_items:
    print(
        "Error: at least one issue item is required across "
        "'notes-and-project', 'notes-only', and 'project-only'.",
        file=sys.stderr,
    )
    raise SystemExit(1)

seen_titles = set()
unique_titles = []
for title in generated_titles:
    if title in seen_titles:
        print(
            f"Warning: duplicate title generated by the YAML file was skipped: {title}",
            file=sys.stderr,
        )
        continue

    seen_titles.add(title)
    unique_titles.append(title)

print(f"NAME\t{milestone_name}")
if due_date is not None:
    print(f"DUE_DATE\t{due_date}")
for title in unique_titles:
    print(f"TITLE\t{title}")
PYTHON
); then
  :
else
  parser_status=$?
  exit "$parser_status"
fi

MILESTONE=''
DUE_DATE=''
HAS_DUE_DATE=0
has_name_record=0
declare -a TARGET_TITLES=()

while IFS=$'\t' read -r record_type record_value record_extra; do
  if [[ -n "$record_extra" ]]; then
    printf 'Error: YAML parser returned an invalid record.\n' >&2
    exit 1
  fi

  case "$record_type" in
    NAME)
      (( has_name_record == 0 )) || {
        printf 'Error: YAML parser returned more than one name record.\n' >&2
        exit 1
      }
      MILESTONE=$record_value
      has_name_record=1
      ;;
    DUE_DATE)
      (( HAS_DUE_DATE == 0 )) || {
        printf 'Error: YAML parser returned more than one due-date record.\n' >&2
        exit 1
      }
      DUE_DATE=$record_value
      HAS_DUE_DATE=1
      ;;
    TITLE)
      TARGET_TITLES+=("$record_value")
      ;;
    *)
      printf 'Error: YAML parser returned an unexpected record type: %s\n' \
        "$record_type" >&2
      exit 1
      ;;
  esac
done <<< "$parsed_records"

(( has_name_record == 1 )) || {
  printf 'Error: YAML parser did not return a milestone name.\n' >&2
  exit 1
}

DUE_ON=''
if (( HAS_DUE_DATE )); then
  DUE_ON="${DUE_DATE}T23:59:59Z"
fi

readonly MILESTONE DUE_DATE HAS_DUE_DATE DUE_ON
readonly -a TARGET_TITLES

if ! command -v gh >/dev/null 2>&1; then
  printf 'Error: GitHub CLI (gh) is not installed or is not on PATH.\n' >&2
  exit 1
fi

REPOSITORY=$(gh repo view --json nameWithOwner --jq '.nameWithOwner')
readonly REPOSITORY

if [[ -z "$REPOSITORY" ]]; then
  printf 'Error: could not determine the current GitHub repository.\n' >&2
  exit 1
fi

readonly RUN_LOCK_LABEL='course-issues-bulk-creator--run-lock'
run_lock_acquired=0

release_run_lock() {
  local status=$?

  trap - EXIT

  if (( run_lock_acquired )); then
    if ! gh api --method DELETE \
      -H 'Accept: application/vnd.github+json' \
      "repos/${REPOSITORY}/labels/${RUN_LOCK_LABEL}" \
      --silent; then
      printf "Warning: could not remove temporary run-lock label '%s'.\n" \
        "$RUN_LOCK_LABEL" >&2
      printf 'Remove it manually only after confirming no other run is active.\n' >&2
      (( status == 0 )) && status=1
    fi
  fi

  exit "$status"
}

trap release_run_lock EXIT

lock_error=''
if ! lock_error=$(gh api --method POST \
  -H 'Accept: application/vnd.github+json' \
  "repos/${REPOSITORY}/labels" \
  --raw-field "name=${RUN_LOCK_LABEL}" \
  --raw-field 'color=ededed' \
  --raw-field 'description=Temporary lock for course-issues-bulk-creator.sh; do not use on issues.' \
  --silent 2>&1); then
  if gh api \
    -H 'Accept: application/vnd.github+json' \
    "repos/${REPOSITORY}/labels/${RUN_LOCK_LABEL}" \
    --silent 2>/dev/null; then
    printf "Error: run-lock label '%s' already exists.\n" \
      "$RUN_LOCK_LABEL" >&2
    printf 'Another copy may be running. If not, remove the stale label and retry.\n' >&2
  else
    printf 'Error: could not acquire the repository run lock.\n' >&2
    if [[ -n "$lock_error" ]]; then
      printf '%s\n' "$lock_error" >&2
    fi
  fi
  exit 1
fi

run_lock_acquired=1

# Quote a Bash string as a jq/JSON string literal without requiring jq itself.
json_string_literal() {
  local input="$1"
  local output=""
  local character code escaped
  local i

  for (( i = 0; i < ${#input}; i++ )); do
    character=${input:i:1}
    case "$character" in
      '"') output+='\"' ;;
      \\) output+=$'\\\\' ;;
      $'\b') output+='\b' ;;
      $'\f') output+='\f' ;;
      $'\n') output+='\n' ;;
      $'\r') output+='\r' ;;
      $'\t') output+='\t' ;;
      *)
        printf -v code '%d' "'$character"
        if (( code < 32 )); then
          printf -v escaped '\\u%04x' "$code"
          output+="$escaped"
        else
          output+="$character"
        fi
        ;;
    esac
  done

  printf '"%s"' "$output"
}

milestone_literal=$(json_string_literal "$MILESTONE")
milestone_record=$(
  gh api --paginate \
    -H 'Accept: application/vnd.github+json' \
    "repos/${REPOSITORY}/milestones?state=all&per_page=100" \
    --jq ".[] | select(.title == ${milestone_literal}) | \"\(.state)|\(.number)|\(.due_on // \"\")\""
)

if [[ "$milestone_record" == *$'\n'* ]]; then
  printf "Error: multiple milestones named '%s' were found; cannot choose safely.\n" \
    "$MILESTONE" >&2
  exit 1
fi

milestone_state=''
milestone_number=''
milestone_due_on=''

if [[ -n "$milestone_record" ]]; then
  IFS='|' read -r milestone_state milestone_number milestone_due_on \
    <<< "$milestone_record"

  if [[ ! "$milestone_number" =~ ^[0-9]+$ ]]; then
    printf 'Error: GitHub returned an invalid milestone number.\n' >&2
    exit 1
  fi
fi

case "$milestone_state" in
  closed)
    printf "Warning: milestone '%s' exists but is closed; no milestone or issue changes were made.\n" \
      "$MILESTONE" >&2
    exit 1
    ;;
  open|'')
    ;;
  *)
    printf 'Error: unexpected milestone state: %s\n' "$milestone_state" >&2
    exit 1
    ;;
esac

declare -a known_issue_titles=()
update_due_date=0

if [[ "$milestone_state" == 'open' ]]; then
  printf "Milestone '%s' already exists.\n" "$MILESTONE"

  if ! confirm "Add issues to the existing milestone '$MILESTONE'?"; then
    printf "Cancelled: no milestone or issue changes were made for '%s'.\n" \
      "$MILESTONE" >&2
    exit 1
  fi
fi

existing_issue_titles=$(
  gh api --paginate \
    -H 'Accept: application/vnd.github+json' \
    "repos/${REPOSITORY}/issues?state=all&per_page=100" \
    --jq '.[] | select(has("pull_request") | not) | .title'
)

while IFS= read -r title; do
  [[ -z "$title" ]] && continue
  known_issue_titles+=("$title")
done <<< "$existing_issue_titles"

if [[ "$milestone_state" == 'open' ]] && (( HAS_DUE_DATE )); then
  if [[ -z "$milestone_due_on" ]]; then
    update_due_date=1
  else
    current_due_date=${milestone_due_on%%T*}
    if [[ "$current_due_date" == "$DUE_DATE" ]]; then
      printf "Milestone due date is already '%s'; leaving it unchanged.\n" \
        "$DUE_DATE"
    elif confirm "Replace due date '$current_due_date' with '$DUE_DATE'?"; then
      update_due_date=1
    else
      printf "Keeping existing due date '%s'.\n" "$current_due_date"
    fi
  fi
fi

if [[ -z "$milestone_state" ]]; then
  printf 'Creating milestone: %s\n' "$MILESTONE"

  declare -a create_milestone_args=(
    gh api --method POST
    -H 'Accept: application/vnd.github+json'
    "repos/${REPOSITORY}/milestones"
    --raw-field "title=${MILESTONE}"
    --jq '.number'
  )

  if (( HAS_DUE_DATE )); then
    create_milestone_args+=(--raw-field "due_on=${DUE_ON}")
  fi

  milestone_number=$("${create_milestone_args[@]}")

  if [[ ! "$milestone_number" =~ ^[0-9]+$ ]]; then
    printf 'Error: the milestone was created, but GitHub returned an invalid milestone number.\n' >&2
    exit 1
  fi
elif (( update_due_date )); then
  printf "Updating milestone due date to '%s'.\n" "$DUE_DATE"
  gh api --method PATCH \
    -H 'Accept: application/vnd.github+json' \
    "repos/${REPOSITORY}/milestones/${milestone_number}" \
    --raw-field "due_on=${DUE_ON}" \
    --silent
fi

created_count=0
skipped_count=0

issue_title_is_known() {
  local candidate="$1"
  local known_title

  for known_title in "${known_issue_titles[@]}"; do
    [[ "$known_title" == "$candidate" ]] && return 0
  done

  return 1
}

create_issue() {
  local title="$1"

  if issue_title_is_known "$title"; then
    printf 'Skipping existing issue: %s\n' "$title"
    (( skipped_count += 1 ))
    return
  fi

  printf 'Creating issue: %s\n' "$title"
  if ! gh issue create \
    --repo "$REPOSITORY" \
    --title "$title" \
    --body "" \
    --milestone "$MILESTONE" \
    >/dev/null; then
    printf "Error: failed to create issue '%s' after creating %d issue(s).\n" \
      "$title" "$created_count" >&2
    printf 'Changes completed before this failure were not rolled back.\n' >&2
    exit 1
  fi

  known_issue_titles+=("$title")
  (( created_count += 1 ))
}

for title in "${TARGET_TITLES[@]}"; do
  create_issue "$title"
done

printf "Created %d issue(s) linked to milestone '%s'." \
  "$created_count" "$MILESTONE"

if (( skipped_count > 0 )); then
  printf ' Skipped %d existing issue(s).' "$skipped_count"
fi

printf '\n'
