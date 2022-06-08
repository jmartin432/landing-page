#!/bin/bash
set -eu

echo "Starting Webpack"
npm run webpack
echo "Webpack Done"

BUCKET_NAME="justinlmartin.com"
echo "Uploading Static Files to ${BUCKET_NAME}"

aws s3 sync --profile justin --acl 'public-read' --delete ./src/ "s3://${BUCKET_NAME}"




