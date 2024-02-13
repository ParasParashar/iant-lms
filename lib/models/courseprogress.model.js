const { default: mongoose } = require("mongoose");

const courseprogressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  chapterProgress: [
    {
      chapterId: { type: mongoose.Schema.Types.ObjectId, required: true },
      isCompleted: { type: Boolean, default: false },
    },
  ],
});
const Courseprogress =
  mongoose.models.Courseprogress ||
  mongoose.model("Courseprogress", courseprogressSchema);
export default Courseprogress;
