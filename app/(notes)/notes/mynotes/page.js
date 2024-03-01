import { getAllUserNotes } from "@/actions/note.actions";
import Notescard from "@/components/notes/Notescard";
import NotFoundPage from "@/components/notes/NotFoundPage";
import NotesCardSkeleton from "@/components/SkeletonLoaders/NotesCardSkeleton";
import { Suspense } from "react";

const page = async ({ searchParams }) => {
  const notes = await getAllUserNotes({ search: searchParams?.note });
  if (notes?.length < 1) {
    return <NotFoundPage message={"You Can Create Some Future Assets.📘"} />;
  }
  return (
    <main className="grid custom-scrollbar grid-cols-1 sm:grid-cols-2 md:grid-cols-3 pb-4 lg:grid-cols-4 min-h-screen  gap-2 px-2  rounded-lg ">
      {notes?.map((item) => (
        <Suspense key={item._id} fallback={<NotesCardSkeleton />}>
          <Notescard
            key={item._id}
            title={item.title}
            content={item.content}
            noteId={JSON.parse(JSON.stringify(item._id))}
            isPublished={item.isPublished}
            time={item.timestamp}
            isUserNote
          />
        </Suspense>
      ))}
    </main>
  );
};

export default page;
