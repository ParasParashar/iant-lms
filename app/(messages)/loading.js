import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col p-40  items-center justify-center h-full w-full">
      <Skeleton className=" mx-auto  h-[200px] w-[200px] lg:w-[500px] lg:h-[300px] rounded-lg" />
      <Skeleton className="h-8 w-1/2 mx-auto my-2" />
      <Skeleton className="h-12 w-1/4 mx-auto my-2" />
    </div>
  );
}
