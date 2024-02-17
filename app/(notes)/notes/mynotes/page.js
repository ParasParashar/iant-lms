import { getAllUserNotes } from "@/actions/note.actions"
import Notescard from "@/components/notes/Notescard"


const page = async() => {
  const notes = await getAllUserNotes()
  console.log(notes,"notes")
  return (
    <div >
      {notes?(
        <>
        {notes.map((item)=>(
        <Notescard 
        key={item._id}
        title={item.title}
        content={item.content}
        noteid={item._id}
        ispublished={item.ispublished}
        time={item.timestamp}
        />
      ))}
        </>
      )
    :"notes not found"
    }
      
    </div>
  )
}

export default page