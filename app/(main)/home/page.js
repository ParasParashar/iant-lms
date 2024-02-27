import { findOrCreateUser } from "@/actions/user.actions";
import HomePageSkeleton from "@/components/SkeletonLoaders/HomePageSkeleton";
import EnrolledCourses from "@/components/home/EnrolledCourses";
import ProfileDetails from "@/components/home/ProfileDetails";
import { redirect } from "next/navigation";
import { Suspense } from "react";

const page = async () => {
  const user = await findOrCreateUser();
  if (!user) redirect("/");
  return (
    <div className="flex flex-col justify-between gap-2 w-full min-h-full py-3 max-sm:py-1">
      <Suspense fallback={<HomePageSkeleton />}>
        <ProfileDetails />
        <EnrolledCourses />
      </Suspense>
    </div>
  );
};

export default page;
