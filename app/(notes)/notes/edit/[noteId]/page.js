import { getFullNoteDetails } from "@/actions/note.actions";
import MainNotesEditor from "@/components/notes/MainNotesEditor";

const page = async ({ params }) => {
  const notes = await getFullNoteDetails({
    noteId: params.noteId,
  });
  if (!notes?.note || !notes.isUserNote) {
    return (
      <p className="flex  items-center h-full w-full text-lg text-muted">
        Something went wrong
      </p>
    );
  }
  return (
    <MainNotesEditor
      defaultTitle={notes?.note?.title}
      defaultContent={notes?.note?.content}
      noteId={notes?.note?._id}
      type="edit"
    />
  );
};

export default page;
