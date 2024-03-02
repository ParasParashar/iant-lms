import { Skeleton } from "../ui/skeleton";

export default function PersonalMessageSkeleton() {
  return (
    <div className="flex h-full w-full gap-1 flex-col justify-between">
      <header className=" flex justify-between border border-slate-300 dark:border-slate-600 p-2 rounded-lg">
        <div className="flex items-center gap-1">
          <Skeleton className="w-8 h-8 rounded-full md:hidden" />
          <Skeleton className="w-10 h-10 rounded-full" />
          <div className="flex flex-col gap-2">
            <Skeleton className="w-20 h-5 rounded-lg" />
            <Skeleton className="w-28 h-3 rounded-lg" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="w-16 h-5 rounded-lg" />
          <Skeleton className="w-7 h-7 rounded-full" />
        </div>
      </header>
      <main className="flex h-full w-full border border-slate-300 dark:border-slate-600 rounded-lg "></main>
      <footer className=" h-12 w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg flex items-center justify-between gap-2">
        <Skeleton className="w-[80%] h-8 rounded-lg md:w-[90%] " />
        <Skeleton className="h-7 w-12" />
      </footer>
    </div>
  );
}
