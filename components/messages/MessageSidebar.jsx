"use client";
import { useEffect, useState } from "react";
import { HiUserGroup } from "react-icons/hi";
import { Button } from "../ui/button";
import { BiSolidMessageDetail } from "react-icons/bi";
import SearchUsers from "./SearchUsers";
import { getAllConversationsOfUser } from "@/actions/messages.actions";
import { usePathname, useRouter } from "next/navigation";
import UserSearchSkeleton from "../SkeletonLoaders/UserSearchSkeleton";
import UserCard from "./UserCard";
import CreateGroup from "./CreateGroup";
import UserAvatar from "./UserAvatar";
import { cn } from "@/lib/utils";
import { useConRefresh } from "@/hooks/useMessageSidebar";
// import useConRefresh from "@/hooks/useMessageSidebar";

const MessageSidebar = ({ data }) => {
  const { isRefresh, toggleRefresh } = useConRefresh();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathName = usePathname();
  const [userConversations, setUserConversations] = useState(
    data ? [...data] : []
  );
  useEffect(() => {
    async function getData() {
      try {
        const data = await getAllConversationsOfUser();
        setUserConversations(data);
      } catch (error) {
        console.error("Error fetching user conversations:", error);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [data, isRefresh]);

  const handleClick = (id) => {
    router.push(`/messages/group/${id}`);
  };
  return (
    <aside className="bg-secondary h-full w-full  rounded-lg">
      {/* Search bar */}
      <div className="flex items-center justify-between bg-slate-300/90 dark:bg-slate-700 h-14 rounded-lg px-2">
        <SearchUsers>
          <Button variant="outline" size="icon" className="rounded-full">
            <BiSolidMessageDetail
              size={25}
              className="text-blue-500 rounded-full"
            />
          </Button>
        </SearchUsers>
        <CreateGroup>
          <Button variant="outline" size="icon" className="rounded-full">
            <HiUserGroup size={20} className="text-gray-500" />
          </Button>
        </CreateGroup>
      </div>

      {/* User conversations */}
      {loading ? (
        <div className="flex flex-col gap-1  items-start  pt-1">
          {Array.from({ length: 3 }, (_, index) => index + 1).map((item) => (
            <UserSearchSkeleton key={item._id} />
          ))}
        </div>
      ) : userConversations && userConversations.length > 0 ? (
        <div className="flex flex-col px-1 pt-2  gap-1 pb-4 overflow-y-auto h-full main-scrollbar">
          {userConversations.map((item) => {
            // for users or personal
            if (item.users) {
              const isActive = pathName?.includes(item.users._id);
              return (
                <UserCard
                  key={item.users._id}
                  id={item.users._id}
                  name={item.users.name}
                  email={item.users.email}
                  isActive={isActive}
                  isForSidebar
                />
              );
            } else {
              const isActive = pathName?.includes(item?.group?._id);
              // for groups
              return (
                <section
                  key={item?.group?._id}
                  onClick={() => handleClick(item?.group._id)}
                  className={cn(
                    "flex cursor-pointer   group  rounded-lg items-center gap-2 border-b-2 border-slate-300 shadow-inner dark:border-slate-700 p-1 hover:bg-white dark:hover:bg-slate-600/80 hover:shadow-lg ",
                    isActive && " bg-white dark:bg-slate-600/80  "
                  )}
                >
                  <UserAvatar group name={item?.group?.name} />
                  <p
                    className={cn(
                      "text-sm font-light uppercase line-clamp-1 group-hover:font-semibold",
                      isActive && "font-semibold p-1"
                    )}
                  >
                    {item?.group?.name}
                  </p>
                </section>
              );
            }
          })}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground flex items-center text-center justify-center h-[80%] p-2">
          Currently you don&apos;t have any previous conversations.
        </p>
      )}
    </aside>
  );
};

export default MessageSidebar;
