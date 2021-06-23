#!/bin/bash

cd _posts/blog
../../_scripts/translateAllMDs.sh

cd ../../_posts/press
../../_scripts/translateAllMDs.sh

cd ../..
