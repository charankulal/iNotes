import React, { useContext } from "react";
import noteContext from "../context/notes/NotesContext";

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;
  return (
    <div className="card m-2 col-md-3">
      <div className="card-body">
        <div className="d-flex align-items-center">
          <h5 className="card-title mx-4">{note.title}</h5>

          <i
            className="far fa-trash-alt  mx-3"
            onClick={() => {
              deleteNote(note._id);
              // props.showAlert("Deleted Note successfully", "danger");
            }}
          ></i>
          <i
            className="far fa-edit mx-2"
            onClick={() => {
              updateNote(note);
              // props.showAlert("Updated Note successfully",'success')
            }}
          ></i>
        </div>
      </div>
      <p className="card-text">{note.description}</p>
      <span className="text-left text-danger">{note.tag}</span>
    </div>
  );
};

export default NoteItem;
