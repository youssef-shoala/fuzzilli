#!/bin/bash

# Import custom corpus

# Set the path to the corpus
CORPUS_PATH=./CVE_PoC

for file in $CORPUS_PATH/*; do
    swift run FuzzILTool --compile $file 
done