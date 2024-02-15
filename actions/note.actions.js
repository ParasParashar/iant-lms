"use server";

import Note from "@/lib/models/note.model";
import { connectToDb } from "@/lib/mongoose";
import { findOrCreateUser } from "./user.actions";
import { revalidatePath } from "next/cache";

export async function createNote({
  courseId,
  content,
  chapterId,
  title,
  noteId,
}) {
  try {
    connectToDb();
    const user = await findOrCreateUser();
    if (!user) throw new Error("User not found");
    // find existing note
    if (noteId) {
      const existingNote = await Note.findById({
        courseId: courseId,
        _id: noteId,
      });
      if (existingNote) {
        existingNote.content = content;
        existingNote.title = title;
        await existingNote.save();
      } else {
        throw new Error("note is not found");
      }
    } else {
      await Note.create({
        content: content,
        title: title,
        courseId: courseId,
        userId: user.id,
      });
    }

    revalidatePath(`/courses/${courseId}/chapters/${chapterId}`);
  } catch (error) {
    console.log("notes creation error", error.message);
    throw new Error("notes creation error");
  }
}

// getting course notes
export async function getUserCourseNote({ courseId }) {
  try {
    connectToDb();
    const user = await findOrCreateUser();
    if (!user) throw new Error("User not found");
    const note = await Note.find({
      courseId: courseId,
      userId: user.id,
    });
    return note;
  } catch (error) {
    console.log("notes find error", error.message);
    throw new Error("notes find error");
  }
}
// delete course note
export async function deleteCourseNote({ courseId, noteId, chapterId }) {
  try {
    connectToDb();
    const note = await Note.deleteOne({
      _id: noteId,
      courseId: courseId,
    });
    console.log(note, "delete");
    revalidatePath(`/courses/${courseId}/chapters/${chapterId}`);
  } catch (error) {
    console.log("notes find error", error.message);
    throw new Error("notes find error");
  }
}
