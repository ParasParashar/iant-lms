import { getFullNoteDetails } from "@/actions/note.actions";
import LinkButton from "@/components/notes/LinkButton";
import Preview from "@/components/shared/Preview";

const NotePage = async ({ params }) => {
  const notes = await getFullNoteDetails({
    noteId: params.noteId,
  });
  if (!notes?.note) {
    return (
      <p className="flex  items-center h-full w-full text-lg text-muted">
        Note not found
      </p>
    );
  }
  return (
    <main className=" bg-secondary ">
      {notes?.isUserNote && (
        <LinkButton href={`/notes/edit/${notes.note._id}`} type="edit" />
      )}
      <h4>{notes?.note?.title}</h4>
      <Preview value={notes?.note?.content} />
    </main>
  );
};

export default NotePage;
