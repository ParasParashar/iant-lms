import { getAllPublicNotes, getAllUserNotes } from "@/actions/note.actions";
import Notescard from "@/components/notes/Notescard";

const page = async ({ searchParams }) => {
  const PublicNotes = await getAllPublicNotes({ search: searchParams?.note });
  const userNotes = await getAllUserNotes({ search: "" });
  const uesrNoteIds = userNotes?.map((note) => note._id.toString());
  if (PublicNotes?.length < 1) {
    return (
      <div className=" flex h-full w-full items-center  justify-center">
        <p className="text-muted-foreground text-xl">Sorry!! Notes not found</p>
      </div>
    );
  }
  return (
    <main className="grid custom-scrollbar grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 lg:grid-cols-3  h-full overflow-y-auto gap-2 px-2 ">
      {PublicNotes?.map((items) => {
        const isUserNote = uesrNoteIds?.includes(items._id);
        return (
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
        );
      })}
    </main>
  );
};

export default page;
