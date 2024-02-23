// import LoginButton from "@/components/shared/LoginButton";
import { Button } from "@/components/ui/button";
import { SignInButton, auth } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";
import { AiOutlineLogin } from "react-icons/ai";

const LoginPage = () => {
  const { userId } = auth();
  if (userId) redirect("/home");
  return (
    <>
      <main className=" w-screen h-full relative overflow-hidden m-auto ">
        <Image src={"/login_bg.png"} className="max-sm:hidden" fill />

        <div className=" absolute max-lg:top-[7%] top-[13%] right-[35%] left-[35%] ">
          <div className="flex flex-col items-center justify-evenly gap-20 max-lg:gap-8">
            <div>
              <div className="w-[275px] h-[82px]  relative ">
                <Image src={"/iantlogo.png"} fill />
              </div>
            </div>
            <div className="flex items-center gap-8 max-lg:flex-col max-lg:gap-8">
              <div className="gap-10 flex flex-col max-lg:items-center max-lg:gap-6">
                <div className=" text-nowrap font-serif text-4xl text-gray-600 pb-6 max-lg:pb-2 max-lg:text-3xl max-md:text-2xl max-lg:text-center leading-[1.5]  font-[900]">
                  <span>Welcome to</span>
                  <br />
                  <span className="text-blue-800 ">IANT</span> Learning
                  <br />
                  Management System
                </div>
                <div>
                  {!userId && (
                    <SignInButton>
                      <Button
                        variant="ghost"
                        size={"lg"}
                        className="text-lg border-2 border-white "
                      >
                        <AiOutlineLogin className="mr-3 " />
                        Login to continue.
                      </Button>
                    </SignInButton>
                  )}
                  {/* <LoginButton /> */}
                </div>
              </div>
              <div>
                <div className="w-[25vw] h-[380px] relative max-lg:w-[35vw] max-lg:h-[45vh] max-md:h-[45vh] max-md:w-[40vw] max-sm:h-[45vh] max-sm:w-[55vw]">
                  <Image src={"/ai_img1.png"} fill />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default LoginPage;
