"use client";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { NotePopover } from "./NotePopover";
import {
  deleteUserNote,
  publishUserNote,
  unPublishUserNote,
} from "@/actions/note.actions";
import { cn, formatDate } from "@/lib/utils";
import Link from "next/link";
import SaveNote from "./SaveNote";
import Preview from "../shared/Preview";
const Notescard = ({
  noteId,
  time,
  content,
  isPublished,
  title,
  name,
  email,
  isUserNote,
}) => {
  const handleActions = async () => {
    if (isPublished) {
      await unPublishUserNote({ noteId });
    } else {
      await publishUserNote({ noteId });
    }
  };
  const handleDeleteNote = async (e) => {
    e.preventDefault();
    await deleteUserNote({ noteId });
  };
  const newtime = formatDate(time);
  return (
    <Card
      className={cn(
        "w-full h-[250px] notescardhover  dark:notecardbgdark shadow-md transition duration-700 ease-in-out ",
        isPublished?"notecardbg":"bg-pink-500/20"
      )}
    >
      <CardHeader className="p-0  w-full relative">
        <div className=" absolute right-1 top-[2px]">
          {isUserNote ? (
            <NotePopover
              isPublished={isPublished}
              handleDeleteNote={handleDeleteNote}
              handleActions={handleActions}
            />
          ) : (
            <SaveNote noteId={noteId} />
          )}
        </div>
      </CardHeader>
      <Link
        href={`/notes/${noteId}`}
        className="px-2 h-full gap-2 flex flex-col py-1 "
      >
        <CardTitle className="">
          <span className=" font-semibold text-[1.2rem] px-[1px] rounded-md py-[2px] shadow-inner ">
            {title.slice(0,15)}
          </span>
        </CardTitle>
        <div className=" w-full h-[80%]  text-start font-[400]  mt-2 overflow-hidden cursor-pointer ">
          <Preview
            value={content.split(" ").slice(0,30).join(" ")}
          />
        </div>
        <CardFooter className="flex flex-col gap-1 items-start p-0 leading-none">
          <div className="text-[1rem] font-[500]">{name}</div>
          <div className="text-[0.7rem] font-[500]">{email}</div>

          <div className=" text-[10px]">{newtime}</div>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default Notescard;
