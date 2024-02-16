"use client";

import { Skeleton } from "../ui/skeleton";

const CourseCardSkeleton = () => {
  return (
    <div className="p-2 flex flex-col gap-2">
      <Skeleton className=" aspect-square" />
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-8 w-full rounded-lg p-2" />
    </div>
  );
};

export default CourseCardSkeleton;
