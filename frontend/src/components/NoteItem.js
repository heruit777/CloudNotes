import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';

function NoteItem(props) {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;
    const [hide, setHide] = useState(false);

    const handleMouseEnter = () => {
        setHide(true);
    }

    const handleMouseExit = () => {
        setHide(false);
    }

    return (
        <div className='col-md-4' style={{ onClick: 'updateNote' }}>
            <div className="card  my-2" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseExit}>
                <div className={`card-body pb-1 ${props.mode === 'light' ? 'signupContainer-light' : 'signupContainer-dark'}`}>
                    <h5 className="card-title mb-3">{note.title}</h5>
                    <div className={`position-absolute top-0 end-0 ${props.mode === 'light' ? 'signupContainer-light' : 'signupContainer-dark'}`} style={hide ? {} : { visibility: 'hidden' }}>
                        <i className="fa-solid fa-thumbtack" style={{ color: props.mode === 'light' ? 'lightColor' : 'darkColor' }}></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                    <div className="icons" style={hide ? {} : { visibility: 'hidden' }}>
                        <i className="fa-solid fa-pen-to-square" onClick={() => { updateNote(note) }}></i>
                        <i className="fa-solid fa-trash mx-3" onClick={() => { deleteNote(note); props.showAlert("Deleted Successfully", "success"); }}></i>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default NoteItem
