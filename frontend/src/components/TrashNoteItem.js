import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const TrashNoteitem = ({ note, mode, showAlert }) => {
    const context = useContext(noteContext);
    const { trashedNotes, setTrashedNotes, editNote, deleteNote } = context;
    const [hide, setHide] = useState(false);

    const deleteDate = new Date(note.expireAt);
    const currentDate = new Date();
    const remainingDays = Math.round((deleteDate - currentDate) / (1000 * 84600));

    const handleMouseEnter = () => {
        setHide(true);
    }

    const handleMouseExit = () => {
        setHide(false);
    }

    const restore = async () => {
        await editNote(note._id, note.title, note.description, note.tag, null, 'remove');
        setTrashedNotes(trashedNotes.filter(({ _id }) => _id !== note._id));
        showAlert("Note restored successfully", "success")
    }

    const handleDelete = async () => {
        await deleteNote(note);
        setTrashedNotes(trashedNotes.filter(({ _id }) => _id !== note._id));
        showAlert("Note deleted successfully", "success")
    }

    return (
        <div className='col-md-4'>
            <div className="cardParent card  my-1" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseExit}>
                <div className={`card-body ${mode === 'light' ? 'signupContainer-light' : 'signupContainer-dark'}`} style={{padding: "0 1.5em 1.5em 1.5em"}}>
                    <span style={{position: "relative", left: "9em"}} title="Remaining Days">{remainingDays}days</span>
                    <h5 className="card-title mb-3">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <div className={`icons ${mode === 'light' ?
                        'signupContainer-light' : 'signupContainer-dark'}`} style={hide ? {} : {
                            visibility: 'hidden'
                        }}>
                        <i className="fa-solid fa-trash-can-arrow-up" title="Restore" onClick={restore}></i>
                        <i className="fa-solid fa-trash mx-3" title="PERMANENTLY DELETE" onClick={(e) => {
                            handleDelete();
                            e.stopPropagation();
                        }}></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TrashNoteitem;