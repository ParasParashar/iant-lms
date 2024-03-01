"use client";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import qs from "query-string";
import { useDebounce } from "@/hooks/useDebounce";
import { Button } from "../ui/button";
import { useNoteSearchProvider } from "@/context/NoteSearchBarProvider";
import { RxCross2 } from "react-icons/rx"
const Searchbar = () => {
  const { handleHide } = useNoteSearchProvider();
  const router = useRouter();

  const [search, setsearch] = useState("");
  const [toggle, setToggle] = useState(false)
  const handleClick = (e) => {
    e.preventDefault();
    setsearch("");
    handleHide();
    router.push('/notes')
  };
  
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
    setToggle(searchTerm ? true : false)
    debouncedSearch(searchTerm);
  };
  return (
    <div className=' flex items-center  w-full'>
      <div className=' m-auto   w-full flex justify-between bg-none items-center rounded-2xl px-2 mx-1  text-white border border-black/20  dark:border-neutral-600'>
        <input
          type="text"
          value={search}
          onChange={handleChange}
          className=" px-2 p-1 w-full outline-none text-primary dark:placeholder-white placeholder-[#000000] rounded-sm  bg-transparent"
          placeholder="Search Notes"
        />
        {toggle ? (
          <button
            onClick={handleClick}

          >
            <RxCross2 className="text-red-500" size={25} />
          </button>
        )
          : (<IoSearch size={22} className='text-black dark:text-white' />)}

      </div>
    </div>
  );
};

export default Searchbar;
