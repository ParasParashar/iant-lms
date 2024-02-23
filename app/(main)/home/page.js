import { findOrCreateUser } from "@/actions/user.actions";
import UserDetails from "@/components/home/UserDetails";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await findOrCreateUser();
  if (!user) redirect("/");
  return (
    <div className="border-2 border-red-500 h-full">
      <UserDetails />
    </div>
  );
};

export default page;
