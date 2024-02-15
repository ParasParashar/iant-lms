import { getAllCourses, getCourseCategory } from "@/actions/course.actions";
import { courseCompletionData, findOrCreateUser } from "@/actions/user.actions";
import { Button } from "@/components/ui/button";
import CourseCard from "@/components/shared/CourseCard";

export default async function Courses() {
  const data = await getAllCourses();
  const user = await findOrCreateUser();
  console.log(user);
  // handle the ui if data is not present

  const courseCategoryArr = await getCourseCategory();
  const category = Array.from(new Set(courseCategoryArr));

  return (
    <div className="flex flex-col gap-4">
      <section className="flex gap-2 overflow-x-scroll whitespace-nowrap scroll-smooth">
        <Button>All</Button>
        {category.map((item) => (
          <Button key="item">{item}</Button>
        ))}
      </section>
      <main className=" grid max-sm:grid-cols-1 grid-cols-2 gap-3 md:grid-cols-3 ">
        {data?.map(async (item) => {
          const { completionPercentage } = await courseCompletionData(item._id);
          const isEnrollred = user.enrolledCourses.includes(item._id);
          return (
            <CourseCard
              key={item._id}
              id={JSON.parse(JSON.stringify(item._id))}
              title={item.title}
              category={item.category}
              img_Url={item.img_Url}
              isEnrollred={isEnrollred}
              value={completionPercentage}
            />
          );
        })}
      </main>
    </div>
  );
}
