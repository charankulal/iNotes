import React from "react";
import { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/NotesContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getAllNotes,addNote } = context;
  const [note,setNotes]=useState({etitle:"",edescription:"",etag:""})

  useEffect(() => {
    getAllNotes();
  });

  const updateNote = (currentNote) => {
    ref.current.click()
    setNotes({etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
  };

  const handleClick=()=>{
    addNote(note.etitle,note.edescription,note.etag)
    document.getElementById("etitle").value=""
    document.getElementById("edescription").value=""
    document.getElementById("etag").value=""
}
const onChange=(e)=>{
    setNotes({...note, [e.target.name]:e.target.value})
}

  const ref=useRef(null)


  return (
    <>
      <AddNote />

      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
            <form className="form" action="">
        <div className="mb-3">
          <label htmlFor="etitle" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="etitle"
            placeholder="Enter the title"
            name="etitle"
            onChange={onChange}
            value={note.etitle}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="edescription" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="edescription"
            placeholder="Description for notes"
            name="edescription"
            onChange={onChange}
            value={note.edescription}
          />
          
        </div>
        <div className="mb-3">
          <label htmlFor="etag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="etag"
            placeholder="Tag"
            name="etag"
            onChange={onChange}
            value={note.etag}
          />
          
        </div>
        <div className="mb-3 text-center">
        </div>
      </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handleClick}>
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row g-3">
        <h2 className="text-center">Your notes</h2>
        {notes.map((notes) => {
          return (
            <NoteItem key={notes._id} updateNote={updateNote} note={notes} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
