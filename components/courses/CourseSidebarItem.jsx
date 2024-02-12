"use client";

import { IoIosCheckmarkCircle } from "react-icons/io";
import { Lock, PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

export const CourseSidebarItem = ({
  label,
  id,
  isCompleted,
  courseId,
  isLock,
}) => {
  const pathname = usePathname();
  const router = useRouter();

  const Icon = !isLock ? Lock : isCompleted ? IoIosCheckmarkCircle : PlayCircle;
  const isActive = pathname?.includes(id);

  const onClick = () => {
    if (!isLock) return;
    router.push(`/courses/${courseId}/chapters/${id}`);
  };

  return (
    <button
      disabled={!isLock}
      onClick={onClick}
      type="button"
      className={cn(
        "flex relative items-center gap-x-2 text-sm font-semibold pl-6 py-4 hover:bg-secondary",
        isActive
          ? " dark:text-secondary-foreground bg-sky-800/20 rounded-r-lg"
          : "text-gray-500 dark:text-gray-300",
        !isLock && "text-red-500 dark:text-red-500/80 cursor-not-allowed",
        isCompleted && "text-blue-500 dark:text-blue-300"
      )}
    >
      <Icon
        size={22}
        className={cn(
          "text-slate-500 dark:text-gray-100",
          isActive && "text-slate-white",
          !isLock && "text-red-500 dark:text-rose-500",
          isCompleted && "text-blue-500 dark:text-blue-300"
        )}
      />
      {label}
      <div
        className={cn(
          "ml-auto absolute right-0 p-1 top-0  opacity-0 border-r-[5px] rounded-lg border-slate-700 h-full transition-all",
          isActive && "opacity-100"
        )}
      />
    </button>
  );
};
