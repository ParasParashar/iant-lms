import mongoose from "mongoose";
let isConnected = false;
export function connectToDb() {
  if (!process.env.MONGODB_URL) return console.log("MongoDb url not found");
  if (isConnected) {
    console.log("MongoDb connection is already established");
    return;
  }
  try {
    mongoose.connect(process.env.MONGODB_URL);
    isConnected = true;
    console.log("MongoDb connected");
  } catch (error) {
    console.log("MongoDb connection error", err);
  }
}
