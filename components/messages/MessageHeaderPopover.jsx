"use client";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { IoEllipsisVerticalSharp } from "react-icons/io5";

import { ConfirmModel } from "../shared/ConfirmModel";
import {
  deleteConversationMessages,
  deletePersonalUserConversations,
} from "@/actions/messages.actions";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useConRefresh } from "@/hooks/useMessageSidebar";

const MessageHeaderPopover = ({
  converId,
  path,
  isGroup,
  receiverId,
  personal,
}) => {
  const { toggleRefresh } = useConRefresh();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleDeleteChat = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);
    try {
      if (personal && receiverId) {
        await deletePersonalUserConversations({
          receiverId: receiverId,
        });
        toggleRefresh();
      } else {
        await deleteConversationMessages({
          conversationId: converId,
          path: path,
          isGroup: isGroup,
        });
      }
    } catch (error) {
      console.error("Error removing ", error.message);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full h-6 w-6">
          <IoEllipsisVerticalSharp
            size={20}
            className="text-muted-foreground hover:text-primary"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40 p-2">
        <ConfirmModel
          onConfirm={(e) => handleDeleteChat(e)}
          message={
            personal
              ? "This will permanently delete your conversations"
              : "This action will permanently delete your messages which cannot be reversed."
          }
        >
          <button
            disabled={loading}
            className={`border-muted-foreground flex   p-1 rounded-lg w-full  justify-between   text-sm rounded-xs hover:bg-secondary items-center gap-0.5 text-muted-foreground hover:text-primary ${
              loading && "opacity-50 cursor-not-allowed"
            }`}
          >
            <RiDeleteBin6Fill size={14} className="text-red-500" />
            Delete {personal ? "" : "Chats"}
          </button>
        </ConfirmModel>
      </PopoverContent>
    </Popover>
  );
};

export default MessageHeaderPopover;
