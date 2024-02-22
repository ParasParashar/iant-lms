import { IoSearch } from "react-icons/io5"


const Searchbar = () => {
  return (
    <div className=' flex items-center my-2'>
      <button className=' m-auto py-[2px] notecardbg  w-[16rem] flex justify-between bg-none items-center rounded-2xl px-4 mx-1  text-white border  dark:border-neutral-600'>
        <input
          type="text"
          className=' px-2 p-1 w-[15rem] outline-none  dark:placeholder-white placeholder-[#000000] rounded-sm text-[13px] bg-transparent  '
          placeholder='Search Notes'
        />
        <IoSearch size={22} className='text-black' />
      
      </button>
    </div>
  )
}

export default Searchbar