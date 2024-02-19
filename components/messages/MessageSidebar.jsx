"use client";
import { useEffect, useState } from "react";
import { HiUserGroup } from "react-icons/hi";
import { Button } from "../ui/button";
import { BiSolidMessageDetail } from "react-icons/bi";
import SearchUsers from "./SearchUsers";
import { getAllConversationsOfUser } from "@/actions/messages.actions";
import UserAvatar from "./UserAvatar";
import { useRouter } from "next/navigation";

const MessageSidebar = ({ data }) => {
  const [loading, setLoading] = useState(true);
  const [userConversations, setUserConversations] = useState(
    data ? [...data] : []
  );
  const router = useRouter();
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
  }, [data]);
  const handleClick = (id) => {
    router.push(`/messages/${id}`);
  };

  return (
    <aside className="bg-secondary h-full w-full  rounded-lg">
      {/* Search bar */}
      <div className="flex items-center justify-between bg-slate-300/90 dark:bg-slate-700 h-14 rounded-lg px-2">
        <SearchUsers>
          <Button variant="ghost" size="icon" className="rounded-full">
            <BiSolidMessageDetail
              size={25}
              className="text-blue-500 rounded-full"
            />
          </Button>
        </SearchUsers>
        <Button variant="outline" size="icon" className="rounded-full">
          <HiUserGroup size={20} className="text-gray-500" />
        </Button>
      </div>

      {/* User conversations */}
      {loading ? (
        <p className="text-sm text-muted-foreground flex items-center text-center justify-center h-[80%] p-2">
          {Array.from({ length: 3 }, (_, index) => index + 1).map(
            (item) => " Loading..."
          )}
        </p>
      ) : userConversations && userConversations.length > 0 ? (
        <div className="flex flex-col">
          {userConversations.map((item) => (
            <section
              key={item._id}
              onClick={() => handleClick(item._id)}
              className="flex cursor-pointer rounded-sm items-center gap-2 border-b-2 border-slate-300 shadow-inner dark:border-slate-700 p-1 hover:bg-white dark:hover:bg-slate-600/80 hover:shadow-lg"
            >
              <UserAvatar name={item.name} />
              <div className="flex flex-col p-1">
                <p className="text-sm font-light">{item.name}</p>
                <p className="text-xs font-light text-muted-foreground">
                  {item.email}
                </p>
              </div>
            </section>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground flex items-center text-center justify-center h-[80%] p-2">
          Currently you don&apos;t have any previous Messages.
        </p>
      )}
    </aside>
  );
};

export default MessageSidebar;
