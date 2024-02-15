"use client";
import { useState } from "react";
import { GrClose } from "react-icons/gr";
import { BiPencil } from "react-icons/bi";
import Editor from "../shared/Editor";
import { Button } from "../ui/button";
import { createNote, deleteCourseNote } from "@/actions/note.actions";
import Preview from "../shared/Preview";
import { Loader } from "lucide-react";
import { MdDelete } from "react-icons/md";

export const NoteEditor = ({
  titleValue,
  courseId,
  contentValue,
  chapterId,
  isOpen,
  noteId,
}) => {
  const [state, setState] = useState({
    isShow: isOpen,
    isLoading: false,
    isDeleting: false,
    value: contentValue || "",
    title: titleValue || "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, value, isLoading } = state;
    if (!title.trim() || !value.trim() || isLoading) return;

    setState((prevState) => ({
      ...prevState,
      isLoading: true,
    }));
    try {
      await createNote({
        noteId: noteId,
        chapterId,
        courseId,
        content: value,
        title: title,
      });
      setState((prevState) => ({
        ...prevState,
        value: "",
        title: "",
        isShow: false,
      }));
    } catch (error) {
      console.error("Error creating note:", error.message);
    } finally {
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
      }));
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    setState((prevState) => ({
      ...prevState,
      isDeleting: true,
    }));
    try {
      await deleteCourseNote({
        noteId,
        courseId,
        chapterId,
      });
      setState((prevState) => ({
        ...prevState,
        isShow: false,
      }));
    } catch (error) {
      console.error("Delete note error :", error.message);
    } finally {
      setState((prevState) => ({
        ...prevState,
        isDeleting: false,
      }));
    }
  };

  const handleContentChange = (newValue) => {
    setState((prevState) => ({
      ...prevState,
      value: newValue,
    }));
  };

  const handleTitleChange = (e) => {
    const { value } = e.target;
    setState((prevState) => ({
      ...prevState,
      title: value,
    }));
  };

  const { isShow, isLoading, isDeleting, value, title } = state;

  return (
    <div className="dark:bg-slate-950/90 bg-sky-100  flex flex-col gap-3 p-3 rounded-lg">
      <div className="flex items-center justify-between">
        <h6 className="text-muted-foreground text-sm font-[14px]">{title}</h6>
        <div className="flex items-center gap-2">
          {contentValue && title && (
            <Button
              variant="outline"
              onClick={handleDelete}
              size="icon2"
              disabled={isLoading || isDeleting}
            >
              {isDeleting ? (
                <Loader className="text-red-500 animate-spin" />
              ) : (
                <MdDelete size={20} className="text-red-500" />
              )}
            </Button>
          )}
          <Button
            variant="outline"
            onClick={() =>
              setState((prevState) => ({
                ...prevState,
                isShow: !prevState.isShow,
              }))
            }
            size="icon2"
            disabled={isLoading || isDeleting}
          >
            {isShow ? (
              <GrClose className="text-rose-500" size={20} />
            ) : (
              <BiPencil className="text-blue-300" size={20} />
            )}
          </Button>
        </div>
      </div>
      {contentValue ? (
        <Preview value={contentValue} />
      ) : (
        <span className="text-center text-sm text-muted-foreground">
          Create some
        </span>
      )}
      {isShow && (
        <>
          <Editor
            content={value}
            handleContentChange={handleContentChange}
            title={title}
            handleTitleChange={handleTitleChange}
            disabled={isLoading || isDeleting}
          />
          <Button
            disabled={!title.trim() || !value.trim() || isLoading || isDeleting}
            onClick={handleSubmit}
            className="text-lg"
            variant="myAccessBtn"
          >
            {isLoading ? (
              <Loader className="text-muted-foreground animate-spin" />
            ) : contentValue ? (
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
