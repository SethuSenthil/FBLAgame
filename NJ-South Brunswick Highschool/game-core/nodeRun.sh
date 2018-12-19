#!/bin/bash
cd "$(dirname "$0")"
echo "Warming up server..."

npm i

echo "Installing modules..."

node server.js
