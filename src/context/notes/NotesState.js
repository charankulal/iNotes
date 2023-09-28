import React from "react";

import NotesContext from "./NotesContext";

const NotesState=(props)=>{
    const state={
        "name":"Charan",
        "class":"34d"
    }
    return(
        <NotesContext.Provider value={state}>
            {props.children}
        </NotesContext.Provider>
    )
}

export default NotesState