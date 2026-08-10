# Hands-on Introduction to Linux Commands and Shell Scripting
## Introduction to Linux
### Origins and uses
An operating system manages hardware resources, runs programs, stores files, controls access, and provides interfaces through which people and applications use a computer.

Unix began at AT&T Bell Laboratories in 1969 on a PDP-7. Its developers rewrote it in C in 1973, which made the system easier to move across hardware architectures. The Berkeley Software Distribution later extended Unix and became an important branch of Unix development. Modern macOS combines Mach and BSD technologies within Darwin, and current macOS releases hold UNIX certification.

Richard Stallman announced the GNU Project in 1983 to build a free Unix-like operating system. Linus Torvalds began the Linux kernel independently in 1991. A Linux distribution combines that kernel with user-space tools, libraries, an installer, a package system, and often a desktop environment. Many distributions include substantial GNU software, although Linux and GNU remain separate projects.

Linux supports multiple users, concurrent processes, and many processor architectures. Open-source development allows inspection and modification, but visibility alone does not guarantee security. Linux now runs across desktops, servers, cloud systems, embedded devices, smartphones through Android, and high-performance computers.

Multi-user operation assigns each account an identity and permissions, while multitasking lets the scheduler share processors among processes. Portability comes from deliberate architecture support, not from the licence alone. Administrators still need timely patches, secure configuration, limited privileges, and trusted software sources.
### Linux distributions
Distributions share the Linux kernel but differ in package formats, repositories, release models, default software, configuration, governance, and support. They can use the same shell commands or desktop environments, and some provide no graphical interface.

Stable-release projects test and freeze coordinated package sets for defined support periods. Rolling-release projects deliver changes continuously instead of publishing major version upgrades. Long-term support editions prioritise extended maintenance, while community and commercial projects offer different support arrangements.

| Distribution family | Package tools | Main characteristics |
| --- | --- | --- |
| Debian | DEB, `dpkg`, and APT | Community-developed, broad architecture support, and stable releases |
| Ubuntu | DEB and APT | Debian-based, Canonical-backed, and available for desktop, server, cloud, and embedded uses |
| Fedora and RHEL | RPM and DNF | Fedora develops rapidly upstream, while Red Hat positions RHEL for supported enterprise use |
| SUSE and openSUSE | RPM and Zypper | Commercial and community options for servers, desktops, and other systems |
| Arch Linux | `pacman` | Independent, rolling-release, minimal by default, and highly configurable |
### System architecture and filesystems
Applications, shells, graphical desktops, system services, and libraries run mainly in user space. They request kernel services through system calls. The kernel schedules processes, manages memory, operates devices, implements filesystems and networking, enforces access controls, and mediates access to hardware. A graphical interface therefore sits in user space rather than forming a required operating-system layer.

During startup, a boot loader loads the kernel. The kernel initialises hardware and starts the first user-space process, which launches services and prepares login or graphical sessions. Background services, often called daemons, continue to perform system tasks.

Linux organises files in a tree rooted at `/`. Ownership and permissions regulate access. Common directories include:
- `/etc` for system configuration
- `/home` for users' home directories
- `/boot` for boot-related files
- `/media` for mount points used by removable media
- `/usr` for most user-space programs, libraries, and shared data
- `/var` for changing data such as logs and caches

On many current systems, `/bin` links to `/usr/bin`. Directory layouts vary, so software should not assume that every optional directory exists.
### Terminals, shells, and paths
A terminal emulator displays text, accepts keyboard input, and shows program output. A shell such as Bash or Zsh reads command lines, expands expressions, launches programs, and runs scripts. The prompt, often ending in `$`, signals readiness for input. The cursor only shows where the next character will appear.

The current working directory provides the starting point for relative paths. It does not normally control command lookup. The shell searches directories listed in `PATH`, unless a command names a path explicitly. An absolute path begins with `/`. The symbols `.` and `..` refer to the current and parent directories, while `~` expands to a user's home directory in common shells.

```sh
pwd
ls
ls /home
cd ~
cd ..
cd /
cd "/media/my USB drive"
python3 myprogram.py
```

