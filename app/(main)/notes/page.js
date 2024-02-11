import NotesContent from "@/components/notes/NotesContent";
import NotesSidebar from "@/components/notes/NotesSidebar";

const NotesPage = () => {
  return (
    <div className="flex gap-6 py-3 w-full h-full">
      <NotesSidebar />
      <NotesContent />
    </div>
  );
};

export default NotesPage;
