"use server";

import User from "@/lib/models/user.model";
import { connectToDb } from "@/lib/mongoose";
import { currentUser } from "@clerk/nextjs";

export async function findOrCreateUser() {
  try {
    connectToDb();
    const user = await currentUser();
    const existingUser = await User.findOne({
      authId: user.id,
    });
    if (!existingUser) {
      const createUser = await User.create({
        name: user.fullname,
        email: user.emailAddresses[0].emailAddress,
        authId: user.id,
      });
      return createUser;
    }
    return existingUser;
  } catch (err) {
    console.log("create user error", err);
  }
}
