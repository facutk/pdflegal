#!/usr/bin/env bash
cd "$(dirname "$0")/../server"
git pull
npm install
pm2 gracefulReload all