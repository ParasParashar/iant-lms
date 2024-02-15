import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn(
        "animate-pulse ease-in-out  rounded-md bg-gray-300/90 dark:bg-muted   ",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
