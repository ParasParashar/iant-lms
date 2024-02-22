"use client";
import { useState } from "react";
import BigEditor from "../shared/BigEditor";
import { Button } from "../ui/button";
import { createNote } from "@/actions/note.actions";

const MainNotesEditor = () => {
  const [data, setdata] = useState({ title: "", content: "" });
  const handleContentChange = (newValue) => {
    setdata((prev) => ({ ...prev, content: newValue }));
  };
  const handleTitleChange = (e) => {
    setdata((prev) => ({ ...prev, title: e.target.value }));
  };

  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <Button
        disabled={!data.title.trim() || !data.content.trim()}
        className="text-lg btn-grad disabled:bg-secondary btn-grad:hover w-full"
      >
        Save
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
