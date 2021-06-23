#!/bin/bash

    DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
    echo $DIR

for fn in *.md; do
    [ -e "$fn" ] || continue
    if [[ $fn =~ "-es.md" ]] || [[ $fn =~ "-de.md" ]] || [[ $fn =~ "-fr.md" ]] || [[ $fn =~ "-pt.md" ]] || 
        [[ $fn =~ "-ru.md" ]] || [[ $fn =~ "-zh.md" ]] || [[ $fn =~ "-pl.md" ]] || [[ $fn =~ "-jp.md" ]] || 
        [[ $fn =~ "-it.md" ]] || [[ $fn =~ "-cs.md" ]] || [[ $fn =~ "-xh.md" ]] || [[ $fn =~ "-el.md" ]]
    then
        continue
    fi
    bn="$(basename $fn .md)"
    echo "Generating POT file for $fn"
#    $DIR/generatePO.sh $fn
    $DIR/updatePO.sh $fn
done
