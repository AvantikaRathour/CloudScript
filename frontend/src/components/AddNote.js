import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
const AddNote = (props) => {
    const { showAlert } = props;
    const context = useContext(NoteContext);
    const { addnote } = context;
    const [note, setnote] = useState({ title: "", description: "", tag: "" })
    const handleClick = (e) => {
        e.preventDefault();
        if (note.title.length >= 3 && note.description.length >= 5) {
            addnote(note.title, note.description, note.tag);
            setnote({ title: "", description: "", tag: "" });
            showAlert("Added Successfully", "success");
        } else {
            showAlert("Title or description is too short", "danger");
            console.log(localStorage.getItem('token'))

        }
    }
    const onchange = (e) => {
        // spread operator to make shallow copy 
        setnote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div className="container my-5">
                <h2>Add Note</h2>
                <form action="">
                    <div class="mb-3">
                        <label for="title" className="form-label" >Title</label>
                        <input type="text" value={note.title} className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onchange} />
                    </div>
                    <div class="mb-3">
                        <label for="description" className="form-label" >Description</label>
                        <input type="text" value={note.description} className="form-control" id="description" name="description" onChange={onchange} />
                    </div>
                    <div class="mb-3">
                        <label for="description" className="form-label" >Tag</label>
                        <input type="text" value={note.tag} className="form-control" id="tag" name="tag" onChange={onchange} />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
            </div></>
    )

}

export default AddNote;