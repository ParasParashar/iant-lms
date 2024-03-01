"use client";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import qs from "query-string";
import { useDebounce } from "@/hooks/useDebounce";

const Searchbar = () => {
  const [search, setsearch] = useState("");
  const router = useRouter();
  const pathName = usePathname();
  const debouncedSearch = useDebounce((query) => {
    const url = qs.stringifyUrl({
      url: pathName,
      query: {
        note: query.length > 0 ? query : null,
      },
    });
    router.push(url);
  }, 200);

  const handleChange = (e) => {
    const searchTerm = e.target.value;
    setsearch(searchTerm);
    debouncedSearch(searchTerm);
  };
  return (
    <div className=' flex items-center  w-full'>
      <button className=' m-auto  notecardbg  w-full flex justify-between bg-none items-center rounded-2xl px-2 mx-1  text-white border  dark:border-neutral-600'>
        <input
          type="text"
          value={search}
          onChange={handleChange}
          className=" px-2 p-1 w-full outline-none text-primary dark:placeholder-white placeholder-[#000000] rounded-sm  bg-transparent"
          placeholder="Search Notes"
        />
        <IoSearch size={22} className='text-black dark:text-white' />
      
      </button>
    </div>
  );
};

export default Searchbar;