`pwd` prints the working directory, `ls` lists directory entries, and the shell's `cd` command changes directory. Plain `ls` normally omits names beginning with `.`. Quotation marks preserve spaces within a pathname.

Shell commands can move and copy files, read and write data, filter text, search content, and combine programs through pipelines. Scripts store command sequences for repeatable execution.

Shell configuration affects completion and history. In common interactive setups, Tab completes an unambiguous command or path, and a second Tab can list alternatives. The Up Arrow and Down Arrow keys move through command history without treating program output as commands.
### Text editors
Linux supports graphical and terminal editors. GNOME Text Editor, gedit, and graphical Emacs sessions provide windowed interfaces. GNU nano offers modeless terminal editing and displays available shortcuts. A user can open a file with `nano filename`.

Vim uses modes. `vim filename` opens a file, `i` enters Insert mode, and `Esc` returns to Normal mode. Commands entered after `:` include `:w` to write, `:q` to quit, and `:q!` to discard unsaved changes and quit.
### Packages and updates
System package managers retrieve packages from configured repositories, resolve dependencies, and apply updates. DEB and RPM are different formats and are not generally interchangeable. Format conversion cannot guarantee compatibility because distributions also differ in dependencies, paths, scripts, and policies.

Debian-based systems commonly use `sudo apt update` to refresh package indexes, `sudo apt upgrade` to upgrade installed packages, and `sudo apt install package_name` to install software. Fedora and current RHEL systems use DNF. SUSE systems use Zypper. Graphical front ends and automatic-update policies vary by distribution and configuration.

Refreshing an index does not install updates. Package upgrades can restart services or require a reboot, so administrators should review proposed changes and follow distribution-specific release guidance.

Python package installation operates separately from the operating system's package database. A developer can isolate project dependencies before installing pandas:

```sh
python3 -m venv .venv
source .venv/bin/activate
python -m pip install pandas
```
## Introduction to Linux Commands
### Shells and command help
A shell interprets commands, launches programs, expands expressions, redirects data, and provides a scripting language for automation. Bash is common on Linux, but distributions and users may select `sh`, Korn shell, `tcsh`, Zsh, fish, or another shell. The `SHELL` environment variable usually records the user's login shell. It does not reliably identify the shell that currently interprets a command.

Prompts vary by shell and configuration. Bourne-style shells commonly show `$` for an unprivileged user and `#` for a privileged shell. A `>` prompt often requests continuation of an incomplete command rather than replacing the normal prompt.

Some command names, including `cd`, are shell built-ins because they must change shell state. Others, such as `ls`, are separate executables found through `PATH`. The current directory does not normally control command lookup unless `PATH` includes it or a pathname such as `./script` is supplied.

Shells expand variables, wildcards, and command substitutions before launching most programs. Quotation controls expansion and protects whitespace. Redirection sends output to a file, while a pipeline connects one program's output to another program's input:

```sh
grep 'error' app.log | sort | uniq > unique_errors.txt
printf '%s\n' "new entry" >> history.txt
```

The `>` operator replaces an existing file, so the operator should verify the target first. The `>>` operator appends. Shell options such as Bash's `pipefail` can expose failed pipeline stages to scripts.

Local documentation provides the safest starting point because it matches the installed software:

```sh
man command_name
man -k keyword
command_name --help
info command_name
```

Support for `--help` and Info varies, and not every command ships with an installed manual page. Project manuals, distribution documentation, and TLDR Pages can supplement local help. Community answers require checks for version, platform, context, and date.

Windows can run Linux through dual boot, a general virtual machine, or Windows Subsystem for Linux. WSL 2 runs an actual Linux kernel inside a managed lightweight virtual machine, while WSL 1 translates Linux system calls. Cygwin supplies a Unix-like compatibility environment rather than a Linux kernel.
### Users, systems, and processes
| Command | Accurate purpose |
| --- | --- |
| `whoami` | Prints the effective user's name |
| `id` | Prints user and group identities and memberships |
| `uname -sr` | Prints the kernel name and kernel release |
| `df -h` | Reports space for mounted filesystems in readable units |
| `df -h ~` | Reports the filesystem containing the home directory |
| `ps -e` | Takes a snapshot of all processes |
| `top` | Shows a configurable, updating view of processes and system resources |
| `date` | Prints or formats the system date and time |
| `echo` | Writes arguments after shell expansion |

