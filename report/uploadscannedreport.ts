import * as fs from "fs";
import mongoose from "mongoose";

const uri = process.env.MONGO_URL || ""; // Default to empty string if MONGO_URL is not defined
const collectionName = "reports";

const reportSchema = new mongoose.Schema({
  jsonData: Object,
});

const Report = mongoose.model(collectionName, reportSchema);

async function uploadToMongoDB(filePath: string, mongourl: string) {
  try {
    const reportData = JSON.parse(fs.readFileSync(filePath, "utf8"));
    await mongoose.connect(mongourl); // Use mongourl instead of uri
    const newReport = new Report({ jsonData: reportData });
    const result = await newReport.save();
    console.log(`Report uploaded to MongoDB with ID: ${result._id}`);
    await mongoose.disconnect();
  } catch (error) {
    console.error("Error uploading report to MongoDB:", error);
  }
}

const filePath = process.argv[2];
if (!filePath) {
  console.error("Usage: node uploadToMongoDB.js <file_path>");
  process.exit(1);
}

if (!uri) {
  console.error("MongoDB URL not provided in environment variables.");
  process.exit(1);
}

uploadToMongoDB(filePath, uri);
