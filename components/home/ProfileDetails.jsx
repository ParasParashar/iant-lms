import UserDetails from "./UserDetails";
import Slogan from "./Slogan";
import { CourseProgressChart } from "./CourseProgressChart";
import { getUserAnalytics } from "@/actions/user.actions";

const ProfileDetails = async () => {
  const userAnalytics = await getUserAnalytics();
  return (
    <main className="flex flex-col gap-2 md:flex-row w-full h-full md:h-[60%]">
      <UserDetails />
      <section className=" flex flex-col gap-2 h-full w-full">
        {/* slogans */}
        <Slogan />
        {/* chart */}
        <div className="h-[80%] ">
          <div className="w-full lg:p-2  p-1 h-full rounded-lg bg-[#f1f5f9] dark:bg-[#1e293bd7]">
            <h3 className="text-lg lg:text-xl text-muted-foreground font-semibold font-serif">
              Overall Progress
            </h3>

            <CourseProgressChart data={userAnalytics} />
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProfileDetails;
