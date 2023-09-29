import React from "react";

const NoteItem = (props) => {
  const { note } = props;
  return (
 
      <div className="card m-2 col-md-3">
        <div className="card-body">
          <div className="d-flex align-items-center">
          <h5 className="card-title mx-4">{note.title}</h5>
          
          <i className="far fa-trash-alt  mx-3"></i>
          <i className="far fa-edit mx-2"></i>
          </div>
        </div>
        <p className="card-text">{note.description}</p>
      </div>

  );
};

export default NoteItem;
