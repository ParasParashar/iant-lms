"use client";
import { useEffect, useState } from "react";
import { NoteEditor } from "../notes/NoteEditor";
import { Button } from "../ui/button";
import { PlusCircleIcon } from "lucide-react";
import { CgCloseO } from "react-icons/cg";

const CreateNotes = ({ data, courseId, chapterId }) => {
  const [notes, setNotes] = useState([...data]);
  useEffect(() => {
    setNotes([...data]);
  }, [data]);
  const handleCreateNote = () => {
    const newNote = {
      title: "",
      content: "",
      isOpen: true,
    };
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  const handleDeleteNote = (itemId) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note._id !== itemId));
  };

  return (
    <div className="flex flex-col w-full gap-2">
      <div className="flex items-center justify-between">
        <h5 className="text-xl text-muted-foreground font-semibold">
          Course Notes
        </h5>
        <div className="flex items-center gap-2">
          <Button
            onClick={handleCreateNote}
            variant="ghost"
            size="lg"
            className="text-muted-foreground dark:hover:bg-secondary hover:bg-gray-200"
          >
            <PlusCircleIcon size={20} className="text-blue-500 mr-3" />
            Create Note
          </Button>
        </div>
      </div>

      {notes?.map((item) => (
        <section key={item._id} className="relative w-full">
          <NoteEditor
            courseId={courseId}
            chapterId={chapterId}
            isOpen={item?.isOpen}
            titleValue={item.title}
            contentValue={item.content}
            noteId={item._id && JSON.parse(JSON.stringify(item._id))}
          />
          <Button
            onClick={() => handleDeleteNote(item._id)}
            variant="ghost"
            size="icon2"
            className="absolute  top-[-7px] left-[-8px]"
          >
            <CgCloseO size={25} className="text-red-500" />
          </Button>
        </section>
      ))}
    </div>
  );
};

export default CreateNotes;
