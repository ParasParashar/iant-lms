"use client";

import Link from "next/link";
import ChapterVideo from "./ChapterVideo";
import { FaFilePdf } from "react-icons/fa6";
import { Button } from "../ui/button";
import { FaCheckCircle } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";
import { useState } from "react";
import {
  markChapterProgress,
  markChapterUnComplete,
} from "@/actions/user.actions";

const ChapterContent = ({ isCompleted, chapterDetails, courseId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleChapterCompletion = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await markChapterProgress({
      chapterId: chapterDetails.id,
      courseId: courseId,
    });
    setIsLoading(false);
  };
  const handleChapterUnComplete = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await markChapterUnComplete({
      chapterId: chapterDetails.id,
      courseId: courseId,
    });
    setIsLoading(false);
  };

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
      <div className="flex items-center w-full gap-x-4">
        <Button variant="coursePage" size="lg" className="w-full">
          <Link
            href={chapterDetails.pdf}
            target="_blank"
            className="text-lg font-mono gap-x-3 flex items-center w-full justify-between"
          >
            <FaFilePdf size={20} className="text-gray-600/80 " />
            Chapter PDF
          </Link>
        </Button>
        {isCompleted ? (
          <Button
            disabled={isLoading}
            type="button"
            variant="outline"
            size="lg"
            className="text-lg font-semibold"
            onClick={handleChapterUnComplete}
          >
            <RxCrossCircled size={20} className="text-rose-500 mr-3" />
            Mark as Incomplete
          </Button>
        ) : (
          <Button
            disabled={isLoading}
            type="button"
            variant="outline"
            size="lg"
            onClick={handleChapterCompletion}
            className="text-lg font-semibold dark:text-sky-200 text-sky-800"
          >
            <FaCheckCircle size={20} className="text-blue-500 mr-3" />
            Mark as Complete
          </Button>
        )}
      </div>
    </section>
  );
};

export default ChapterContent;
