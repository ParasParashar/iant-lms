"use server";

import User from "@/lib/models/user.model";
import { connectToDb } from "@/lib/mongoose";
import { auth } from "@clerk/nextjs";

export async function getOnlineUsers(userIds) {
  try {
    connectToDb();
    const { userId } = auth();
    const users = await User.find({
      authId: { $in: userIds, $ne: userId },
    });
    return users;
  } catch (error) {
    console.log("user online find error", error);
  }
}
