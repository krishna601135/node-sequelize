#!/bin/bash

######################
#Author: Mohan
#Date: 12/03/2024
#This script fetches latest json file from reports collection and sends attachment to mail
####################


# MongoDB Connection Details
DATABASE_NAME="online-library"
COLLECTION_NAME="reports"

# Email Details
RECIPIENT="krishnakakarapathi@gmail.com"
SENDER="kakarapathikrishna@gmail.com"
MAIL_SUBJECT="Container Scanning Report"
BODY="Hello,\n\nPlease find attached the container scanning report.\n\nRegards,\nYour Team"

# File Paths
OUTPUT_FILE="container_scanning_report.txt"
ATTACHMENT="container_scanning_report.txt"



# Connect to MongoDB and retrieve record
mongosh "mongodb+srv://library:saimohanlib@cluster0.k1eoilz.mongodb.net/online-library" --apiVersion 1 --username library --password saimohanlib --eval "db.$COLLECTION_NAME.find().sort({ timestampField: -1 }).limit(1)" > $OUTPUT_FILE

#cat $OUTPUT_FILE

# Set SMTP server address
SMTP_SERVER="smtp.gmail.com"


# Send email with attachment
# echo $BODY | mail -s $SUBJECT -a $OUTPUT_FILE -r $SENDER $RECIPIENT
echo $BODY | mail -s $MAIL_SUBJECT -a $OUTPUT_FILE krishnakakarapathi@gmail.com
if [ $? -eq 0 ]; then
    echo "Email sent successfully"
else
    echo "Failed to send email"
fi

cat /var/log/maillog
# mailx -v -s "$EMAIL_SUBJECT" \
# -S smtp-use-starttls \
# -S ssl-verify=ignore \
# -S smtp-auth=login \
# -S smtp=smtp://smtp.gmail.com:587 \
# -S from="$FROM_EMAIL_ADDRESS($FRIENDLY_NAME)" \
# -S smtp-auth-user=$FROM_EMAIL_ADDRESS \
# -S smtp-auth-password=$EMAIL_ACCOUNT_PASSWORD \
# -S ssl-verify=ignore \
# -S nss-config-dir=~/.mozilla/firefox/xxxxxxxx.default/ \
# $TO_EMAIL_ADDRESS


#$? contains the exit status of the last command.
# Clean up temporary files


rm $OUTPUT_FILE


