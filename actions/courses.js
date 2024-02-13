import { courses } from "@/lib/Courses";
import Course from "@/lib/models/course.model";
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
    console.log("error getting all courses", error);
  }
}
// get specific course
export function getParticularCourse(id) {
  const data = courses.find((item) => item.id === Number(id));
  return data;
}
// get specific chapter
export function getSpecificChapter({ courseId, chapterId }) {
  const chapterData = courses
    .find((data) => data.id === +courseId)
    .chapters.find((chapter) => chapter.id === +chapterId);
  return chapterData;
}
