import { getSpecificChapter } from "@/actions/course.actions";
import {
  checkingChapterProgress,
  userEnrolledInCourse,
} from "@/actions/user.actions";
import ChapterContent from "@/components/courses/ChapterContent";
import { redirect } from "next/navigation";

const page = async ({ params }) => {
  // checking user enrolled or not
  const isUserEnrolled = await userEnrolledInCourse(params.courseId);
  if (!isUserEnrolled) redirect("/courses");

  // get specifc chapter
  const chapterDetails = await getSpecificChapter({
    chapterId: params.chapterId,
    courseId: params.courseId,
  });

  //  checking chapter is completer or not
  const isChapterCompleted = await checkingChapterProgress({
    chapterId: params.chapterId,
    courseId: params.courseId,
  });

  return (
    <main className="p-4">
      <ChapterContent
        chapterDetails={JSON.parse(JSON.stringify(chapterDetails))}
        courseId={params.courseId}
        isCompleted={isChapterCompleted}
      />
    </main>
  );
};

export default page;
