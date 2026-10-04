# Bash Input/Output and Streams

Bash connects commands through streams that carry input, results, and diagnostics. Redirection changes where these streams lead, while pipelines connect commands into larger operations. Understanding these connections helps explain how scripts handle data and report failures.

## Standard streams

A program normally has three standard streams, identified by file descriptors:

| Stream                  | Descriptor | Usual role                           |
| ----------------------- | ---------- | ------------------------------------ |
| Standard input, stdin   | 0          | Supplies input to the program        |
| Standard output, stdout | 1          | Carries ordinary results             |
| Standard error, stderr  | 2          | Carries errors and other diagnostics |

In an interactive terminal, input commonly comes from the keyboard, and both output streams appear on the screen. Their shared destination can obscure their separation. For example, `ls` writes a directory listing to stdout but reports a missing directory through stderr. Both can occur in one invocation.

Bash interprets the entered command line and starts the requested program. A foreground command uses its streams while Bash waits for it to finish. Commands such as `head`, which normally prints a file's first ten lines, also send their results through stdout.

These roles are conventions. A program can use the streams differently, so successful and failing cases need separate examination.

## Redirecting output

The `>` operator sends stdout to a file. An explicit descriptor selects another stream:

```bash
ls text missing >stdout.log 2>stderr.log
```

Assuming `text` exists and `missing` does not, the listing goes to `stdout.log`, and the error goes to `stderr.log`. Neither appears in the terminal. Redirecting only stdout would leave the error visible. The command `cat stdout.log` displays the saved listing without repeating the original operation.

The special file `/dev/null` discards everything written to it. Thus, `2>/dev/null` suppresses stderr, while `>/dev/null` suppresses stdout. An omitted descriptor before `>` means descriptor 1.

To combine both output streams in one file:

```bash
ls text missing >combined.log 2>&1
```

The expression `2>&1` gives stderr stdout's current destination. Bash applies redirections from left to right. In this example, stdout already points to the log when stderr is redirected.

The ampersand distinguishes a descriptor destination from a filename. The operation copies the destination at that point, rather than establishing a connection that follows every later change to stdout.

Reversing the order changes the result:

```bash
ls text missing 2>&1 >combined.log
```

Stderr retains stdout's original terminal destination, while stdout goes to the file. Bash also supports `&>combined.log` as a compact way to redirect both streams.

Redirecting each stream separately to the same ordinary file, as in `>combined.log 2>combined.log`, can cause their writes to overwrite one another. Sharing the destination with `2>&1` avoids that problem.

A single `>` normally replaces existing file contents. The `>>` operator appends, preserving earlier output:

```bash
ls text >>history.log 2>&1
```

Logs support later investigation and can save the time or expense of rerunning a command.

## Connecting commands with pipelines

The pipe operator, `|`, connects one command's stdout to the next command's stdin. For example, JSON retrieved by `curl` can pass directly to `jq` for formatting or filtering. The same transfer can be achieved by saving the first command's output in a file for the second to read.

An ordinary pipe carries stdout alone. Stderr keeps its existing destination, commonly the terminal. This allows progress information or diagnostics to remain visible without becoming part of the data being processed.

For instance, `curl` can display download progress on stderr when its response body goes to a pipe or file. Its `-s` option suppresses progress and error messages. Individual commands may behave differently when their output goes to a terminal, pipe, or file.

Long output can be piped to `less`, a pager that supports scrolling and searching. Within `less`, `/` starts a search, while Ctrl+U and Ctrl+D move by half a screen. Combining the output streams includes diagnostics in the pager:

```bash
ffprobe -h 2>&1 | less
```

Bash's `|&` operator provides a compact alternative:

```bash
ffprobe -h |& less
```

Redirection also needs to apply at the correct level. A wrapper such as `watch` collects another command's output for repeated display. Redirecting the wrapper's stderr may leave the inner command's error visible. Including the redirection inside the quoted command applies it before `watch` receives the output:

```bash
watch -n 1 'head data.csv missing.csv 2>/dev/null'
```

The interval is one second. If the missing file is created, its contents appear on a later refresh. Ctrl+C stops the repeated command. Testing such changes helps establish which output reaches the display.

## Caching intermediate results

Pipelines avoid unnecessary temporary files, but saving an intermediate result can help during development. Repeated API requests can be slow or encounter request limits. A cached response allows later filters and transformations to be refined without retrieving the same data again.

For example, a saved JSON response can feed a processing command:

```bash
cat response.json | jq .
```

The `.` filter returns the JSON value for formatted display. A processor may also accept the filename directly, as in `jq . response.json`. Keeping `cat` as the producer during development makes it easy to restore the original retrieval command while leaving downstream stages unchanged. The complete pipeline can then be checked with fresh data.

A cached collection of questions, for example, can support repeated attempts to select titles and links, group related fields, and change the output format. This separates experiments with the data's structure from the cost of retrieving it.

## Detecting pipeline failures

An output file's existence does not prove that every stage succeeded. An early command can fail while a later command accepts empty input and produces an apparently valid empty result.

By default, a pipeline returns the exit status of its final command. The special parameter `$?` contains the latest status. Zero conventionally indicates success, and a non-zero value indicates failure. A successful final stage can therefore conceal an earlier failure.

