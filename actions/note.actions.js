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
    revalidatePath(`/courses/${courseId}/chapters/${chapterId}`);
  } catch (error) {
    console.log("notes delete error", error.message);
    throw new Error("notes delete  error");
  }
}

// display user notes
export async function getAllUserNotes({ search }) {
  try {
    connectToDb();
    const user = await findOrCreateUser();
    if (!user) throw new Error("User not found");
    const notes = await Note.find({
      userId: user._id,
    }).sort({ timestamp: -1 });
    if (search) {
      const data = notes.filter((item) =>
        item.title.toLowerCase().trim().includes(search.toLowerCase().trim())
      );
      return JSON.parse(JSON.stringify(data));
    }
    return JSON.parse(JSON.stringify(notes));
  } catch (error) {
    console.error("user notes find error", error.message);
    throw new Error("user notes find error");
  }
}

// display public notes
export async function getAllPublicNotes({ search }) {
  try {
    connectToDb();
    const user = await findOrCreateUser();
    if (!user) throw new Error("User not found");
    const notes = await Note.find({
      isPublished: true,
    })
      .populate({
        path: "userId",
        model: "User",
        select: "name _id  email",
      })
      .sort({ timestamp: -1 });
    if (search) {
      const data = notes.filter((item) =>
        item.title.toLowerCase().trim().includes(search.toLowerCase().trim())
      );

      return JSON.parse(JSON.stringify(data));
    }
    return JSON.parse(JSON.stringify(notes));
  } catch (error) {
    console.log("user notes find error", error.message);
    throw new Error("user notes find error");
  }
}

// publish user note
export async function publishUserNote({ noteId }) {
  try {
    connectToDb();
    const user = await findOrCreateUser();
    if (!user) throw new Error("User not found");
    await Note.findByIdAndUpdate(
      {
        _id: noteId,
      },
      {
        isPublished: true,
      }
    );
    revalidatePath("/notes/mynotes");
  } catch (error) {
    console.log("user notes find error", error.message);
    throw new Error("user notes find error");
  }
}
// unpublish user note
export async function unPublishUserNote({ noteId }) {
  try {
    connectToDb();
    const user = await findOrCreateUser();
    if (!user) throw new Error("User not found");
    await Note.findByIdAndUpdate(
      {
        _id: noteId,
      },
      {
        isPublished: false,
      }
    );
    revalidatePath("/notes/mynotes");
  } catch (error) {
    console.log("user notes find error", error.message);
    throw new Error("user notes find error");
  }
}
// delete user note
export async function deleteUserNote({ noteId }) {
  try {
    connectToDb();
    const user = await findOrCreateUser();
    if (!user) throw new Error("User not found");
    await Note.findByIdAndDelete({
      _id: noteId,
    });
    revalidatePath("/notes/mynotes");
  } catch (error) {
    console.log("user notes delete error", error.message);
    throw new Error("user notes delete error");
  }
}
// create note primately
export async function createOrUpdateNote({ title, content, noteId }) {
  try {
    connectToDb();
    const { _id } = await findOrCreateUser();
    if (!_id) throw new Error("User not found");
    let note;
    if (!noteId) {
      note = await Note.create({
        title,
        content,
        userId: _id,
        isPublished: false,
      });
    } else {
      note = await Note.findByIdAndUpdate(
        {
          _id: noteId,
        },
        {
          title: title,
          content: content,
        },
        {
          new: true,
        }
      );
    }
    return JSON.parse(JSON.stringify(note._id));
  } catch (error) {
    console.error("Private note creation error", error.message);
  }
}
// get full note details
export async function getFullNoteDetails({ noteId }) {
  try {
    const { _id } = await findOrCreateUser();
    if (!_id) throw new Error("user not found");
    const note = await Note.findById({
      _id: noteId,
    }).populate({
      path: "userId",
      model: "User",
      select: "_id name email",
    });
    if (!note) throw new Error("Note not found");
    const isUserNote = note.userId._id.toString() === _id.toString();
    const response = {
      note: JSON.parse(JSON.stringify(note)),
      isUserNote: isUserNote,
    };
    return response;
  } catch (error) {
    console.error("Full note details error", error.message);
  }
}

// checking note is saved to user or note.
export async function isNoteAlreadySave({ noteId }) {
  try {
    connectToDb();
    // getting user save note or not.
    const user = await findOrCreateUser();
    if (!user) throw new Error("User not found");
    const isSaved = user.savedNotes?.includes(noteId);
    return isSaved;
  } catch (error) {
    console.log("note save checking error", error.message);
  }
}
// save note
export async function saveNoteTrigger({ noteId }) {
  try {
    connectToDb();
    const user = await findOrCreateUser();
    const isNoteSave = await isNoteAlreadySave({ noteId: noteId });
    if (!isNoteSave) {
      user.savedNotes.push(noteId);
      await user.save();
    }
    return true;
  } catch (error) {
    console.log("note save  error", error.message);
  }
}
// un save user notes
export async function unSaveNoteTrigger({ noteId }) {
  try {
    connectToDb();
    const user = await findOrCreateUser();
    const isNoteSave = await isNoteAlreadySave({ noteId: noteId });
    if (isNoteSave) {
      user.savedNotes.pull(noteId);
    }
    await user.save();
    return false;
  } catch (error) {
    console.log("note Unsave  error", error.message);
  }
}
