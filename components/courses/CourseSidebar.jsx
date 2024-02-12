import {
  courseCompletionData,
  userChapterCompletion,
  userEnrolledInCourse,
} from "@/actions/user.actions";
import { CourseSidebarItem } from "./CourseSidebarItem";
import UserProgress from "../shared/UserProgress";

const CourseSidebar = async ({ course }) => {
  const userEnrolled = await userEnrolledInCourse(course.id);
  const userCompleteChapter = await userChapterCompletion(course.id);
  const { completionPercentage } = await courseCompletionData(course.id);

  console.log(userCompleteChapter);
  return (
    <aside className="h-full  flex flex-col overflow-y-auto  shadow-gray-800/40  bg-sky-100  dark:bg-slate-950 ">
      <div className=" p-5  flex flex-col  justify-start gap-y-5  ">
        <p className="font-semibold font-serif text-lg">{course.title}</p>
        <UserProgress value={completionPercentage} />
      </div>
      <div className="flex flex-col w-full">
        {course?.chapters?.map((chapter) => {
          const isCompleted = userCompleteChapter?.includes(chapter.id);

          return (
            <CourseSidebarItem
              key={chapter.id}
              id={chapter.id}
              label={chapter.title}
              courseId={course.id}
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
