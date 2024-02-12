"use client";

import { useRouter } from "next/navigation";
import UserProgress from "../shared/UserProgress";
import { Button } from "../ui/button";
import { LuBookOpenCheck } from "react-icons/lu";

const ContinueLearningButton = ({
  completionPercentage,
  chapters,
  courseId,
}) => {
  const router = useRouter();
  const handleClick = (e) => {
    e.preventDefault();
    router.push(`/courses/${courseId}/chapters/${chapters[0]}`);
    router.refresh();
  };

  return (
    <section className="flex flex-col gap-2 w-full">
      <UserProgress value={completionPercentage} />
      <Button
        onClick={handleClick}
        variant="myAccessBtn"
        className="text-lg w-full flex items-center justify-center gap-x-6"
      >
        <LuBookOpenCheck size={25} />
        Continue Learning
      </Button>
    </section>
  );
};

export default ContinueLearningButton;
