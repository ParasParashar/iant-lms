"use server";

import User from "@/lib/models/user.model";
import { connectToDb } from "@/lib/mongoose";
import { auth, currentUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import Courseprogress from "@/lib/models/courseprogress.model";
import { getParticularCourse } from "./course.actions";
//  find or create user;
export async function findOrCreateUser() {
  try {
    connectToDb();
    const user = await currentUser();
    if (!user) {
      throw new Error("User auth not found");
    }
    const existingUser = await User.findOne({
      authId: user.id,
    });
    if (!existingUser) {
      const createUser = await User.create({
        name: user.firstName,
        email: user.emailAddresses[0]?.emailAddress,
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
export async function enrollCourse({ courseId }) {
  try {
    connectToDb();

    // getting user details
    const user = await findOrCreateUser();
    if (!user) return "user not found";

    // getting specific data  of particular chapter
    const { _id, chapters } = await getParticularCourse(courseId);
    if (!_id) return "Course not valid";

    // checking user is already enrolled in course
    const userEnrolled = user.enrolledCourses.includes(_id);
    if (!userEnrolled) {
      // if not add the course.
      user.enrolledCourses.push(_id);
      await user.save();
      // creating user Progress of  a course
      const userProgress = new Courseprogress({
        userId: user.id,
        courseId: _id,
        chapterProgress: chapters.map((chapter) => ({
          chapterId: chapter._id,
        })),
      });
      await userProgress.save();
    }
    revalidatePath(`/courses/${courseId}`);
  } catch (error) {
    console.log("Courses purchase error", error.message);
  }
}

// checking user enrolled in course
export async function userEnrolledInCourse(courseId) {
  try {
    const userCourses = await findOrCreateUser();
    if (!userCourses) {
      throw new Error("User not found");
    }
    const userEnrolled = userCourses.enrolledCourses.includes(courseId);
    return userEnrolled;
  } catch (error) {
    console.log("checking user enrolled course erro", error);
  }
}

// completing user chapter progress
export async function markChapterProgress({ courseId, chapterId, type }) {
  try {
    connectToDb();
    const user = await findOrCreateUser();
    if (!user) {
      throw new Error("User not found");
    }
    const userProgress = await Courseprogress.findOne({
      userId: user.id,
      courseId,
    });
    const chapterIndex = userProgress.chapterProgress.findIndex(
      (chapter) =>
        JSON.parse(JSON.stringify(chapter.chapterId)) ===
        JSON.parse(JSON.stringify(chapterId))
    );
    if (chapterIndex !== -1) {
      if (type === "complete") {
        userProgress.chapterProgress[chapterIndex].isCompleted = true;
        userProgress.save();
      } else {
        userProgress.chapterProgress[chapterIndex].isCompleted = false;
        userProgress.save();
      }
    }
    revalidatePath(`/course/${courseId}/chapters/${chapterId}`);
  } catch (error) {
    console.log("Course Progress error", error.message);
  }
}

// checking each chapter progress
export async function checkingChapterProgress({ courseId, chapterId }) {
  try {
    connectToDb();
    // getting user
    const user = await findOrCreateUser();
    if (!user) {
      throw new Error("User not found");
    }
    const userProgress = await Courseprogress.findOne({
      userId: user._id,
      courseId,
    }).select("chapterProgress");
    const chapterDetail = userProgress.chapterProgress.find(
      (chapter) =>
        JSON.parse(JSON.stringify(chapter.chapterId)) ===
        JSON.parse(JSON.stringify(chapterId))
    );
    return chapterDetail.isCompleted;
  } catch (error) {
    console.log("chapter completion check error", error.message);
  }
}

// checking each chapter completion
export async function userChapterCompletion(courseId) {
  try {
    connectToDb();
    const user = await findOrCreateUser();
    if (!user) {
      throw new Error("User not found");
    }
    // getting progress
    const userProgress = await Courseprogress.findOne({
      userId: user._id,
      courseId,
    });
    if (!userProgress) return;
    // getting only and convert to string
    const chapterCompletionIds = userProgress.chapterProgress
      .filter((course) => course.isCompleted)
      .map((item) => item.chapterId);
    return JSON.parse(JSON.stringify(chapterCompletionIds));
  } catch (error) {
    console.log("Course chapter completion check error", error.message);
  }
}

// checking overall course progress in percentage
export async function courseCompletionData(courseId) {
  try {
    connectToDb();
    //getting user
    const user = await findOrCreateUser();
    if (!user) {
      throw new Error("User not found");
    }
    // getting user and course progress
    const courseProgress = await Courseprogress.findOne({
      userId: user._id,
      courseId,
    });
    // taking completed chapters length
    const completedChapters = courseProgress?.chapterProgress.filter(
      (course) => course.isCompleted
    ).length;
    // taking chapter which are not completed
    const notCompletedChapters = courseProgress?.chapterProgress
      .filter((course) => course.isCompleted === false)
      .map((item) => item.chapterId);
    // total Chapters
    const totalChapter = courseProgress?.chapterProgress.length;
    // completion percentage
    let completionPercentage = Math.round(
      (completedChapters / totalChapter) * 100
    );
    if (!courseProgress) {
      return (completionPercentage = 0);
    }
    return {
      completionPercentage,
      completedChapters,
      notCompletedChapters,
      totalChapter,
    };
  } catch (error) {
    console.log("Course overall completion check error", error);
    return 0;
  }
}

// search user by name
export async function searchUserByName(search) {
  try {
    connectToDb();
    const { userId } = auth();
    const users = await User.find(
      {
        authId: { $ne: userId },
      },
      { name: 1, email: 1, authId: 1 }
    );
    // const result =
    const result = users.filter((item) =>
      item.name.toLowerCase().trim().includes(search.toLowerCase().trim())
    );
    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    console.log("Course overall completion check error", error);
    return 0;
  }
}

//  get all saved notes
export async function getAllSavedNotes({ search }) {
  try {
    connectToDb();
    const { _id } = await findOrCreateUser();
    if (!_id) throw new Error("User not found");
    const notes = await User.findById({
      _id: _id,
    })
      .populate({
        path: "savedNotes",
        model: "Note",
        populate: {
          path: "userId",
          model: "User",
          select: "name _id email",
        },
      })
      .select("savedNotes");

    if (search) {
      const data = notes?.savedNotes.filter((item) =>
        item.title.toLowerCase().trim().includes(search.toLowerCase().trim())
      );
      return JSON.parse(JSON.stringify(data));
    }
    return JSON.parse(JSON.stringify(notes.savedNotes));
  } catch (error) {
    console.error("user saved notes error", error.message);
    throw new Error("user saved notes find error");
  }
}

// get userProgress of all the courses
export async function getUserAnalytics() {
  try {
    connectToDb();
    const { _id } = await findOrCreateUser();
    if (!_id) throw new Error("User not found");

    const userProgress = await Courseprogress.find({
      userId: _id,
    })
      .populate({
        path: "courseId",
        model: "Course",
        select: "title chapters",
      })
      .select("chapterProgress");
    // calculate completion percentage of each course
    const totalCourseProgress = userProgress.map((item) => {
      const totalChapters = item.chapterProgress.length;
      const completedChapters = item.chapterProgress.filter(
        (chapter) => chapter.isCompleted
      ).length;
      const completionPercentage =
        totalChapters === 0
          ? 0
          : Math.round((completedChapters / totalChapters) * 100);

      return {
        courseId: item.courseId._id,
        courseTitle: item.courseId.title,
        Course_Complete: completionPercentage,
        Total_Percent: Math.round((totalChapters / totalChapters) * 100),
      };
    });

    // console.log(totalCourseProgress);
    return JSON.parse(JSON.stringify(totalCourseProgress));
  } catch (error) {
    console.error("all userProgress error", error.message);
  }
}

// get all userEnrolled courses
export async function getAllUserEnrolledCourses() {
  try {
    connectToDb();
    const { _id } = await findOrCreateUser();
    if (!_id) throw new Error("User not found");
    const userCourses = await User.findById({
      _id: _id,
    })
      .populate({
        path: "enrolledCourses",
        model: "Course",
        select: "_id title img_Url category",
      })
      .select("enrolledCourses");
    if (!userCourses) return [];
    return JSON.parse(JSON.stringify(userCourses.enrolledCourses));
  } catch (error) {
    console.log("get all user enrolled courses error", error.message);
  }
}
