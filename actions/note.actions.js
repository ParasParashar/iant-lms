"use server";

import Note from "@/lib/models/note.model";
import { connectToDb } from "@/lib/mongoose";
import { findOrCreateUser } from "./user.actions";
import { revalidatePath } from "next/cache";

export async function createNote({ courseId, content, chapterId }) {
  try {
    connectToDb();
    const user = await findOrCreateUser();
    if (!user) throw new Error("User not found");
    // find existing note
    const existingNote = await Note.findOne({
      courseId: courseId,
      userId: user.id,
    });
    if (existingNote) {
      console.log("currently in existing");
      existingNote.content = content;
      await existingNote.save();
    } else {
      await Note.create({
        courseId: courseId,
        content: content,
        userId: user.id,
      });
    }
    revalidatePath(`/courses/${courseId}/chapters/${chapterId}`);
  } catch (error) {
    console.log("notes creation error", error.message);
    throw new Error("notes creation error");
  }
}

// getting course note
export async function getUserCourseNote({ courseId }) {
  try {
    connectToDb();
    const user = await findOrCreateUser();
    if (!user) throw new Error("User not found");
    const note = await Note.findOne({
      courseId: courseId,
      userId: user.id,
    });
    return note;
  } catch (error) {
    console.log("notes find error", error.message);
    throw new Error("notes find error");
  }
}
