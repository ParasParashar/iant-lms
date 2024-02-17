import { IoSearch } from "react-icons/io5"


const Searchbar = () => {
  return (
    <div className=' flex items-center my-2'>
      <div className=' m-auto py-[2px] bg-[#e5e5fe] w-[16rem] flex justify-between bg-none items-center rounded-2xl px-4 mx-1 hover:bg-[#d8d8fc]  border  dark:border-neutral-600  '>
        <input
          type="text"
          className=' px-2 p-1 w-[15rem] outline-none placeholder-[#3541a0] rounded-sm text-[13px] bg-transparent dark:text-black '
          placeholder='Search Notes'
        />
        <IoSearch size={22} className='text-[#343080]' />
      
      </div>
    </div>
  )
}

export default Searchbar