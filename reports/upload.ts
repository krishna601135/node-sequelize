import mongoose from "mongoose";
import fs from "fs";

// Collection name
const collectionName = "reports";

// Define Mongoose schema
const reportSchema = new mongoose.Schema({
  jsonData: Object,
});

const Report = mongoose.model(collectionName, reportSchema);

// Function to upload JSON report to MongoDB
async function uploadToMongoDB(filePath: string, mongourl: string) {
  try {
    // Read the JSON report file
    const reportData = JSON.parse(fs.readFileSync(filePath, "utf8"));

    // Connect to MongoDB
    await mongoose.connect(mongourl);

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
  console.error("Usage: ts-node uploadToMongoDB.ts <file_path>");
  process.exit(1);
}

// Get the MongoDB URL from environment variable
const mongoUrl = process.env.MONGO_URL;
if (!mongoUrl) {
  console.error("MongoDB URL not provided in environment variables.");
  process.exit(1);
}

// Upload the report to MongoDB
uploadToMongoDB(filePath, mongoUrl);
