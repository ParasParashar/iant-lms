"use client";

import { Skeleton } from "../ui/skeleton";

export default function EditorSkeleton() {
  return (
    <div>
      <Skeleton className="h-10 p-2 w-full mb-1" />
      <Skeleton className="aspect-video" />
    </div>
  );
}
