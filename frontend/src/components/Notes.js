import React, { useContext, useEffect, useRef ,useState} from "react";
import NoteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import { Navigate, useNavigate } from "react-router-dom";
import NoteState from "../context/notes/NoteState";
const Notes = (props) => {
    const {showAlert} =props;
   const navigate=useNavigate();
    const context = useContext(NoteContext);
    const { notes, getallnotes,editnote } = context;
    const ref = useRef(null);
    const refclose=useRef(null);
    const { addnote } = context;
    const [note, setnote] = useState({id:"", title: "", description: "", tag: "default" })
    useEffect(() => {
    if(localStorage.getItem('token')){
        getallnotes()
    }
    else{
        navigate("/login")
    }
    }, [])
    const updatenote = (currentnote) => {
        ref.current.click();
        setnote({id:currentnote._id,title:currentnote.title,description:currentnote.description,tag:currentnote.tag});
    }
   
    const handleClick = (e) => {
        editnote(note.id,note.title, note.description, note.tag);
        refclose.current.click();
        showAlert("Updated Successfully","success")

    }
    const onchange = (e) => {
        // spread operator to make shallow copy 
        setnote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <button ref={ref} type="button" class="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
            </button>
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div class="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close " data-bs-dismiss="modal" aria-label="Close" ></button>
                        </div>
                        <div className="modal-body">
                            <div className="container my-5">
                                <form action="">
                                    <div className="mb-3">
                                        <label for="title" className="form-label" minLength={3} required>Title</label>
                                        <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onchange} value={note.title}/>
                                    </div>
                                    <div class="mb-3">
                                        <label for="description" className="form-label" minLength={5} required>Description</label>
                                        <input type="text" className="form-control" id="description" name="description" onChange={onchange} value={note.description} />
                                    </div>
                                    <div class="mb-3">
                                        <label for="description" className="form-label" >Tag</label>
                                        <input type="text" className="form-control" id="tag" name="tag" onChange={onchange} value={note.tag} />
                                    </div>
                                   
                                </form>
                            </div>
                        </div>
                        <div ref={refclose} class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" onClick={handleClick} disabled={note.title.length<3 || note.description.length<5}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3 ">
                <h2>Your Notes</h2>
                <div className="container"> {(notes.length===0) && 'No Notes to Display'}</div>
               
                {notes.map((note) => {
                    return <NoteItem note={note} key={note._id} updatenote={updatenote} showAlert={showAlert}/>
                })}
            </div>
        </>
    )
}
export default Notes;