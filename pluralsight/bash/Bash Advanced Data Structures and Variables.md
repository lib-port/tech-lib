# Bash Advanced Data Structures and Variables

Bash functions group commands into reusable operations. Variables hold individual values, while arrays organise collections. Parameter expansion, quoting, and word splitting determine how those values become command arguments. Together, these features support scripts that accept input, process collections, and pass results between commands.

## Functions and reusable definitions

A function assigns a name to a sequence of commands enclosed in curly braces. Bash accepts the `function` keyword with optional parentheses after the name, or a name followed by parentheses without that keyword. Consistent notation makes definitions easier to read.

```bash
foo() {
    echo bar
}
```

Calling `foo` executes its body. A function can contain several commands, and a multiline definition separates them with newlines. During interactive entry, Bash displays a continuation prompt until the definition is complete.

Definitions belong to the shell in which they are loaded. Saving them in a file such as `functions.sh` makes them reusable across sessions. The command `source functions.sh` executes that file's commands in the current shell, making its functions available there. The `.sh` extension is optional.

Editing a file does not update definitions already loaded. Sourcing it again installs the revised definitions in the current shell.

## Arguments, expansion, and local variables

Function arguments become positional parameters. `$1` identifies the first argument, `$2` the second, and `$#` the number supplied. A wrapper that forwards only `$1` discards later arguments, including any additional options or command names.

The expansion `"$@"` preserves every supplied argument as a separate argument, including values containing spaces. It also handles a call with no arguments. A wrapper around Bash's `help` command can therefore forward its complete input while piping the result to `bat` for syntax highlighting.

```bash
help_bat() {
    help "$@" | bat --language=help
}
```

A call such as `help_bat -m help` preserves both the formatting option and the requested command. Several command names can also be passed together. The `-m` option requests a manual-style format, while `-d` produces short descriptions. Both options pass through the wrapper without further processing.

Indirect expansion obtains a parameter's value through another variable. If `name=wes` and `customer=name`, `${customer}` produces `name`, while `${!customer}` follows that reference and produces `wes`. A variable containing an argument position can similarly retrieve its value through `${!position}`.

Function arguments begin at one. `$0` identifies the shell or script invocation, rather than the first function argument. In a shell started interactively as `bash`, sourced functions may see `bash` as `$0`. Starting the shell with its full path can produce that path instead.

A loop using numerical positions therefore runs from one through `$#`. When only values are needed, a loop over `"$@"` avoids indirect expansion.

Ordinary variables hold strings, so `+=` can concatenate text instead of adding numbers. Declaring `local -i sum=0` inside a function gives the accumulator integer arithmetic and local scope. Its assignments no longer replace an outer variable of the same name. An older outer value may remain after the function finishes, but that does not indicate that the local value escaped.

An adding function combines these features by looping through the arguments, adding each value to a local integer accumulator, and printing the total.

```bash
adder() {
    local -i sum=0
    local param
    for param in "$@"
    do
        sum+=$param
    done
    echo "$sum"
}
```

For arguments `1`, `4`, and `10`, the result is `15`. Declaring the loop variable locally also keeps it from changing an outer variable.

## Exit status, output, and composition

Bash separates a function's status from its textual result. Exit status zero indicates success, while a non-zero status indicates failure. An `if` condition tests a command's status, even when the command prints nothing. `$?` exposes the preceding command's status.

The `return` builtin controls a function's exit status. Without an explicit return, the status comes from the last command executed. Textual results conventionally travel through standard output, or stdout. Standard error, or stderr, carries diagnostics separately.

A repository-root function illustrates this division. It can check for a Git repository, then a Mercurial repository, and otherwise use the current directory. Separate helpers can perform each repository check and retrieve each root path. This composition makes the operations readable and reusable.

Detection helpers need only an exit status, so their output can be suppressed. Path-producing helpers retain stdout for their result. If neither repository exists, an explanatory message can go to stderr while stdout carries the current directory.

Command substitution captures stdout for another command. The expression `cd "$(repo_root)"` uses the path printed by `repo_root` as the destination. Keeping diagnostics separate prevents them from becoming part of that path.

## Indexed arrays

An indexed array stores values under numerical subscripts. The assignment `languages=(Python JavaScript Go)` creates elements at indices zero, one, and two. `${languages[1]}` retrieves `JavaScript`, while an expansion without a subscript refers to element zero.

