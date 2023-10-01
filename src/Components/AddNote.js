import React from "react";
import noteContext from "../context/notes/NotesContext";
import { useContext } from "react";
import { useState } from "react";


const AddNote = () => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note,setNotes]=useState({title:"",description:"",tag:""})


    const handleClick=()=>{
        addNote(note.title,note.description,note.tag)
        document.getElementById("title").value=""
        document.getElementById("description").value=""
        document.getElementById("tag").value=""
    }
    const onChange=(e)=>{
        setNotes({...note, [e.target.name]:e.target.value})
    }

  return (
    <div>
      <h2 className="text-center">Add a note</h2>
      <form className="form" action="">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Enter the title"
            name="title"
            onChange={onChange}
            minLength={3} required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            placeholder="Description for notes"
            name="description"
            onChange={onChange}
            minLength={10} required
          />
          
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            placeholder="Tag"
            name="tag"
            onChange={onChange}
            minLength={3} required
          />
          
        </div>
        <div className="mb-3 text-center">
          <button disabled={note.title.length<3||note.description.length<10||note.tag.length<3} type="button" className="btn btn-primary mb-3" onClick={handleClick}>
            Add Note
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNote;
