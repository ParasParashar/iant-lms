import { getParticularCourse } from "@/actions/courses";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const page = ({ params }) => {
  const result = getParticularCourse(params.courseId);
  return (
    <div className=" p-5 w-full flex  justify-center">
      <article className="flex flex-col gap-2 md:gap-5 fixed  p-6   rounded-lg  bg-sky-100/70 dark:bg-secondary shadow-lg">
        <h1 className="text-center font-extrabold text-xl text-muted-foreground">
          Course Overview
        </h1>
        <div className="relative w-60 h-60 md:w-60 md:h-60">
          <Image
            alt="Course Image"
            src={result.img_Url}
            fill
            objectFit="cover"
            className="rounded-md shadow-lg"
          />
        </div>
        <div className="flex items-center gap-x-4">
          <span className="text-xl max-sm:text-[12px] font-semibold text-gray-600 dark:text-gray-300">
            Course Name:
          </span>
          <p className="md:text-3xl text-2xl max-sm:text-[14px] font-bold font-serif text-gray-800 dark:text-gray-200">
            {result.title}
          </p>
        </div>
        <div className="flex items-center gap-x-4">
          <span className="text-xl max-sm:text-[12px]  font-semibold text-gray-600 dark:text-gray-300">
            Category:
          </span>
          <p className="md:text-3xl text-2xl max-sm:text-[14px] font-bold font-serif text-gray-800 dark:text-gray-200">
            {result.categery}
          </p>
        </div>
        <div className="flex items-center gap-x-4">
          <span className="text-xl max-sm:text-[12px]  font-semibold text-gray-600 dark:text-gray-300">
            Number of Chapters:
          </span>
          <p className="md:text-3xl text-2xl max-sm:text-[14px] font-bold font-serif text-gray-800 dark:text-gray-200">
            {result?.chapters?.length || "Chapters will publish soon"}
          </p>
        </div>
        <div className="flex items-center flex-col">
          <p className="text-sm md:text-lg text-muted-foreground">
            Get full time AI support to help you to complete the chapter and
            discussion feature to get your query solve.
          </p>
        </div>
        <Button variant="myAccessBtn" className="text-lg ">
          Access
        </Button>

        {/* <span className="text-[12px] md:text-lg text-muted-foreground dark:text-gray-500 font-light">
          Click the button to access the course.
        </span> */}
      </article>
    </div>
  );
};

export default page;
