import React, { useState } from "react";

import NotesContext from "./NotesContext";
// import { useState } from "react";

const NotesState=(props)=>{
    
    const notesInitial=
        [
            {
              "_id": "6515929afbfda03963b72aa7",
              "user": "65145738cd54e86ea42d9390",
              "title": "My Title",
              "description": "Please wake me up early",
              "tag": "personal",
              "date": "2023-09-28T14:50:02.563Z",
              "__v": 0
            },
            {
              "_id": "651592a0fbfda03963b72aa9",
              "user": "65145738cd54e86ea42d9390",
              "title": "My Title 1",
              "description": "Please wake me up early",
              "tag": "personal",
              "date": "2023-09-28T14:50:08.950Z",
              "__v": 0
            },
            {
              "_id": "651592affbfda03963b72aab",
              "user": "65145738cd54e86ea42d9390",
              "title": "My Title 2",
              "description": "Please wake me up early",
              "tag": "personal",
              "date": "2023-09-28T14:50:23.691Z",
              "__v": 0
            }
          ]
          
    
          const [notes,setNotes]=useState(notesInitial)
          // Add a note
          const addNote=(title,description,tag)=>{
            let note={
              "_id": "651592affbfda03963b72abc",
              "user": "65145738cd54e86ea42d9390",
              "title": title,
              "description":description,
              "tag": tag,
              "date": "2023-09-28T14:50:23.691Z",
              "__v": 0
            }
            setNotes(notes.concat(note))
          }


          // Delete a note
          const deleteNote=()=>{
            
          }




          //Edit a note
          const editNote=()=>{
            
          }




    return(
        <NotesContext.Provider value={{notes,addNote,deleteNote,editNote}}>
            {props.children}
        </NotesContext.Provider>
    )
}

export default NotesState