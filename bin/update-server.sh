#!/usr/bin/env bash
cd "$(dirname "$0")/../server"
git pull
npm install
node server.js