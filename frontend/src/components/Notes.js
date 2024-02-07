import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom'

function Notes(props) {
    const context = useContext(noteContext);
    const { notes, getNotes, editNote, deleteNote } = context;
    let navigate = useNavigate();
    const descriptionRef = useRef("");
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
    const ref = useRef(null);
    const refClose = useRef(null);
    const [isDisabledUpdate, setIsDisabledUpdate] = useState(true)
    const { mode, toggleMode } = props;

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes();
        }
        else {
            navigate('/signup');
        }
        // eslint-disable-next-line
    }, [])

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
        descriptionRef.current.innerText = currentNote.description;
    }

    const handleClick = (e) => {
        e.preventDefault();
        if(note.etitle.length === 0 && note.edescription.length === 0){
            console.log('deleted note')
            deleteNote(note);
            props.showAlert("deleted Successfully", "success");
        } else {
            editNote(note.id, note.etitle, note.edescription, note.etag)
            props.showAlert("Updated Successfully", "success");
        }
        refClose.current.click();
        setIsDisabledUpdate(true);
    }

    const onChange = (e) => {
        setIsDisabledUpdate(false);
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const handleContentChange = (e) => {
        setNote({ ...note, edescription: e.target.innerHTML });
        setIsDisabledUpdate(false);
    };

    return (
        <>
            <AddNote showAlert={props.showAlert} mode={mode} toggleMode={toggleMode} />
            <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}></button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className={`modal-content ${props.mode === 'light' ? 'signupContainer-light' : 'signupContainer-dark'}`}>
                        <div className="modal-body">
                            <form className="my-3" style={{ color: props.mode === 'light' ? 'black' : 'white' }}>
                                <div className="mb-2">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className={`form-control ${props.mode === 'light' ? 'signupContainer-light' : 'signupContainer-dark'}`} id="title" name="etitle"
                                        aria-describedby="emailHelp" value={note.etitle} onChange={onChange} required placeholder="Required" onFocus={(e) => e.target.classList.add('focused')} onBlur={(e) => e.target.classList.remove('focused')} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <div className={`form-control ${props.mode === 'light' ? 'signupContainer-light' : 'signupContainer-dark'}`} id="description" name="description" contentEditable={true} onInput={handleContentChange} required ref={descriptionRef} data-placeholder="Required" onFocus={(e) => e.target.classList.add('focused')} onBlur={(e) => e.target.classList.remove('focused')} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className={`form-control ${props.mode === 'light' ? 'signupContainer-light' : 'signupContainer-dark'}`} id="tag" name="etag" value={note.etag} onChange={onChange} placeholder='Optional' onFocus={(e) => e.target.classList.add('focused')} onBlur={(e) => e.target.classList.remove('focused')} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Close</button>
                            <button type="button" className="btn btn-primary" disabled={isDisabledUpdate} onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* {showPinnedNotes && (
                <div className={`signup-container ${props.mode === 'light' ? 'signupContainer-light' :
                    'signupContainer-dark'}`} id='Notes' style={{ width: '95%', boxShadow: 'none' }}>
                    <div className="row">
                        <h3 className="my-1 mb-4" style={{ textAlign: 'center', color: props.mode === 'light' ? 'black' : 'white' }}>Pinned</h3>
                        {[...pinnedNotes].reverse().map((note) => {
                            return <NoteItem note={note} key={note._id} showAlert={props.showAlert} updateNote={updateNote} mode={mode} toggleMode={toggleMode} />
                        })}
                    </div>
                </div>
            )} */}
            <div className={`signup-container ${props.mode === 'light' ? 'signupContainer-light' : 'signupContainer-dark'}`} id='Notes' style={{ width: '95%', boxShadow: 'none' }}>
                <div className="row">
                    <h3 className="my-1 mb-4" style={{ textAlign: 'center', color: props.mode === 'light' ? 'black' : 'white' }}>Your Notes</h3>
                    {notes.map((note) => {
                        return <NoteItem note={note} key={note._id} showAlert={props.showAlert} updateNote={updateNote} mode={mode} toggleMode={toggleMode}/>
                    })}
                </div>
            </div>
        </>
    )
}

export default Notes