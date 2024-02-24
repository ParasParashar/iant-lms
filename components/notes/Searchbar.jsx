'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoSearch } from "react-icons/io5"
import qs from "query-string";
import { useDebounce } from "@/hooks/useDebounce";



const Searchbar = () => {
  const [search, setsearch] = useState('');
  const router = useRouter();
  
  const handleClick = () => {
    const url = qs.stringifyUrl({
      url: pathName,
      query: {
        note: search.length > 0 ?search:null,
      },
    });
    router.push(url);
    setsearch('')
  };
  
  const debounceClick=useDebounce(handleClick, 200)
  
  const handleChange = (e) => { 
    setsearch(e.target.value)
    debounceClick();
  };
  return (
    <div className=' flex items-center my-2'>
      <button className=' m-auto py-[2px] notecardbg  w-[16rem] flex justify-between bg-none items-center rounded-2xl px-4 mx-1  text-white border  dark:border-neutral-600'>
        <input
          type="text"
          value={search}
          onChange={handleChange}
          className=' px-2 p-1 w-[15rem] outline-none  dark:placeholder-white placeholder-[#000000] rounded-sm text-[13px] bg-transparent  '
          placeholder='Search Notes'
        />
        <IoSearch size={22} className='text-black' />
      
      </button>
    </div>
  )
}

export default Searchbar