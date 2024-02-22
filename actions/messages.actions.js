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
      isForGroup: false,
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
      isForGroup: false,
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

    const conversation = await Conversation.findOneAndUpdate(
      { group: group._id },
      {
        $addToSet: { participants: { $each: participants } },
        isForGroup: true,
      },
      { upsert: true, new: true }
    );

    return JSON.parse(JSON.stringify(group._id));
  } catch (error) {
    console.log("group creation error", error);
  }
}

// getting user all the conversations with personal and group chats
export async function getAllConversationsOfUser() {
  try {
    connectToDb();
    // find the current user
    const sender = await findOrCreateUser();
    if (!sender) throw new Error("user not found");

    // find the conversatoins between sender and receiver
    const conversation = await Conversation.find({
      participants: { $in: sender._id },
      // isForGroup: false,
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
            _id: conversation.group._id,
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
// getting the information of the group
export async function getGroupUsersInfo({ groupId }) {
  try {
    connectToDb();
    const groupInfo = await Group.findById({
      _id: groupId,
    }).populate({
      path: "members.userId",
      model: "User",
      select: "image name _id authId email",
    });
    return JSON.parse(JSON.stringify(groupInfo));
  } catch (error) {
    console.log("getting group info error", error);
  }
}

// making other people admin
export async function createAdminUser({ groupId, userId }) {
  try {
    connectToDb();
    // finding the exists group and mebers
    const updatedGroup = await Group.findOneAndUpdate(
      {
        _id: groupId,
        "members.userId": userId,
        "members.isAdmin": true, // Only update if the user is not already an admin
      },
      {
        $set: { "members.$.isAdmin": true },
      },
      {
        new: true,
        upsert: false,
      }
    );
    revalidatePath(`/messages/group/${groupId}`);
  } catch (error) {
    console.log("admin creation error", error);
  }
}
// remove member from the group
export async function removeMembersFromGroup({
  groupId,
  userId,
  isAdmin = false,
}) {
  try {
    connectToDb();
    // finding the exists group and members
    const updatedGroup = await Group.findOneAndUpdate(
      {
        _id: groupId,
        "members.userId": userId,
        "members.isAdmin": isAdmin,
      },
      {
        $pull: { members: { userId: userId } },
      },
      {
        new: true,
      }
    );
    // delteting the conversation of user
    const conversation = await Conversation.findOneAndUpdate(
      {
        group: groupId,
        participants: userId,
        isForGroup: true,
      },
      {
        $pull: { participants: userId },
      },
      {
        new: true,
      }
    );
    // deleting user messages
    await Message.deleteMany({
      groupId: groupId,
      senderId: userId,
    });
    revalidatePath(`/messages/group/${groupId}`);
  } catch (error) {
    console.log("member remove error", error);
  }
}

// edit group Name
export async function editGroupName({ groupId, newName }) {
  try {
    connectToDb();
    // finding the exists group
    await Group.findByIdAndUpdate(
      {
        _id: groupId,
      },
      {
        name: newName,
      },
      {
        new: true,
      }
    );
    revalidatePath(`/messages/group/${groupId}`);
  } catch (error) {
    console.log("group name error", error);
  }
}

// exit the group
export async function exitTheGroup({ groupId }) {
  try {
    connectToDb();
    // finding the exists user
    const user = await findOrCreateUser();
    if (!user._id) throw new Error("User not found");
    await removeMembersFromGroup({
      groupId: groupId,
      userId: user?._id,
      isAdmin: true,
    });
    revalidatePath(`/messages/group/${groupId}`);
  } catch (error) {
    console.log("group name error", error);
  }
}

// delete the group
export async function deleteGroup({ groupId }) {
  try {
    connectToDb();
    // deleting all the group related stafs
    const group = await Group.findByIdAndDelete({
      _id: groupId,
    });
    const conversation = await Conversation.findOneAndDelete({
      group: groupId,
    });
    const messages = await Message.findOneAndDelete({
      groupId: groupId,
    });
    revalidatePath(`/messages`);
  } catch (error) {
    console.log("group name error", error.message);
  }
}

//  creating group messages
export async function createGroupMessage({ groupId, content }) {
  try {
    connectToDb();
    const { _id } = await findOrCreateUser();
    if (!_id) throw new Error("User not found");
    // finding the group
    const groupConversation = await Conversation.findOne({
      group: groupId,
      isForGroup: true,
    });
    if (!groupConversation) throw new Error("Something went wrong");
    // creating the message
    const message = await Message.create({
      groupId: groupId,
      content: content,
      senderId: _id,
    });
    groupConversation.messages.push(message._id);
    groupConversation.save();
    // populating the group message
    const populatedMessage = await Message.findById(message._id).populate(
      "senderId",
      "_id name image "
    );

    revalidatePath(`/messages/group/${groupId}`);
    return JSON.parse(JSON.stringify(populatedMessage));
  } catch (error) {
    console.log("Group creation message", error.message);
  }
}

// getting conversations of the group
export async function getGroupConversation({ groupId }) {
  try {
    connectToDb();
    const conversation = await Conversation.findOne({
      group: groupId,
      isForGroup: true,
    }).populate({
      path: "messages",
      select: "senderId content groupId timestamp",
      populate: {
        path: "senderId",
        model: "User",
        select: "_id name image",
      },
    });
    return JSON.parse(JSON.stringify(conversation.messages));
  } catch (error) {
    console.log("group conversation found error", error.message);
  }
}
