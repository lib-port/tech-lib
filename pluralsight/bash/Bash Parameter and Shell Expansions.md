# Bash Parameter and Shell Expansions

Bash expands parts of a command before executing it. An expansion can insert a variable's value, capture command output, generate strings, or select matching filenames. Quoting controls which characters retain their special meaning. Together, these mechanisms allow commands to combine fixed text with values determined when they run.

The resulting arguments are passed to the command. For example, when a wildcard matches several filenames, Bash supplies those names individually. The receiving program generally does not see the original pattern.

## Parameter expansion

Parameter expansion retrieves a parameter's value. For a variable named `current_date`, both `$current_date` and `${current_date}` perform this substitution. Braces identify where the name ends, which is essential when adjoining text could form part of it.

```bash
backup_file="${current_date}_employee.json"
```

Without braces, `$current_date_employee` refers to a different variable because underscores are valid in variable names. The dot before `json` ends the name. The `declare -p` builtin can inspect a variable's declaration and reveal whether it exists.

Literal text and expanded values can be combined in one assignment. The `+=` operator offers another approach by appending text to an existing value. Braces preserve the intended boundaries in either approach.

A stored backup name can therefore combine a label, a date, and an extension without separate assignments for every component. Reassigning the variable replaces its stored value with the newly constructed string.

### Removing and replacing text

Parameter expansion can produce a modified value without changing the original variable. Prefixes and suffixes are matched against patterns. An asterisk matches a sequence of characters.

| Expression | Result |
| --- | --- |
| `${var#pattern}` | Removes the shortest matching prefix. |
| `${var##pattern}` | Removes the longest matching prefix. |
| `${var%pattern}` | Removes the shortest matching suffix. |
| `${var%%pattern}` | Removes the longest matching suffix. |
| `${var/pattern/replacement}` | Replaces the first match. |
| `${var//pattern/replacement}` | Replaces every match. |
| `${var/#pattern/replacement}` | Replaces a match at the start. |
| `${var/%pattern/replacement}` | Replaces a match at the end. |

For a path such as `/data/customer.json`, `${original_file##*/}` leaves `customer.json`, while `${original_file%/*}` leaves `/data`. These components can be stored separately and recombined with a date to construct a backup path beside the original file.

The shortest and longest forms can produce very different results. Removing the shortest `*/` prefix from an absolute path may remove only its initial slash. Removing the longest `/*` suffix can remove the entire path.

Replacement also depends on the pattern's scope. Replacing `json` might change an earlier directory name instead of the extension. A suffix restriction targets the end, while the double-slash form changes all matching occurrences.

### Defaults and assignment

The expression `${var:-default}` substitutes a fallback when `var` is unset or empty. Otherwise, it returns the existing value. It does not store the fallback in the variable.

The expression `${var:=default}` also assigns the fallback when the variable is unset or empty. This side effect can be easy to overlook inside a logging command. An explicit conditional using `-z` to test an empty value may express more involved defaulting logic more clearly.

The command `unset var` removes the variable, whereas an assignment can leave it present with an empty value. Both conditions trigger these colon-based defaults. A later expansion reveals whether a fallback was also assigned.

## Command and process substitution

Command substitution, written `$(command)`, captures a command's output for use in an assignment or another command. A backup date can therefore be obtained when the command runs:

```bash
current_date=$(date +%F)
backup_file="employee-${current_date}.json"
```

The format selects a year-month-day date. Parameter expansion then inserts the stored value into the filename. Parameter expansion retrieves a value, while command substitution obtains command output.

Substitutions can be nested. In `ls "$(dirname "$(which bash)")"`, the innermost command locates Bash, `dirname` obtains its containing directory, and `ls` receives that directory. The older backtick syntax also performs command substitution, but nesting it requires escaping the inner backticks. Parenthesised substitutions make the boundaries easier to distinguish.

Process substitution supplies a file-like path through which another command can read output. The form `<(command)` is useful when a program expects filenames. For example:

```bash
diff <(help help) <(help -m help)
```

This compares two formats of Bash's help output without requiring separately managed temporary files. A side-by-side comparison utility such as `icdiff` can use the same approach. Command substitution supplies captured text, whereas process substitution supplies access to output through a path.

The equivalent file-based workflow redirects each command's output to its own file, passes both filenames to the comparison utility, and removes the temporary files afterwards. Process substitution eliminates that explicit file management while providing the inputs the comparison needs.

## Paths and generated strings

### Home directories

An unquoted `~` at the beginning of a path normally expands to the current user's home directory, using `HOME`. A following path extends that location, as in `~/repos`. A name immediately after the tilde selects another account's home, as in `~wes/repos`.

Thus `ls ~` lists the home directory, while `ls` without a path ordinarily lists the current working directory. The `pwd` command identifies that working directory. Changing `HOME` changes the expansion of `~`.

### Filename matching

Pathname expansion, or globbing, replaces patterns with matching filesystem paths. Common patterns include:

- `*` matches a sequence of characters within a filename component.
- `?` matches one character.
- `[pl]` matches either `p` or `l` at that position.
- `[[:digit:]]` matches one digit, and `[[:alpha:]]` matches one letter.

For example, `~/.bash*` selects names beginning with `.bash` in the home directory. Bash expands the pattern before invoking `ls`, `cp`, or another command, so the syntax is available across programs.

