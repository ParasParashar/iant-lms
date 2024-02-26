import React from "react";
import UserDetails from "./UserDetails";

import SloganBarChat from "./SloganBarChat";

const ProfileDetails = () => {
  return (
    <div className="flex flex-col gap-2 md:flex-row w-full h-full md:h-[60%]">
      <UserDetails />
      <SloganBarChat />
    </div>
  );
};

export default ProfileDetails;
