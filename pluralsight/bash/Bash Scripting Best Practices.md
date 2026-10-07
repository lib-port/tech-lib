# Bash Scripting Best Practices

Bash supports both interactive command sessions and automated scripts. Reliable use depends on understanding how the shell starts, where commands execute, which interpreter reads a script, and how failures are handled. These choices determine whether configuration is available, whether changes affect the current session, and whether processing continues after an error.

Startup files preserve a working environment across sessions. Scripts preserve repeatable procedures, such as resizing images, adding padding, and assigning output filenames. Clear configuration, explicit input requirements, and useful diagnostics make both forms of work easier to maintain.

## Persistent configuration

A setting entered at a prompt affects the current shell, but a newly opened shell may use different defaults. This can change results without an obvious warning. For example, the `globstar` option allows double-asterisk filename patterns to search through directory trees. A file search can therefore produce different results depending on whether that option is enabled.

For an interactive, non-login Bash shell, personal settings belong in `~/.bashrc`. The tilde represents the user's home directory. The file contains ordinary shell commands, including option settings, prompt assignments, and commands that load other configuration files. Recursive glob matching is enabled with:

```bash
shopt -s globstar
```

Editing the file does not automatically update existing shells. Starting another shell provides a way to check the revised configuration.

The `PS1` variable defines the primary prompt. Special sequences can display the current directory, time, or host name. The sequence `\W` shows the directory's final component, while `\w` shows its path, abbreviating the home directory where applicable. A compact prompt leaves more space for commands, and a trailing space separates the prompt from typed input. The appropriate detail depends on the working context.

Functions and aliases can also be loaded at startup. An alias gives a short name to a longer command, while a function can contain reusable logic. Related definitions can be kept in separate files and loaded with `source`, keeping `~/.bashrc` manageable. A repository-navigation function, for instance, can be shared without placing its entire implementation in the main configuration file.

A short alias can combine that function with `cd`, reducing repeated typing of command substitutions and quotation marks. The ordinary command `cd -` returns to the previous directory. Additional abbreviation extensions can expand shortcuts visibly while commands are typed, but these extensions are separate from Bash's built-in alias mechanism.

## Startup files and login mode

Login mode and interactivity are separate properties. A login shell uses profile files, whereas an interactive, non-login shell normally reads `~/.bashrc`. Starting Bash with `-l` or `--login` requests login mode.

| Shell context | Main startup behaviour |
| --- | --- |
| Interactive, non-login shell | Reads `~/.bashrc` |
| Login shell | Reads `/etc/profile`, then the first available, readable personal profile |
| Ordinary non-interactive script invocation | Does not automatically load `~/.bashrc` |

The personal profiles are checked in this order: `~/.bash_profile`, `~/.bash_login`, and `~/.profile`. Only the first readable file is selected. Creating `~/.bash_profile` can therefore change which personal configuration a login shell uses. If none of these files exists, system configuration can still apply.

This selection is not a sequence in which all three personal profiles run. Settings in a later file will be absent unless the selected profile loads that file or supplies the same configuration itself.

Login mode does not itself load `~/.bashrc`. A profile can explicitly source that file, but this is a choice made in the configuration.

System profiles vary. A Linux `/etc/profile` may source files under `/etc/profile.d` and load `/etc/bash.bashrc`. A macOS profile may invoke `path_helper`, load `/etc/bashrc`, and include terminal-specific settings. These arrangements explain why startup behaviour can differ between machines. The local profile's contents establish which additional files are read.

Other files have distinct purposes. `~/.bash_history` commonly stores command history, while `~/.inputrc` configures Readline, the facility used for command-line editing. Login shells can also run commands from `~/.bash_logout` when logging out. These files should not be confused with the personal startup configuration.

The command `shopt login_shell` reports whether login mode is active, independently of the shell's interactivity or the appearance of its prompt.

## Diagnosing configuration problems

The `type` command identifies how Bash resolves a command name, including aliases and functions. This helps explain a shortcut whose underlying behaviour has been forgotten.

Execution tracing provides more detail. `set -x` enables tracing in the current shell, while `bash -x` enables it from startup. Traces show commands as they execute, including expanded values. A misspelt command in a startup file can therefore be located among the surrounding operations.

