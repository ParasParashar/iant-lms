"use client";

import { useSaveNote } from "@/hooks/useSaveNote";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { Button } from "../ui/button";

const SaveNote = ({ noteId }) => {
  const { isSaved, loading, toggleSaveButton } = useSaveNote({ noteId });

  return (
    <Button
      disabled={loading}
      variant="ghost"
      size="icon"
      onClick={toggleSaveButton}
      className=" rounded-full"
    >
      {isSaved ? <FaBookmark size={18} /> : <FaRegBookmark size={18} />}
    </Button>
  );
};

export default SaveNote;
