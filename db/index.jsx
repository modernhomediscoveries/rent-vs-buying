import mongoose from "mongoose";

export async function dbConnect() {
  try {
    return await mongoose.connect(process.env.DB_URL);
  } catch (err) {
    console.error("Database connection error:", err);
  }
}
