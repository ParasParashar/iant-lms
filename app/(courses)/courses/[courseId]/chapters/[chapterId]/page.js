import { getSpecificChapter } from "@/actions/course.actions";
import { getUserCourseNote } from "@/actions/note.actions";
import {
  checkingChapterProgress,
  userEnrolledInCourse,
} from "@/actions/user.actions";
import EditorSkeleton from "@/components/SkeletonLoaders/EditorSkeleton";
import ChapterContent from "@/components/courses/ChapterContent";
import CreateNotes from "@/components/courses/CreateNotes";
import { NoteEditor } from "@/components/notes/NoteEditor";
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
  // getting notes of course
  const courseNote = await getUserCourseNote({ courseId: params.courseId });

  return (
    <main className="p-4 flex flex-col lg:flex-row  gap-5">
      <section className="w-full lg:w-3/5">
        <ChapterContent
          chapterDetails={JSON.parse(JSON.stringify(chapterDetails))}
          courseId={params.courseId}
          isCompleted={isChapterCompleted}
        />
      </section>
      <section className="w-full lg:w-2/5 ">
        <CreateNotes
          courseId={params.courseId}
          chapterId={params.chapterId}
          data={JSON.parse(JSON.stringify(courseNote))}
        />
      </section>
    </main>
  );
};

export default page;
