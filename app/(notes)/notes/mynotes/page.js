import { getAllUserNotes } from "@/actions/note.actions";
import Notescard from "@/components/notes/Notescard";

const page = async ({ searchParams }) => {
  const notes = await getAllUserNotes({ search: searchParams?.note });
  if (notes?.length < 1) {
    return (
      <div className=" flex h-full w-full items-center  justify-center">
        <p className="text-muted-foreground text-xl">
          Currently you don&apos;t have any note.
        </p>
      </div>
    );
  }
  return (
    <main className="grid grid-cols-2 lg:grid-cols-3 gap-2 p-2 lg:p-3">
      {notes?.map((item) => (
        <Notescard
          key={item._id}
          title={item.title}
          content={item.content}
          noteId={JSON.parse(JSON.stringify(item._id))}
          isPublished={item.isPublished}
          time={item.timestamp}
          isUserNote
        />
      ))}
    </main>
  );
};

export default page;
