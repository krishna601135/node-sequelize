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
SUBJECT="Container Scanning Report"
BODY="Hello,\n\nPlease find attached the container scanning report.\n\nRegards,\nYour Team"

# File Paths
OUTPUT_FILE="container_scanning_report.txt"
ATTACHMENT="container_scanning_report.txt"


# export MONGO_PASSWORD=""

# Connect to MongoDB and retrieve record
mongosh "mongodb+srv://cluster0.k1eoilz.mongodb.net/" --apiVersion 1 --username library --password saimohanlib --eval "db.$COLLECTION_NAME.find().sort({ timestampField: -1 }).limit(1)" > $OUTPUT_FILE

mkfifo /var/spool/postfix/public/pickup

service postfix restart

# Send email with attachment
echo -e "$BODY" | mail -s "$SUBJECT" "$RECIPIENT" -a $ATTACHMENT
# Clean up temporary files
rm $OUTPUT_FILE


