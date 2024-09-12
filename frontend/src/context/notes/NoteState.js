import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "https://cloudscript.onrender.com"

  const [notes, setnotes] = useState([])

  // fetch all notes
  const getallnotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = await response.json()
    setnotes(json);
  }

  // Add a note
  const addnote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),

    });
    // const json=response.json({title,description,tag});
    const note = await response.json();
    setnotes(notes.concat(note));
  }

  // delete a note
  const deletenote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
    });
    console.log(response);
    const newnotes = notes.filter((note) => {
      return note._id !== id;
    })
    setnotes(newnotes);
  }
  // edit a note
  const editnote = async (id, title, description, tag) => {

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title, description, tag }),
      headers: {
        "auth-token": localStorage.getItem('token'),
        "Content-Type": "application/json"
      },
    });
    console.log(response)
    let newnotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newnotes.length; index++) {
      const element = newnotes[index];
      if (element._id === id) {
        newnotes[index].title = title;
        newnotes[index].description = description;
        newnotes[index].tag = tag;
        break;

      }

    }
    setnotes(newnotes);

  }
// get user info

  return (
    <NoteContext.Provider value={{ notes, addnote, deletenote, editnote, getallnotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;