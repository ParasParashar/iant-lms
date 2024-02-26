import { Skeleton } from "../ui/skeleton";
import CourseCardSkeleton from "./CourseCardSkeleton";

export default function HomePageSkeleton() {
  const arr = Array.from({ length: 4 }, (_, index) => index + 1);
  return (
    <div className="flex gap-2">
      {arr.map((item) => (
        <div className=" w-[250px] h-full">
          <CourseCardSkeleton key={item} />
        </div>
      ))}
    </div>
  );
}
// ////////////////////////////////////////////////////
