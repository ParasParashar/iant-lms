"use client";

import { SignInButton, useAuth } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { redirect } from "next/navigation";
import { AiOutlineLogin } from "react-icons/ai";

const LoginButton = () => {
  const { userId } = useAuth();
  if (userId) {
    redirect("/home");
  } else {
    return (
      <>
        <SignInButton>
          <Button size={"lg"} className="text-lg ">
            <AiOutlineLogin className="mr-3 " />
            Login to continue.
          </Button>
        </SignInButton>
      </>
    );
  }
};

export default LoginButton;
