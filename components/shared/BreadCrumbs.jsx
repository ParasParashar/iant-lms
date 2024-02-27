"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export default function BreadCrumbs() {
  const pathName = usePathname();
  const params = useParams();
  //   getting the array of pathName and params
  const pathNameArr = pathName.split("/").filter((item) => item);
  const paramArr = Object.values(params);

  //   getting the only pathName name not params from arr
  let result = [];
  for (const item of pathNameArr) {
    if (paramArr.includes(item)) {
      continue;
    } else {
      result.push(item);
    }
  }
  //  adding breadcrubPath
  let breadcrubPath = "";
  return (
    <nav className="flex transition-all duration-200 items-center gap-x-1 text-sm border-2 dark:border-gray-600 bg-secondary font-light  rounded-r-full rounded-l-lg">
      <Link
        className=" text-muted-foreground hover:text-black dark:hover:text-muted-foreground
        hover:bg-sky-300/50 dark:hover:bg-[#020617a0]  px-2 py-[6px] rounded-r-full"
        href={"/home"}
      >
        Home
      </Link>
      {result?.map((item, index) => {
        breadcrubPath += `/${item}`;
        const isLastPath = index === result.length - 1;
        return (
          <div key={item}>
            {isLastPath ? (
              <span className="p-2  font-[350] text-blue-500">
                {item.toUpperCase().slice(0, 1) + item.slice(1).toLowerCase()}
              </span>
            ) : (
              <Link
                className="p-2  hover:text-black  hover:bg-sky-300/50 dark:hover:bg-[#020617a0]
                dark:hover:text-muted-foreground rounded-r-full  text-muted-foreground"
                href={breadcrubPath}
              >
                {item.toUpperCase().slice(0, 1) + item.slice(1).toLowerCase()}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
