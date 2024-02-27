import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
  return (
    <div className=" flex items-center h-full w-full">
      {/* sidebar */}
      <aside className=" hidden flex-col lg:flex w-72 h-full items-center border-r ">
        <div className=" p-5  flex flex-col w-full  justify-start gap-y-5  ">
          <Skeleton className="p-4 w-3/4 h-8" />
        </div>
        <div className="flex  mt-20 flex-col gap-3"></div>
        <Skeleton className="p-4 my-1 w-3/4 h-8" />
        <Skeleton className="p-4 my-1 w-3/4 h-8" />
        <Skeleton className="p-4  my-1 w-3/4 h-8" />
        <Skeleton className="p-4  my-1 w-3/4 h-8" />
      </aside>
      <div className=" flex flex-col h-full w-full ">
        {/* navbar */}
        <header className="h-16 w-full border-b  p-4 flex justify-between">
          <Skeleton className="h-full p-2  rounded-r-full w-1/4" />
          <div className="flex items-center justify-between  gap-3">
            <Skeleton className="h-10   rounded-full w-10" />
            <Skeleton className="h-10   rounded-full w-10" />
          </div>
        </header>
        {/* main box */}
        <div className="p-5 lg:p-40 flex items-center justify-center h-full w-full">
          <div className="flex flex-col gap-2 h-full w-full">
            <Skeleton className="aspect-square " />
            {/* <Skeleton className='' /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
