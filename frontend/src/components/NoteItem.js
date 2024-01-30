import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

function NoteItem(props) {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;

    return (
        <div className='col-md-4'>
            <div className="card  my-2" >
                <div className="card-body" style={{ boxShadow: '0 0 12px rgba(0, 0, 0, 0.5)', maxHeight: '130px', overflow: 'hidden' }}>
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{note.description}</p>
                    <i className="fa-solid fa-pen-to-square" onClick={() => { updateNote(note) }}></i>
                    <i className="fa-solid fa-trash mx-3" onClick={() => { deleteNote(note); props.showAlert("Deleted Successfully", "success"); }}></i>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
