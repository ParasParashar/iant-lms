"use client";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FaRegBookmark } from "react-icons/fa";
import { NotePopover } from "./NotePopover";
import {
  deleteUserNote,
  publishUserNote,
  unPublishUserNote,
} from "@/actions/note.actions";
import { cn, formatDate } from "@/lib/utils";
import Link from "next/link";
const Notescard = ({
  noteId,
  time,
  content,
  isPublished,
  title,
  myNote,
  name,
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
        "w-full h-[250px]  px-2 gap-2 flex flex-col py-1 notescardhover notecardbg dark:notecardbgdark shadow-md hover:transition duration-150 ease-in-out ",
        isPublished && "bg-yellow-300/90"
      )}
    >
      <CardHeader className="p-0  w-full relative">
        <div className=" absolute right-0 top-[2px]">
          {myNote ? (
            <NotePopover
              isPublished={isPublished}
              handleDeleteNote={handleDeleteNote}
              handleActions={handleActions}
            />
          ) : (
            <FaRegBookmark
              size={25}
              className="rounded-lg p-1 hover:bg-[#90b7ff]"
            />
          )}
        </div>
      </CardHeader>
      <Link href={`/notes/${noteId}`} className="">
        <CardTitle className="m-0 ">
          <span className=" font-semibold text-[18px] px-[1px] rounded-md py-[2px] shadow-inner">
            {title}
          </span>
        </CardTitle>
        <div className=" cursor-pointer w-full h-full overflow-hidden  mt-2 text-center font-[400]">
          {/* <Preview value={content} className="text-[12px]" /> */}
          <div
            dangerouslySetInnerHTML={{ __html: content }}
            className="truncate text-[12px] text-wrap leading-tight "
          />
        </div>
        <CardFooter className="flex flex-col gap-1 items-start p-0 leading-none">
          <div className="text-[16px] font-[500]">{name}</div>
          <div className=" text-[10px]">{newtime}</div>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default Notescard;
