import { getAllCourses } from "@/actions/courses";
import CourseCard from "@/components/shared/CourseCard";
export default function Courses() {
  const data = getAllCourses();
  // this is a courses page
  return (
    <main className="grid max-sm:grid-cols-1 sm:grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4 px-5">
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
