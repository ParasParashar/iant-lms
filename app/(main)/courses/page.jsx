import { getAllCourses } from "@/actions/courses";
import CourseCard from "@/components/shared/CourseCard";
import { getCourseCategary } from "@/actions/courses";

export default function Courses() {
  const data = getAllCourses();
  const courseCategary = getCourseCategary();
  // this is a courses page
  return (
    <main className=" grid max-sm:grid-cols-1 grid-cols-2 gap-3 md:grid-cols-3 ">
      {courseCategary.map((item) => (
        <p>{item}</p>
      ))}
      {data.map((item) => (
        <CourseCard
          key={item.id}
          id={item.id}
          title={item.title}
          category={item.categery}
          img_Url={item.img_Url}
        />
      ))}
    </main>
  );
}
