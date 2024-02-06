import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';

function NoteItem(props) {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote, handlePinnedNotes } = props;
    const [hide, setHide] = useState(false);


    const handleMouseEnter = () => {
        setHide(true);
    }

    const handleMouseExit = () => {
        setHide(false);
    }

    return (
        <div className='col-md-4' onClick={(e) => { updateNote(note) }}>
            <div className="cardParent card  my-1" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseExit}>
                <div className={`card-body pb-1 ${props.mode === 'light' ? 'signupContainer-light' : 'signupContainer-dark'}`}>
                    <h5 className="card-title mb-3">{note.title}</h5>
                    <div className={`navIcons position-absolute top-0 end-0 ${props.mode === 'light' ? 'signupContainer-light' : 'signupContainer-dark'}`} style={hide ? {} : {
                        visibility: 'hidden'
                    }}>
                        <i className="fa-solid fa-thumbtack" style={{ color: props.mode === 'light' ? 'lightColor' : 'darkColor' }} onClick={(e) => {
                            handlePinnedNotes(note.title);
                            e.stopPropagation();
                        }}></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                    <div className={`icons ${props.mode === 'light' ?
                        'signupContainer-light' : 'signupContainer-dark'}`} style={hide ? {} :
                            { visibility: 'hidden' }}>
                        <i className="fa-solid fa-trash mx-3" onClick={(e) => {
                            deleteNote(note);
                            props.showAlert("Deleted Successfully", "success");
                            e.stopPropagation();
                        }}></i>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default NoteItem