The `pipefail` option changes the overall result:

```bash
set -o pipefail
```

With this option enabled, any failing stage makes the pipeline's status non-zero. The value comes from the rightmost command that failed. If all stages succeed, the result is zero. The command `set +o pipefail` disables the option, and `set -o` lists current option settings.

Bash's `PIPESTATUS` array holds each stage's exit status in command order:

```bash
false | true | true
echo "${PIPESTATUS[@]}"
```

The values are `1 0 0`. The overall status is zero under the default rule and one with `pipefail` enabled. The commands `true` and `false` provide simple ways to explore these differences.

Status values need to be inspected or saved immediately, because another command updates them. Even displaying `$?` with `echo` changes what a subsequent status check describes.

For interactive feedback, `PROMPT_COMMAND` can run a command before each Bash prompt. It can display the previous pipeline's individual statuses alongside its overall status, making the effect of `pipefail` visible during experimentation.

## Supplying script input

Bash can read commands from stdin. Piping shell text into `bash` starts another Bash process to execute it:

```bash
echo 'echo My PID is $$' | bash
```

The parameter `$$` identifies the Bash process. Single quotes preserve it in the parent shell, allowing the new Bash process to expand it. Each invocation starts a new process, while the parent shell retains its own process ID. Newlines can separate several commands within the supplied text.

A here document provides multiline input directly. The `<<` operator introduces a delimiter, and a line containing that delimiter ends the body:

```bash
bash <<'EOF'
echo "My PID is $$"
pwd
ls ..
EOF
```

The body becomes the command's stdin. Blank lines do not terminate it. With an unquoted delimiter, the calling shell expands expressions such as `$$` before passing the text onwards. Quoting the delimiter suppresses those expansions. A receiving Bash process can then expand the expressions when executing the supplied commands.

Both single and double quotes around the delimiter provide this protection. Escaping an individual expression with a backslash offers more selective control when the rest of the body should still undergo expansion.

Here documents also supply data to other programs. Embedded JSON can feed `jq` within a script, and `cat` can copy a body into a file through output redirection. This keeps small data samples or generated script text alongside the commands that use them.

The delimiter's name is arbitrary, so `JSON` can identify an embedded data block. A saved shell script can subsequently be inspected with `cat` or executed by passing its filename to `bash`.

## Reading responses and arguments

The `read` command assigns input to named variables. Its `-p` option supplies a prompt:

```bash
read -p 'Name: ' name
echo "$name"
```

How a variable is used determines whether its contents remain literal. Double quotes preserve the value as one argument and prevent word splitting and pathname expansion, also called globbing. An unquoted expansion permits both.

For example, if `response` contains `*`, then `ls $response` can expand it into matching filenames. The command `ls "$response"` instead requests a file whose name is literally an asterisk. Quoting recommendations from tools such as ShellCheck need to be considered alongside the intended behaviour. Deliberately accepting a pattern differs from accepting one literal filename.

The command `set -x` traces commands after expansion, revealing which arguments actually reach the program.

Scripts and shell functions also receive command-line arguments through positional parameters such as `$1`, `$2`, and `$3`. A quoted argument containing spaces remains one argument. An unquoted wildcard is expanded by the calling shell before the script starts, so matched filenames become separate arguments.

## Turning input into arguments with xargs

The `find` command produces lists of matching paths. The `xargs` command converts incoming items into arguments for another command, bridging the distinction between stdin data and command-line arguments.

GNU versions commonly appear on Linux. On macOS, Homebrew's `findutils` package can provide `gfind` and `gxargs`. When a search is slow, caching a few matched paths allows later processing to be developed without repeating the whole search.

For example, `xargs` can supply filenames to `cat` or directly to `grep`. The latter can search the files without a separate concatenation stage. The `grep -A` option includes a chosen number of lines after each match, which helps inspect surrounding text.

Several `xargs` options control or reveal its behaviour:

- `-t` prints each constructed command before executing it.
- `-n 1` limits each invocation to one input argument.
- `-I` defines a replacement marker, placing each input line at a chosen position in the command's arguments.

Without an explicit command, `xargs` normally runs `echo`. It can batch several input items into one invocation, while replacement mode processes input one line at a time.

The replacement marker can occur wherever an input item is needed, rather than only at the end. A command assembled with `bash -c` can perform several successive shell operations for each item, such as displaying a filename and then searching its contents. In replacement mode, a separate `-n 1` setting is unnecessary.

## Preserving variables outside pipelines

Under normal Bash pipeline behaviour, stages run in subshell environments. A `read` command in a pipeline can assign variables successfully, yet those assignments remain unavailable to the parent shell afterwards.

A display command grouped with `read` in the same pipeline stage can still access those values. Their disappearance outside that stage reflects the separate execution environment, rather than a failure to read the input.

A here string supplies input without placing `read` in a pipeline. It uses `<<<`:

```bash
false | true
read -r first second <<< "${PIPESTATUS[*]}"
echo "$first $second"
```

Here `read` runs in the current shell and receives the preceding pipeline's statuses. The variables remain available afterwards, holding `1` and `0`. This separates the transfer of input from the creation of a pipeline subshell.
