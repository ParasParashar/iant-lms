import { Skeleton } from "../ui/skeleton";

export default function GroupPageSkeleton() {
  return (
    <div className="flex  h-full w-full  gap-4 flex-col justify-between">
      <Skeleton className="h-20  p-2 w-full rounded-lg" />
      <Skeleton className="h-full  p-2 w-full  rounded-lg" />
      <Skeleton className="h-20  p-2 w-full rounded-lg" />
    </div>
  );
}
