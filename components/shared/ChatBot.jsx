"use client";

import { SlEnergy } from "react-icons/sl";
import { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import { cn } from "@/lib/utils";
import { AiFillRobot } from "react-icons/ai";
import AiLoader from "../SkeletonLoaders/AiLoader";
import UserAvatar from "../messages/UserAvatar";
import { useUser } from "@clerk/nextjs";
import { createAiChat, getUserAiChats } from "@/actions/chatbot.actions";
import { useAiModel } from "@/hooks/useChatBot";
import ReactMarkdown from "react-markdown";
const ChatBot = () => {
  const { user } = useUser();
  const chatRef = useRef();
  const [search, setSearch] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isOpenAiModel, openAiModel } = useAiModel();
  // display previous ai chats
  useEffect(() => {
    async function getPreviousAiChats() {
      setLoading(true);
      const data = await getUserAiChats();
      setMessages(data);
      setLoading(false);
    }
    getPreviousAiChats();
  }, [isOpenAiModel, openAiModel]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (search.trim() !== "") {
        const userMessage = {
          content: search,
          role: "user",
        };
        const newMessages = [...messages, userMessage];

        await createAiChat({
          content: search,
          role: "user",
        });
        // Make the axios.post call and wait for the response
        const response = await axios.post("/api/conversation", {
          messages: newMessages,
        });
        setMessages((prev) => [...prev, userMessage, response.data]);
        setSearch("");
      }
    } catch (error) {
      console.log("Error in submit chat ai", error.message);
    } finally {
      setLoading(false);
    }
  };

  // scroll ref to top
  useEffect(() => {
    const screen = chatRef.current;
    screen.scrollTo(0, screen.scrollHeight);
  }, [messages]);

  return (
    <main className=" flex flex-col h-screen px-3   pb-20 gap-y-2">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex  flex-col p-1 rounded-lg  gap-y-2 bg-muted  justify-between items-center w-full"
      >
        <Input
          autoFocus
          value={search}
          onChange={handleChange}
          placeholder="What is c programming language?"
          className="w-full h-10  rounded-md  outline-none border-0 focus-visible:ring-0 focus:bg-muted  bg-transparent focus-visible:ring-transparent focus:border-none  text-[15px] break-all break-words  border-muted "
        />
        <Button
          type="submit"
          variant="default"
          size="sm"
          className="rounded-md  w-full "
          disabled={loading || search.length === 0}
        >
          <SlEnergy size={25} className="text-blue-400" />
        </Button>
      </form>
      {/* outputus */}
      {loading && <AiLoader />}
      {/* show the fallback if messages is empty */}
      {messages?.length === 0 && !loading && (
        <div className="p-3 flex flex-col justify-center items-center text-muted-foreground overflow-y-hidden">
          <AiFillRobot size={80} className="text-blue-600 " />
          <span className="text-center text-lg font-bold text-sky-300 ">
            Let&apos;s start the solving doubts.
          </span>
          <span className="text-sm ">How can I help You?</span>
        </div>
      )}
      <div
        ref={chatRef}
        className="overflow-y-auto flex flex-col gap-y-3 px-3 main-scrollbar"
      >
        {/* <div className="flex-grow flex flex-col-reverse gap-2"> */}
        {messages?.map((message, index) => (
          <div
            key={index}
            className={cn(
              "p-2 w-full  flex items-start gap-x-4 rounded-lg text-lg",
              message.role === "user"
                ? "   border border-black/15"
                : " bg-muted "
            )}
          >
            {message.role === "user" ? (
              <UserAvatar name={user.firstName} />
            ) : (
              <span className="p-1 rounded-full bg-black ">
                <SlEnergy
                  size={18}
                  className="text-blue-500  duration-500 ease-in-out transition-all"
                />
              </span>
            )}
            <ReactMarkdown
              components={{
                pre: ({ node, ...props }) => (
                  <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                    <pre {...props} />
                  </div>
                ),
                code: ({ node, ...props }) => (
                  <code className="bg-black/10 rounded-lg p-1" {...props} />
                ),
              }}
              className="text-sm overflow-hidden leading-7"
            >
              {message.content || ""}
            </ReactMarkdown>
          </div>
        ))}
      </div>
      {/* </div> */}
    </main>
  );
};

export default ChatBot;
