#!/bin/bash

# This will Update the GETTEXT files needed for Weblate to localise.
# Needs to be run from the folder containing the .md file.
# first argument is the relative path to the .md file you want to generate the files for.
# eg. `../../_scripts/updatePO.sh 2020-01-01-blogpost.md`

bn="$(echo $1 | cut -f 1 -d '.')"

opts="-f text -M UTF-8 -m $bn.md -o markdown=1"
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

export PERLLIB=$DIR/po4a/lib
$DIR/po4a/po4a-updatepo $opts -p po/$bn.pot 
for lang in "fr" "es" "de" "pt" "pt_PT" "zh_Hans" "ja" "pl" "ru" "sv" "it" "cs" "xh" "el"; do
    outputfile="po/$bn.$lang.po"
    if [ -e "$outputfile" ]
    then
    	echo Updating $outputfile
        $DIR/po4a/po4a-updatepo $opts -p $outputfile
	fi
done

# delete the backup file as it's all in git anyway
rm po/*~
ls po/$bn*
