import React from "react";
import { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/NotesContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";

const Notes = (props) => {
  const ref = useRef(null);
  const refClose = useRef(null);
  const context = useContext(noteContext);
  const { notes, getAllNotes, editNote } = context;
  const [note, setNotes] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  useEffect(() => {
    getAllNotes();
  });

  const updateNote = (currentNote) => {
    ref.current.click();
    setNotes({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleClick = () => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    document.getElementById("etitle").value = "";
    document.getElementById("edescription").value = "";
    document.getElementById("etag").value = "";
    refClose.current.click();
  };
  const onChange = (e) => {
    setNotes({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote showAlert={props.showAlert}/>

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
                    minLength={3} required
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
                    minLength={10} required
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
                    minLength={3} required

                  />
                </div>
                <div className="mb-3 text-center"></div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
              disabled={note.etitle.length<3||note.edescription.length<10||note.etag.length<3}
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row g-3">
        <h2 className="text-center">Your notes</h2>
        <div className='container'>
          <p className=" text-center fs-3">
        {notes.length===0&&`Nothing to show here..`}
        </p>
        </div>
        {notes.map((notes) => {
          return (
            <NoteItem key={notes._id} updateNote={updateNote} note={notes} showAlert={props.showAlert}/>
          );
        })}
      </div>
    </>
  );
};

export default Notes;
