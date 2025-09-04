import mongoose from "mongoose";

export async function connect() {
  if (mongoose.connection.readyState >= 1) return; // reuse connection
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("✅ MongoDB Connected Successfully");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    throw err;
  }
}
