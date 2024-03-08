import mongoose from "mongoose";
import fs from "fs";

// MongoDB connection URI
const uri = process.env.MONGO_URL;

// Database name
const dbName = process.env.DATABASE_NAME;

// Collection name
const collectionName = "reports";

// Define Mongoose schema
const reportSchema = new mongoose.Schema({
  jsonData: Object,
});

// Create Mongoose model
const Report = mongoose.model(collectionName, reportSchema);

// Function to upload JSON report to MongoDB
async function uploadToMongoDB(filePath) {
  try {
    // Read the JSON report file
    const reportData = JSON.parse(fs.readFileSync(filePath, "utf8"));

    // Connect to MongoDB
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Insert the report data into MongoDB using Mongoose
    const newReport = new Report({ jsonData: reportData });

    // Save the new report to MongoDB
    const result = await newReport.save();

    console.log(`Report uploaded to MongoDB with ID: ${result._id}`);

    // Close the MongoDB connection
    await mongoose.disconnect();
  } catch (error) {
    console.error("Error uploading report to MongoDB:", error);
  }
}

// Check if the file path argument is provided
const filePath = process.argv[2];
if (!filePath) {
  console.error("Usage: node uploadToMongoDB.js <file_path>");
  process.exit(1);
}

// Upload the report to MongoDB
uploadToMongoDB(filePath);
