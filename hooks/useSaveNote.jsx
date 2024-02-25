"use client";

import {
  isNoteAlreadySave,
  saveNoteTrigger,
  unSaveNoteTrigger,
} from "@/actions/note.actions";
import { useCallback, useEffect, useState } from "react";

export const useSaveNote = ({ noteId }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const checkNote = useCallback(async () => {
    try {
      setLoading(true);
      const hasFavorite = await isNoteAlreadySave({ noteId: noteId });
      setIsSaved(hasFavorite || false);
      return hasFavorite;
    } catch (error) {
      console.error("Error checking favorite:", error);
      return false;
    } finally {
      setLoading(false);
    }
  }, [noteId]);

  useEffect(() => {
    checkNote();
  }, [checkNote]);

  const toggleSaveButton = useCallback(
    async (e) => {
      try {
        e.preventDefault();
        e.stopPropagation();
        setLoading(true);
        const hasSaved = await isNoteAlreadySave({ noteId: noteId });
        if (hasSaved) {
          const response = await unSaveNoteTrigger({ noteId: noteId });
          setIsSaved(response);
        } else {
          const response = await saveNoteTrigger({ noteId: noteId });
          setIsSaved(response);
        }
      } catch (error) {
        console.error("toggle save error", error.message);
      } finally {
        setLoading(false);
      }
    },
    [noteId]
  );

  return {
    toggleSaveButton,
    isSaved,
    loading,
  };
};
