import React, { useState } from "react";

import NotesContext from "./NotesContext";
// import { useState } from "react";

const NotesState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

// Get all notes
  const getAllNotes = async () => {

    var response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUxNDU3MzhjZDU0ZTg2ZWE0MmQ5MzkwIn0sImlhdCI6MTY5NTg3NTMyN30.hwd5_sQfO5RcoTy3dYDkQ16u4ZClVcObw9BNOLGmFw8",
      },
    });
    var json=await response.json()

    console.log("response is ", json )
    setNotes(json)
  };
  // Add a note

  const addNote = async (title, description, tag) => {
    //TODO:API call
    // API Call 
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUxNDU3MzhjZDU0ZTg2ZWE0MmQ5MzkwIn0sImlhdCI6MTY5NTg3NTMyN30.hwd5_sQfO5RcoTy3dYDkQ16u4ZClVcObw9BNOLGmFw8"
      },
      body: JSON.stringify({title, description, tag})
    });

    const note = await response.json();
    setNotes(notes.concat(note))
  }



  // Delete a note
  const deleteNote = async (id) => {

    //API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUxNDU3MzhjZDU0ZTg2ZWE0MmQ5MzkwIn0sImlhdCI6MTY5NTg3NTMyN30.hwd5_sQfO5RcoTy3dYDkQ16u4ZClVcObw9BNOLGmFw8",
      }

      
    });
    var json=response.json()
    console.log(json)

    //Logic to delete node
    console.log("Deleting the note with id" + id);
    let newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //Edit a note
  const editNote = async (id, title, description, tag) => {
    //API Call

    const response = await fetch(`${host}/api/notes/updatenote/${notes._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUxNDU3MzhjZDU0ZTg2ZWE0MmQ5MzkwIn0sImlhdCI6MTY5NTg3NTMyN30.hwd5_sQfO5RcoTy3dYDkQ16u4ZClVcObw9BNOLGmFw8",
      },

      body: JSON.stringify({title, description, tag}),
    });
    const json = response.json();
    console.log(json)

    //Logic to edit a note
    for (let index = 0; index < notes.length; index++) {
      let element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        addNote,
        deleteNote,
        editNote,
        getAllNotes
      }}
    >
      {" "}
      {props.children}{" "}
    </NotesContext.Provider>
  );
};

export default NotesState;
