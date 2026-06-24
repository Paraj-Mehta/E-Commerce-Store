const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');

dotenv.config();

// Hardcode your exact credentials here for the test
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

async function testConnection() {
  try {
    console.log("Pinging Cloudinary...");
    // The ping method checks if your Admin API credentials are valid
    const response = await cloudinary.api.ping();
    console.log("Success! Connected to Cloudinary:", response);
  } catch (error) {
    console.error("Cloudinary Authentication Failed:", error);
  }
}

testConnection();