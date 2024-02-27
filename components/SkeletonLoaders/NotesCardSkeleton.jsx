import React from 'react'
import { Skeleton } from '../ui/skeleton'

const NotesCardSkeleton = () => {
  return (
    <div className="p-2 flex flex-col gap-4 w-full h-[250px] rounded-lg border dark:border-white/10">
      <section className='flex justify-between'>
      <Skeleton className="h-6 w-3/4 rounded-lg " />
      <Skeleton className="h-10 w-[15%] rounded-full p-2" />
      </section>
      <Skeleton className=" h-32 w-11/12 rounded-lg" />
      <section className='space-y-1'>
      <Skeleton className="h-5 w-3/4 rounded-lg p-2" />
      <Skeleton className="h-2 w-11/12 rounded-lg p-2" />
      <Skeleton className="h-2 w-1/2 rounded-lg p-2" />
      </section>
    </div>
  )
}

export default NotesCardSkeleton