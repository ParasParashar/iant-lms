import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className=" flex flex-col lg:flex-row p-4 w-full h-full    gap-5">
      <div className=" w-full h-full lg:w-3/5   flex flex-col gap-2">
        <Skeleton className="w-full h-8 mb-2" />
        <Skeleton className="aspect-video" />
        <div className="flex items-center justify-between mt-1 gap-3">
          <Skeleton className="w-full h-8" />
          <Skeleton className="w-full h-8" />
        </div>
      </div>
      <div className="w-full h-full lg:w-2/5">
        <div className="flex justify-between mb-2 items-center">
          <Skeleton className="w-1/3 h-8 " />
          <Skeleton className="w-1/4 h-8 " />
        </div>
        <Skeleton className="w-full h-20" />
      </div>
    </div>
  );
}
