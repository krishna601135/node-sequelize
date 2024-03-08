 #!/bin/sh


# Set MongoDB connection URI
MONGO_URI="xxxxxxxxxxxxxxxxx"

# Connect to MongoDB and print a message if successful
mongo $MONGO_URI --eval "print('Successfully connected to MongoDB')"

