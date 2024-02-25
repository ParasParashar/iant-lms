import { getAllSavedNotes } from "@/actions/user.actions";
import Notescard from "@/components/notes/Notescard";

const SaveNotePage = async ({ searchParams }) => {
  const notes = await getAllSavedNotes({ search: searchParams?.note });
  if (notes?.length < 1) {
    return (
      <section className=" flex h-full w-full items-center  justify-center">
        <p className="text-muted-foreground text-xl">
          You don&apos;t have any saved notes.
        </p>
      </section>
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
          name={item?.userId?.name}
          email={item?.userId?.email}
          isUserNote={false}
        />
      ))}
    </main>
  );
};

export default SaveNotePage;
