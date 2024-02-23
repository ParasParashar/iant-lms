"use client";
import { useState } from "react";
import BigEditor from "../shared/BigEditor";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { createOrUpdateNote } from "@/actions/note.actions";

const MainNotesEditor = ({ defaultTitle, defaultContent, type, noteId }) => {
  const [data, setdata] = useState({
    title: defaultTitle || "",
    content: defaultContent || "",
  });
  const router = useRouter();
  const handleContentChange = (newValue) => {
    setdata((prev) => ({ ...prev, content: newValue }));
  };
  const handleTitleChange = (e) => {
    setdata((prev) => ({ ...prev, title: e.target.value }));
  };
  const handleCreateNote = async (e) => {
    e.preventDefault();
    if (data.title.trim() !== "" && data.content.trim() !== "") {
      const response = await createOrUpdateNote({
        title: data.title,
        content: data.content,
        noteId: noteId,
      });
      router.refresh();
      router.push(`/notes/${response}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <Button
        onClick={(e) => handleCreateNote(e)}
        disabled={!data.title.trim() || !data.content.trim()}
        className="text-lg btn-grad disabled:bg-secondary btn-grad:hover w-full"
      >
        {type === "edit" ? "Update" : "Create"}
      </Button>
      <BigEditor
        Content={data.content}
        HandleContentChange={handleContentChange}
        Title={data.title}
        HandleTitleChange={handleTitleChange}
      />
    </div>
  );
};

export default MainNotesEditor;
