import React from "react";
import { findOrCreateUser } from "@/actions/user.actions";
import { Button } from "../ui/button";

const UserDetails = async () => {
  const userDetails = await findOrCreateUser();
  const [userName, userEmail, enrolledCourses] = [
    userDetails.name,
    userDetails.email,
    userDetails.enrolledCourses,
  ];

  return (
    <div className="w-full md:w-[30%] ">
      <div className="flex gap-8 md:gap-2 md:flex-col rounded-lg items-center w-full h-full bg-[#f1f5f9] p-4 md:p-6 dark:bg-[#1e293bd7]">
        <div className=" w-20 h-20  md:w-24 md:h-24 mb-2 rounded-full overflow-hidden">
          <img src="/ai_img.png" className=" object-cover" />
        </div>
        <div className="flex flex-col gap-4 md:gap-12 ">
          <div>
            <h1 className="text-xl md:text-2xl md:text-center">{userName}</h1>
            <p className=" text-xs  md:text-center">{userEmail}</p>
          </div>
          <div>
            <Button className=" gap-4 md:gap-8 bg-[#d8e8f7] rounded-full text-black hover:bg-[#b1cae3] hover:font-semibold">
              <p>Enrolled Courses</p> {enrolledCourses.length}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
