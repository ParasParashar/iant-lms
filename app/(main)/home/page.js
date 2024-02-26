import { findOrCreateUser } from "@/actions/user.actions";
import EnrolledCourses from "@/components/home/EnrolledCourses";
import ProfileDetails from "@/components/home/ProfileDetails";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await findOrCreateUser();
  if (!user) redirect("/");
  return (
    <div className="flex flex-col justify-between gap-2 w-full h-full">
      <ProfileDetails />
      <EnrolledCourses />
    </div>
  );
};

export default page;
