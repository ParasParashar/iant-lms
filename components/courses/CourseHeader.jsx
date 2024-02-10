import ProfileButton from "../shared/ProfileButton";
import { ThemeToggleButton } from "../shared/ThemeToggleButton";
import { CourseMobileSidebar } from "./MobileCourseSidebar";

const CourseHeader = ({ course }) => {
  return (
    <div className="p-4  shadow-gray-800/40 h-full w-full flex items-center shadow-sm bg-sky-100  dark:bg-slate-950 ">
      <CourseMobileSidebar course={course} />
      <div className=" ml-auto items-center flex  ">
        <ThemeToggleButton />
        <ProfileButton />
      </div>
    </div>
  );
};

export default CourseHeader;