The `-v` option instead displays input lines as Bash reads them. It includes function definitions, while execution tracing shows the commands within functions when they run. Both options can be combined when the relationship between source text and execution needs examination.

A subshell can contain temporary changes to shell state during an investigation. Testing a directory-changing alias there, for example, leaves the parent shell's working directory unchanged.

Startup options support comparison and recovery:

- `--norc` skips the usual interactive startup configuration.
- `--rcfile FILE` selects another configuration file for an interactive shell.
- `--noprofile` suppresses profile loading for a login shell.

Long options must precede single-character options, as in `bash --noprofile -lx`. Skipping configuration also removes the customisations it would have supplied.

An alternative startup file provides a controlled way to compare configurations. A prompt or function appearing only with one file can be traced to that configuration, rather than attributed to Bash generally. Diagnostic messages temporarily placed in startup files can confirm that those files run, while tracing avoids adding such messages. Together, these methods help establish which configuration is active before individual commands are investigated in detail.

On Linux, `strace` can show which files Bash attempts to open. Comparing runs with different startup options helps distinguish Bash's normal file selection from additional files sourced by local configuration.

## Interactivity and command input

An interactive shell provides a session in which a person enters commands and responds to their results. It resembles a read-evaluate-print loop, or REPL. A non-interactive shell normally processes a supplied command string, script file, or input stream without an ongoing command session.

Automation preserves a sequence that would otherwise require repeated manual work. An image-processing script can apply the same dimensions, padding, and naming rules to several files. Keeping that procedure in version control also records how the outputs were produced.

For example, centring a 70 by 70 pixel image on a 120 by 120 pixel canvas adds 25 pixels of padding on each side. Changing the canvas to 100 by 100 pixels reduces the padding to 15 pixels. One script adjustment can apply the revised dimensions to subsequent outputs.

The special parameter `$-` contains letters representing enabled shell options. An `i` indicates that the shell is interactive. These option letters can be displayed with `echo`:

```bash
echo "$-"
```

Invocation determines the context in which commands run:

| Invocation | Effect |
| --- | --- |
| `bash -c 'commands'` | Executes a command string |
| `bash -s < script.bash` | Reads commands from standard input, redirected from a file |
| `bash script.bash` | Reads commands from a file |
| `bash -i` | Explicitly requests an interactive shell |

The first three forms normally run non-interactively. Standard-input mode can also be selected implicitly when no command string or script filename is supplied.

Quoting is significant when one shell supplies commands to another. In `bash -c 'echo "$-"'`, the single quotes prevent the outer shell from expanding `$-`. The result therefore describes the new shell. Without suitable quoting, expansion could occur before that shell starts.

Forcing interactivity with `-i` can make functions loaded by `~/.bashrc` available. A script can also source the file containing the required definitions directly. Loading a focused dependency makes its requirements clearer and avoids unrelated prompt configuration.

Shell interactivity describes the execution context. A script can use that information to select input behaviour, such as requesting a filename in an interactive context or accepting it as an argument for automation.

A sourced image-processing routine can request a filename when the current shell is interactive. A separate invocation can instead take the filename from its first argument and report missing input. Once a valid path is available, both routes can use the same processing steps.

## Sourcing and executing files

Sourcing runs a file's commands in the current shell. The `source` command and the dot command provide this behaviour. In contrast, a pathname beginning with `./` executes a file from the current directory.

| Form | Execution context |
| --- | --- |
| `source ./script.bash` | Current shell |
| `. ./script.bash` | Current shell |
| `./script.bash` | Separate execution using the script's interpreter declaration |
| `bash script.bash` | Separate Bash process |

The space after the dot distinguishes sourcing from a relative pathname. The consequences extend beyond syntax. A sourced file can change the current shell's variables, options, and working directory. An `exit` command in that file can close the calling shell. Separately executing a script confines those shell-state changes to its own process.

A sourced script inherits the current shell's interactivity. The same file can therefore run interactively when sourced at a prompt and non-interactively when sourced within a command supplied to `bash -c`.

Direct execution requires execute permission. For example, `chmod u+x script.bash` grants that permission to the file's owner. A permissions listing shows execution rights with `x`. Colours in directory listings may also distinguish executable files, but their meaning depends on local configuration.

The parameter `$0` reflects the invocation. In a separately executed script, it normally identifies the script. Sourcing does not replace the calling shell's `$0` with the sourced filename.

