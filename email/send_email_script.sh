 #!/bin/sh

# Install MongoDB and MongoDB tools
apk add --no-cache mongodb mongodb-tools

# Add MongoDB service to system startup
rc-update add mongodb default

# Start MongoDB service
rc-service mongodb start

# Set MongoDB connection URI
MONGO_URI="xxxxxxxxxxxxxxxxx"

# Connect to MongoDB and print a message if successful
mongo $MONGO_URI --eval "print('Successfully connected to MongoDB')"

