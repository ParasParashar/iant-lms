import GetAllNotes from "./GetAllNotes";
import NotesNavbar from "./NotesNavbar";

const NotesContent = () => {
  return (
    <main className="flex flex-col w-full gap-y-4">
      <NotesNavbar />
      <GetAllNotes />
    </main>
  );
};

export default NotesContent;
