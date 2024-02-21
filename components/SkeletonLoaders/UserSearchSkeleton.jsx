"use client";
import { Skeleton } from "../ui/skeleton";

const UserSearchSkeleton = () => {
  return (
    <div className="flex  px-2  p-1 w-full gap-2 items-center ">
      <Skeleton className=" rounded-full p-5" />
      <div className="flex flex-col w-full  gap-2">
        <Skeleton className="w-1/3 h-3 rounded-md p-1" />
        <Skeleton className="w-1/2 h-2" />
      </div>
    </div>
  );
};

export default UserSearchSkeleton;
