const { MongoClient } = require('mongodb');
const fs = require('fs');

// MongoDB connection URI
const uri = 'mongodb://localhost:27017';

// Database name
const dbName = 'your_database_name';

// Collection name
const collectionName = 'reports';

// Function to upload JSON report to MongoDB
async function uploadToMongoDB(filePath) {
  try {
    // Read the JSON report file
    const reportData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // Connect to MongoDB
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    // Select the database
    const db = client.db(dbName);

    // Select the collection
    const collection = db.collection(collectionName);

    // Insert the report data into MongoDB
    const result = await collection.insertOne(reportData);
    console.log(`Report uploaded to MongoDB with ID: ${result.insertedId}`);

    // Close the MongoDB connection
    await client.close();
  } catch (error) {
    console.error('Error uploading report to MongoDB:', error);
  }
}

// Check if the file path argument is provided
const filePath = process.argv[2];
if (!filePath) {
  console.error('Usage: node uploadToMongoDB.js <file_path>');
  process.exit(1);
}

// Upload the report to MongoDB
uploadToMongoDB(filePath);
