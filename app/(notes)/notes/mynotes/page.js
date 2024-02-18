import { getAllUserNotes } from "@/actions/note.actions";
import Notescard from "@/components/notes/Notescard";

const page = async () => {
  const notes = await getAllUserNotes();
  return (
    <main className="">
      {notes ? (
        <section className="grid grid-cols-2 lg:grid-cols-3 gap-2 p-2 lg:p-3">
          {notes.map((item) => (
            <Notescard
              key={item._id}
              title={item.title}
              content={item.content}
              noteId={JSON.parse(JSON.stringify(item._id))}
              isPublished={item.isPublished}
              time={item.timestamp}
              myNote={true}
            />
          ))}
        </section>
      ) : (
        "notes not found"
      )}
    </main>
  );
};

export default page;
