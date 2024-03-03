"use client";
import { useAiModel } from "@/hooks/useChatBot";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { AiFillRobot } from "react-icons/ai";
import ChatBot from "./ChatBot";
import MessageHeaderPopover from "../messages/MessageHeaderPopover";

const ChatBotModel = () => {
  const { isOpenAiModel, closeAiModel } = useAiModel();

  return (
    <>
      {isOpenAiModel && (
        <section
          className={cn(
            "z-[99999] fixed w-full top-0 inset-y-0 md:w-1/2 lg:w-1/3 right-0 bg-gray-300 dark:bg-gray-700 border transition-all ease-in-out duration-1000",
            isOpenAiModel
              ? "  opacity-100 translate-x-0"
              : " opacity-0 -translate-x-full"
          )}
        >
          {/* heading */}
          <div className="flex  w-full items-center justify-between">
            <Button
              onClick={closeAiModel}
              variant="ghost"
              size="icon"
              className="rounded-full w-8 h-8  p-0 "
            >
              <MdOutlineKeyboardArrowRight size="30" className="text-primary" />
            </Button>
            <div className="flex items-center">
              <AiFillRobot size={22} className="text-blue-400 " />
              <h6 className="text-muted-foreground   text-xs lg:text-lg font-serif font-bold">
                IANT LMS Chat-bot
              </h6>
            </div>
            <MessageHeaderPopover aiChat />
          </div>

          {/* main area */}
          <ChatBot />
        </section>
      )}
    </>
  );
};

export default ChatBotModel;
