import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
  return (
    <div className=" flex items-center h-full w-full">
      {/* sidebar */}
      <aside className=" hidden flex-col md:flex w-72 h-full items-center border-r ">
        <div className=" p-5  flex flex-col w-full  justify-start gap-y-5  ">
          <Skeleton className="p-4 w-3/4 h-8" />
          <Skeleton className=" w-52 h-4 rounded-full" />
        </div>
        <div className="flex w-full p-5 flex-col gap-3">
          <Skeleton className="w-3/4 h-8" />
          <Skeleton className="w-3/4 h-8" />
          <Skeleton className="w-3/4 h-8" />
          <Skeleton className="w-3/4 h-8" />
          <Skeleton className="w-3/4 h-8" />
        </div>
      </aside>
      <main className=" flex flex-col h-full w-full ">
        {/* navbar */}
        <header className="h-16 w-full border-b  p-4 flex justify-between">
          <div className="flex items-center justify-between gap-3 ">
            <Skeleton className="h-10 rounded-full w-10 md:hidden" />
            <Skeleton className="h-full p-2  rounded-r-full w-44 max-[400px]:w-28" />
          </div>
          <div className="flex items-center justify-between  gap-x-3">
            <Skeleton className="h-10 rounded-full w-10" />
            <Skeleton className="h-10 rounded-full w-10" />
            <Skeleton className="h-10 rounded-full w-10" />
          </div>
        </header>
        {/* main box */}
        <section className="flex justify-center px-5 py-3 h-full w-full">
          <div className="flex flex-col items-center gap-3 md:gap-5 xl:w-[700px] lg:py-4 px-6 py-2 w-[80%] max-[400px]:w-[90%] h-full border rounded-lg">
            <div className="flex flex-col items-center gap-2">
              <Skeleton className=" w-36 h-8" />
              <Skeleton className="w-60 h-60 " />
            </div>
            <div className="flex flex-col items-start gap-4 w-full">
              <Skeleton className="h-8 rounded-lg w-20 md:w-[20%]" />
              <Skeleton className="h-8 rounded-lg w-36 md:w-[35%]" />
              <Skeleton className="h-8 rounded-lg w-20 md:w-[20%]" />
              <Skeleton className="h-12 mt-8 w-full rounded-lg" />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
