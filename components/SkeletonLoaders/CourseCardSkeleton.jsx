import { Skeleton } from "../ui/skeleton";

const CourseCardSkeleton = () => {
  return (
    <div className="p-2 flex flex-col rounded-lg gap-2 border dark:border-white/10">
      <div className="w-full h-full p-4">
        <Skeleton className=" aspect-square" />
      </div>
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-8 w-full rounded-lg p-2" />
    </div>
  );
};

export default CourseCardSkeleton;
