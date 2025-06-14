#!/bin/bash

# check for uncommitted changes
if ! git diff-index --quiet HEAD --; then
    echo "Error: You have uncommitted changes. Please commit or stash them first."
    exit 1
fi

# check for untracked files that could be committed
if [ -n "$(git status --porcelain)" ]; then
    echo "Error: You have untracked files. Please add and commit them or stash them first."
    exit 1
fi

# execute the update steps
git fetch upstream && \
git checkout main && \
git merge upstream/main && \
git push origin main
