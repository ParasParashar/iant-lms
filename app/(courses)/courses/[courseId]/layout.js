import CourseHeader from "@/components/courses/CourseHeader";
import CourseSidebar from "@/components/courses/CourseSidebar";
import { courses } from "@/lib/Courses";

const CourseLayout = ({ children, params }) => {
  const course = courses.find((item) => item.id === +params.courseId);
  return (
    <div className="h-full overflow-y-auto main-scrollbar">
      <div className="h-[80px] md:pl-44 fixed inset-y-0 w-full z-50">
        <CourseHeader course={course} />
      </div>
      <div className="hidden md:flex h-full w-64  flex-col fixed inset-y-0 z-50">
        <CourseSidebar course={course} />
      </div>
      <main className="md:pl-64 w mt-[80px]  bg-zinc-100 h-full  dark:bg-[#121832c8]">
        {children}
      </main>
    </div>
  );
};

export default CourseLayout;
