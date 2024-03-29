"use client";

import { useEffect, useState } from "react";
import { deleteGroup, exitTheGroup } from "@/actions/messages.actions";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { ImExit } from "react-icons/im";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { ConfirmModel } from "../shared/ConfirmModel";
import { MdPersonAddAlt1 } from "react-icons/md";
import AddUsersToGroup from "./AddUserToGroup";
import { useConRefresh, useGroupSideOpen } from "@/hooks/useMessageSidebar";

const GroupSidebarAction = ({ groupId, isUserAdmin, members, groupName }) => {
  const router = useRouter();
  const { toggleRefresh } = useConRefresh();
  const { closeSide } = useGroupSideOpen();
  const [isAdmin, setIsAdmin] = useState(isUserAdmin);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsAdmin(isUserAdmin);
  }, [isUserAdmin]);

  const handleExitGroup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await exitTheGroup({ groupId: groupId }).then(() => {
        closeSide();
        toggleRefresh();
        router.push("/messages");
      });
    } catch (error) {
      console.error("Error exiting group:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteGroup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await deleteGroup({ groupId: groupId }).then(() => {
        closeSide();
        toggleRefresh();
        router.push("/messages");
      });
    } catch (error) {
      console.error("Error deleting group:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="w-full rounded-lg p-2 space-y-1  text-muted-foreground bg-slate-300/90 dark:bg-slate-700 ">
      <p className="text-xs ">Group Actions</p>
      <ConfirmModel
        onConfirm={(e) => handleExitGroup(e)}
        message={
          "This action will remove you from the group and delete all your group conversations. "
        }
      >
        <Button
          variant="outline"
          size="sm"
          disabled={loading}
          className={`flex justify-between hover:dark:border-muted-foreground dark:border items-center gap-x-1 w-full ${
            loading && "opacity-50 cursor-not-allowed"
          }`}
        >
          <ImExit size={18} className="text-primary" /> Exit group
        </Button>
      </ConfirmModel>
      {isAdmin && (
        <>
          <AddUsersToGroup
            groupId={groupId}
            groupName={groupName}
            members={members}
          >
            <Button
              variant="outline"
              size="sm"
              disabled={loading}
              className={`flex justify-between hover:dark:border-muted-foreground items-center gap-x-1 w-full ${
                loading && "opacity-50 cursor-not-allowed"
              }`}
            >
              <MdPersonAddAlt1 size={18} className="text-sky-500" /> Add Members
            </Button>
          </AddUsersToGroup>
          <ConfirmModel
            onConfirm={(e) => handleDeleteGroup(e)}
            message={`This action will delete your group ${groupName} permanetly with all conversations of the group.`}
          >
            <Button
              variant="outline"
              size="sm"
              disabled={loading}
              className={`flex justify-between hover:dark:border-muted-foreground items-center gap-x-1 w-full ${
                loading && "opacity-50 cursor-not-allowed"
              }`}
            >
              <RiDeleteBin5Fill size={18} className="text-red-500" /> Delete
              group
            </Button>
          </ConfirmModel>
        </>
      )}
    </footer>
  );
};

export default GroupSidebarAction;
