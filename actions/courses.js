import { courses } from "@/lib/Courses";

export function getAllCourses() {
  return courses;
}

export function getParticularCourse(id) {
  const data = courses.find((item) => item.id === Number(id));
  return data;
}
