import { Skeleton } from "../ui/skeleton";

export function HomePageSkeletonForUser() {
  return (
    <div className="flex  w-full  justify-between h-[60%]">
      {/* user profile */}
      <div className="w-[30%] gap-3 flex flex-col  items-center justify-center  h-full">
        <Skeleton className=" w-20 h-20 rounded-full" />
        <Skeleton className=" w-32 h-6 rounded-full" />
        <Skeleton className=" w-52 h-3 rounded-full" />
        <Skeleton className=" mt-20 h-5 w-32 rounded-lg p-2" />
      </div>
      {/* right side */}
      <div className="w-full h-full">
        {/* slogan */}
        <Skeleton className=" w-[60%] h-[20%] rounded-full p-4" />
        {/* graph */}
        <div>
          <Skeleton className=" h-full w-full rounded-full p-4" />
        </div>
      </div>
    </div>
  );
}
