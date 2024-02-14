"use client";
import Link from "next/link";
import ChapterVideo from "./ChapterVideo";
import { FaFilePdf, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { Button } from "../ui/button";
import { useState } from "react";
import { markChapterProgress } from "@/actions/user.actions";
import { Loader } from "lucide-react";

const ChapterContent = ({ isCompleted, chapterDetails, courseId }) => {
  const [isLoading, setIsLoading] = useState(false);

  // Handle completion button click
  const handleChapterCompletion = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await markChapterProgress({
        chapterId: chapterDetails._id,
        courseId: courseId,
        type: "complete",
      });
    } catch (error) {
      console.error("Error marking chapter as complete:", error);
    }
    setIsLoading(false);
  };

  // Handle incomplete button click
  const handleChapterUnComplete = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await markChapterProgress({
        chapterId: chapterDetails._id,
        courseId: courseId,
        type: "unComplete",
      });
    } catch (error) {
      console.error("Error marking chapter as incomplete:", error);
    }
    setIsLoading(false);
  };

  return (
    <section className="flex flex-col items-center md:items-start gap-3 w-full">
      <h3 className="text-xl font-bold text-muted-foreground">
        {chapterDetails.description || "Chapter not found"}
      </h3>
      {/* Course video */}
      <ChapterVideo src={chapterDetails?.videoUrl} />
      {/* Course attachment */}
      <div className="flex max-sm:flex-wrap items-center w-full gap-4">
        <Button variant="coursePage" size="lg" className="w-full">
          <Link
            href={chapterDetails.pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg font-mono gap-x-3 flex items-center w-full justify-between"
          >
            <FaFilePdf size={20} className="text-gray-600/80 " />
            Chapter PDF
          </Link>
        </Button>
        {/* Completion button */}
        <Button
          disabled={!chapterDetails || isLoading}
          type="button"
          variant="outline"
          size="lg"
          className="text-lg font-semibold"
          onClick={
            isCompleted ? handleChapterUnComplete : handleChapterCompletion
          }
        >
          {isLoading ? (
            <Loader className="animate-spin  text-muted-foreground" />
          ) : isCompleted ? (
            <>
              <FaTimesCircle size={20} className="text-rose-500 mr-3" />
              Mark as Incomplete
            </>
          ) : (
            <>
              <FaCheckCircle size={20} className="text-blue-500 mr-3" />
              Mark as Complete
            </>
          )}
        </Button>
      </div>
    </section>
  );
};

export default ChapterContent;
