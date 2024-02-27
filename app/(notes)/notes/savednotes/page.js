import { getAllSavedNotes } from "@/actions/user.actions";
import Notescard from "@/components/notes/Notescard";
import NotFoundPage from "@/components/notes/NotFoundPage";
import NotesCardSkeleton from "@/components/SkeletonLoaders/NotesCardSkeleton";
import { Suspense } from "react";

const SaveNotePage = async ({ searchParams }) => {
  const notes = await getAllSavedNotes({ search: searchParams?.note });
  if (notes?.length < 1) {
    return (
  <NotFoundPage
  message="You note  have any saved notes."
  />
    );
  }
  return (
    <main className="grid custom-scrollbar grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4  h-full overflow-y-auto gap-2 px-2  rounded-lg ">
      {notes?.map((item) => (
        <Suspense fallback={<NotesCardSkeleton />}>

        <Notescard
          key={item._id}
          title={item.title}
          content={item.content}
          noteId={JSON.parse(JSON.stringify(item._id))}
          isPublished={item.isPublished}
          time={item.timestamp}
          name={item?.userId?.name}
          email={item?.userId?.email}
          isUserNote={false}
          />
          </Suspense>
      ))}
    </main>
  );
};

export default SaveNotePage;
