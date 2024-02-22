"use client";
import { BsPencilFill } from "react-icons/bs";
import { Button } from "../ui/button";
import { useState } from "react";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { editGroupName } from "@/actions/messages.actions";
import { cn } from "@/lib/utils";

const GroupSidebarTitle = ({ name, isUserAdmin, groupId }) => {
  const [title, setTitle] = useState(name);
  const [isEdit, setIsEdit] = useState(false);
  const handleEdit = () => {
    setIsEdit(!isEdit);
  };
  const handleSave = async () => {
    if (isEdit && title.trim() !== "") {
      await editGroupName({ groupId: groupId, newName: title });
    }
    setIsEdit(false);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  return (
    <div
      className={cn(
        "flex items-center gap-1 px-3 w-full ",
        isEdit ? "justify-around" : "justify-between"
      )}
    >
      {isEdit ? (
        <input
          autoFocus
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-lg rounded-md  border-none outline-none font-bold text-muted-foreground transition-all duration-300 ease-in-out  w-3/4"
          onKeyDown={(e) => handleKeyDown(e)}
        />
      ) : (
        <h6 className="text-lg font-bold line-clamp-1 ">{title}</h6>
      )}
      {isUserAdmin && (
        <div className="flex items-center gap-x-1">
          {isEdit && (
            <Button
              onClick={handleSave}
              variant="outline"
              size="icon"
              className=" size-8 rounded-full"
            >
              <IoMdCheckmarkCircle size={15} className="text-blue-500" />
            </Button>
          )}
          <Button
            onClick={handleEdit}
            variant="outline"
            size="icon"
            className=" size-8 rounded-full"
          >
            <BsPencilFill size={15} className="text-sky-300" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default GroupSidebarTitle;
