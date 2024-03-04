"use client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { searchUserByName } from "@/actions/user.actions";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import UserAvatar from "./UserAvatar";
import { FaUserCheck } from "react-icons/fa";
import { IoPersonAddSharp, IoPersonRemoveSharp } from "react-icons/io5";
import { Button } from "../ui/button";
import { addMemberToGroup } from "@/actions/messages.actions";
import { useGroupRefresh } from "@/hooks/useMessageSidebar";

const AddUsersToGroup = ({ children, groupName, members, groupId }) => {
  const { toggleGRefresh } = useGroupRefresh();
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [selectUser, setSelectUser] = useState([]);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // Handle search on input change with debounce
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      searchUser();
    }, 200);
    return () => clearTimeout(debounceTimer);
  }, [search]);

  // Search user function
  async function searchUser() {
    let data;
    if (search === "") {
      data = await searchUserByName("");
    } else {
      data = await searchUserByName(search);
    }
    setResult(data);
  }

  //   searching
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      if (result) {
        router.push(`/messages/${result[0]._id}`);
      }
    }
  };
  //   select the user
  const handleSelectUnselect = (user) => {
    if (selectUser.includes(user)) {
      const updatedSelect = selectUser.filter((item) => item !== user);
      setSelectUser(updatedSelect);
    } else {
      setSelectUser((prev) => [...prev, user]);
    }
  };
  // confirm the collections
  const handleClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    await addMemberToGroup({
      members: selectUser,
      groupId: groupId,
    })
      .then(() => {
        setSelectUser([]);
        return toggleGRefresh();
      })
      .then(() => {
        setOpen(false);
      });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-full">{children}</DialogTrigger>
      <DialogContent className=" dark:bg-slate-900 rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-center truncate">
            Add User to {groupName} group
          </DialogTitle>
          <input
            autoFocus
            className="w-full rounded-lg border-none outline-none text-lg p-1   bg-secondary "
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search User"
            onKeyDown={handleSearch}
          />
          {result?.length > 0 ? (
            <div className="flex transition-all duration-300 ease-in-out  flex-col gap-2 mt-2 p-1">
              {result?.slice(0, 3)?.map((item) => {
                const isMember = members.includes(item._id);
                const isSelected = selectUser.includes(item._id);
                return (
                  <section
                    key={item._id}
                    className={cn(
                      "flex  w-full  justify-between  group  rounded-lg items-center gap-2 border-b-2 border-slate-300 shadow-inner dark:border-slate-700 p-1 hover:bg-white dark:hover:bg-slate-600/80 hover:shadow-lg ",
                      isMember && " bg-white dark:bg-slate-600/80  "
                    )}
                  >
                    <div className="flex items-center justify-start gap-1">
                      <UserAvatar name={item.name} />
                      <div
                        className={cn(
                          "text-sm font-light text-left  line-clamp-2 group-hover:font-semibold",
                          isMember && "font-semibold p-1"
                        )}
                      >
                        {item.name}
                        <p className="text-sm text-muted-foreground">
                          {item.email}
                        </p>
                      </div>
                    </div>
                    {isMember ? (
                      <div className="flex rounded-full line-clamp-1 bg-gray-400 dark:bg-sky-300 text-secondary text-xs p-1">
                        <FaUserCheck size={15} className="text-sky-500" />
                        <span className="hidden lg:block">
                          Already a member
                        </span>
                      </div>
                    ) : (
                      <div
                        onClick={() => handleSelectUnselect(item._id)}
                        className="flex group-hover:border-blue-500 border transition-all duration-200 ease-in rounded-full line-clamp-1 bg-secondary text-primary text-xs p-1 cursor-pointer"
                      >
                        {isSelected ? (
                          <>
                            <IoPersonRemoveSharp
                              size={15}
                              className="text-red-500"
                            />
                            Remove-
                          </>
                        ) : (
                          <>
                            <IoPersonAddSharp
                              size={15}
                              className="text-blue-500"
                            />
                            <span>Add +</span>
                          </>
                        )}
                      </div>
                    )}
                  </section>
                );
              })}
            </div>
          ) : (
            <p className="text-lg text-muted-foreground mt-4 text-center">
              No User Found
            </p>
          )}
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={(e) => handleClick(e)}
            disabled={selectUser.length === 0}
            variant="outline"
            size="lg"
            className="w-full bg-blue-500 hover:bg-blue-400 transition-all ease-in rounded-lg"
          >
            Add users
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddUsersToGroup;
