import { getSpecificChapter } from "@/actions/courses";
import ChapterContent from "@/components/courses/ChapterContent";

const page = ({ params }) => {
  const chapterDetails = getSpecificChapter({
    chapterId: params.chapterId,
    courseId: params.courseId,
  });
  return (
    <main className="p-4">
      <ChapterContent chapterDetails={chapterDetails} />
    </main>
  );
};

export default page;
