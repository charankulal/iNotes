import React from "react";
import noteContext from "../context/notes/NotesContext";
import { useContext } from "react";
import { useState } from "react";


const AddNote = () => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note,setNote]=useState({title:"",desc:"",tag:""})


    const handleClick=()=>{
        addNote(note.title,note.desc,note.tag)
        document.getElementById("title").value=""
        document.getElementById("desc").value=""
    }
    const onChange=(e)=>{
        setNote({...note, [e.target.name]:e.target.value})
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
          />
        </div>
        <div className="mb-3">
          <label htmlFor="desc" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="desc"
            placeholder="Description for notes"
            name="desc"
            onChange={onChange}
          />
          
        </div>
        <div className="mb-3 text-center">
          <button type="button" className="btn btn-primary mb-3" onClick={handleClick}>
            Add Notes
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNote;
