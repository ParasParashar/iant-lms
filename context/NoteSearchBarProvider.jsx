'use client'

import {createContext, useContext, useState}from 'react';
// creating context
const NoteSearchProvider = createContext({});

// creating hook to use context
export const useNoteSearchProvider=()=>{
    return useContext(NoteSearchProvider);
}


export const NoteSearchProviderContext=({children})=>{
    const [showBar,setShowBar]=useState(false)
const handleShow = ()=>{
    setShowBar(true)
}
const handleHide = ()=>{
    setShowBar(false)
}
return (

    <NoteSearchProvider.Provider value={{showBar,handleShow,handleHide}}>
    {children}
</NoteSearchProvider.Provider>
    )
}

