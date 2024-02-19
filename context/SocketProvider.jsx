// "use client";
// import io from "socket.io-client";
// import { useUser } from "@clerk/nextjs";
// import { createContext, useContext, useEffect, useState } from "react";

// const SocketProvider = createContext(null);
// // creating hook to use the context;
// export const useSocket = () => {
//   return useContext(SocketProvider);
// };

// export const SocketContextProvider = ({ children }) => {
//   const [socket, setSocket] = useState(null);
//   const [onlineUsers, setOnlineUsers] = useState();
//   const { isSignedIn, user, isLoaded } = useUser();

//   useEffect(() => {
//     if (user) {
//       const socketData = io(process.env.NEXT_PUBLIC_SERVER_URL, {
//         query: {
//           userId: user.id,
//         },
//       });
"use client";
import io from "socket.io-client";
import { useAuth, useUser } from "@clerk/nextjs";
import { createContext, useContext, useEffect, useState } from "react";

const SocketProvider = createContext(null);
// creating hook to use the context;
export const useSocket = () => {
  return useContext(SocketProvider);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState();
  const [isConnected, setIsConnected] = useState(false);
  const { userId } = useAuth();
  useEffect(() => {
    if (userId) {
      const socketData = io(process.env.NEXT_PUBLIC_SERVER_URL, {
        query: {
          userId: userId,
        },
      });
      // const socketInstance = io(process.env.NEXT_PUBLIC_SERVER_URL);
      socketData.on("connect", () => {
        setIsConnected(true);
        socketData.on("getOnlineUsers", (users) => {
          setOnlineUsers(users);
        });
      });
      socketData.on("disconnect", () => {
        setIsConnected(false);
      });

      setSocket(socketData);
      return () => {
        socketData.disconnect();
      };
    }
  }, [userId]);

  return (
    <SocketProvider.Provider value={{ socket, onlineUsers, isConnected }}>
      {children}
    </SocketProvider.Provider>
  );
};
