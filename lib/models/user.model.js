import mongoose from "mongoose";
const { Schema } = mongoose;
const userSchema = new Schema({
  name: String,
  email: String,
  authId: String,
  enrolledCourses: [
    {
      courseId: { type: Number, unique: true },
      courseName: { type: String, required: true },
    },
  ],
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
