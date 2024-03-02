"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import React from "react";
import CategoryBarItem from "@/components/shared/CategoryBarItem";

const AllCategoryBarItem = ({ category }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");
  const isSelected = currentCategory == null;

  const handleOnClick = () => {
    router.push("/courses");
  };

  return (
    <div className="flex gap-2 mt-4">
      <Button
        onClick={handleOnClick}
        variant="outline"
        className={cn(
          "rounded-full text-sm  hover:out  bg-secondary text-muted-foreground hover:border-blue-400 border-collapse",
          isSelected &&
            " border-blue-600 hover:border-blue-600 text-black dark:text-white"
        )}
      >
        All
      </Button>
      <section className="flex gap-2 overflow-x-auto w-full flex-nowrap scroll-smooth custom-scrollbar  items-center ">
        {category.map((item) => (
          <CategoryBarItem key={item._id} item={item} />
        ))}
      </section>
    </div>
  );
};

export default AllCategoryBarItem;
