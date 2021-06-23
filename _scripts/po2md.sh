#!/bin/bash

# This will convert any localised .po files to their equivalent .md files
# 1st argument is the name of the .md file which has translated .po files
# 2nd argument is optional --overwrite which re-generates the localized md files
# eg. `_scripts/po2md.sh _posts/newsletters/2019-10-08-rebel-daily-1.md`


# saner programming env: these switches turn some bugs into errors
set -o errexit -o pipefail -o noclobber -o nounset

# -allow a command to fail with !’s side effect on errexit
# -use return value from ${PIPESTATUS[0]}, because ! hosed $?
! getopt --test > /dev/null 
if [[ ${PIPESTATUS[0]} -ne 4 ]]; then
    echo 'I’m sorry, `getopt --test` failed in this environment.'
    exit 1
fi

OPTIONS=o
LONGOPTS=overwrite

# -regarding ! and PIPESTATUS see above
# -temporarily store output to be able to check for errors
# -activate quoting/enhanced mode (e.g. by writing out “--options”)
# -pass arguments only via   -- "$@"   to separate them correctly
! PARSED=$(getopt --options=$OPTIONS --longoptions=$LONGOPTS --name "$0" -- "$@")
if [[ ${PIPESTATUS[0]} -ne 0 ]]; then
    # e.g. return value is 1
    #  then getopt has complained about wrong arguments to stdout
    exit 2
fi
# read getopt’s output this way to handle the quoting right:
eval set -- "$PARSED"

overwrite=n
# now enjoy the options in order and nicely split until we see --
while true; do
    case "$1" in
        --overwrite)
            overwrite=y
            shift
            ;;
        --)
            shift
            break
            ;;
        *)
            echo "Programming error"
            exit 3
            ;;
    esac
done

# handle non-option arguments
if [[ $# -ne 1 ]]; then
    echo "$0: A single input file is required."
    exit 4
fi


DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
bn="$(echo $1 | cut -f 1 -d '.')"
for lang in "fr" "es" "de" "pt" "zh" "ja" "pl" "ru" "sv" "it" "cs" "el" "xh"; do
    outputfile="$bn-$lang.md"
    if [ ! -e "$outputfile" ] || [ $overwrite == n ]
    then
        fulllang=$lang
        if [ $lang = "zh" ]; then 
            fulllang="zh_Hans"
        fi
        if [ $lang = "pt" ]; then 
            fulllang="pt_PT"
        fi
        if [ -e po/$bn.$fulllang.po ]; then
            echo "Generating $outputfile..."
            export PERLLIB=$DIR/po4a/lib
            $DIR/po4a/po4a-translate -f text -M UTF-8 -o markdown=1 -k 80 -m $bn.md -p po/$bn.$fulllang.po -l $outputfile
        fi
        if [ -e po/$bn.$lang.po ]; then
            echo "Generating $outputfile..."
            export PERLLIB=$DIR/po4a/lib
            $DIR/po4a/po4a-translate -f text -M UTF-8 -o markdown=1 -k 80 -m $bn.md -p po/$bn.$lang.po -l $outputfile
        fi
    else
        echo "Skipping $outputfile as translated file already exists"
    fi
done
