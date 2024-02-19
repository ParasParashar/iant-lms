"use server";

import User from "@/lib/models/user.model";
import { connectToDb } from "@/lib/mongoose";
import { auth } from "@clerk/nextjs";
import { findOrCreateUser } from "./user.actions";
import Message from "@/lib/models/message.model";
import Conversation from "@/lib/models/conversation.model";
import { revalidatePath } from "next/cache";

// getting online user details
export async function getOnlineUsers(userIds) {
  try {
    connectToDb();
    const { userId } = auth();
    const users = await User.find({
      authId: { $in: userIds, $ne: userId },
    });
    if (!users) {
      return [];
    }
    return users;
  } catch (error) {
    console.log("user online find error", error);
  }
}
// getting details of message receiver
export async function getReceiverUser(userId) {
  try {
    connectToDb();
    const users = await User.findOne(
      {
        _id: userId,
      },
      {
        name: 1,
        email: 1,
        authId: 1,
      }
    );
    return users;
  } catch (error) {
    console.log("user reciver find error", error);
  }
}
// creating personal chats of user
export async function createMessage({ receiverId, content }) {
  try {
    connectToDb();
    // find the current user
    const sender = await findOrCreateUser();
    if (!sender) throw new Error("user not found");
    // find the receiver's user
    const receiver = await User.findById(receiverId);
    if (!receiver) throw new Error("Receiver not found");
    // creating a message
    const message = await Message.create({
      senderId: sender._id,
      receiverId: receiver._id,
      content: content,
    });
    // checking if a conversation between sender and receiver already exists
    let conversation = await Conversation.findOne({
      participants: { $all: [sender._id, receiver._id] },
    });
    // if note conversations exists
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [sender._id, receiver._id],
      });
    }
    conversation.messages.push(message._id);
    await conversation.save();
    revalidatePath(`/messages/${receiverId}`);
  } catch (error) {
    console.log("message create error", error);
  }
}
// getting user chats with other persons
export async function getPersonalConversations({ receiverId }) {
  try {
    connectToDb();
    // find the current user
    const sender = await findOrCreateUser();
    if (!sender) throw new Error("user not found");
    // find the receiver's user
    const receiver = await User.findById(receiverId);
    if (!receiver) throw new Error("Receiver not found");

    // find the conversatoins between sender and receiver
    const conversation = await Conversation.findOne({
      participants: {
        $all: [sender._id, receiver._id],
      },
    }).populate({
      path: "messages",
      populate: {
        path: "senderId receiverId",
        model: "User",
      },
    });

    if (!conversation) {
      return [];
    }

    return conversation.messages;
  } catch (error) {
    console.log("message create error", error);
  }
}
// getting user all the conversations

export async function getAllConversationsOfUser() {
  try {
    connectToDb();
    // find the current user
    const sender = await findOrCreateUser();
    if (!sender) throw new Error("user not found");

    // find the conversatoins between sender and receiver
    const conversation = await Conversation.find({
      participants: { $in: sender._id },
    })
      .populate({
        path: "participants",
        modle: "User",
        select: "name email authId _id image",
      })
      .select("participants")
      .lean();

    if (!conversation) {
      return [];
    }
    // filter out the all the participant who excluded sender or currentUser
    const userChats = JSON.parse(
      JSON.stringify(
        conversation.map((conversation) =>
          conversation.participants.find(
            (user) => user._id.toString() !== sender._id.toString()
          )
        )
      )
    );
    userChats;
    return userChats;
  } catch (error) {
    console.log("getting user conversations error", error);
  }
}
