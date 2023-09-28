import React from "react";

import NotesContext from "./NotesContext";
// import { useState } from "react";

const NotesState=(props)=>{
    
    return(
        <NotesContext.Provider value={{}}>
            {props.children}
        </NotesContext.Provider>
    )
}

export default NotesState