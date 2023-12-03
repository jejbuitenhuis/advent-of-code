#!/usr/bin/env bash

DEFAULT_SCRIPT_TYPE="js"

COLOR_RESET="\e[0m"
COLOR_BLACK="\e[30m"
COLOR_RED="\e[31m"
COLOR_GREEN="\e[32m"
COLOR_YELLOW="\e[33m"
COLOR_BLUE="\e[34m"
COLOR_MAGENTA="\e[35m"
COLOR_CYAN="\e[36m"
COLOR_WHITE="\e[37m"

function usage {
	echo -e "\
 $COLOR_YELLOW=== Advent of Code helper script ===$COLOR_RESET

 Usage: $COLOR_GREEN$0 $COLOR_BLUE[COMMAND] $COLOR_CYAN[ARGUMENTS...]$COLOR_RESET

$COLOR_YELLOW COMMANDS:$COLOR_RESET
$COLOR_BLUE  create $COLOR_CYAN{year} {day} $COLOR_MAGENTA[script type]$COLOR_RESET:
    Create a empty folder for the challenge. Also fetches the input for that
    day.

$COLOR_BLUE  run$COLOR_RESET $COLOR_CYAN{year} {day} {part}:$COLOR_RESET
    Runs the script associated with that day.
"
}

function error {
	echo -e "\
 $COLOR_RED=== Error while running the script ===$COLOR_RESET

 $1
"
}

function info {
	echo -e "\
 $COLOR_CYAN=== $1 ===$COLOR_RESET

 $2
"
}

function create {
	if [ $# -lt 2 ]; then
		error "Not enough arguments given to create command"
		usage
	fi

	FOLDER="./$1/day-$2"
	SCRIPT_TYPE="${3:-$DEFAULT_SCRIPT_TYPE}"

	mkdir -p $FOLDER

	cp "./templates/template.$SCRIPT_TYPE" "$FOLDER/part-1.$SCRIPT_TYPE"
	cp "./templates/template.$SCRIPT_TYPE" "$FOLDER/part-2.$SCRIPT_TYPE"

	info "Created day $2 for year $1" "Use $COLOR_GREEN$0 $COLOR_CYAN$1 $2 {part}$COLOR_RESET to run the solution"
}

if [ $# -gt 0 ]; then
	case "$1" in
		"create")
			shift
			create $@
		;;
	esac
else
	usage
fi
