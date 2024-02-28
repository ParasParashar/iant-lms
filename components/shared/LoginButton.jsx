"use client";

import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { AiOutlineLogin } from "react-icons/ai";

const LoginButton = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/home");
  };

  return (
    <Button
      onClick={handleClick}
      variant="outline"
      size={"lg"}
      className="text-lg  bg-secondary hover:bg-gray-400"
    >
      <AiOutlineLogin className="mr-3 " />
      Continue Learning
    </Button>
  );
};

export default LoginButton;
