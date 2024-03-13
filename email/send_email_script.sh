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
SMTP_SERVER="smtp.gmail.com"

# export MONGO_PASSWORD=""

# Connect to MongoDB and retrieve record
mongosh "mongodb+srv://library:saimohanlib@cluster0.k1eoilz.mongodb.net/online-library" --apiVersion 1 --username library --password saimohanlib --eval "db.$COLLECTION_NAME.find().sort({ timestampField: -1 }).limit(1)" > $OUTPUT_FILE



# Send email with attachment
# echo $BODY | mail -s $SUBJECT -a $OUTPUT_FILE -r $SENDER $RECIPIENT
echo "$BODY" | mail -s $SUBJECT -a $OUTPUT_FILE -r $SENDER -S smtp=$SMTP_SERVER $RECIPIENT


#$? contains the exit status of the last command.
if [ $? -eq 0 ]; then
    echo "Email sent successfully"
else
    echo "Failed to send email"
fi
# Clean up temporary files

# Check Mail Log
echo "Checking Mail Log..."
grep "error" /var/log/mail.log

# Check SMTP Configuration
echo "Checking SMTP Configuration..."
cat /etc/postfix/main.cf  # Adjust path if using a different MTA

echo "SMTP Configuration Check Complete."

rm $OUTPUT_FILE


