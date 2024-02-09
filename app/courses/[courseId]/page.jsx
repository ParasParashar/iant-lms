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
        this isa agodo
        bgklsdjflksjdflsjdfl;jsadl;fjasl;jfl;sdjflsjdl;fjsdl;fjl;sdjfl;jasdl;fjl;sdfjl;sdjfl;sjdfl;jsdlfjsl;dfjl;sdjfl;sajdfl;jsadl;fjl;sadjfl;sjdfl;sjdfljsdl;fjsl;djfjsldjfs
        {result?.map((item) => (
          <div>{item.title}</div>
        ))}
      </article>
    </div>
  );
};

export default page;
