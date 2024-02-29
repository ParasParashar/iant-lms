"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import React from "react";

const AllCategoryBarItem = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");
  const isSelected = currentCategory == null;

  const handleOnClick = () => {
    router.push("/courses");
  };

  return (
    <Button
      onClick={handleOnClick}
      size="sm"
      variant="outline"
      className={cn(
        "rounded-full text-sm  hover:out  bg-secondary text-muted-foreground hover:border-blue-400 border-collapse",
        isSelected &&
          " border-blue-600 hover:border-blue-600 text-black dark:text-white"
      )}
    >
      All
    </Button>
  );
};

export default AllCategoryBarItem;
