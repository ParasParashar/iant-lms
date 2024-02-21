"use client"
import { useState } from "react"
import BigEditor from "../shared/BigEditor"
import { Button } from "../ui/button"

const MainNotesEditor = () => {
    const [title , setTitle]=useState("")
    const [content , setContent]=useState("")
    const handleTitleChange=(e)=>{
        setTitle(e.target.value)
    }
    const handleContentChange=(e)=>{
        setContent(e.target.value)
    }
    
  
    return (
        <div className="flex flex-col items-center justify-center gap-1">
            <Button className="text-lg bg-[#9670f8] w-full hover:bg-[#b09eff]">Save</Button>
            <BigEditor
            Content={title}
            HandleContentChange={handleContentChange}
            Title={content}
            HandleTitleChange={handleTitleChange}
            />
        </div>
    )
}

export default MainNotesEditor