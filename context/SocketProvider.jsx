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
//       setSocket(socketData);
//       console.log(socketData);
//       // socket.on() is used to listen to the events. can be used both on client and server side
//       // handling the online user event from the backend.
//       socket.on("connect", () => {
//         console.log("a user connected");
//       });
//       socket.on("getOnlineUsers", (users) => {
//         setOnlineUsers(users);
//       });
//       return () => socket.close();
//     } else {
//       if (socket) {
//         socket.close();
//         setSocket(null);
//       }
//     }
//   }, [user]);

//   return (
//     <SocketProvider.Provider value={{ socket, onlineUsers }}>
//       {children}
//     </SocketProvider.Provider>
//   );
// };
"use client";
import io from "socket.io-client";
import { useUser } from "@clerk/nextjs";
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
  const { isSignedIn, user, isLoaded } = useUser();

  useEffect(() => {
    if (user) {
      const socketData = io(process.env.NEXT_PUBLIC_SERVER_URL, {
        query: {
          userId: user.id,
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
  }, [user]);

  return (
    <SocketProvider.Provider value={{ socket, onlineUsers, isConnected }}>
      {children}
    </SocketProvider.Provider>
  );
};
