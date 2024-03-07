#!/bin/bash

# Define email content and recipients
EMAIL_SUBJECT="Vulnerabilities Found in Container Scanning"
EMAIL_BODY="Vulnerabilities have been detected in the container scanning stage. Please review the security report."

# Send email using the 'mail' command
mail -s "$EMAIL_SUBJECT" kakarapathikrishna@gmail.com <<< "$EMAIL_BODY"
