"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import UserProgress from "./UserProgress";

const CourseCard = ({ title, isEnrollred, img_Url, category, id, value }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`courses/${id}`);
  };

  return (
    <Card
      onClick={handleClick}
      className="flex flex-col justify-between hover:shadow-lg cursor-pointer group"
    >
      <CardHeader>
        <div className="relative aspect-square">
          <Image
            src={img_Url}
            alt={title}
            fill
            className="rounded-lg object-fill  "
          />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-1 justify-center">
        <CardTitle className=" font-bold group-hover:underline text-lg text-black/70 dark:text-white">
          {title}
        </CardTitle>
        <span className="text-white px-3 max-w-[200px] min-w-[100px] text-xs rounded-lg  bg-blue-500">
          {category}
        </span>
      </CardContent>
      <CardFooter className=" bg-muted dark:bg-slate-900/80 p-4">
        {isEnrollred ? (
          <>
            <UserProgress value={value} />
          </>
        ) : (
          <Button
            onClick={handleClick}
            className=" w-full myAccessBtn hover:bg-blue-600"
          >
            Enroll
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