The default `ps` `TIME` column reports accumulated CPU time, not elapsed wall-clock time. In `top`, `-n 3` requests three display iterations. It does not limit the display to three tasks. Process displays commonly include identifiers, states, CPU use, memory use, and commands, although options and implementations affect the columns.

Quoted strings protect spaces and shell metacharacters. A dollar sign expands a variable, while single quotes suppress expansion:

```sh
echo "Learning Linux is useful"
echo "$PATH"
date '+Day %j of %Y'
```

The `%j` control prints the day of the year from 001 to 366. The `%Y` control prints the four-digit year.
### Paths, directories, and files
An absolute path begins with `/`. A relative path starts from the current working directory. `.` denotes the current directory, `..` denotes its parent, and common shells expand `~` to the user's home directory. The tilde itself is shell syntax, not a filesystem root.

```sh
pwd
ls -la
ls -l Downloads
cd Documents
cd ..
cd ~
find . -name 'a.txt'
find . -iname 'a.txt'
```

`pwd` prints the working directory. Plain `ls` omits names beginning with `.`, while `ls -a` includes them. `ls -l` adds metadata such as file type, permissions, owner, group, size, and modification time. `find` walks a directory tree and applies criteria. `-name` matches case, while GNU and many other implementations provide `-iname` for case-insensitive matching.

File-management commands act directly on filesystem objects:

```sh
mkdir test
touch a.txt b.txt c.txt
cp notes.txt Documents/
cp -R Documents Docs_copy
mv my_script.sh Scripts/
mv old_name.txt new_name.txt
rm unwanted.txt
rmdir empty_directory
```

`mkdir` creates directories. `touch` creates a missing file or updates timestamps on an existing file. `cp` copies data, and `mv` moves or renames an object. `rmdir` removes only empty directories. `rm -r` recursively removes directory trees and can destroy valuable data without recovery, so the operator should confirm the target before running it. `rm -f` suppresses prompts and some errors rather than making removal safer.
### Ownership and permissions
Each file records one owning user ID and one owning group ID. Permission bits then govern three classes: the owner, members of the file's group, and other users. These classes are not three ownership levels. Access also depends on permissions for every directory in the path, access control lists, security modules, mount options, and process privileges.

`ls -l` displays a type character followed by three `rwx` triplets. For a regular file, `-rw-r--r--` grants the owner read and write access, and grants the group and others read access. New-file permissions depend on the creating program and the process umask, so this mode is not universal.

For files, `r`, `w`, and `x` authorise reading, writing, and execution. For directories, they authorise listing names, modifying directory entries, and searching or traversing entries. Directory changes usually require write and search permission together.

```sh
chmod go-r private.txt
chmod u+x my_script.sh
./my_script.sh
```

The file owner or a suitably privileged process can change mode bits. Direct kernel execution of a shell script requires execute permission and a valid first line such as `#!/usr/bin/env bash`. A readable script can instead run as `bash my_script.sh` without receiving execute permission.
### Viewing and transforming text
`cat` suits short files. `more` displays pages, while `less` usually provides more flexible navigation. `head` and `tail` select the beginning or end:

```sh
cat numbers.txt
less numbers.txt
head -n 3 numbers.txt
tail -n 3 numbers.txt
wc pets.txt
wc -l -w -c -m pets.txt
```

By default, `wc` reports newline count, word count, and byte count. `-c` counts bytes, while `-m` counts characters. A terminating newline contributes data, but an end-of-file condition is not a character.

Text-processing tools compose effectively through standard input and output:

```sh
sort -r pets.txt
sort pets.txt | uniq
grep -i 'ch' people.txt
cut -c 2-9 people.txt
cut -d ' ' -f 2 people.txt
paste -d ',' first.txt last.txt yob.txt
```

`sort -r` reverses the comparison order. The command is `uniq`, not `unique`, and it removes only adjacent repeated lines. Sorting first groups equal lines. `grep -i` prints matching lines without case distinctions. `cut` selects character positions or delimiter-separated fields, and `paste` combines corresponding lines. Space-delimited `cut` works only when the input follows that simple structure consistently.
### Networks and transfers
The Internet is a network of networks. The World Wide Web is one service that uses the Internet. Nodes include hosts, routers, switches, and other participating devices. Client and server describe communication roles, and one host can perform both. Packets carry control information and a payload. An IP address identifies a network interface or routing location at a particular time rather than permanently naming one physical computer.

