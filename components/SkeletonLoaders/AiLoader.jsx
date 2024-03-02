import { GiArtificialHive } from "react-icons/gi";

const AiLoader = () => {
  return (
    <div className=" bg-muted p-1 relative flex-col flex items-center justify-center rounded-lg  w-full transition-all ease-in-out duration-300 my-2">
      <GiArtificialHive size={40} className="text-purple-700 animate-spin" />
      <p className=" text-muted-foregroun0 text-sm animate-pulse">
        Ai Bot is thinking
      </p>
    </div>
  );
};

export default AiLoader;
