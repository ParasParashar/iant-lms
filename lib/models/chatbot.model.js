import mongoose from "mongoose";

const aichatSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    role: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Chatbot =
  mongoose.models?.Chatbot || mongoose.model("Chatbot", aichatSchema);

export default Chatbot;
