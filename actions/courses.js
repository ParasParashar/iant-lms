import { courses } from "@/lib/Courses";
//get all courses
export function getAllCourses() {
  return courses;
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
