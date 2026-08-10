# *Hands-on Introduction to Linux Commands and Shell Scripting* Final Project
You are a lead Linux developer at the top-tech company ABC International Inc. ABC currently suffers from a huge bottleneck: each day, interns must painstakingly access encrypted password files on core servers and back up any files that were updated within the last 24 hours. This process introduces human error, lowers security, and takes an unreasonable amount of work.

As one of ABC Inc.'s most trusted Linux developers, you have been tasked with creating a script called backup.sh which runs every day and automatically backs up any encrypted password files that have been updated in the past 24 hours.

```shell
#!/bin/bash

# This checks if the number of arguments is correct
# If the number of arguments is incorrect ( $# != 2) print error message and exit
if [[ $# != 2 ]]
then
  echo "backup.sh target_directory_name destination_directory_name"
  exit
fi

# This checks if argument 1 and argument 2 are valid directory paths
if [[ ! -d $1 ]] || [[ ! -d $2 ]]
then
  echo "Invalid directory path provided"
  exit
fi

# [TASK 1]
targetDirectory=
destinationDirectory=

# [TASK 2]
echo ""
echo ""

# [TASK 3]
currentTS=``

# [TASK 4]
backupFileName=""

# We're going to:
  # 1: Go into the target directory
  # 2: Create the backup file
  # 3: Move the backup file to the destination directory

# To make things easier, we will define some useful variables...

# [TASK 5]
origAbsPath=``

# [TASK 6]
cd # <-
destDirAbsPath=``

# [TASK 7]
cd # <-
cd # <-

# [TASK 8]
yesterdayTS=

declare -a toBackup

for file in  # [TASK 9]
do
  # [TASK 10]
  if (())
  then
    # [TASK 11]
  fi
done

# [TASK 12]

# [TASK 13]

# Congratulations! You completed the final project for this course!

```
## Tasks:
### Task 1:
Navigate to # [TASK 1] in the code.

Set two variables equal to the values of the first and second command line arguments, as follows:
1. Set targetDirectory to the first command line argument
2. Set destinationDirectory to the second command line argument

This task is meant to help with code readability.
### Task 2:
Display the values of the two command line arguments in the terminal.
### Task 3:
Define a variable called `currentTS` as the current timestamp, expressed in seconds.
### Task 4:
Define a variable called `backupFileName` to store the name of the archived and compressed backup file that the script will create.
### Task 5:
Define a variable called `origAbsPath` with the absolute path of the current directory as the variable's value.
### Task 6
Define a variable called ``destDirAbsPath`` whose value equals the absolute path of the destination directory.
### Task 7
Change directories from the current working directory to the target directory `targetDirectory`.
### Task 8
You need to find files that have been updated within the past 24 hours. This means you need to find all files whose last-modified date was 24 hours ago or less.

To do make this easier, define a numerical variable called `yesterdayTS` as the timestamp (in seconds) 24 hours prior to the current timestamp, `currentTS`.
### Task 9
In the for loop, use the wildcard to iterate over all files and directories in the current folder.
### Task 10
Inside the `for` loop, you want to check whether the `$file` was modified within the last 24 hours.
### Task 11
In the `if-then` statement, add the `$file` that was updated in the past 24-hours to the `toBackup` array.
### Task 12
After the `for` loop, **compress** and **archive** the files, using the `$toBackup` array of filenames, to a file with the name `backupFileName`.
### Task 13
Now the file `$backupFileName` is created in the current working directory. Move the file backupFileName to the destination directory located at destAbsPath.
## Solution
```shell
#!/bin/bash

# This checks if the number of arguments is correct
# If the number of arguments is incorrect ( $# != 2) print error message and exit
if [[ $# != 2 ]]
then
  echo "backup.sh target_directory_name destination_directory_name"
  exit 1
fi

# This checks if argument 1 and argument 2 are valid directory paths
if [[ ! -d $1 ]] || [[ ! -d $2 ]]
then
  echo "Invalid directory path provided"
  exit 1
fi

# [TASK 1]
targetDirectory=$1
destinationDirectory=$2

# [TASK 2]
echo "Target Directory: $targetDirectory"
echo "Destination Directory: $destinationDirectory"

# [TASK 3]
currentTS=$(date +%s)

# [TASK 4]
backupFileName="backup-$currentTS.tar.gz"

# We're going to:
  # 1: Go into the target directory
  # 2: Create the backup file
  # 3: Move the backup file to the destination directory

# To make things easier, we will define some useful variables...

# [TASK 5]
origAbsPath=$(pwd)

# [TASK 6]
cd "$destinationDirectory" || exit 1
destDirAbsPath=$(pwd)

# [TASK 7]
cd "$origAbsPath" || exit 1
cd "$targetDirectory" || exit 1

# [TASK 8]
yesterdayTS=$((currentTS - 24 * 60 * 60))

declare -a toBackup

for file in * # [TASK 9]
do
  # Ignore the literal '*' produced when the target directory is empty.
  [[ -e "$file" ]] || continue

  # [TASK 10]
  if (( $(date -r "$file" +%s) > yesterdayTS ))
  then
    # [TASK 11]
    toBackup+=("$file")
  fi
done

# [TASK 12]
if (( ${#toBackup[@]} > 0 ))
then
  tar -czvf "$backupFileName" -- "${toBackup[@]}"
else
  tar -czvf "$backupFileName" --files-from /dev/null
fi

# [TASK 13]
mv -- "$backupFileName" "$destDirAbsPath"

# Congratulations! You completed the final project for this course!
```