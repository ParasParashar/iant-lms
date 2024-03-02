import { Skeleton } from "../ui/skeleton";
import PersonalMessageSkeleton from "./PersonalMessageSkeleton";

export default function GroupPageSkeleton() {
  return (
    <div className="flex  h-full w-full  gap-4 justify-between ">
      <PersonalMessageSkeleton />

      <section className="relative hidden xl:flex flex-col gap-2 h-[92%] w-[23rem] border rounded-lg border-slate-300 dark:border-slate-600">
        <header className="flex p-2 gap-2 items-center border-b border-slate-300 dark:border-slate-600 rounded-lg">
          <Skeleton className="w-10 h-10 rounded-full" />
          <Skeleton className="w-32 h-8 rounded-lg" />
          <Skeleton className="w-8 h-8 rounded-full" />
        </header>
        <main className="flex flex-col gap-2 px-2">
          <Skeleton className="w-20 h-5 rounded-lg" />
          <div className="flex justify-between items-center">
            <Skeleton className="w-40 h-8 rounded-lg" />
            <Skeleton className="w-8 h-8 rounded-full" />
          </div>
          <Skeleton className="w-32 h-5 rounded-full" />
          <Skeleton className="w-full h-12 rounded-lg" />
          <Skeleton className="w-full h-12 rounded-lg" />
          <Skeleton className="w-full h-12 rounded-lg" />
        </main>
        <footer className="absolute bottom-0 flex flex-col gap-1 p-2 w-full border-t border-slate-300 dark:border-slate-600">
          <Skeleton className="w-20 h-5 rounded-full" />
          <Skeleton className="w-full h-10 rounded-lg" />
          <Skeleton className="w-full h-10 rounded-lg" />
          <Skeleton className="w-full h-10 rounded-lg" />
        </footer>
      </section>
    </div>
  );
}
