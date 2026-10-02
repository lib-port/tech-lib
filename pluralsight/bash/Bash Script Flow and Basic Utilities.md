# Bash Script Flow and Basic Utilities

Bash combines a command-line interface with a scripting language. Individual commands can retrieve files, inspect data, and transform text. Conditions determine which commands run, while loops repeat operations over numbers, words, or file contents. These features support repeatable workflows, from downloading a dataset only when needed to identifying records that require inspection.

## The shell and its scripts

A terminal application hosts a shell, but the two are distinct. Opening Terminal or iTerm does not establish that Bash is running. The active shell can be identified through its process information with `ps`. Error messages may also identify it through a prefix such as `bash:` or `zsh:`. Running `bash` starts a Bash session, and `echo "$BASH_VERSION"` displays its version.

Versions affect available features. An older `/bin/bash` installation on macOS can coexist with a newer installation provided through Homebrew. The version of the running shell therefore deserves attention when commands behave differently across systems.

A shell script stores commands in a text file. `touch process.sh` creates an empty file if it is absent, and an editor supplies its contents. The command `source process.sh` executes those commands in the current shell. Tab completion reduces filename typing, while Ctrl+R searches command history for commands that can be reused.

## Downloading and inspecting files

A comma-separated values file, or CSV file, represents records as text with commas between fields. Both `curl` and `wget` can retrieve one. By default, `curl` displays the response through standard output, which can be redirected into a file. An ordinary `wget` invocation saves the downloaded resource directly.

The command `ls` lists local files, and `ls -l` adds details such as size and modification time. `cat` displays complete file contents. For larger files, `head` and `tail` provide smaller samples, showing the first or last 10 lines by default. Options such as `head -n 15` and `tail -n 20` change the sample size.

The `rm` command removes files. A pattern such as `cpi*` selects every matching name, so its scope includes all files beginning with those characters.

The command `wc` reports newline, word, and byte counts, in that order. A CSV record containing no whitespace counts as one word despite containing several fields. Equal counts can help compare files, but do not prove that their contents are identical. Several filenames produce individual results and an overall total.

Byte counts and character counts coincide for ordinary ASCII text, but can differ with other encodings. This distinction prevents a file's storage size from being mistaken for its number of visible characters.

Repeated downloads can create suffixed copies such as `.1` or `.2`. A later command reading the original filename may therefore inspect an older copy. Conditional execution can prevent unnecessary downloads and this resulting ambiguity.

## Exit status and conditional execution

Every command returns an exit status. Zero indicates success, while a non-zero value indicates failure or, for a test, a false condition. The parameter `$?` holds the status of the most recently completed command. Its value must be inspected or saved immediately, because another command replaces it.

The command `test -f cpiai.csv` checks whether the named path is a regular file. It normally prints nothing. Its exit status communicates the result, and `echo "$?"` displays that status. A subsequent status check describes the `echo` command instead of the original test.

Two operators connect commands conditionally. With `&&`, the right-hand command runs only after success on the left. With `||`, it runs only after failure. This short-circuit behaviour avoids executing commands whose conditions have not been satisfied. Ordinary commands on successive lines run in sequence regardless of the preceding status, unless other control flow intervenes.

If `url` contains the download address, a regular-file test can control retrieval:

```bash
test -f cpiai.csv || wget "$url"
```

This assumes that the downloaded resource is saved as `cpiai.csv`. An existing regular file skips the download. An absent file triggers it.

An `if` statement expresses the same decision more explicitly. Its body follows `then`, and `fi` ends the structure. The operator `!` reverses a condition:

```bash
if ! test -f cpiai.csv
then
    wget "$url"
fi
```

The form `[ expression ]` is another spelling of `test`, with spaces separating its components. Bash's `[[ expression ]]` is a distinct construct supporting grouping, negation, logical combinations, and regular-expression matching through `=~`. Separate test commands can be joined with `&&`, while double brackets can combine expressions within one condition.

For example, processing that requires two files can test both before reporting success:

```bash
[[ -f cpiai.csv && -f process.sh ]] && echo 'Both files are present'
```

If either regular file is absent, the message is skipped. A directory does not satisfy `-f`, even though it exists at the named path. These tests distinguish the required kind of filesystem object from simple presence.

## Variables, arithmetic, and input

An assignment associates a variable name with a value. Ordinary assignments have no spaces around `=`, and `$name` expands the stored value. Quoting preserves values that contain spaces and prevents unintended interpretation of special characters.

Bash arithmetic expansion uses `$(( expression ))`. Its special variable `RANDOM` supplies pseudorandom integers. The assignment `target=$((RANDOM % 10))` takes the remainder after division by 10, producing a target from zero through nine. Repeating the assignment generates another value, which can equal an earlier result.

The `read` built-in accepts a line of input and assigns its contents to variables. Its `-p` option supplies a prompt, as in `read -p 'Guess: ' guess`. Pressing Return submits the input. The resulting value is text, whether it contains a digit, several digits, or a sentence. Numeric use therefore requires validation rather than an assumption about what was entered.

## Loops and their stopping conditions

Bash has two principal forms of `for` loop. The arithmetic form contains initialisation, a continuation condition, and an update expression. A counter starting at zero, continuing while less than 10, and increasing by one processes zero through nine. An inclusive comparison changes which boundary value is included. The repeated commands appear between `do` and `done`.

