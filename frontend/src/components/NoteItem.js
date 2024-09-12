import React, { useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import NoteContext from "../context/notes/NoteContext";
const NoteItem = (props) => {
  const {showAlert}=props;
  const context = useContext(NoteContext);
  const { deletenote } = context;
  const { note,updatenote} = props;
  return (
    <>

      <div className="col-md-3">
        <div class="card my-3">
          <div class="card-body">
            <div className="d-flex align-items-center">
              <h5 class="card-title"> {note.title}</h5>
              <FontAwesomeIcon icon={faTrash} className="mx-2 i" onClick={() => {deletenote(note._id);  showAlert("Deleted Successfully","success")}} />
              <FontAwesomeIcon icon={faPenToSquare} className="mx-2 i" onClick={()=>{updatenote(note)}}  />
            </div>
            <p class="card-text">{note.description}</p>

          </div>
        </div>
      </div>
    </>
  )
}

export default NoteItem;