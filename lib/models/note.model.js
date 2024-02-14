const { default: mongoose, mongo } = require("mongoose");

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Note = mongoose.models.Note || mongoose.model("Note", noteSchema);
export default Note;
