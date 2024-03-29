import { getAllCourses } from "@/actions/course.actions";
import CourseCard from "../shared/CourseCard";
import {
  courseCompletionData,
  getAllUserEnrolledCourses,
} from "@/actions/user.actions";
import { Card } from "../ui/card";

const EnrolledCourses = async () => {
  const allCourse = await getAllCourses({ category: "" });
  const userEnrolledCourses = await getAllUserEnrolledCourses();
  return (
    <Card className=" p-4 rounded-lg  w-full  flex flex-col gap-2 overflow-auto flex-nowrap scroll-smooth custom-scrollbar  bg-secondary   ">
      <h3 className="text-lg lg:text-xl text-muted-foreground font-semibold font-sans">
        Enrolled Courses
      </h3>
      <section
        id="enrolledCourses"
        className="flex w-full overflow-x-auto scroll-smooth enroll-scrollbar gap-2 relative"
      >
        {userEnrolledCourses?.length > 0 ? (
          userEnrolledCourses?.map(async (item) => {
            const { completionPercentage } = await courseCompletionData(
              item._id
            );
            return (
              <div
                key={item._id}
                className=" min-w-[250px] max-w-[300px]  h-[400px] "
              >
                <CourseCard
                  id={JSON.parse(JSON.stringify(item._id))}
                  title={item.title}
                  category={item.category}
                  img_Url={item.img_Url}
                  isEnrollred={true}
                  value={completionPercentage}
                />
              </div>
            );
          })
        ) : (
          <>
            {allCourse?.slice(0, 4).map((item) => {
              return (
                <div
                  key={item._id}
                  className=" min-w-[250px] max-w-[300px]  h-[400px] "
                >
                  <CourseCard
                    key={item._id}
                    id={JSON.parse(JSON.stringify(item._id))}
                    title={item.title}
                    category={item.category}
                    img_Url={item.img_Url}
                  />
                </div>
              );
            })}
          </>
        )}
      </section>
    </Card>
  );
};

export default EnrolledCourses;
