import React from "react";
import { useContext,useEffect } from "react";
import NotesContext from "../context/notes/NotesContext";

export default function About() {
    const a=useContext(NotesContext)
    useEffect(() => {
    a.update()
    }, )
  return <div>This is about page of {a.state.name}</div>;
}
