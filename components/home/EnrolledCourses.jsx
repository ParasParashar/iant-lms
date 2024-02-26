import { getAllCourses } from "@/actions/course.actions";
import CourseCard from "../shared/CourseCard";

const EnrolledCourses = async () => {
  const allCourse = await getAllCourses({ category: "" });
  // console.log(allCourse);

  return (
    <div className=" p-4 rounded-lg  w-full h-[40%] flex flex-col gap-2 overflow-auto flex-nowrap scroll-smooth custom-scrollbar bg-[#f1f5f9] dark:bg-[#1e293bd7] ">
      <p>Enrolled Courses</p>
      <div className="flex gap-2">
        {allCourse.slice(0, 4).map((item) => {
          return (
            <CourseCard
              key={item._id}
              id={JSON.parse(JSON.stringify(item._id))}
              title={item.title}
              category={item.category}
              img_Url={item.img_Url}
            />
          );
        })}
      </div>
    </div>
  );
};

export default EnrolledCourses;
