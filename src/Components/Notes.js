import React from "react";
import { useContext, useEffect } from "react";
import noteContext from "../context/notes/NotesContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getAllNotes } = context;

  useEffect(() => {
    getAllNotes();
  }, )


  return (
    <>
      <AddNote />
      <div className="row g-3">
        <h2 className="text-center">Your notes</h2>
        {notes.map((notes) => {
          return <NoteItem key={notes._id} note={notes} />;
        })}
      </div>
    </>
  );
};

export default Notes;
