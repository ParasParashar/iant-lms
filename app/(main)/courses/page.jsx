import { getAllCourses, getCourseCategory } from "@/actions/course.actions";
import { courseCompletionData, findOrCreateUser } from "@/actions/user.actions";
import CoursePageSkeletons from "@/components/SkeletonLoaders/CoursePageSkeletons";
import AllCategoryBarItem from "@/components/shared/AllCategoryBarItem";
import CourseCard from "@/components/shared/CourseCard";
import { Suspense } from "react";

export default async function Courses({ searchParams }) {
  const user = await findOrCreateUser();
  const data = await getAllCourses({
    category: searchParams.category,
  });
  const courseCategoryArr = await getCourseCategory();
  const category = Array.from(new Set(courseCategoryArr));

  return (
    <Suspense fallback={<CoursePageSkeletons />}>
      <div className="flex flex-col gap-4 max-sm:px-3">
        <AllCategoryBarItem category={category} />

        <main className=" grid max-sm:grid-cols-1 grid-cols-2 gap-3 md:grid-cols-3  ">
          {data?.map(async (item) => {
            const { completionPercentage } = await courseCompletionData(
              item._id
            );
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
    </Suspense>
  );
}
