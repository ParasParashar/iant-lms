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
  const newtime = formatDate(notes.note.timestamp);
  return (
    <main className=" bg-secondary relative h-full custom-scrollbar overflow-y-auto dark:border-neutral-600 dark:text-white flex flex-col">
      <div className="flex justify-between ">
        <section className="flex text-xs  flex-col ">
          <p className="font-bold text-[14px] font-sans">
            {notes.note.userId.name}
          </p>
          <p>{notes.note.userId.email}</p>
          <p>{newtime}</p>
        </section>
        {notes?.isUserNote && (
          <LinkButton href={`/notes/edit/${notes.note._id}`} type="edit" />
        )}
      </div>

      <div className=" py-2 ">
        <div className="flex flex-col items-start justify-start gap-1">
          <span className="text-[#f85151] font-semibold text-xl">
            Title :-{" "}
          </span>
          <h4 className=" w-[89%]  text-xl font-bold antialiased pl-[15px] dark:text-white">
            {notes.note?.title}
          </h4>
        </div>
        <div className="flex flex-col items-start gap-1">
          <span className="text-[#f85151] font-semibold text-xl">
            Content :-{" "}
          </span>
          <Preview value={notes.note?.content} />
        </div>
      </div>
    </main>
  );
};

export default NotePage;
