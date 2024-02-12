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

const CourseCard = ({ title, img_Url, category, id }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`courses/${id}`);
  };

  return (
    <Card className="flex flex-col gap-3 justify-between hover:shadow-lg  ">
      <CardHeader>
        <div className="relative h-64 w-80% object-cover overflow-hidden md:h-48 lg:h-60 ">
          <Image
            src={img_Url}
            alt={title}
            fill
            className="rounded-md object-fill  "
          />
        </div>
        {/* <div className="relative  aspect-square">
          <Image
            src={img_Url}
            alt={title}
            fill
            className="rounded-md object-fill  "
          />
        </div> */}
      </CardHeader>
      <CardContent className="flex flex-col justify-center">
        {/* to customise the size of  image only edit below div don't add any class to image tag  */}

        <CardTitle className=" text-black/70 dark:text-white">
          {title}
        </CardTitle>
        <span className="text-secondary-foreground text-sm rounded-lg mt-1 bg-blue-500">
          {category}
        </span>
      </CardContent>
      <CardFooter className=" bg-slate-300/80 dark:bg-secondary p-4">
        {/* here we use accessButton variant in button you can customise it in button.tsx component. */}
        <Button className="ml-auto" variant="myAccessBtn" onClick={handleClick}>
          Enroll
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
