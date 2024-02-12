const { default: mongoose } = require("mongoose");

const courseprogressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  courseId: {
    type: Number,
    required: true,
  },
  chapterProgress: [
    {
      chapterId: { type: Number, required: true },
      isCompleted: { type: Boolean, default: false },
    },
  ],
});
const Courseprogress =
  mongoose.models.Courseprogress ||
  mongoose.model("Courseprogress", courseprogressSchema);
export default Courseprogress;
