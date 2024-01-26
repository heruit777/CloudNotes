import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom'

function Notes(props) {
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    let navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes();
        }
        else {
            navigate('/signup');
        }
        // eslint-disable-next-line
    }, [])

    const ref = useRef(null);
    const refClose = useRef(null);
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }

    const handleClick = (e) => {
        e.preventDefault();
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click();
        props.showAlert("Updated Successfully", "success");
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            <AddNote showAlert={props.showAlert} />
            <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}></button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label" >Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} placeholder='Optional' />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Close</button>
                            <button type="button" className="btn btn-primary" disabled={!note.etitle.trim() || !note.edescription.trim()} onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="signup-container" id='Notes' style={{ width: '90%', background: 'linear-gradient(to left bottom, #f54f6e, #f21a87, #de00aa, #af00d5, #2c36ff)' }}>
                <div className="row">
                    <h1 className="my-1" style={{ textAlign: 'center' }}>Your Notes</h1>
                    {notes.map((note) => {
                        return <NoteItem note={note} key={note._id} showAlert={props.showAlert} updateNote={updateNote} />
                    })}
                </div>
            </div>
        </>
    )
}

export default Notes
