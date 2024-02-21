"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useRef, useState } from "react";
import { searchUserByName } from "@/actions/user.actions";
import { useDebounce } from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import UserAvatar from "./UserAvatar";
import { Button } from "../ui/button";
import { IoIosRemoveCircle } from "react-icons/io";
import UserSearchSkeleton from "../SkeletonLoaders/UserSearchSkeleton";
import { createGroup } from "@/actions/messages.actions";

const CreateGroup = ({ children }) => {
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [selectUser, setSelectUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const groupInputRef = useRef();
  const router = useRouter();
  // searchUser function
  async function searchUser() {
    const data = await searchUserByName(search);
    setResult(data);
    setLoading(false);
  }
  // using debounce to create latency in search
  const debounce = useDebounce(searchUser, 200);
  useEffect(() => {
    debounce();
  }, [search]);

  // handleSelect
  const handleSelect = (obj) => {
    setSelectUser((prev) => {
      const prevIds = prev?.map((user) => user.userId);
      if (prevIds?.includes(obj.userId)) {
        return prev;
      } else {
        const updateValue = [...prev, obj];
        return updateValue;
      }
    });
    setSearch("");
    groupInputRef.current.focus();
  };
  // handleRemove
  const handleRemove = (id) => {
    const updatedValue = selectUser.filter((item) => {
      return item.userId !== id;
    });
    setSelectUser(updatedValue);
  };
  // handleBackspace Delete
  const handleBackSpaceDelete = (e) => {
    if (e.key === "Backspace" && selectUser.length > 0) {
      const lastElementId = selectUser[selectUser.length - 1].userId;
      handleRemove(lastElementId);
    }
    if (e.key === "Enter" && result.length > 0) {
      const data = {
        userId: result[0]._id,
        name: result[0].name,
      };
      handleSelect(data);
    }
  };
  const handleCreateGroup = async () => {
    const routeId = await createGroup({
      groupName: name,
      participants: selectUser.map((item) => item.userId),
    });
    router.push(`/messages/group/${routeId}`);
  };

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader className="flex flex-col items-center justify-center gap-2 w-full">
          <DialogTitle className="text-center">Create Group</DialogTitle>
          {/* name of the group */}
          <input
            autoFocus
            className="w-full rounded-full border-none outline-none text-lg font-serif px-2 p-1 bg-secondary  "
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your group name"
          />
          {/* search and select a user */}
          <div className="w-full">
            <div className="flex flex-wrap gap-1 bg-secondary rounded-lg border w-full p-1">
              {selectUser?.map((item) => (
                <div key={item._id} className="relative group">
                  <Button
                    variant="outline"
                    size="sm"
                    className=" cursor-text group-hover:border-black rounded-full"
                  >
                    {item.name}
                  </Button>
                  <IoIosRemoveCircle
                    onClick={() => handleRemove(item.userId)}
                    size={18}
                    className="absolute hidden cursor-pointer group-hover:block top-[-2px] left-0 text-rose-600"
                  />
                </div>
              ))}
              <input
                autoFocus
                ref={groupInputRef}
                className="border-none bg-secondary  outline-none text-lg p-1"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search User"
                onKeyDown={(e) => handleBackSpaceDelete(e)}
              />
            </div>
            {selectUser?.length < 1 && (
              <p className="text-xs text-muted-foreground text-center  py-1">
                Select a people for the group chat.
              </p>
            )}
            {loading ? (
              <div className="flex flex-col gap-1  items-start ">
                {Array.from({ length: 2 }, (_, index) => index + 1).map(
                  (item) => (
                    <UserSearchSkeleton key={item._id} />
                  )
                )}
              </div>
            ) : (
              <>
                {result?.length > 0 ? (
                  <div className="flex transition-all duration-300 ease-in-out  flex-col gap-2 mt-2 p-1">
                    {result?.slice(0, 3)?.map((item) => {
                      const inGroup = selectUser
                        .map((item) => item.userId)
                        .includes(item._id);
                      return (
                        <section
                          onClick={() =>
                            handleSelect({ userId: item._id, name: item.name })
                          }
                          className={cn(
                            "flex cursor-pointer   group  rounded-lg items-center gap-2 border-b-2 border-slate-300 shadow-inner dark:border-slate-700 p-1 hover:bg-white dark:hover:bg-slate-600/80 hover:shadow-lg ",
                            inGroup &&
                              " bg-secondary hover:bg-secondary dark:bg-slate-600/80  hover:shadow-none "
                          )}
                        >
                          <UserAvatar name={item.name} />
                          <div className="flex flex-col p-1">
                            <p
                              className={cn(
                                "text-sm font-light group-hover:font-semibold",
                                inGroup && "font-semibold"
                              )}
                            >
                              {item.name}
                            </p>
                            <p
                              className={cn(
                                "text-xs font-light  group-hover:font-normal text-muted-foreground",
                                inGroup && "font-normal"
                              )}
                            >
                              {item.email}
                            </p>
                          </div>
                        </section>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-lg text-muted-foreground mt-4 text-center">
                    No User Found
                  </p>
                )}
              </>
            )}
          </div>
          <Button
            onClick={handleCreateGroup}
            variant="outline"
            disabled={name.trim() === "" || selectUser.length === 0}
            className="w-full text-white bg-blue-600 hover:bg-blue-500 text-sm hover:text-white rounded-lg  "
          >
            Create Group
          </Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGroup;
