import React from 'react'
import { useContext } from "react";
import noteContext from '../context/notes/NotesContext'
import NoteItem from './NoteItem';

const Notes = () => {
    const context=useContext(noteContext)
    const {notes,setNotes}=context
  return (
    <div className='row g-3'>
      <h2 className="text-center">Your notes</h2>
      {notes.map((notes)=>{
        return <NoteItem note={notes}/>
      })}
    </div>
  )
}

export default Notes
