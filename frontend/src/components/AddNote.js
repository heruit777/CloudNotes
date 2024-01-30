import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';

function AddNote(props) {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" })
        props.showAlert("Added Successfully", "success");
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <div className="signup-container mb-4" id='addNote' style={{ width: '90%' }}>
            <div>
                <form className="form" style={{ width: '60%', marginLeft: '20%' }}>
                    <h1 style={{ textAlign: 'center' }}>Add a Note</h1>
                    <div className="mb-2">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} required placeholder="Required" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} required placeholder="Required" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} placeholder='Optional' />
                    </div>
                    <button type="submit" className="btn btn-primary mb-3" disabled={!note.title.trim() || !note.description.trim()} onClick={handleClick}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote
