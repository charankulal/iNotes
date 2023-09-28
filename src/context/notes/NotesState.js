import React from "react";

import NotesContext from "./NotesContext";
import { useState } from "react";

const NotesState=(props)=>{
    const s1={
        "name":"Charan",
        "class":"34d"
    }

    const [state,setState]=useState(s1)
    const update=()=>{
        setTimeout(() => {
            setState({
                "name":"Cherry",
                "class":"4f"
            })
        }, 1000);
    }
    return(
        <NotesContext.Provider value={{state,update}}>
            {props.children}
        </NotesContext.Provider>
    )
}

export default NotesState