"use client";

import Link from "next/link";
import ChapterVideo from "./ChapterVideo";
import { FaFilePdf } from "react-icons/fa6";
import { Button } from "../ui/button";

const ChapterContent = ({ chapterDetails }) => {
  if (!chapterDetails) {
    return (
      <h4 className="text-center text-xl text-muted-foreground">
        Chapter not found
      </h4>
    );
  }
  return (
    <section className="flex flex-col items-center md:items-start gap-3 w-full lg:w-3/5">
      <h3 className="text-xl font-bold text-muted-foreground">
        {chapterDetails.description}
      </h3>
      {/* course video */}
      <ChapterVideo src={chapterDetails.videoUrl} />
      {/* course attachment */}
      <Button variant="coursePage" size="lg" className="w-full">
        <Link
          href={chapterDetails.pdf}
          target="_blank"
          className="text-lg font-light gap-x-3 flex items-center w-full justify-between"
        >
          <FaFilePdf size={20} className="text-gray-600/80 " />
          Chapter PDF
        </Link>
      </Button>
    </section>
  );
};

export default ChapterContent;
