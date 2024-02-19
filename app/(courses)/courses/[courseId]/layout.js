import { getParticularCourse } from "@/actions/course.actions";
import CourseHeader from "@/components/courses/CourseHeader";
import CourseSidebar from "@/components/courses/CourseSidebar";

const CourseLayout = async ({ children, params }) => {
  const course = await getParticularCourse(params.courseId);
  return (
    <div className="h-full overflow-y-auto main-scrollbar bg-zinc-100  dark:bg-[#121832c8]">
      <div className="h-[80px] md:pl-64 fixed inset-y-0 w-full z-50">
        {/* not able to pass data directly from server to client component */}
        <CourseHeader course={JSON.parse(JSON.stringify(course))} />
      </div>
      <div className="hidden md:flex h-full w-64  flex-col fixed inset-y-0 z-50">
        <CourseSidebar course={JSON.parse(JSON.stringify(course))} />
      </div>
      <main className="md:pl-64  mt-[80px]  ">{children}</main>
    </div>
  );
};

export default CourseLayout;
