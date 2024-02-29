import { getAllCourses, getCourseCategory } from "@/actions/course.actions";
import { courseCompletionData, findOrCreateUser } from "@/actions/user.actions";
import CourseCardSkeleton from "@/components/SkeletonLoaders/CourseCardSkeleton";
import AllCategoryBarItem from "@/components/shared/AllCategoryBarItem";
import CategoryBarItem from "@/components/shared/CategoryBarItem";
import dynamic from "next/dynamic";

export default async function Courses({ searchParams }) {
  const user = await findOrCreateUser();
  const data = await getAllCourses({
    category: searchParams.category,
  });
  // handle the ui if data is not present
  const courseCategoryArr = await getCourseCategory();
  const category = Array.from(new Set(courseCategoryArr));

  const CourseCard = dynamic(() => import("@/components/shared/CourseCard"), {
    loading: () => <CourseCardSkeleton />,
    ssr: false,
  });

  return (
    <div className="flex flex-col gap-4 max-sm:px-3">
      <div className="flex gap-2 mt-4">
        <AllCategoryBarItem />
        <section className="flex gap-2 overflow-x-auto w-full flex-nowrap scroll-smooth custom-scrollbar  items-center ">
          {category.map((item) => (
            <CategoryBarItem key={item._id} item={item} />
          ))}
        </section>
      </div>

      {/* <Suspense fallback="loading....."> */}

      <main className=" grid max-sm:grid-cols-1 grid-cols-2 gap-3 md:grid-cols-3  ">
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

      {/* </Suspense> */}
    </div>
  );
}
