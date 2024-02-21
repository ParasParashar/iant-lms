import { getAllPublicNotes } from "@/actions/note.actions";
import Notescard from "@/components/notes/Notescard";

const page = async() => {
  const PublicNotes = await getAllPublicNotes()
  return (
    
    <main className="grid custom-scrollbar grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 lg:grid-cols-3  h-full overflow-y-auto gap-2 px-2 ">
      {PublicNotes.map((items)=>(
        <Notescard 
        key={items._id}
        noteId={items._id}
        title={items.title}
        content={items.content}
        name={items.userId.name}
        time={items.timestamp}
        />
      ))}
    </main>
  );
};

export default page;