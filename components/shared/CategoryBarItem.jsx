"use client";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

const CategoryBarItem = ({ item, isActive }) => {
  return (
    <Button
      variant="category"
      size="sm"
      key="item"
      className={cn(
        "rounded-full text-sm ",
        isActive && " border-blue-600 text-black"
      )}
    >
      {item}
    </Button>
  );
};

export default CategoryBarItem;
