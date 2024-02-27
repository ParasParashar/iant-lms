"use client";
import React, { useEffect, useRef, useState } from "react";
import { Card } from "../ui/card";

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

  let indexRef = useRef(0);
  useEffect(() => {
    const intervalID = setInterval(() => {
      indexRef.current = (indexRef.current + 1) % slogans.length;
    }, 4000);

    return () => {
      clearInterval(intervalID);
    };
  }, []);

  return (
    <Card className=" h-[20%] text-center rounded-full p-4">
      <p className=" font-serif  slogan_animate  w-full h-full text-xl text-center">
        {slogans[indexRef.current]}
      </p>
    </Card>
  );
};

export default Slogan;
