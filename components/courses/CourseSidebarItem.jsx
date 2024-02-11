"use client";

import { CheckCircle, Lock, PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

export const CourseSidebarItem = ({ label, id, isCompleted, courseId }) => {
  const pathname = usePathname();
  const router = useRouter();

  const Icon = isCompleted ? CheckCircle : PlayCircle;
  const isActive = pathname?.includes(id);

  const onClick = () => {
    router.push(`/courses/${courseId}/chapters/${id}`);
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center group gap-x-2 text-gray-500 dark:text-gray-300 text-sm font-[500] pl-6 transition-all hover:text-slate-800 hover:bg-slate-300 dark:hover:bg-secondary duration-200",
        isActive &&
          "text-slate-900 bg-sky-800/20 hover:bg-sky-800/20 hover:text-slate-700 "
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={22}
          className={cn(
            "text-slate-500 group-hover:text-slate-700 dark:group-hover:text-white ",
            isActive && "text-slate-white dark:text-white "
          )}
        />
        {label}
      </div>
      <div
        className={cn(
          "ml-auto opacity-0 border-2 border-slate-700 h-full transition-all",
          isActive && "opacity-100"
        )}
      />
    </button>
  );
};
