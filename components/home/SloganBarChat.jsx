import React from "react";
import Slogan from "./Slogan";
import BarChat from "./BarChat";

const SloganBarChat = () => {
  return (
    <div className=" flex flex-col gap-2 h-full w-full">
      <Slogan />

      <div className="h-[80%] ">
        {/* add barchat of completition of courses  */}
        <BarChat />
      </div>
    </div>
  );
};

export default SloganBarChat;
