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
mongosh "mongodb+srv://library:saimohanlib@cluster0.k1eoilz.mongodb.net/online-library" --apiVersion 1 --username library --password saimohanlib --eval "db.$COLLECTION_NAME.find().sort({ timestampField: -1 }).limit(1)" > $OUTPUT_FILE

# Set SMTP server address
SMTP_SERVER="smtp.gmail.com"

# Edit mail configuration file and add SMTP server setting
if [ -f "/etc/mail.rc" ]; then
    sed -i "1i set smtp=smtp://$SMTP_SERVER" /etc/mail.rc
elif [ -f "$HOME/.mailrc" ]; then
    echo "set smtp=smtp://$SMTP_SERVER" >> "$HOME/.mailrc"
else
    echo "Mail configuration file not found."
    exit 1
fi

# Send email with attachment
# echo $BODY | mail -s $SUBJECT -a $OUTPUT_FILE -r $SENDER $RECIPIENT
echo "$BODY" | mail -s "$SUBJECT" -a "$OUTPUT_FILE" -r "$SENDER" "$RECIPIENT"


#$? contains the exit status of the last command.
if [ $? -eq 0 ]; then
    echo "Email sent successfully"
else
    echo "Failed to send email"
fi
# Clean up temporary files


rm $OUTPUT_FILE


