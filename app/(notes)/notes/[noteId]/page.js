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
    <main className=" bg-secondary relative h-full min-h-screen custom-scrollbar overflow-y-auto dark:border-neutral-600 dark:text-white flex flex-col">
      <div className="flex justify-between ">
        <section className="flex flex-col space-y-1">
          <p className="font-bold text-[14px] font-sans">
            By - {notes.note.userId.name}
          </p>
          <p className="dark:text-white/60 text-xs">
            {notes.note.userId.email}
          </p>
          <p className="dark:text-white/60 text-xs">{newtime}</p>
        </section>
        <div cl>
          {" "}
          {notes?.isUserNote && (
            <LinkButton href={`/notes/edit/${notes.note._id}`} type="edit" />
          )}
        </div>
      </div>

      <div className=" py-3">
        <div className="flex justify-center">
          <div>
            <span className="text-[#8a9fe9b1] dark:text-[#8a9fe970] font-semibold text-xl">
              Title :-
            </span>
            <span className=" w-[89%] text-xl font-bold antialiased pl-[10px] dark:text-white">
              {notes.note?.title}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-start gap-1">
          <span className="text-[#8a9fe9b1] dark:text-[#8a9fe970] font-semibold text-xl">
            Content :-{" "}
          </span>
          <Preview value={notes.note?.content} />
        </div>
      </div>
    </main>
  );
};

export default NotePage;
