"use client";

import { getOnlineUsers } from "@/actions/messages.actions";
import { useSocket } from "@/context/SocketProvider";
import { Suspense, useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { Loader } from "lucide-react";

const OnlineUser = () => {
  const { socket, onlineUsers, isConnected } = useSocket();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function getOnlineUserDetails() {
      try {
        setIsLoading(true);
        const data = await getOnlineUsers(onlineUsers);
        setUsers(data);
      } catch (error) {
        console.log("user not found", error.message);
      } finally {
        setIsLoading(false);
      }
    }
    getOnlineUserDetails();
  }, [onlineUsers]);
  return (
    <aside className="text-muted-foreground bg-secondary  p-2 rounded-full ">
      {isLoading && <Loader className="animate-spin" />}
      {users?.map((item) => (
        <p key={item._id}>
          {item.name}
          <span className="text-black">{item.email}</span>
        </p>
      ))}
      {error && (
        <p className="text-lg  p-2 bg-red-100">Something went wrong {error}</p>
      )}
    </aside>
  );
};

export default OnlineUser;
