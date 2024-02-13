import {
  courseCompletionData,
  userChapterCompletion,
  userEnrolledInCourse,
} from "@/actions/user.actions";
import { CourseSidebarItem } from "./CourseSidebarItem";
import UserProgress from "../shared/UserProgress";

const CourseSidebar = async ({ course }) => {
  const userEnrolled = await userEnrolledInCourse(course._id);
  const userCompleteChapter = await userChapterCompletion(course._id);
  const { completionPercentage } = await courseCompletionData(course._id);
  return (
    <aside className="h-full  flex flex-col overflow-y-auto  shadow-gray-800/40  bg-sky-100  dark:bg-slate-950 ">
      <div className=" p-5  flex flex-col  justify-start gap-y-5  ">
        <p className="font-semibold font-serif text-lg">{course.title}</p>
        {userEnrolled && <UserProgress value={completionPercentage} />}
      </div>
      <div className="flex flex-col w-full">
        {course?.chapters?.map((chapter) => {
          const isCompleted = userCompleteChapter?.includes(chapter._id);
          return (
            <CourseSidebarItem
              key={chapter._id}
              id={chapter._id}
              label={chapter.title}
              courseId={course._id}
              isLock={userEnrolled}
              isCompleted={isCompleted}
            />
          );
        })}
      </div>
    </aside>
  );
};

export default CourseSidebar;
