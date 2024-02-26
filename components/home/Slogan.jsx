"use client";
import React, { useEffect, useState } from "react";

const Slogan = () => {
  const slogans = [
    "Empowering Education, Enabling Excellence: Join Our LMS Community.",
    "Dream Big, Study Smart: Your Success Starts with Every Book.",
    "Knowledge is Power, Study is the Key: Unlock Your Potential.",
    "Strive for Greatness, Study with Tenacity: Your Future Awaits.",
    "Mindset for Success, Books for Progress: Study and Thrive!",
    "Every Page Counts, Every Effort Matters: Study Hard, Dream Big.",
    "Illuminate Your Mind, Elevate Your Future: Study with Purpose.",
    "Determination Ignites Learning, Learning Fuels Success.",
    "Study Smart, Dream Big: Your Journey to Success Starts Now!",
    "Embrace the Challenge, Conquer the Books: Study for Success.",
  ];

  let [index, setIndex] = useState(0);

  useEffect(() => {
    let intervalID = setInterval(() => {
      setIndex(index);
      index = index + 1;
      if (index === 10) {
        index = 0;
      }
    }, 1500);

    return () => {
      clearInterval(intervalID);
    };
  }, [index]);

  return (
    <div className=" h-[20%]">
      <div className=" w-full h-full text-xl text-center rounded-full flex justify-center items-center p-4 bg-[#DDEBF9] dark:bg-[#1e293bd7]">
        {slogans[index]}
      </div>
    </div>
  );
};

export default Slogan;
