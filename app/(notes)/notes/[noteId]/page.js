import { getFullNoteDetails } from "@/actions/note.actions";
import LinkButton from "@/components/notes/LinkButton";
import Preview from "@/components/shared/Preview";
import NotFoundPage from "@/components/notes/NotFoundPage";
import { formatDate } from "@/lib/utils";

const NotePage = async ({ params }) => {
  const notes = await getFullNoteDetails({
    noteId: params.noteId,
  });
  if (!notes?.note) {
    return <NotFoundPage message="Note not found" />;
  }
  const newtime = await formatDate(notes.note.timestamp);
  return (
    <main className=" bg-secondary relative h-full custom-scrollbar overflow-y-auto dark:border-neutral-600 dark:text-white flex flex-col">
      <div className=" sticky top-1 left-2 z-50">
        {notes?.isUserNote && (
          <LinkButton href={`/notes/edit/${notes.note._id}`} type="edit" />
        )}
      </div>
        <section className="flex text-xs  space-x-2 flex-col items-end absolute top-0 right-2">
          <div className="font-bold text-[14px] font-sans">
            {notes.note.userId.name}
          </div>
          <div>{notes.note.userId.email}</div>
          <div>{newtime}</div>
        </section>
      <div className=" absolute top-[55px]">
        <div className="flex flex-col items-start justify-start gap-1">
          <span className="text-[#f85151] font-semibold text-xl">Title :- </span>
          <h4 className=" w-[89%]  text-xl font-bold antialiased pl-[15px] dark:text-white">
            {notes.note?.title}
          </h4>
        </div>
        <div className="flex flex-col items-start gap-1">
          <span className="text-[#f85151] font-semibold text-xl">Content :- </span>
          <Preview value={notes.note?.content} />
        </div>
      </div>
    </main>
  );
};

export default NotePage;
