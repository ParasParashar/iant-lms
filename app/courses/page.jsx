import { getAllCourses } from "@/actions/courses";
import CourseCard from "@/components/shared/CourseCard";
export default function Courses() {
  const data = getAllCourses();
  // this is a courses page
  return (
    <main className=" grid grid-cols-2 gap-3 md:grid-cols-3 ">
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
