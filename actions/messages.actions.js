"use server";

import User from "@/lib/models/user.model";
import { connectToDb } from "@/lib/mongoose";
import { auth } from "@clerk/nextjs";
import { findOrCreateUser } from "./user.actions";
import Message from "@/lib/models/message.model";
import Conversation from "@/lib/models/conversation.model";
import { revalidatePath } from "next/cache";
import Group from "@/lib/models/group.model";

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
    // getting user conversatoions.
    let conversation = await Conversation.findOne({
      participants: { $all: [sender._id, receiver._id] },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [sender._id, receiver._id],
      });
    }
    conversation.messages.push(message._id);
    conversation.save();
    // Populate sender and receiver information for the message
    const populatedMessage = await Message.findById(message._id)
      .populate("senderId", "_id name image authId")
      .populate("receiverId", "_id name image authId");

    revalidatePath(`/messages/${receiverId}`);
    return {
      message: JSON.parse(JSON.stringify(populatedMessage)),
      receiverAuthId: receiver.authId,
    };
  } catch (error) {
    console.log("message create error", error.message);
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
        select: "_id name image",
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
// ==========================creating group functionality
export async function createGroup({ groupName, participants }) {
  try {
    connectToDb();
    // console.log(...participants, "data of ");
    const user = await findOrCreateUser();
    if (!user) throw new Error("user not found");
    // creating Group
    const group = await Group.create({
      name: groupName,
      members: [
        {
          userId: user._id,
          isAdmin: true,
        },
      ],
    });
    // pushing member in the group
    for (let item of participants) {
      group.members.push({ userId: item });
      await group.save();
    }
    // getting or creating a conversation
    participants.push(user._id);

    let conversation = await Conversation.findOneAndUpdate(
      { group: group._id },
      { $addToSet: { participants: { $each: participants } } },
      { upsert: true, new: true }
    );
    return conversation._id;
  } catch (error) {
    console.log("group creation error", error);
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
      .populate({
        path: "group",
        model: "Group",
        select: "name",
      })
      .select("participants group")
      .lean();
    // if not conversation.
    if (!conversation) {
      return [];
    }
    const formattedConversations = conversation?.map((conversation) => {
      if (conversation.group) {
        return {
          group: {
            _id: conversation._id,
            name: conversation.group.name,
          },
        };
      } else {
        const users = conversation.participants
          .filter(
            (participant) =>
              participant._id.toString() !== sender._id.toString()
          )
          .map((participant) => ({
            _id: participant._id,
            name: participant.name,
            email: participant.email,
          }));
        return {
          users: users.length > 0 ? users[0] : null,
        };
      }
    });
    return JSON.parse(JSON.stringify(formattedConversations));
    // return userChats;
  } catch (error) {
    console.log("getting user conversations error", error);
  }
}
