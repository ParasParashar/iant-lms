import mongoose from "mongoose";
const { Schema } = mongoose;
const userSchema = new Schema({
  name: String,
  email: String,
  authId: String,
  enrolledCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
