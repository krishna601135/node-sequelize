#!/bin/bash

######################
#Author: Mohan
#Date: 12/03/2024
#This script fetches latest json file from reports collection and sends attachment to mail
####################


# # MongoDB Connection Details
# DATABASE_NAME="online-library"
# COLLECTION_NAME="reports"

# # Email Details
# RECIPIENT="krishnakakarapathi@gmail.com"
# SENDER="kakarapathikrishna@gmail.com"
# MAIL_SUBJECT="Container Scanning Report"
# BODY="Hello,\n\nPlease find attached the container scanning report.\n\nRegards,\nYour Team"

# # File Paths
# OUTPUT_FILE="container_scanning_report.txt"
# ATTACHMENT="container_scanning_report.txt"



# # Connect to MongoDB and retrieve record
# mongosh "mongodb+srv://library:saimohanlib@cluster0.k1eoilz.mongodb.net/online-library" --apiVersion 1 --username library --password saimohanlib --eval "db.$COLLECTION_NAME.find().sort({ timestampField: -1 }).limit(1)" > $OUTPUT_FILE

# #cat $OUTPUT_FILE

# # Set SMTP server address
# SMTP_SERVER="smtp.gmail.com"


# # Send email with attachment
# # echo $BODY | mail -s $SUBJECT -a $OUTPUT_FILE -r $SENDER $RECIPIENT
# echo $BODY | mail -s "$MAIL_SUBJECT" -A $OUTPUT_FILE krishnakakarapathi@gmail.com

# #$? contains the exit status of the last command.
# if [ $? -eq 0 ]; then
#     echo "Email sent successfully"
# else
#     echo "Failed to send email"
# fi


# # Clean up temporary files
# rm $OUTPUT_FILE



#!/bin/bash

# Install mutt and ssmtp
apt-get update

apt-get install mutt ssmtp -y

# Create default folders for mutt
mkdir -p ~/.mutt/cache
touch ~/.mutt/certificates

# Create the muttrc file
cat <<EOF > ~/.muttrc
set imap_user = 'kakarapathikrishna@gmail.com'
set imap_pass = 'pkqk vzho vbth phuh'

set sendmail="/usr/sbin/ssmtp"

set folder="imaps://imap.gmail.com"
set spoolfile="imaps://imap.gmail.com/INBOX"
set record="imaps://imap.gmail.com/[Gmail]/Sent Mail"
set postponed="imaps://imap.gmail.com/[Gmail]/Drafts"

set header_cache = "~/.mutt/cache/headers"
set message_cachedir = "~/.mutt/cache/bodies"
set certificate_file = "~/.mutt/certificates"

set from = 'krishnakakarapathi@gmail.com'
set realname = 'Mohan K'

set smtp_url = 'smtp://user@smtp.gmail.com:587/'
set smtp_pass='applicationpass'

set move = no
set imap_keepalive = 900

# Gmail-style keyboard shortcuts
macro index,pager ga "<change-folder>=[Gmail]/All<tab><enter>" "Go to all mail"
macro index,pager gi "<change-folder>=INBOX<enter>" "Go to inbox"
macro index,pager gs "<change-folder>=[Gmail]/Starred<enter>" "Go to starred messages"
macro index,pager gd "<change-folder>=[Gmail]/Drafts<enter>" "Go to drafts"
macro index,pager e "<enter-command>unset trash\n <delete-message>" "Gmail archive message"
EOF

# Configure ssmtp
cat <<EOF | sudo tee /etc/ssmtp/ssmtp.conf
root=kakarapathikrishna@gmail.com
mailhub=smtp.gmail.com:587

AuthUser=kakarapathikrishna@gmail.com
AuthPass='pkqk vzho vbth phuh'
UseTLS=YES
UseSTARTTLS=YES

hostname=kakarapathikrishna@gmail.com
rewriteDomain=gmail.com

FromLineOverride=YES
EOF



echo "This is the body of the email" | mutt -s "Test Email" krishnakakarapathi@gmail.com
if [ $? -eq 0 ]; then
    echo "Email sent successfully"
else
    echo "Failed to send email"
fi