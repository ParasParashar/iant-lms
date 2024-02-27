import { getAllPublicNotes, getAllUserNotes } from "@/actions/note.actions";
import Notescard from "@/components/notes/Notescard";
import NotFoundPage from "@/components/notes/NotFoundPage";
import NotesCardSkeleton from "@/components/SkeletonLoaders/NotesCardSkeleton";
import { Suspense } from "react";

const page = async ({ searchParams }) => {
  const PublicNotes = await getAllPublicNotes({ search: searchParams?.note });
  const userNotes = await getAllUserNotes({ search: "" });
  const uesrNoteIds = userNotes?.map((note) => note._id.toString());
  if (PublicNotes?.length < 1) {
    return <NotFoundPage message={"Sorry!! Notes not found"} />;
  }
  return (
    <main className="grid custom-scrollbar grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 pb-4 h-full overflow-y-auto gap-2 px-2  rounded-lg ">
      {PublicNotes?.map((items) => {
        const isUserNote = uesrNoteIds?.includes(items._id);
        return (
          <>
            <Suspense key={items._id} fallback={<NotesCardSkeleton />}>
              <Notescard
                key={items._id}
                noteId={items._id}
                title={items.title}
                content={items.content}
                name={items.userId.name}
                email={items.userId.email}
                time={items.timestamp}
                isUserNote={isUserNote}
                isPublished={items.isPublished}
              />
            </Suspense>
          </>
        );
      })}
    </main>
  );
};
export default page;
