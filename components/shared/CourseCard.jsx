"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import UserProgress from "./UserProgress";
import Link from "next/link";

const CourseCard = ({ title, isEnrollred, img_Url, category, id, value }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`courses/${id}`);
  };

  return (
    // <Link href={`coursels/${id}`}>
    <Card
      onClick={handleClick}
      className="flex flex-col gap-3 justify-between hover:shadow-lg cursor-pointer  "
    >
      <CardHeader>
        <div className="relative object-contain  aspect-video">
          <Image
            src={img_Url}
            alt={title}
            fill
            className="rounded-lg object-fill  "
          />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3  justify-center">
        {/* to customise the size of  image only edit below div don't add any class to image tag  */}
        <span className="text-white px-3 max-w-[200px] min-w-[100px] text-xs rounded-lg  bg-blue-500">
          {category}
        </span>
        <CardTitle className=" font-light text-lg text-black/70 dark:text-white">
          {title}
        </CardTitle>
      </CardContent>
      <CardFooter className=" bg-muted dark:bg-slate-900/80 p-4">
        {isEnrollred ? (
          <>
            <UserProgress value={value} />
          </>
        ) : (
          <Button
            onClick={handleClick}
            className=" w-full"
            variant="myAccessBtn"
          >
            Enroll
          </Button>
        )}
      </CardFooter>
    </Card>
    // </Link>
  );
};

export default CourseCard;
