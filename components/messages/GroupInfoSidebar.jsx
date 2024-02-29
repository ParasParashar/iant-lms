// import UserCard from "./UserCard";
// import { getGroupUsersInfo, isUserAdmin } from "@/actions/messages.actions";
// import { findOrCreateUser } from "@/actions/user.actions";
// import GroupSidebarTitle from "./GroupSidebarTitle";
// import GroupSidebarAction from "./GroupSidebarAction";
// import { GrCircleInformation } from "react-icons/gr";

// const GroupUsersSidebar = async ({ id }) => {
//   const { members, name } = await getGroupUsersInfo({ groupId: id });
//   const isUserAdmin = await isUserAdmin({ groupId: id });
//   return (
//     <aside className=" w-full flex flex-col relative justify-between  bg-secondary rounded-lg  gap-1  flex-1 h-[92%]">
//       <div className="flex items-center justify-between bg-slate-300/90 dark:bg-slate-700 h-14 rounded-lg px-2">
//         <h4 className="text-lg font-bold text-muted-foreground text-center">
//           Group Information
//         </h4>
//         <GrCircleInformation
//           size={20}
//           className="text-rose-600 dark:text-rose-300"
//         />
//       </div>
//       {/* title edit */}
//       <p className=" text-sm px-3 text-muted-foreground">Group Name</p>

//       <GroupSidebarTitle groupId={id} name={name} isUserAdmin={isUserAdmin} />
//       {/* members */}
//       <p className=" text-sm px-3 text-muted-foreground">
//         Group Members {members?.length}
//       </p>
//       <section className="flex flex-col px-1 flex-1 gap-1  overflow-x-hidden h-3/4 overflow-y-auto main-scrollbar  ">
//         {members?.map(({ userId, isAdmin }) => {
//           return (
//             <UserCard
//               key={userId._id}
//               name={userId.name}
//               email={userId.email}
//               authId={userId.authId}
//               id={userId._id}
//               isAdmin={isAdmin}
//               isUserAdmin={isUserAdmin}
//               group
//             />
//           );
//         })}
//       </section>
//       {/* group actions */}
//       <GroupSidebarAction
//         groupName={name}
//         groupId={id}
//         isUserAdmin={isUserAdmin}
//         members={members.map((user) => user.userId._id)}
//       />
//     </aside>
//   );
// };

// export default GroupUsersSidebar;

// client version
"use client";
import { useEffect, useState } from "react";
import UserCard from "./UserCard";
import GroupSidebarTitle from "./GroupSidebarTitle";
import GroupSidebarAction from "./GroupSidebarAction";
import { GrCircleInformation } from "react-icons/gr";
import { getGroupUsersInfo, isUserAdmin } from "@/actions/messages.actions";
import UserSearchSkeleton from "../SkeletonLoaders/UserSearchSkeleton";
import { useGroupRefresh, useGroupSideOpen } from "@/hooks/useMessageSidebar";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import { FaArrowLeft } from "react-icons/fa";

const GroupUsersSidebar = ({ id }) => {
  const { isGRefresh } = useGroupRefresh();
  const { isOpen, closeSide } = useGroupSideOpen();

  const [groupName, setGroupName] = useState("");
  const [groupMembers, setGroupMembers] = useState([]);
  const [userAdmin, setUserAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { members, name } = await getGroupUsersInfo({ groupId: id });
        const adminStatus = await isUserAdmin({ groupId: id });
        setGroupName(name);
        setGroupMembers(members);
        setUserAdmin(adminStatus);
      } catch (error) {
        console.error("Error fetching group information:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, isGRefresh, isOpen]);
  return (
    <aside className="w-full flex flex-col relative justify-between bg-secondary rounded-lg gap-1 flex-1 h-[92%]">
      <section className="flex items-center justify-between bg-slate-300/90 dark:bg-slate-700 h-14 rounded-lg px-5 md:px-2 ">
        <Button
          onClick={closeSide}
          variant="outline"
          size="icon"
          className="rounded-full"
        >
          <FaArrowLeft size={22} color="gray" />
        </Button>
        <h4 className="text-lg font-bold text-muted-foreground text-center">
          Group Information
        </h4>
        <GrCircleInformation
          size={20}
          className="text-rose-600 dark:text-rose-300"
        />
      </section>
      {/* title edit */}
      <p className="text-sm px-3 text-muted-foreground">Group Name</p>
      {loading ? (
        <div className="flex m-2  px-2 justify-around  gap-x-2 items-center">
          <Skeleton className="h-6 w-full  rounded-xl" />
          <Skeleton className="h-5 w-5 p-2  rounded-full" />
        </div>
      ) : (
        <GroupSidebarTitle
          name={groupName}
          isUserAdmin={userAdmin ? userAdmin : false}
          groupId={id}
        />
      )}

      {/* members */}
      <p className="text-sm px-3 text-muted-foreground">
        Group Members {groupMembers?.length}
      </p>
      <section className="flex flex-col px-1 flex-1 gap-1 overflow-x-hidden h-3/4 overflow-y-auto main-scrollbar">
        {loading
          ? Array.from({ length: 3 }, (_, index) => index + 1).map((item) => (
              <UserSearchSkeleton key={item} />
            ))
          : groupMembers?.map(({ userId, isAdmin }) => (
              <UserCard
                key={userId._id}
                name={userId.name}
                email={userId.email}
                authId={userId.authId}
                id={userId._id}
                isAdmin={isAdmin}
                isUserAdmin={userAdmin}
                group
              />
            ))}
      </section>
      {/* group actions */}
      <GroupSidebarAction
        groupName={groupName}
        groupId={id}
        isUserAdmin={userAdmin ? userAdmin : false}
        members={groupMembers?.map((user) => user.userId._id)}
      />
    </aside>
  );
};

export default GroupUsersSidebar;
