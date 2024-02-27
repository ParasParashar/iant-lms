"use client";
import Image from "next/image";
const NotFoundPage = ({ message }) => {
  return (
    <section className=" flex flex-col h-full w-full items-center gap-1 justify-center">
      <div className="relative h-[400px] w-[400px] max-sm:w-[320px] max-sm:h-[320px]  object-contain opacity-80 ">
        <Image
          src={"/Opps.png"}
          fill
          className="object-contain"
          alt="Image not found"
        />
      </div>
      <p className="text-[#f56b5a] text-xl max-sm:text-sm font-serif antialiased font-semibold">
        {message}
      </p>
    </section>
  );
};

export default NotFoundPage;
