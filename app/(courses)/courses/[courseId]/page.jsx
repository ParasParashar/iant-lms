"use client";

import { getParticularCourse } from "@/actions/courses";
import { courses } from "@/lib/Courses";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const page = () => {
  const pathName = useParams();
  const [result, setResult] = useState([]);
  useEffect(() => {
    const result = getParticularCourse(pathName.courseId);
    setResult(result);
  }, [pathName.courseId]);
  return (
    <div className=" bg-zinc-100 w-full h-full dark:bg-[#121832c8]">
      {pathName.courseId}
      <article>
        this isa agodo
        {result?.map((item) => (
          <div>{item.title}</div>
        ))}
      </article>
    </div>
  );
};

export default page;
