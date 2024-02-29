import { findOrCreateUser } from "@/actions/user.actions";
import { Button } from "../ui/button";
import Image from "next/image";
import { Card } from "../ui/card";
import Link from "next/link";

const UserDetails = async () => {
  const userDetails = await findOrCreateUser();
  const [userName, userEmail, enrolledCourses] = [
    userDetails.name,
    userDetails.email,
    userDetails.enrolledCourses,
  ];

  return (
    <Card className="w-full md:w-[30%]  ">
      <div className="flex flex-col p-4 md:p-6 w-full h-full bg-secondary ">
        <h3 className="text-lg text-center lg:text-xl text-muted-foreground font-semibold font-serif">
          Student Details
        </h3>
        <div className="flex gap-8 md:gap-2 md:flex-col rounded-lg items-center w-full h-full  lg:pt-3  bg-secondary">
          <div className=" relative w-20 h-20  md:w-24 md:h-24 mb-2 rounded-full overflow-hidden">
            <Image
              src="/ai_img.png"
              fill
              className="  border-2 border-blue-300  rounded-full"
              alt="User Image"
              sizes="(max-width:90px),(max-height:90px)"
              priority={true}
            />
          </div>
          <div className="flex flex-col gap-4 md:gap-12 ">
            <div>
              <h2 className="text-xl md:text-2xl font-serif md:text-center">
                {userName}
              </h2>
              <p className=" text-sm lg:text-lg   font-serif md:text-center text-muted-foreground">
                {userEmail}
              </p>
            </div>
            <Link className=" mx-auto" href="/home/#enrolledCourses">
              <Button
                size="sm"
                className=" mx-auto  bg-[#d8e8f7] rounded-full font-mono text-black hover:bg-[#b1cae3] hover:font-semibold"
              >
                <span>Enrolled Courses : {enrolledCourses.length}</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default UserDetails;
