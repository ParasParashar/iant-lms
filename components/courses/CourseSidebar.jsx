import { CourseSidebarItem } from "./CourseSidebarItem";

const CourseSidebar = ({ course }) => {
  return (
    <aside className="h-full  flex flex-col overflow-y-auto  shadow-gray-800/40  bg-sky-100  dark:bg-slate-950 ">
      <div className="p-7 flex flex-col ">
        <h1 className="font-semibold">{course.title}</h1>
      </div>
      <div className="flex flex-col w-full">
        {course?.chapters?.map((chapter) => (
          <CourseSidebarItem
            key={chapter.id}
            id={chapter.id}
            label={chapter.title}
            courseId={course.id}
          />
        ))}
      </div>
    </aside>
  );
};

export default CourseSidebar;