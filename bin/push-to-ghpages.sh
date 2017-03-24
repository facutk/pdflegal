#!/usr/bin/env bash
GHPAGES_REPO="https://github.com/pdflegal/pdflegal.github.io.git"
GHPAGES_BRANCH="master"
DIST_FOLDER="dist"
CNAME="www.pdflegal.com.ar"

cd $DIST_FOLDER
echo "${CNAME}" > CNAME
git init
git add .
git commit -m "${CI_COMMIT_ID}"
git remote add origin $GHPAGES_REPO
git push -u --force origin $GHPAGES_BRANCH
