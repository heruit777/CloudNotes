import React, { useEffect, useContext } from "react";
import noteContext from "../context/notes/noteContext";

const TrashNoteitem = ({ note, mode, showAlert }) => {
    const context = useContext(noteContext);
    const { trashedNotes, setTrashedNotes, notes, setNotes, editNote, deleteNote} = context;

    const deleteDate = new Date(note.expireAt);
    const currentDate = new Date();
    console.log(deleteDate, currentDate)
    const remainingDays = Math.floor((deleteDate - currentDate)/(1000*84600));

    const restore = async()=>{
        await editNote(note._id, note.title, note.description, note.tag, null, 'remove');
        setTrashedNotes(trashedNotes.filter(({_id}) => _id !== note._id));
        setNotes([note, ...notes]);
        showAlert("Note restored successfully", "success")
    }
    
    const handleDelete = async() => {
        await deleteNote(note);
        setTrashedNotes(trashedNotes.filter(({_id}) => _id !== note._id));
        showAlert("Note deleted successfully", "success")
    }

    return (
        <div className='col-md-4'>
            <div className="cardParent card  my-1">
                <div className={`card-body pb-1 ${mode === 'light' ? 'signupContainer-light' : 'signupContainer-dark'}`}>
                    <h5 className="card-title mb-3">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <div className={`icons ${mode === 'light' ?
                        'signupContainer-light' : 'signupContainer-dark'}`}>
                        <i className="fa-solid fa-trash-can-arrow-up" title="Restore" onClick={restore}></i>
                        <i className="fa-solid fa-trash mx-3" title="PERMANENTLY DELETE" onClick={(e) => {
                            handleDelete();
                            e.stopPropagation();
                        }}></i>
                        <span>Will be deleted in {remainingDays}days</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TrashNoteitem;