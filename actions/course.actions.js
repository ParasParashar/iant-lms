import Course from "@/lib/models/course.model";
import { connectToDb } from "@/lib/mongoose";

//get all courses
export async function getAllCourses() {
  try {
    connectToDb();
    const courses = await Course.find(
      {},
      { title: 1, img_Url: 1, category: 1 }
    );
    return courses;
  } catch (error) {
    console.log("error getting all courses", error.message);
  }
}

// get specific course
export async function getParticularCourse(id) {
  try {
    connectToDb();
    const course = await Course.findById({
      _id: id,
    });
    if (!course) throw new Error("SpecificCourse not found");
    return course;
  } catch (error) {
    console.log("course not found", error);
  }
}

// get specific chapter
export async function getSpecificChapter({ courseId, chapterId }) {
  try {
    connectToDb();
    const chapterData = await getParticularCourse(courseId);
    const chapter = chapterData.chapters.find((data) => {
      const parseChapterId = JSON.parse(JSON.stringify(chapterId));
      const parseDataId = JSON.parse(JSON.stringify(data._id));
      return parseChapterId === parseDataId;
    });
    return chapter;
  } catch (error) {
    console.log("get specific chapter error", error.message);
  }
}

// get course category
export async function getCourseCategory() {
  try {
    const Courses = await getAllCourses();
    const getCourseCategory = Courses.map((item) => item.category);
    return getCourseCategory;
  } catch (error) {
    console.log("get course category error", error);
  }
}
