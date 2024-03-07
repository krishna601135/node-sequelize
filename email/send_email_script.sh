#!/bin/bash

# Define email content and recipients
EMAIL_SUBJECT="Container Scanning Report"
RECIPIENT="krishnakakarapathi@gmail.com"

# Construct the email message
EMAIL_BODY="Hello,\n\nPlease find attached the container scanning report.\n\nRegards,\nYour Team"

# Send email with attachment
echo -e "$EMAIL_BODY" | mail -s "$EMAIL_SUBJECT" -a container-scanning-report.json "$RECIPIENT"
