"use server";

import Chatbot from "@/lib/models/chatbot.model";
import { connectToDb } from "@/lib/mongoose";
import { findOrCreateUser } from "./user.actions";

export async function createAiChat({ content, role }) {
  try {
    connectToDb();
    const { _id } = await findOrCreateUser();
    if (!_id) throw new Error("User not found");
    const chat = await Chatbot.create({
      userId: _id,
      role: role,
      content: content,
    });
  } catch (error) {
    console.log("ai chat message error", error.message);
  }
}

export async function getUserAiChats() {
  try {
    connectToDb();
    const { _id } = await findOrCreateUser();
    if (!_id) throw new Error("User not found");
    const chats = await Chatbot.find({
      userId: _id,
    }).select("role content userId");
    return JSON.parse(JSON.stringify(chats));
  } catch (error) {
    console.log("ai chat message error", error.message);
  }
}

export async function deleteUserAiChats() {
  try {
    connectToDb();
    const { _id } = await findOrCreateUser();
    if (!_id) throw new Error("User not found");
    const chats = await Chatbot.deleteMany({
      userId: _id,
    });
  } catch (error) {
    console.log("ai chat message error", error.message);
  }
}
