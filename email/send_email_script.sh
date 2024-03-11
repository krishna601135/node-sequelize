#!/bin/bash

# Define email content and recipients
EMAIL_SUBJECT="Container Scanning Report"

RECIPIENT="krishnakakarapathi@gmail.com"

#  curl --location --header "PRIVATE-TOKEN: 9koXpg98eAheJpvBs5tK" "https://gitlab.example.com/api/v4/projects/1/jobs/8/artifacts"

# Download the artifact using wget
wget -O container-scanning-report.json "https://gitlab.com/gitlabworkflow/online-library/-/jobs/6363017609/artifacts/raw/container-scanning-report.json"

# Construct the email message
EMAIL_BODY="Hello,\n\nPlease find attached the container scanning report.\n\nRegards,\nYour Team"

# Send email with attachment
echo -e "$EMAIL_BODY" | mail -s "$EMAIL_SUBJECT" "$RECIPIENT" -a "container-scanning-report.json"


