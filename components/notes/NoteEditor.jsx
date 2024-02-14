"use client";
import { useState } from "react";
import { GrClose } from "react-icons/gr";
import { BiPencil } from "react-icons/bi";
import Editor from "../shared/Editor";
import { Button } from "../ui/button";
import { createNote } from "@/actions/note.actions";
import Preview from "../shared/Preview";
import { Loader, Loader2 } from "lucide-react";

export const NoteEditor = ({ courseId, defaultValue, chapterId }) => {
  const [isShow, setIsShow] = useState(false);
  const [value, setValue] = useState(defaultValue || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (value.trim() === "") return;

    setIsLoading(true);
    try {
      await createNote({
        courseId,
        content: value,
        chapterId,
      });
      setValue("");
      setIsShow(false);
    } catch (error) {
      console.error("Error creating note:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="dark:bg-slate-950/90  flex flex-col gap-3 p-3 rounded-lg">
      <div className="flex items-center justify-between">
        <h5 className="text-xl text-muted-foreground font-semibold">
          Course Notes
        </h5>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setIsShow((prev) => !prev)}
            size="icon2"
          >
            {isShow ? (
              <GrClose className="text-rose-500" size={20} />
            ) : (
              <BiPencil className="text-blue-300" size={20} />
            )}
          </Button>
        </div>
      </div>
      {defaultValue ? (
        <Preview value={defaultValue} />
      ) : (
        <span className="text-center text-sm text-muted-foreground">
          Create some
        </span>
      )}
      {isShow && (
        <>
          <Editor value={value} handleChange={setValue} />
          <Button
            disabled={value.trim().length === 0 || isLoading}
            onClick={handleSubmit}
            className="text-lg"
            variant="myAccessBtn"
          >
            {isLoading ? (
              <Loader className=" text-muted-foreground animate-spin" />
            ) : defaultValue ? (
              "Update"
            ) : (
              "Create"
            )}
          </Button>
        </>
      )}
    </div>
  );
};
