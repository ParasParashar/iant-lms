"use client"
import { useState } from "react"
import BigEditor from "../shared/BigEditor"
import { Button } from "../ui/button"
import { createNote } from "@/actions/note.actions"

const MainNotesEditor = () => {

    return (
        <div className="flex flex-col items-center justify-center gap-1">
            <Button
            className="text-lg btn-grad btn-grad:hover w-full">Save</Button>
            <BigEditor
            // Content={content}
            // HandleContentChange={handleContentChange}
            // Title={title}
            // HandleTitleChange={handleTitleChange}
            />
        </div>
    )
}

export default MainNotesEditor