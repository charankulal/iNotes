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
        "auth-token": localStorage.getItem('token'),
      },
    });
    var json = await response.json();

    console.log("response is ", json);
    setNotes(json);
  };
  // Add a note

  const addNote = async (title, description, tag) => {
    //TODO:API call
    // API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const note = await response.json();
    setNotes(notes.concat(note));
    props.showAlert("Created Notes successfully", "success");
  };

  // Delete a note
  const deleteNote = async (id) => {
    //API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    var json = response.json();
    console.log(json);

    //Logic to delete node
    console.log("Deleting the note with id" + id);
    let newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
    props.showAlert("Deleted a note successfully", "danger");
  };

  //Edit a note
  const editNote = async (id, title, description, tag) => {
    //API Call

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },

      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();
    console.log(json);

    //Logic to edit a note
    for (let index = 0; index < notes.length; index++) {
      let element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
    props.showAlert("Edited the note successfully", "success");
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        addNote,
        deleteNote,
        editNote,
        getAllNotes,
      }}
    >
      {" "}
      {props.children}{" "}
    </NotesContext.Provider>
  );
};

export default NotesState;
