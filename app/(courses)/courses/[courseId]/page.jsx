import { getParticularCourse } from "@/actions/course.actions";
import {
  courseCompletionData,
  enrollCourse,
  userEnrolledInCourse,
} from "@/actions/user.actions";
import ContinueLearningButton from "@/components/courses/ContinueLearningButton";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const page = async ({ params }) => {
  const result = await getParticularCourse(params.courseId);

  async function handleCourseAccess() {
    "use server";
    await enrollCourse({ courseId: params.courseId });
  }
  const isUserEnrolled = await userEnrolledInCourse(params.courseId);
  const {
    notCompletedChapters,
    completionPercentage,
    totalChapter,
    completedChapters,
  } = await courseCompletionData(params.courseId);
  // handle the fallback ui
  if (!result) {
    return (
      <main className="p-30 text-center text-xl text-muted-foreground">
        Course Not Found
      </main>
    );
  }

  return (
    <form
      action={handleCourseAccess}
      className=" px-5 py-3 w-full  flex  justify-center"
    >
      <article className="flex flex-col gap-2 md:gap-5 xl:w-[700px] fixed lg:py-4  px-6 py-2  rounded-lg  bg-sky-100/70 dark:bg-[#020617] shadow-lg">
        <h1 className="text-center font-extrabold text-xl text-muted-foreground">
          Course Overview
        </h1>
        <div className="relative mx-auto  w-60 h-60 md:w-60 md:h-60">
          <Image
            alt="Course Image"
            src={result?.img_Url}
            fill
            className="rounded-md object-fill shadow-lg"
          />
        </div>
        <div className="flex items-center gap-x-4">
          <span className="text-xl max-sm:text-[12px] font-semibold text-gray-600 dark:text-gray-300">
            Course Name:
          </span>
          <p className="md:text-3xl text-2xl max-sm:text-[14px] font-bold font-serif text-gray-800 dark:text-gray-200">
            {result?.title}
          </p>
        </div>
        <div className="flex items-center gap-x-4">
          <span className="text-xl max-sm:text-[12px]  font-semibold text-gray-600 dark:text-gray-300">
            Category:
          </span>
          <p className="md:text-3xl text-2xl max-sm:text-[14px] font-bold font-serif text-gray-800 dark:text-gray-200">
            {result?.category}
          </p>
        </div>

        {!isUserEnrolled ? (
          <>
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
          </>
        ) : (
          <div className="flex items-center gap-x-4">
            <span className="text-xl max-sm:text-[12px]  font-semibold text-gray-600 dark:text-gray-300">
              Number of Completed:
            </span>
            <p className="md:text-3xl text-2xl max-sm:text-[14px] font-bold font-serif text-gray-800 dark:text-gray-200">
              <span className="text-blue-500">{completedChapters}</span>/
              {totalChapter}
            </p>
          </div>
        )}
        {isUserEnrolled ? (
          <ContinueLearningButton
            courseId={params.courseId}
            completionPercentage={completionPercentage}
            chapters={JSON.parse(JSON.stringify(notCompletedChapters))}
          />
        ) : (
          <Button type="submit" variant="myAccessBtn" className="text-lg ">
            Access
          </Button>
        )}
      </article>
    </form>
  );
};

export default page;
