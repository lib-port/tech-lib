# Bash Script Robustness and Text Processing Tools

Sed and awk process text by matching input and applying operations. Sed provides compact editing commands, while awk offers a programming language suited to records, fields, and calculations. Bash combines these tools with file operations and other commands. Reliable scripts depend on understanding how input becomes output, checking results, and handling failures explicitly.

GNU implementations, common on Linux, differ from those supplied with macOS. Homebrew provides GNU sed through `gnu-sed` and GNU awk through `gawk`, with commands named `gsed` and `gawk`. GNU-specific features require attention when scripts move between systems.

## Sed: selecting and changing text

### Processing cycles and printing

Sed normally reads one line into a working buffer called the pattern space, executes applicable commands in order, and prints the resulting buffer. It then begins the next cycle. Commands can have addresses that select a line number, a range, or a regular-expression match.

For example, `sed -n '13,$p' file` prints line 13 through the final line. The address `13,$` defines the range, `$` denotes the last line, and `p` prints the pattern space. The `-n` option suppresses automatic printing, allowing explicit commands to determine the output.

Without `-n`, an explicit `p` produces an additional copy of the line. Two print commands run consecutively on each selected line, so duplicates appear beside one another rather than as repeated blocks. An empty program reproduces the input through automatic printing, while an empty program with `-n` produces nothing.

The distinction between a print command and automatic printing is central to selective output. Suppressing the automatic step changes which lines appear, but it does not change which input lines sed reads or which addressed commands run.

The `d` command discards the pattern space and starts the next cycle. It skips subsequent commands and automatic printing. Output already printed before `d` remains. Command order therefore affects both the transformation and the number of output lines.

### Substitution and retained text

The substitution command has the form `s/pattern/replacement/flags`. Its `g` flag replaces every match in the pattern space, while its `p` flag prints the result when a substitution succeeds. An address that repeats the substitution's matching condition is usually unnecessary.

A module-path change from `prediction.logger` to `logs.logger`, for example, can use substitution to update references. A literal dot in the matching expression is written as `\.`, because an unescaped dot matches any character. Precise patterns reduce unintended changes.

Sed's hold space retains text across cycles. The `h` command replaces its contents with the pattern space, `H` appends a newline and the pattern space, and `g` retrieves the stored text into the pattern space. This standalone `g` differs from the substitution's global flag.

These operations allow several lines to become one output line. For a class definition beginning on line 13, `13h` stores the first line, `14,$H` appends the remainder, and `$g` retrieves the accumulated block. A global substitution can then replace internal newlines with literal `\n` sequences. The selected code becomes a single-line representation suitable for expected text in a test. A line count with `wc` confirms the output's shape.

### File selection, editing, and review

In Bash, `shopt -s globstar` enables recursive file matching with `**`. A pattern such as `**/*.lua` can then supply Lua files from the current directory and its subdirectories. The shell selects the files before sed processes them.

Sed's `-i` option writes output back to the input files. Printing settings therefore determine which content survives an edit. A preview that uses `-n` and a substitution's `p` flag prints only changed lines. Applying that arrangement with `-i` removes all other lines. Removing `-n` but retaining `p` preserves unchanged lines and duplicates changed ones. An ordinary in-place replacement generally needs automatic printing without the additional `p` flag.

A clean Git working tree makes broad edits easier to inspect and reverse. Diffs reveal deletions, duplicates, and changes outside the intended scope. Direct file inspection can resolve ambiguous diffs, while `git add --patch` supports reviewing changes individually before committing them. Recovery operations require care around unrelated uncommitted work.

GNU sed's `--debug` option shows commands and buffer contents during execution. It helps identify whether unexpected output results from addressing, command order, substitution, or printing.

For accumulated text, the trace shows the first selected line entering the hold space, later lines being appended, and the completed block returning to the pattern space. It exposes intermediate values that the final output alone cannot show.

## Awk: records, fields, and rules

### Patterns and actions

Awk uses pattern-action rules. A matching pattern triggers its action. A pattern without an action prints the matching record, while an action without a pattern applies to every record. Within an action, `print` without an argument prints the whole record.

By default, each input line is a record, and whitespace separates its fields. `$0` represents the entire record, while `$1`, `$2`, and later numbered fields represent its components. A size such as `5 GB` therefore occupies two fields.

For a downloaded-model listing, a pattern matching a colon can exclude a header if model names contain colons and the header does not. An action can then print selected fields, such as the name or size. Input can arrive through a pipe or through named file arguments. Saving command output to a file simplifies repeated experiments when producing the listing is slow.

Every matching rule runs in order for the current record. Two matching print rules produce two copies of that record before awk moves to the next one. This record-by-record execution resembles sed's processing cycle, although awk supports more extensive variables and control flow.

### Formatting and sorting

Adjacent awk expressions concatenate their values. Commas in `print` separate values with the output field separator, `OFS`, which defaults to a space. The option `-v OFS='\t'` selects tabs. Tabs can improve readability, although varying field lengths can still prevent neat alignment.

