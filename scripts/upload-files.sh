#!/bin/bash
set -eu

read -p "Environment? " STAGE
echo "Uploading Static Files to ${STAGE}..."

if [ "${STAGE}" == "dev" ]
  then
     BUCKET_NAME="static-sites-pipeline-deployment-dev-li8jne9g"
     SITE_PATH="/landing-page"
     echo "${BUCKET_NAME}${SITE_PATH}"
     aws s3 sync --acl 'public-read' --delete ./src/ "s3://${BUCKET_NAME}${SITE_PATH}"
elif [ "${STAGE}" == "prod" ]
  then
     BUCKET_NAME="static-sites-pipeline-deployment-prod-rh5n89d3"
     SITE_PATH="/landing-page"
     echo "${BUCKET_NAME}${SITE_PATH}"
     aws s3 sync --acl 'public-read' --delete ./src/ "s3://${BUCKET_NAME}${SITE_PATH}"
fi




