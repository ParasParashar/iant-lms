"use client"
import { createContext, useState } from "react"
const NostSearchBarContext = createContext({})
const [ShowBar,setShowBar]=useState(false)
const handleClick = ()=>{
    setShowBar(ShowBar)
}
const NotesSearchbar = () => {
  return (
    <NostSearchBarContext.Provider value={{ShowBar,handleClick}}>
        {children}
    </NostSearchBarContext.Provider>
  )
}

export default NotesSearchbar