import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://127.0.0.1:27017/college-appointment-db");
    console.log("✅ MongoDB is connected successfully!");
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error.message);
    // process.exit(1);
  }
};

export default connectDB;