Process identifiers provide another way to observe this distinction. Repeatedly sourcing a file uses the existing shell process, while separately launching its interpreter creates a new process. The execution method therefore affects both available shell state and process identity.

## Shebangs and interpreter selection

A shebang is the first line of an executable script. It begins with `#!` and identifies the interpreter for direct execution. Choosing the correct interpreter is essential because shells can have different syntax, variables, and behaviour. A fish-specific variable, for example, is not supplied by Bash.

A bare interpreter name after `#!` does not perform the ordinary command search through `PATH`. An executable interpreter path is needed, either directly or through a locating program. A suitable declaration also allows a script to be launched from a different shell.

An absolute interpreter path can work on one machine but fail on another where the program is installed elsewhere. A common Bash declaration uses `env` to locate the interpreter through `PATH`, the environment's command search path:

```bash
#!/usr/bin/env bash
```

The corresponding fish declaration ends with `fish`. This approach accommodates different installation locations, provided the required interpreter is available through `PATH`. It does not install the interpreter or make incompatible syntax portable.

Explicitly invoking `bash script.bash` already selects Bash. Sourcing similarly uses the current shell rather than launching the interpreter named in the file.

Editors and source viewers may also use a shebang to recognise the language of a file without an extension. This can enable syntax highlighting, language-server support, and completions. Editor snippets can reduce mistakes when inserting a standard declaration.

## Validating input and explaining failures

An interactive shell usually remains available after a command fails so that another attempt is possible. Scripts can also continue after failures, allowing later operations to use missing or invalid data. Reliable automation therefore needs deliberate validation and failure handling.

A dice-rolling script requires both a roll count and a side count. If the side count is missing, a later calculation may fail with division by zero. That describes the arithmetic failure without explaining which argument was omitted.

A diagnostic message showing the values received can make the cause clearer. Quotation marks around displayed values help expose empty input. Help output explains the available arguments, while validation connects an error to the correction required.

Logging reveals what the script is attempting, but does not itself prevent invalid processing. Validation provides that decision before calculations or other dependent operations begin.

The option `set -u`, also called `nounset`, normally treats the expansion of unset variables as an error. This can reveal an omitted value earlier than a later calculation would. In a non-interactive script, such an expansion error can terminate the shell. The command `declare -p NAME` can also help inspect whether a variable exists and how it is defined.

Unset-variable checks do not replace validation. A defined variable may still contain an empty string, invalid text, or an unacceptable number. After argument parsing and before processing, the script needs to establish that required values are present and valid. Both dice parameters, for example, must be positive integers.

Validation must also tolerate missing input. With `set -u` enabled, directly expanding an unset variable inside a check can prevent the intended diagnostic from appearing. Initialising expected variables to empty strings gives the checks defined values to inspect.

Colour can help an error stand out from lengthy usage information. Tools such as Rich or terminal escape sequences can provide it, while the wording explains the failure and the required correction.

## Failure handling and exit status

The special parameter `$?` contains the previous command's exit status. Zero normally indicates success. A non-zero value indicates failure or another condition defined by the command. The status needs to be captured before another command replaces it.

The `set -e` option, also called `errexit`, stops execution after failures in the contexts covered by that option. It can prevent later operations from proceeding after an earlier command fails. Its behaviour depends on shell syntax and control flow, so it does not guarantee termination after every non-zero result.

Quoting errors can create unexpected failures. An unquoted pipe character intended as part of a search pattern can become a shell pipeline operator. Bash may then attempt to run the following text as a command. Stopping at that failure helps expose the problem, but the underlying quotation error still needs correction.

The `pipefail` option allows a failed command earlier in a pipeline to make the pipeline report failure. Otherwise, the last command's successful status can conceal the earlier error. A common combination is:

```bash
set -euo pipefail
```

These settings strengthen failure detection but do not define acceptable inputs or supply useful explanations. Enabling them within a separately executed script affects that shell rather than changing the parent's options. The command `set -o` displays the named options and their current state.

Interactive feedback can also be improved through `PROMPT_COMMAND`, which Bash runs before displaying the next primary prompt. A function can capture the previous exit status and report it only when non-zero. This makes unsuccessful commands visible without adding a success message after every operation. Such feedback is a custom prompt feature, rather than a default property of every Bash session.
