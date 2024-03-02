import { Skeleton } from "../ui/skeleton";
import CourseCardSkeleton from "./CourseCardSkeleton";

const CoursePageSkeletons = () => {
  const arr = Array.from({ length: 6 }, (_, index) => index + 1);
  return (
    <div className="h-full w-full flex flex-col overflow-hidden ">
      <header className="flex items-center gap-2 mb-2 p-2">
        <Skeleton className="h-8 w-10 rounded-full" />
        <Skeleton className="h-8 w-20 rounded-full" />
        <Skeleton className="h-8 w-28 rounded-full" />
        <Skeleton className="h-8 w-24 rounded-full" />
      </header>

      <div className=" grid max-sm:grid-cols-1 grid-cols-2 gap-2 md:grid-cols-3">
        {arr.map((it) => (
          <div key={it} className="h-full w-full">
            <CourseCardSkeleton />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursePageSkeletons;
