import React from "react";
import { useContext } from "react";
import NotesContext from "../context/notes/NotesContext";

export default function About() {
    const a=useContext(NotesContext)
  return <div>This is about page of {a.name}</div>;
}
