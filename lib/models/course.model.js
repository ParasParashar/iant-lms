import mongoose from "mongoose";
const chapterSchema = new mongoose.Schema({
  title: String,
  description: String,
  videoUrl: String,
  pdf: String,
});

const courseSchema = new mongoose.Schema({
  title: String,
  img_Url: String,
  category: String,
  chapters: [chapterSchema],
});

const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);

export default Course;
