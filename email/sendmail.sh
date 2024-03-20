#!/bin/bash

# Install required packages
apt install sendmail mailutils sendmail-cf -y

# Create directory for authentication info
mkdir -p /etc/mail/authinfo
chmod 700 /etc/mail/authinfo

# Create authentication file
tee /etc/mail/authinfo/smtp-auth > /dev/null <<EOF
AuthInfo:smtp.gmail.com "U:kakarapathikrishna@gmail.com" "P:wblgexuhhgnfxlys"

EOF

# Create hashmap file

makemap hash /etc/mail/authinfo/smtp-auth < /etc/mail/authinfo/smtp-auth


cp sendmail.mc /etc/mail/sendmail.mc

apt-get install sasl2-bin -y
apt-get install sasl2-bin libsasl2-modules -y

make -C /etc/mail

service sendmail reload

echo "This is the body of the email" | mutt -s "Test Email" krishnakakarapathi@gmail.com
if [ $? -eq 0 ]; then
    echo "Email sent successfully"
else
    echo "Failed to send email"
fi
