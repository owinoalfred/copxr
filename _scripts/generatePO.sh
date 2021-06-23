#!/bin/bash

# This will generate the GETTEXT files needed for Weblate to localise.
# Needs to be run from the folder containing the .md file.
# first argument is the relative path to the .md file you want to generate the files for.
# eg. `../../_scripts/generatePO.sh 2020-01-01-blogpost.md`

bn="$(echo $1 | cut -f 1 -d '.')"
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

export PERLLIB=$DIR/po4a/lib
$DIR/po4a/po4a-gettextize -f text -M UTF-8 -m $bn.md -o markdown=1 -p po/$bn.pot
cp po/$bn.pot po/$bn.en.po

ls po/$bn*
