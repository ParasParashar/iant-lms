"use server";

import { courses } from "@/lib/Courses";
import User from "@/lib/models/user.model";
import { connectToDb } from "@/lib/mongoose";
import { currentUser } from "@clerk/nextjs";
import { getParticularCourse } from "./courses";
//  find or create user;
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

// purchase a course
export async function purchaseCourse({ courseId }) {
  try {
    connectToDb();
    const isCourseValid = getParticularCourse(courseId);
    if (!isCourseValid) return "Course not valid";
    const user = await findOrCreateUser();
    console.log(isCourseValid, "d");
  } catch (error) {
    console.log("Courses purchase error", error.message);
  }
}
