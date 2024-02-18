"use client";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FaRegBookmark } from "react-icons/fa";
import Preview from "../shared/Preview";
import { NotePopover } from "./NotePopover";
import { deleteUserNote, publishUserNote } from "@/actions/note.actions";
import { cn } from "@/lib/utils";
import Link from "next/link";
const Notescard = ({ noteId, time, content, isPublished, title, myNote }) => {
  const handlePublish = async (e) => {
    e.preventDefault();
    await publishUserNote({ noteId });
  };
  const handleDeleteNote = async (e) => {
    e.preventDefault();
    await deleteUserNote({ noteId });
  };

  return (
    <Link href={`/notes/${noteId}`}>
      <Card
        className={cn(
          "w-[210px] h-[250px]  px-2 gap-2 flex flex-col py-1 ",
          isPublished && "bg-yellow-300/90"
        )}
      >
        <CardHeader className="p-0  w-full">
          <div className=" mr-0">
            {myNote ? (
              <NotePopover
                isPublished={isPublished}
                handleDeleteNote={handleDeleteNote}
                handlePublish={handlePublish}
              />
            ) : (
              <FaRegBookmark size={18} />
            )}
          </div>
        </CardHeader>
        <CardTitle className="m-0 mt-2">
          <p className=" font-normal text-[20px]">{title}</p>
        </CardTitle>
        <div className=" cursor-pointer w-full h-[120px] overflow-hidden  truncate ">
          <Preview value={content} />
        </div>
        <CardFooter className="flex flex-col gap-2 items-start p-0 leading-none">
          <div className="text-[16px]">By-alok singh</div>
          <div className=" text-[12px]">
            {new Date(time).toLocaleDateString()}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default Notescard;
