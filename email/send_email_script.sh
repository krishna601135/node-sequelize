# #!/bin/bash

# # Define email content and recipients
# EMAIL_SUBJECT="Container Scanning Report"

# RECIPIENT="krishnakakarapathi@gmail.com"

# # Download the artifact using wget
# wget -O container-scanning-report.json "${CI_JOB_URL}/artifacts/raw/container-scanning-report.json"

# # Construct the email message
# EMAIL_BODY="Hello,\n\nPlease find attached the container scanning report.\n\nRegards,\nYour Team"

# # Send email with attachment
# echo -e "$EMAIL_BODY" | mail -s "$EMAIL_SUBJECT" "$RECIPIENT" -a "container-scanning-report.json" 


mongo --eval "db = connect('mongodb+srv://library:saimohanlib@cluster0.k1eoilz.mongodb.net/online-library')"


RESULT=$?   # returns 0 if mongo eval succeeds

if [ $RESULT -ne 0 ]; then
    echo "mongodb not running"
    exit 1
else
    echo "mongodb running!"
fi