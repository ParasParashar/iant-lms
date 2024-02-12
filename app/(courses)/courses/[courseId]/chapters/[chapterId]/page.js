import { getSpecificChapter } from "@/actions/courses";
import {
  checkingChapterProgress,
  userEnrolledInCourse,
} from "@/actions/user.actions";
import ChapterContent from "@/components/courses/ChapterContent";
import { redirect } from "next/navigation";

const page = async ({ params }) => {
  const chapterDetails = getSpecificChapter({
    chapterId: params.chapterId,
    courseId: params.courseId,
  });
  //  checking chapter is completer or not
  const isChapterCompleted = await checkingChapterProgress({
    chapterId: +params.chapterId, //using + to convert to number
    courseId: +params.courseId,
  });
  const isUserEnrolled = await userEnrolledInCourse(+params.courseId);
  if (!isUserEnrolled) redirect("/courses");
  return (
    <main className="p-4">
      <ChapterContent
        chapterDetails={chapterDetails}
        courseId={params.courseId}
        isCompleted={isChapterCompleted}
      />
    </main>
  );
};

export default page;
