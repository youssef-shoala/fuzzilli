#!/bin/bash

# Import custom corpus

# Set the path to the corpus
CORPUS_PATH=./gpt_no_console

for file in $CORPUS_PATH/*; do
    swift run FuzzILTool --compile $file 
done