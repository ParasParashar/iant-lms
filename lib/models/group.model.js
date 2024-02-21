import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  members: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      isAdmin: { type: Boolean, default: false },
    },
  ],
});

const Group = mongoose.models.Group || mongoose.model("Group", groupSchema);

export default Group;