Curly braces delimit a subscripted expansion. Without them, `$languages[1]` expands the variable and leaves the bracketed suffix outside that expansion, rather than retrieving the selected element.

Arrays can contain gaps. Assigning `languages[6]=applescript` does not populate intervening indices. Appending with `languages+=(Rust)` places the new value after the highest existing index, leaving earlier gaps intact. The command `unset 'languages[1]'` removes one element without renumbering the others. `unset languages` removes the whole variable.

Subscripts accept arithmetic expressions. An index written as `1+3` selects position four. Negative subscripts count backwards from one beyond the highest index, so `-1` selects the final position. A more negative subscript can land on a gap.

The expansion `"${languages[@]}"` preserves each stored element as a separate argument. The quoted expansion `"${languages[*]}"` instead joins the elements into one argument, using the first character of `IFS` as the separator.

The command `declare -p languages` displays the variable's attributes, indices, and values. Lowercase `-a` identifies an indexed array. Assigning a subscripted element to a scalar can turn it into an indexed array, preserving the original scalar value at index zero. The printed declaration is executable Bash syntax and can recreate the variable in another shell.

Piping this declaration through `bat` can add Bash syntax highlighting. Colour is optional, but inspection of the declaration establishes the variable's structure directly.

## Associative arrays

An associative array stores key-value pairs, allowing lookup by meaningful string keys. It requires an explicit `declare -A` before or during initial assignment. An ordinary parenthesised assignment otherwise creates an indexed array.

Assignments can use `[key]=value` entries or supported alternating key-value syntax. An existing indexed array cannot be converted directly with `declare -A`. It must first be removed and recreated. Individual entries can be deleted with `unset` and the relevant key.

An HTTP status lookup demonstrates the purpose of this structure. A table can associate `404` with `Not Found` and `301` with `Moved Permanently`. A function can request a URL through `curl`, capture the status code, and retrieve its explanation from the table. An unknown code receives a fallback description.

Redirect handling affects the lookup's input. Following redirects with `curl -L` may return the final response's status instead of the original redirect status. The code being explained must therefore correspond to the intended response.

A service that generates specified HTTP responses can test the mapping. Responses such as `201 Created` and `202 Accepted` demonstrate distinct entries in the lookup.

## Quoting and word splitting

Arguments are separated according to shell syntax and expansion rules. Quoting `3 4` makes it one argument containing a space, rather than two numerical arguments. An adding function therefore receives different input from `adder 1 2 '3 4'` and `adder 1 2 3 4`.

Quotes used during assignment do not permanently protect the stored value. With `nums='1 2 3 4'`, the call `adder $nums` allows the expanded string to split into four arguments under the default settings. The call `adder "$nums"` preserves the whole string as one argument.

Whether splitting is appropriate depends on the value's purpose. Spaces may separate numbers intended for addition, or they may belong inside a single identifier. Quoting expresses that distinction when the value is expanded.

The `read` builtin can collect input into a variable. Its `-p` option supplies a prompt, and `-r` disables special backslash handling. With ordinary settings, leading whitespace may be removed. A deliberately unquoted expansion can subsequently separate a list of entered numbers.

Execution tracing with `set -x` shows expanded commands and helps reveal argument boundaries. Running the trace in a subshell confines that setting to the diagnostic operation.

## Delimiters and IFS

The internal field separator, `IFS`, controls the delimiter characters used for word splitting. Its default value contains a space, a tab, and a newline. `declare -p IFS` exposes these otherwise difficult-to-see characters.

Comma-separated numbers do not split into individual arguments under the default delimiters. Setting `IFS=,` before an unquoted expansion allows splitting on commas. A subshell confines the change, preserving the parent shell's setting.

An unintended arithmetic result need not produce an error. Inspecting the argument count and values can reveal that a comma-containing string remained a single argument.

```bash
(
    IFS=,
    adder $nums_csv
)
```

Changing `IFS` affects subsequent splitting, so limiting its scope prevents unintended effects on later commands. Double quotes still prevent the expanded scalar from splitting, regardless of the delimiter.

The same principle applies to `PATH`, whose directory components are separated by colons. With `IFS=:` in a subshell, an unquoted expansion can supply those components to a loop. Each resulting directory can then be quoted when printed or passed to another command. Printing each component separately produces one directory per line, while processing each in turn supports searches across the directories.

A search can use `fd` to find names containing `git` within each directory, with its depth limited to the directory's immediate entries.
