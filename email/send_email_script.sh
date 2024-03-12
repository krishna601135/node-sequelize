
######################
#Author: Mohan
#Date: 12/03/2024
#This script fetches latest json file from reports collection and sends attachment to mail
####################



sudo apt install -y software-properties-common gnupg apt-transport-https ca-certificates

sudo apt install -y mongodb

wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -

echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list

deb [arch=amd64,arm64] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse

sudo apt update


sudo apt install -y mongodb-org

mongod --version

sudo systemctl status mongod

sudo systemctl start mongod

sudo systemctl status mongod





# # Define email content and recipients
# EMAIL_SUBJECT="Container Scanning Report"

# RECIPIENT="krishnakakarapathi@gmail.com"

# #  curl --location --header "PRIVATE-TOKEN: 9koXpg98eAheJpvBs5tK" "https://gitlab.example.com/api/v4/projects/1/jobs/8/artifacts"

# # Download the artifact using wget
# wget -O container-scanning-report.json "https://gitlab.com/gitlabworkflow/online-library/-/jobs/6363017609/artifacts/raw/container-scanning-report.json"

# # Construct the email message
# EMAIL_BODY="Hello,\n\nPlease find attached the container scanning report.\n\nRegards,\nYour Team"

# # Send email with attachment
# echo -e "$EMAIL_BODY" | mail -s "$EMAIL_SUBJECT" "$RECIPIENT" -a "container-scanning-report.json"


