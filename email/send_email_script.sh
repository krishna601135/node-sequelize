######################
#Author: Mohan
#Date: 12/03/2024
#This script fetches latest json file from reports collection and sends attachment to mail
####################


# MongoDB Connection Details
MONGO_HOST="mongodb+srv://library:saimohanlib@cluster0.k1eoilz.mongodb.net/online-library"
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

# Connect to MongoDB and retrieve record
mongosh --host $MONGO_HOST --eval "db.$COLLECTION_NAME.find().sort({ timestampField: -1 }).limit(1)" > $OUTPUT_FILE

# Send email with attachment
echo "$BODY" | mailx -s "$SUBJECT" -a "$ATTACHMENT" -r "$SENDER" "$RECIPIENT"

# Clean up temporary files
rm $OUTPUT_FILE


