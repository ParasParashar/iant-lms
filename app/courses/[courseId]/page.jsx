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
    <div>
      {pathName.courseId}
      <article>
        {result?.map((item) => (
          <div>{item.title}</div>
        ))}
      </article>
    </div>
  );
};

export default page;