A URL identifies a resource through components such as a scheme, authority, path, query, and fragment. In `https://example.com/docs/page`, `https` is the scheme, `example.com` is the host within the authority, and `/docs/page` is the path.

```sh
hostname
hostname -s
ip address show
ip address show dev eth0
ip -s link show dev eth0
ping -c 5 example.com
curl https://example.com/
curl --location --output page.html https://example.com/
wget https://example.com/file.txt
```

`hostname` prints the configured host name. `ip address` displays interface addresses, while `ip -s link` adds traffic and error statistics. Interface names differ across systems.

`ping` sends ICMP echo requests to a host name or IP address and reports replies, loss, and round-trip time. It does not test a URL or prove that a web service works. Firewalls and hosts may block ICMP even when other services remain reachable.

`curl` transfers data using URLs and writes received content to standard output unless an option redirects it. `--output` names a local file, and `--location` follows redirects. `wget` focuses on non-interactive downloading and can retrieve linked content recursively. Recursive retrieval can consume substantial bandwidth and storage, so it requires narrow limits and authorisation.
### Archives and compression
Archiving combines files and directories into one container. Compression reduces data size by encoding redundancy. A tar archive does not become a backup until a sound backup process stores, verifies, and protects a separate copy.

```sh
tar -cf notes.tar notes/
tar -tf notes.tar
tar -czf notes.tar.gz notes/
mkdir restored
tar -xf notes.tar -C restored/
tar -xzf notes.tar.gz -C restored/
zip -r notes.zip notes/
unzip notes.zip -d restored/
```

With `tar`, `c` creates, `t` lists, `x` extracts, `z` applies gzip, and `f` names the archive in the following argument. `-C` changes the extraction directory. A positional name after an archive selects an archive member rather than an output directory. Zip normally compresses members separately, while gzip compresses the combined tar stream. Listing an unfamiliar archive before extraction helps reveal unexpected paths and names.
## Introduction to Shell Scripting
## Bash Shell Scripting and Cron Scheduling
Shell scripts combine commands in a text file so that a shell can perform a repeatable task. Bash interprets its own language and launches utilities or other programs as required. The `.sh` suffix identifies a script by convention, but Bash does not require it.
### Creating and running a script
A script run directly needs execute permission and an interpreter line as its first line. `#!/usr/bin/env bash` locates Bash through the current environment. `#!/bin/sh` instead selects the system's POSIX shell, which may not be Bash.

```bash
#!/usr/bin/env bash
printf '%s\n' 'Hello, world!'
```

The owner can add execute permission and run the file:

```bash
chmod u+x hello.sh
./hello.sh
```

Alternatively, `bash hello.sh` invokes Bash explicitly. This form does not require execute permission or a shebang, although the file still needs read permission. Unix permissions distinguish the owner, group, and other users. Directory permissions and mount options can also prevent direct execution.
### Variables and input
Bash assigns a shell variable without spaces around `=`. Parameter expansion retrieves its value. Quoting the expansion prevents unintended word splitting and filename expansion.

```bash
greeting='Good morning'
printf '%s\n' "$greeting"

IFS= read -r name
printf 'Hello, %s\n' "$name"
```

Shell variables belong to the current shell. `export` places a variable in the environment inherited by subsequently launched child processes. A child receives a copy, so its changes do not update the parent shell. `env` displays environment entries, while Bash's `set` command reports a broader collection that includes shell variables and functions.

```bash
project='migration'
export project
env
```
### Pipelines and text processing
The pipe operator `|` connects one command's standard output to the next command's standard input. This arrangement lets small programs form a processing chain. The pipeline's status normally comes from its final command. `set -o pipefail` makes a pipeline fail when any component fails, which helps scripts detect upstream errors.

```bash
set -o pipefail
sort names.txt | uniq -c | sort -nr
tr '[:lower:]' '[:upper:]' < names.txt
```

