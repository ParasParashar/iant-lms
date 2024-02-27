import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { getSpecificChapter } from "@/actions/course.actions";
import { getUserCourseNote } from "@/actions/note.actions";
import {
  checkingChapterProgress,
  userEnrolledInCourse,
} from "@/actions/user.actions";
import ChapterContent from "@/components/courses/ChapterContent";
import CreateNotes from "@/components/courses/CreateNotes";
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
    <>
      {/* this is for the desktop */}
      <div className="hidden lg:flex">
        <ResizablePanelGroup
          direction="horizontal"
          className="p-4  lg:flex hidden  gap-5"
        >
          <ResizablePanel defaultSize={65} className="w-full lg:w-3/5">
            <ChapterContent
              chapterDetails={JSON.parse(JSON.stringify(chapterDetails))}
              courseId={params.courseId}
              isCompleted={isChapterCompleted}
            />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={35} className="w-full lg:w-2/5 ">
            <CreateNotes
              courseId={params.courseId}
              chapterId={params.chapterId}
              data={JSON.parse(JSON.stringify(courseNote))}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      {/* this is for the mobile  */}
      <main className="p-4 lg:hidden flex flex-col w-full gap-5">
        <section className="w-full lg:w-3/5">
          <ChapterContent
            chapterDetails={JSON.parse(JSON.stringify(chapterDetails))}
            courseId={params.courseId}
            isCompleted={isChapterCompleted}
          />
        </section>
        <section className="w-full  border-teal-800 border-t-[4px] lg:w-2/5 ">
          <CreateNotes
            courseId={params.courseId}
            chapterId={params.chapterId}
            data={JSON.parse(JSON.stringify(courseNote))}
          />
        </section>
      </main>
    </>
  );
};

export default page;
