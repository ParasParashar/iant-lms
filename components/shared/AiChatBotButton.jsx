"use client";

import { AiFillRobot } from "react-icons/ai";
import { Button } from "../ui/button";
import { useAiModel } from "@/hooks/useChatBot";
import { cn } from "@/lib/utils";

const AiChatBotButton = () => {
  const { toggleAiModel, isOpenAiModel } = useAiModel();
  return (
    <Button
      onClick={toggleAiModel}
      variant="outline"
      size="icon"
      className="rounded-full group "
    >
      <AiFillRobot
        size={22}
        className={cn(
          " text-muted-foreground group-hover:text-sky-400 ease-in transition-all duration-200",
          isOpenAiModel && "text-blue-400 "
        )}
      />
    </Button>
  );
};

export default AiChatBotButton;