Commands such as `grep`, `sort`, `uniq`, `cut`, and `tr` transform or select text. Input redirection can supply a file directly, so an extra `cat` process is often unnecessary. Structured data needs a format-aware parser. A regular expression cannot reliably parse general JSON, whereas `jq` can select a field without depending on whitespace or key order.

```bash
jq -r '.price' Bitcoinprice.json
```
### Expansion, quoting, and control operators
An unquoted `#` begins a comment where Bash recognises the start of a word. Wildcards such as `*` and `?` expand to matching pathnames when they remain unquoted. Single quotes preserve every enclosed character. Double quotes preserve spaces and wildcard characters while still allowing parameter expansion, command substitution, and limited backslash processing.

Command substitution captures a command's standard output. The `$(command)` form supports nesting and reads more clearly than backticks.

```bash
stamp=$(date)
printf '%s\n' "$stamp" > report.txt
```

Redirection changes a command's data streams. `>` creates or truncates a file, `>>` appends, `<` supplies standard input, and `2>` redirects standard error. Scripts should confirm output targets before using truncating redirection.

Positional parameters carry command-line arguments. `$1` identifies the first argument, `$#` gives the count, and `"$@"` expands all arguments while preserving their boundaries.

```bash
printf 'First: %s\n' "$1"
printf 'Count: %s\n' "$#"
printf '%s\n' "$@" >> arguments.txt
```

Bash runs foreground commands sequentially. A trailing `&` starts a command asynchronously in the background. `$!` records that job's process identifier, and `wait` synchronises the script with its completion.

```bash
long_task > task.log 2>&1 &
job_pid=$!
wait "$job_pid"
```
### Conditions, arithmetic, arrays, and loops
Conditional commands choose a path from an exit status. The POSIX test command, written as `[ expression ]`, requires spaces beside its brackets. It uses `=` for string equality and operators such as `-eq`, `-ne`, `-lt`, `-le`, `-gt`, and `-ge` for integer comparisons. Bash's `[[ expression ]]` syntax provides safer string handling and additional pattern features.

```bash
if [ "$answer" = 'Yes' ]
then
  printf '%s\n' 'Continuing'
elif (( count <= 10 ))
then
  printf '%s\n' 'Count is at most ten'
else
  printf '%s\n' 'Stopping'
fi
```

Arithmetic expansion evaluates integer expressions. Bash integer division discards the fractional part.

```bash
total=$((first + second))
average=$((total / 2))
```

Indexed arrays store distinct elements rather than a space-delimited string. Quoted array expansion preserves elements that contain spaces. A `for` loop can process each element in order.

```bash
items=(one two 'three four')

for item in "${items[@]}"
do
  printf '%s\n' "$item"
done
```
### Scheduling with cron
Cron runs commands according to entries in a crontab. A user edits, lists, or removes the crontab with `crontab -e`, `crontab -l`, or `crontab -r`. The last command deletes the entire user crontab and therefore requires care.

Each user entry contains five schedule fields followed by a command:

| Field | Values |
| --- | --- |
| Minute | 0-59 |
| Hour | 0-23 |
| Day of month | 1-31 |
| Month | 1-12 or names |
| Day of week | 0-7 or names, with 0 and 7 commonly representing Sunday |

An asterisk matches every allowed value. Commas form lists, hyphens form inclusive ranges, and a slash selects steps within a field. When both day fields are restricted, common cron implementations run the command when either field matches.

```text
30 15 * * 0 /home/alex/bin/weekly_report.sh >> /home/alex/log/weekly_report.log 2>&1
0 0 * * * /home/alex/bin/load_data.sh >> /home/alex/log/load_data.log 2>&1
0 2 * * 0 /home/alex/bin/backup_data.sh >> /home/alex/log/backup.log 2>&1
```

These entries run a report at 3.30 pm each Sunday, load data at midnight each day, and back up data at 2.00 am each Sunday. Cron usually supplies a limited environment and runs commands through `/bin/sh` unless configured otherwise. Reliable jobs use absolute paths, write useful logs, prevent harmful overlaps, and handle failures. Local-time schedules can be skipped or repeated during daylight-saving changes. An unescaped `%` also has special meaning in many crontab implementations.