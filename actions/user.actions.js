"use server";

import User from "@/lib/models/user.model";
import { connectToDb } from "@/lib/mongoose";
import { currentUser } from "@clerk/nextjs";
import { getParticularCourse } from "./courses";
import { revalidatePath } from "next/cache";
import Courseprogress from "@/lib/models/courseprogress.model";
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
        name: user.fullname || user.name,
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
    const isCourseValid = getParticularCourse(courseId); //checking course is valid
    if (!isCourseValid) return "Course not valid";
    const user = await findOrCreateUser();
    if (!user) return "user not found";
    // courseData in which user enrolled
    const courseData = {
      courseId: isCourseValid?.id,
      courseName: isCourseValid?.title,
    };
    // checking user is already enrolled in course
    const userEnrolled = user.enrolledCourses.some(
      (course) => course.courseId === courseData.courseId
    );
    if (!userEnrolled) {
      // if not add the course.
      user.enrolledCourses.push(courseData);
      await user.save();
      // creating user Progress of  a course
      const userProgress = new Courseprogress({
        userId: user.id,
        courseId: courseData.courseId,
        chapterProgress: isCourseValid.chapters.map((chapter) => ({
          chapterId: chapter.id,
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
  const userCourses = await findOrCreateUser();
  const userEnrolled = userCourses.enrolledCourses.some(
    (item) => item.courseId === courseId
  );
  return userEnrolled;
}

// completing user chapter progress
export async function markChapterProgress({ courseId, chapterId }) {
  try {
    connectToDb();
    const user = await findOrCreateUser();
    const userProgress = await Courseprogress.findOne({
      userId: user.id,
      courseId,
    });
    const chapterIndex = userProgress.chapterProgress.findIndex(
      (chapter) => chapter.chapterId === chapterId
    );
    if (chapterIndex !== -1) {
      userProgress.chapterProgress[chapterIndex].isCompleted = true;
      userProgress.save();
    }
    revalidatePath(`/course/${courseId}/chapters/${chapterId}`);
  } catch (error) {
    console.log("Course Progress error", error);
  }
}

// mark chapter as unComplete
export async function markChapterUnComplete({ courseId, chapterId }) {
  try {
    connectToDb();
    const user = await findOrCreateUser();
    const userProgress = await Courseprogress.findOne({
      userId: user.id,
      courseId,
    });
    const chapterIndex = userProgress.chapterProgress.findIndex(
      (chapter) => chapter.chapterId === chapterId
    );
    if (chapterIndex !== -1) {
      userProgress.chapterProgress[chapterIndex].isCompleted = false;
      userProgress.save();
    }
    revalidatePath(`/course/${courseId}/chapters/${chapterId}`);
  } catch (error) {
    console.log("Course Progress error", error);
  }
}

// checking each chapter progress
export async function checkingChapterProgress({ courseId, chapterId }) {
  try {
    connectToDb();
    const user = await findOrCreateUser();
    const userProgress = await Courseprogress.findOne({
      userId: user.id,
      courseId,
    }).select("chapterProgress");
    const chapterDetail = userProgress.chapterProgress.find(
      (chapter) => chapter.chapterId === chapterId
    );
    return chapterDetail.isCompleted;
  } catch (error) {
    console.log("chapter completion check error", error.message);
  }
}

// checking chapter completion
export async function userChapterCompletion(courseId) {
  try {
    connectToDb();
    const user = await findOrCreateUser();
    const userProgress = await Courseprogress.findOne({
      userId: user.id,
      courseId,
    });
    const chapterCompletionIds = userProgress.chapterProgress
      .filter((course) => course.isCompleted)
      .map((item) => item.chapterId);
    return chapterCompletionIds;
  } catch (error) {
    console.log("Course chapter completion check error", error);
  }
}

// checking overall course progress in percentage
export async function courseCompletionData(courseId) {
  try {
    connectToDb();
    const user = await findOrCreateUser();
    const courseProgress = await Courseprogress.findOne({
      userId: user.id,
      courseId,
    });
    const completedChapters = courseProgress.chapterProgress.filter(
      (course) => course.isCompleted
    ).length;

    const notCompletedChapters = courseProgress.chapterProgress
      .filter((course) => course.isCompleted === false)
      .map((item) => item.chapterId);

    const totalChapter = courseProgress.chapterProgress.length;

    const completionPercentage = Math.round(
      (completedChapters / totalChapter) * 100
    );
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
