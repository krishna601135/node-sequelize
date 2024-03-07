#!/bin/bash

# Define email content and recipients
EMAIL_SUBJECT="Container Scanning Report"

RECIPIENT="krishnakakarapathi@gmail.com"

# Download the artifact using wget
wget -O container-scanning-report.json "${CI_JOB_URL}/artifacts/raw/container-scanning-report.json"

# Construct the email message
EMAIL_BODY="Hello,\n\nPlease find attached the container scanning report.\n\nRegards,\nYour Team"

# Send email with attachment
echo -e "$EMAIL_BODY" | mail -s "$EMAIL_SUBJECT" "$RECIPIENT" -a "container-scanning-report.json" 
