import React, { useState } from "react";

import NotesContext from "./NotesContext";
// import { useState } from "react";

const NotesState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [
    {
      _id: "6515929afbfda03963b72aa7",
      user: "65145738cd54e86ea42d9390",
      title: "My Title",
      description: "Please wake me up early",
      tag: "personal",
      date: "2023-09-28T14:50:02.563Z",
      __v: 0,
    },
    {
      _id: "651592a0fbfda03963b72aa9",
      user: "65145738cd54e86ea42d9390",
      title: "My Title 1",
      description: "Please wake me up early",
      tag: "personal",
      date: "2023-09-28T14:50:08.950Z",
      __v: 0,
    },
    {
      _id: "651592affbfda03963b72aab",
      user: "65145738cd54e86ea42d9390",
      title: "My Title 2",
      description: "Please wake me up early",
      tag: "personal",
      date: "2023-09-28T14:50:23.691Z",
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(notesInitial);
  // Add a note
  const addNote = async (title, description, tag) => {

    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUxNDU3MzhjZDU0ZTg2ZWE0MmQ5MzkwIn0sImlhdCI6MTY5NTg3NTMyN30.hwd5_sQfO5RcoTy3dYDkQ16u4ZClVcObw9BNOLGmFw8",
      },

      body: JSON.stringify({title,description,tag}),
    });


    let note = {
      _id: "651592affbfda03963b72abc",
      user: "65145738cd54e86ea42d9390",
      title: title,
      description: description,
      tag: tag,
      date: "2023-09-28T14:50:23.691Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };

  // Delete a note
  const deleteNote = (id) => {
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
      }}
    >
      {" "}
      {props.children}{" "}
    </NotesContext.Provider>
  );
};

export default NotesState;
