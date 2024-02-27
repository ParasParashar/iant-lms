import { Skeleton } from "../ui/skeleton";

export function HomePageSkeletonForUser() {
  return (
    <main className="flex flex-col w-full justify-between md:h-[60%] md:flex-row">
      {/* user profile */}
      <section className="w-full md:w-[30%] gap-3 flex flex-col p-4 md:p-6 h-full">
        <Skeleton className=" w-40 h-8 rounded-full" />
        <div className="flex md:flex-col gap-8 md:gap-2 items-center">
          <Skeleton className=" w-20 h-20 md:w-24 md:h-24 rounded-full mb-2" />
          <div className="flex flex-col gap-4 md:gap-20 md:items-center">
            <div className="flex flex-col md:items-center">
              <Skeleton className=" w-24 h-6 mb-3 rounded-full " />
              <Skeleton className=" w-48 h-3 rounded-full" />
            </div>
            <Skeleton className="h-6 w-32 rounded-full p-2" />
          </div>
        </div>
      </section>
      {/* right side */}
      <section className="w-full h-full flex flex-col gap-2 p-2">
        {/* slogan */}
        <Skeleton className=" h-16 rounded-full p-4" />
        {/* graph */}
        <div className="p-3">
          <Skeleton className="w-44 h-6 rounded-full p-4 mb-2" />
          <Skeleton className="w-full h-48 rounded-md p-4" />
        </div>
      </section>
    </main>
  );
}
