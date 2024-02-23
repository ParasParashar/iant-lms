import UserCard from "./UserCard";
import { getGroupUsersInfo } from "@/actions/messages.actions";
import { findOrCreateUser } from "@/actions/user.actions";
import GroupSidebarTitle from "./GroupSidebarTitle";
import GroupSidebarAction from "./GroupSidebarAction";
import { GrCircleInformation } from "react-icons/gr";

const GroupUsersSidebar = async ({ id }) => {
  const { members, name } = await getGroupUsersInfo({ groupId: id });
  const currentUser = await findOrCreateUser();
  // checking current User is admin or not
  const adminUsers = members
    .filter((admin) => admin.isAdmin)
    .map((user) => user.userId._id.toString());
  const isUserAdmin = adminUsers?.includes(currentUser?._id.toString());
  return (
    <aside className=" w-full flex flex-col relative justify-between  bg-secondary rounded-lg  gap-1  flex-1 h-[92%]">
      <div className="flex items-center justify-between bg-slate-300/90 dark:bg-slate-700 h-14 rounded-lg px-2">
        <h4 className="text-lg font-bold text-muted-foreground text-center">
          Group Information
        </h4>
        <GrCircleInformation
          size={20}
          className="text-rose-600 dark:text-rose-300"
        />
      </div>
      {/* title edit */}
      <p className=" text-sm px-3 text-muted-foreground">Group Name</p>

      <GroupSidebarTitle groupId={id} name={name} isUserAdmin={isUserAdmin} />
      {/* members */}
      <p className=" text-sm px-3 text-muted-foreground">
        Group Members {members?.length}
      </p>
      <section className="flex flex-col px-1 flex-1 gap-1  overflow-x-hidden h-3/4 overflow-y-auto main-scrollbar  ">
        {members?.map(({ userId, isAdmin }) => {
          return (
            <UserCard
              key={userId._id}
              name={userId.name}
              email={userId.email}
              authId={userId.authId}
              id={userId._id}
              isAdmin={isAdmin}
              isUserAdmin={isUserAdmin}
              group
            />
          );
        })}
      </section>
      {/* group actions */}
      <GroupSidebarAction
        groupName={name}
        groupId={id}
        isUserAdmin={isUserAdmin}
        members={members.map((user) => user.userId._id)}
      />
    </aside>
  );
};

export default GroupUsersSidebar;