The number and position of pattern characters determine the match. The pattern `.bash??` can match `.bashrc`, while `.bash?` cannot match that name. Likewise, `test[[:digit:]].txt` requires one digit between `test` and the extension.

By default, an unmatched glob remains literal. An ordinary wildcard also excludes names beginning with a dot. An explicit leading dot can select those names, while `shopt -s dotglob` allows ordinary globs to include hidden entries. The command `shopt dotglob` reports the option's state.

Matching and display are separate operations. A backup directory may contain dotfiles even when an ordinary listing appears empty. The `ls -a` option includes hidden entries in its output.

### Brace expansion

Brace expansion generates strings from comma-separated alternatives. The expression `test{1,2}.txt` produces `test1.txt` and `test2.txt`, whether or not either file exists.

Brace expansion precedes pathname expansion. Consequently, `*.{sh,csv}` first produces `*.sh` and `*.csv`, after which globbing finds matching files. Similarly, `{guess,test}*` generates two filename patterns. The mechanism also applies to non-file arguments, such as `google.{com,org}` for two domain names.

## Quoting and expansion order

Quoting controls how Bash interprets characters and groups text into arguments. Its principal forms have different effects:

- A backslash protects the following character where the quoting rules allow it.
- Single quotes preserve enclosed characters literally. `'$name'` remains text.
- Double quotes allow parameter and command substitution while protecting the surrounding word.
- Dollar-prefixed single quotes, `$'...'`, interpret recognised escape sequences.

Double quotes therefore allow `"$name"` to contain a variable's value and `"$(date)"` to contain command output. Backticks also retain their substitution role inside double quotes. A backslash can protect certain special characters there, whereas backslashes remain literal inside ordinary single quotes.

In interactive shells with history expansion enabled, `!!` can insert the previous command even within double quotes. Single quotes suppress that interpretation.

An ordinary single-quoted section cannot contain a single quote, even when preceded by a backslash. An unmatched quote can leave Bash waiting for further input. Subsequent lines can become part of the same value until the quoted section closes, including any literal newlines entered between them.

The `$'...'` form provides explicit control over spacing characters. For example, `$'hello\nworld'` includes a newline, `\t` represents a tab, and `\'` supplies a literal single quote. Ordinary single quotes do not interpret those escapes, although they can preserve a literal newline entered within the quoted text.

Selective quoting also reveals expansion order. In `\*.{sh,csv}`, the protected asterisk prevents globbing while brace expansion produces the literal patterns `*.sh` and `*.csv`. Escaping the braces instead leaves them literal and allows the asterisk to participate in filename matching.

Programs that interpret their own patterns need those patterns passed intact. For example, `fd 'test\d'` preserves the backslash for the program's regular expression. Without quoting, Bash can remove that backslash as an escape, changing what the program receives.

### Quote removal

Quote removal is the final expansion step. Quotes that controlled interpretation disappear before the command receives its arguments. Accordingly, `echo foo` and `echo "foo"` pass the same simple word, although quoting an asterisk changes whether filename matching occurs.

Adjacent quoted sections without intervening spaces form one argument. Different quoting forms can therefore be combined to include characters that cannot appear directly within one form. Spaces between sections instead separate arguments.

For example, `'*'".csv"` forms the single literal argument `*.csv`. The first section protects the asterisk, and the second contributes the suffix. Removing the surrounding quote characters does not subsequently reactivate the protected wildcard.

## Tracing and command execution

The command `set -x` enables execution tracing, which shows commands after relevant substitutions. In a command substitution, tracing can show the inner command first and its output incorporated into the subsequent assignment. The command `set +x` disables tracing.

Trace output may use quotes to distinguish the resulting arguments. Those displayed quotes describe the arguments rather than reproduce every character originally typed. Tracing is therefore useful for separating shell interpretation from a command's own output.

A shell started with `bash --norc --noprofile` avoids the usual startup-file customisation. On Linux, `strace -f -e trace=process bash --norc --noprofile` exposes process-related system calls and follows child processes.

Builtins such as `echo` and `type` ordinarily run within the existing shell. A simple variable assignment also needs no child process. The `type` builtin distinguishes builtins from external executables such as `ls`.

For an external command, a trace can show child creation followed by `execve`, which loads the program. Expanded filenames appear as arguments. The special parameter `$?` provides the previous command's exit status, while `$$` identifies the shell process.

## Subshells and command groups

Commands grouped in parentheses run in a subshell. It starts with a copy of the parent's variables and settings, but changes made there do not update the parent. This allows temporary assignments or option changes, including tracing and `dotglob`.

If the parent has assigned `name=customers`, a subshell initially sees that value. Assigning another value inside the subshell changes only its copy. Enabling `dotglob` there similarly leaves the parent's option unchanged after the group finishes.

A subshell performing builtin operations can use its existing Bash code without loading another program. The parent waits for the foreground group to finish before continuing. Output can still reach the terminal, but altered variable values remain local to the subshell.

Brace groups run in the current shell. Newlines can separate the braces and commands:

```bash
{
name=customers
echo "$name"
}
```

The assignment remains available after this group finishes. Grouping these builtin operations does not itself require a child process. Parentheses isolate shell-state changes, while braces retain them in the current shell.
