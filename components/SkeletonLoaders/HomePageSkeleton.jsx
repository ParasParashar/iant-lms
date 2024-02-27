import { Skeleton } from "../ui/skeleton";
import CourseCardSkeleton from "./CourseCardSkeleton";

export default function HomePageSkeleton() {
  const arr = Array.from({ length: 4 }, (_, index) => index + 1);
  return (
    <div className="flex flex-col justify-between gap-2 w-full min-h-full py-3 max-sm:py-1">
      {/* user details and charts */}
      <main className="flex  gap-1 flex-col w-full justify-between md:h-[60%] md:flex-row">
        {/* user profile */}
        <section className="w-full flex-1 md:w-[30%] gap-3 flex flex-col p-6 md:p-8 h-full border dark:border-white/10 rounded-lg">
          <Skeleton className=" mx-auto w-40 h-8 rounded-full" />
          <div className="flex md:flex-col gap-8 md:gap-2 items-center">
            <Skeleton className=" w-20 h-20 md:w-24 md:h-24 rounded-full mb-2" />
            <div className="flex flex-col gap-4 md:gap-20 md:items-center">
              <div className="flex flex-col md:items-center">
                <Skeleton className=" w-24 h-6 mb-3 rounded-full " />
                <Skeleton className=" w-52 h-4 rounded-full" />
              </div>
              <Skeleton className="h-8 w-36 rounded-full p-2" />
            </div>
          </div>
        </section>
        {/* right side */}
        <section className="w-full h-full flex flex-col gap-2 p-2">
          {/* slogan */}
          <Skeleton className=" h-16 rounded-full p-4" />
          {/* graph */}
          <div className="p-3 h-full border dark:border-white/10 rounded-lg">
            <Skeleton className="w-44 h-6 rounded-full p-4 mb-2" />
            <Skeleton className="w-full   h-72 rounded-md p-4" />
          </div>
        </section>
      </main>
      {/* courses */}
      <div className="flex gap-2">
        {arr.map((item) => (
          <div key={item} className=" w-[250px] h-full ">
            <CourseCardSkeleton />
          </div>
        ))}
      </div>
    </div>
  );
}
// ////////////////////////////////////////////////////