A word-based `for` loop assigns each supplied word to a variable in turn. Brace expansion such as `{1..10}` supplies a sequence, while an explicit list supplies chosen words. An array can also supply the values. `mapfile` reads file lines into an array, and `"${lines[@]}"` expands its elements separately while preserving their boundaries.

Each iteration can perform several operations on the current value. A loop over file lines might display a line, pass it to `wc`, and associate the resulting counts with that line. The body therefore controls the processing, while the supplied words determine how often it runs.

A `while` loop repeats while its condition succeeds. A counter can be initialised before the loop, tested at the beginning, and updated within the body. An `until` loop uses the opposite rule, repeating while its condition fails and stopping when it succeeds.

The command `true` always succeeds, while `false` returns failure. Consequently, `while true` and `until false` support indefinite repetition. They still allow an explicit exit from the body. `break` leaves a loop, while `continue` skips the remainder of the current iteration. Ctrl+C can interrupt a running program.

Loop conditions can contain several commands. The last executed command determines the condition's status. For example, an `until` condition can read input and then check whether it equals `stop`. Joining these operations with `&&` makes the comparison depend on a successful read. Longer command chains require care because each additional command can affect the resulting status and obscure the stopping rule.

## Validation in a guessing game

A number-guessing game combines these mechanisms. It generates a target, reads a guess, compares the values, and limits or repeats attempts. A correct guess needs `break` to stop the loop. Without that exit, further iterations can produce repeated success messages.

Arithmetic comparison alone does not establish that the input is numeric. Some text can be interpreted as an arithmetic variable name and evaluate to zero when unset, creating an unintended match against a zero target. Other inputs can cause errors or different interpretations.

The condition `[[ $guess =~ ^[0-9]$ ]]` accepts exactly one digit. The caret anchors the beginning, the dollar sign anchors the end, and `[0-9]` selects a digit. The regular expression remains unquoted so that its operators retain their matching function.

Invalid input can produce a message and reach `continue` before comparison. In an arithmetic `for` loop, the update still occurs after `continue`, so preserving an attempt requires compensating for that increment. In a `while` loop, placing the increment after validation allows invalid input to bypass it. A separate `stop` check provides an explicit way to leave an unlimited game.

A three-attempt version can therefore count valid guesses rather than every submitted line. Repeated invalid entries leave the current attempt available, an incorrect valid digit advances the count, and a correct digit ends the game immediately. Its opening message can state either the attempt limit or the stopping word.

## Selecting and ordering CSV data

CSV headers contain column names rather than data values. `tail -n +2 cpiai.csv` begins at the second line and continues to the end. Redirecting that output creates a headerless working file:

```bash
tail -n +2 cpiai.csv > headerless.csv
```

A difference tool can confirm that the header is the only removed line. Small samples created with `head` make initial processing checks easier to inspect, and including their creation in a script makes those checks repeatable.

For simple comma-delimited records, `cut` selects fields. The option `-d ','` identifies the delimiter, while `-f 1` selects the first field. A range such as `-f 2-3` selects adjacent fields. A pipe sends one command's output to another command's input, allowing extraction and ordering to form a single operation.

Ordinary `sort` orders text, which can place 100 before 12. Numeric interpretation is necessary when ordering quantities. The human-numeric option `sort -h` handles numeric values and recognised size suffixes. For the decimal index values, extraction, sorting, and selection of the final line reveal the maximum:

```bash
cut -d ',' -f 2 headerless.csv | sort -h | tail -n 1
```

## Detecting malformed records

Regular expressions can identify lines that fail an expected structure. If data records begin with a four-digit year, an anchored pattern checks that prefix. The option `grep -v` reverses selection, returning lines that do not match. With extended regular-expression syntax enabled, the check can be expressed as:

```bash
grep -Ev '^[0-9]{4}' cpiai.csv
```

This also returns a non-numeric header. If a record has been split across two lines, its continuation may appear among the results. Adding `-C 2` displays two surrounding lines on either side where available, helping expose the break. A matching prefix does not establish that the whole record is valid.

A `while` loop using `read` can instead inspect each line individually, with input redirection supplying the file. Within the loop, `case` selects commands according to matching shell patterns and ends with `esac`.

Shell patterns differ from regular expressions. In `[0-9]*`, the bracket expression matches the initial digit, and `*` matches any remaining text. Repeating `[0-9]` four times requires four initial digits. A final `*` branch can flag unmatched lines. The character class `[[:alpha:]]` matches an alphabetic character and can distinguish the expected header, although it also accepts other alphabetic starts.

A recognised line can follow a branch with no processing, or a `true` command can occupy that branch. Unrecognised lines can receive a `PROBLEM:` label followed by their contents. This separates routine records from exceptions without discarding the text needed to investigate each exception.

Once a small sample behaves as intended, the same checks can process the full file, including a deliberately broken record used to confirm that the detection rule works correctly.

## Translating characters and finding help

The utility `tr` translates characters. A simple delimiter conversion replaces commas with literal pipe characters:

```bash
tr ',' '|' < cpiai.csv
```

The pipe needs quoting because an unquoted `|` is a shell pipeline operator. Single quotes preserve its literal meaning. Tabs or underscores can serve as alternative replacements, and `tr` also supports deletion. Character translation does not interpret CSV quoting, so it is suitable only when the input's structure permits that replacement.

Bash's built-in help, including `help test` and `help [`, explains individual commands. `man bash` describes command lists, compound commands, conditions, and loops. Utility manuals explain their respective options, supporting closer inspection when a workflow requires more precise behaviour.
