"use client";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import qs from "query-string";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";

const CategoryBarItem = ({ item }) => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");
  const isSelected = currentCategory === item;
  const handleClick = () => {
    const url = qs.stringifyUrl({
      url: pathName,
      query: {
        category: isSelected ? null : item,
      },
    });
    router.push(url);
  };

  // Debounce the handleClick function
  const debouncedHandleClick = useDebounce(handleClick, 200);

  return (
    <Button
      onClick={debouncedHandleClick}
      size="sm"
      variant="outline"
      className={cn(
        "rounded-full text-sm  hover:out  bg-secondary text-muted-foreground hover:border-blue-400 border-collapse",
        isSelected &&
          " border-blue-600 hover:border-blue-600 text-black dark:text-white "
      )}
    >
      {item}
    </Button>
  );
};

export default CategoryBarItem;
