"use client";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import {
  IoEllipsisVerticalSharp,
  IoPersonAdd,
  IoPersonRemoveSharp,
} from "react-icons/io5";
import {
  createAdminUser,
  removeMembersFromGroup,
} from "@/actions/messages.actions";
import { useParams } from "next/navigation";
import { ConfirmModel } from "../shared/ConfirmModel";

const UserCardPopover = ({ userId }) => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleCreateAdmin = async () => {
    setLoading(true);
    try {
      await createAdminUser({ groupId: params.groupId, userId });
    } catch (error) {
      console.error("Error creating ", error.message);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const handleRemoveUser = async () => {
    setLoading(true);
    try {
      await removeMembersFromGroup({ groupId: params.groupId, userId });
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
      <PopoverContent className="flex flex-col gap-1 w-36 divide-y-2 p-2">
        <button
          onClick={handleCreateAdmin}
          disabled={loading}
          className={`border-muted-foreground flex p-1 text-sm rounded-lg hover:bg-secondary items-center gap-0.5 text-muted-foreground hover:text-primary ${
            loading && "opacity-50 cursor-not-allowed"
          }`}
        >
          <IoPersonAdd size={15} className="text-blue-400" />
          Create Admin
        </button>
        <ConfirmModel
          onConfirm={handleRemoveUser}
          message={
            "This will remove the user from the group and his all conversation in the group."
          }
        >
          <button
            disabled={loading}
            className={`border-muted-foreground flex p-1 text-sm rounded-lg hover:bg-secondary items-center gap-0.5 text-muted-foreground hover:text-primary ${
              loading && "opacity-50 cursor-not-allowed"
            }`}
          >
            <IoPersonRemoveSharp size={15} className="text-red-500" />
            Remove User
          </button>
        </ConfirmModel>
      </PopoverContent>
    </Popover>
  );
};

export default UserCardPopover;
