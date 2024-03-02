import AiChatBotButton from "../shared/AiChatBotButton";
import BreadCrumbs from "../shared/BreadCrumbs";
import ProfileButton from "../shared/ProfileButton";
import { ThemeToggleButton } from "../shared/ThemeToggleButton";
import { CourseMobileSidebar } from "./MobileCourseSidebar";

const CourseHeader = ({ course }) => {
  return (
    <div className="p-4  shadow-gray-800/40 h-full w-full flex items-center shadow-sm bg-sky-100  dark:bg-slate-950 ">
      <CourseMobileSidebar course={course} />
      <BreadCrumbs />
      <div className=" ml-auto gap-x-3 items-center flex  ">
        <AiChatBotButton />
        <ThemeToggleButton />
        <ProfileButton />
      </div>
    </div>
  );
};

export default CourseHeader;
