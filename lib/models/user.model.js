import mongoose from "mongoose";
const { Schema } = mongoose;
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  authId: { type: String, required: true },
  enrolledCourses: [
    {
      courseId: { type: Number, unique: true },
      courseName: { type: String, required: true },
    },
  ],
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