Sorting sizes requires attention to units. A numeric sort can place `500 MB` between `5 GB` and `7 GB`. Joining each number to its unit creates keys such as `500MB` and `5GB`, which `sort -h` can order by human-readable size.

Where fields three and four contain the number and unit, and the first field contains the model name, the pipeline is:

```bash
awk '/:/ { print $3 $4, $1 }' models.txt | sort -h
```

Replacing `$1` with `$0` retains the original record after the size key. The resulting output combines a sortable value with the original descriptive information.

### Record tracking and separators

Several built-in variables control selection and interpretation:

| Variable | Purpose |
| --- | --- |
| `NR` | Counts records read across all input files. |
| `FNR` | Counts records within the current file and resets for the next file. |
| `FILENAME` | Identifies the current input file. |
| `RS` | Defines the input record separator. |
| `FS` | Defines the input field separator. |
| `OFS` | Defines the separator between comma-separated output values. |

With ordinary line-based input, `NR > 2` skips the first two lines overall. `FNR > 2` skips the first two lines of every file. A pipe supplies a stream without the original file boundaries or filenames. GNU awk uses `-` to identify standard input in this context.

For example, after ten records in the first file, the next file begins with `NR` equal to 11 and `FNR` equal to 1. Choosing between these counters determines whether a condition applies to the combined input or separately to each file.

Custom separators allow records to span several lines. For consistently formatted XML, setting `RS` to `<book>` groups text by book. A condition such as `NR > 1` excludes text preceding the first book tag. Setting `FS` to a newline then makes each line within a book record a field. Identifier, title, and author elements become accessible by field number, although tags and indentation remain. This technique depends on the layout and does not provide general XML parsing.

### Program files and control flow

The `-f` option loads an awk program from a file. This reduces shell-quoting difficulties and makes longer programs easier to maintain. Editor language-server support can provide completion and documentation, while `#` introduces comments.

Conditions can appear in patterns or in `if` statements inside actions. The `nextfile` statement skips the remainder of the current file and continues with the next. Rule order determines whether the triggering record has already been printed before processing moves on.

## Bash: structure and failure handling

### Logs and final results

Robustness measures work best when proportionate to the task. Applying every available safeguard can make a small script unnecessarily complex.

A backup script can accept a source directory and filename pattern, find matching files, create a temporary directory with `mktemp`, and copy files there. Quoting a pattern such as `'*.awk'` prevents the calling shell from expanding it, leaving `find` to match files in the intended directory.

Logs reveal which operations occurred, but the final state also needs inspection. Files from different directories can share a basename and overwrite one another in a common destination. Copy messages alone can conceal that loss. A dependable backup process needs an explicit approach to filename collisions.

### Entry points and validation

A `main` function groups the principal operations, while supporting functions handle logging, validation, and cleanup. Calling it after those definitions makes the execution sequence easier to follow. Functions also support local variables, reducing unintended interactions with global state.

Without a clear entry point, executable statements can become interspersed with helper definitions. Grouping the main sequence allows its purpose to remain visible as logging and error handling grow.

The call `main "$@"` forwards the script's arguments while preserving their boundaries. Assigning positional parameters to descriptive names such as `source_directory` and `pattern` clarifies later operations and input checks.

Critical inputs need validation. A required directory must be supplied and pass a `-d` directory test. Missing arguments can produce usage information, while invalid values need specific errors. A shared `die` function can log a message and exit with a non-zero status, keeping error handling consistent. Helper functions also avoid repeating formatting and exit logic at each input validation check.

### Failure detection and reporting

A failed command can disappear among later messages suggesting success. Bash offers several relevant options:

| Option | Effect |
| --- | --- |
| `-e` | Exits after unhandled command failures where Bash's rules apply. |
| `-u` | Treats many expansions of unset variables as errors. |
| `-o pipefail` | Makes a pipeline report failure when any component command fails. |
| `-E` | Enables inheritance of `ERR` traps within functions and related execution contexts. |

These options have contextual exceptions and require deliberate use. In particular, `pipefail` prevents an earlier pipeline failure from being concealed by a successful final command.

An `ERR` trap can report the script name, line number, and failing command when a qualifying failure occurs. The `-E` option is relevant when that failure occurs inside `main` or another function. Terminating on failure and explaining the failure serve distinct purposes.

A missing source file illustrates the distinction. The copy command can report its own failure, but later operations may continue and obscure it. Appropriate error-exit behaviour stops that sequence, while a trap supplies the location needed to diagnose the problem.

An `EXIT` trap can run cleanup and report the outcome as the shell exits through its usual exit paths. Capturing the exit status before other commands run preserves the result for reporting.

ANSI terminal colours can make success and failure messages more visible. Helper functions can encapsulate escape sequences, keeping the main logic readable. Written status labels and exit codes retain the meaning of the result.
