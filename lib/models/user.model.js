import mongoose from "mongoose";
const { Schema } = mongoose;
const userSchema = new Schema({
  name: String,
  email: String,
  authId: String,
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
