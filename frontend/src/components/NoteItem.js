import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';

function NoteItem(props) {
    const context = useContext(noteContext);
    const { editNote, setPinnedNotes, setNotes, notes, pinnedNotes, setTrashedNotes, trashedNotes } = context;
    const { note, updateNote, isPinned } = props;
    const [hide, setHide] = useState(false);


    const handleMouseEnter = () => {
        setHide(true);
    }

    const handleMouseExit = () => {
        setHide(false);
    }

    const handlePinnedNote = async () => {
        await editNote(note._id, note.title, note.description, note.tag, Date.now());
        setPinnedNotes([note, ...pinnedNotes]);
        setNotes(notes.filter(({_id}) => {
            return _id !== note._id;
        }))
    }

    const handleUnPinnedNote = async () => {
        await editNote(note._id, note.title, note.description, note.tag, 'remove');
        setPinnedNotes(pinnedNotes.filter(({_id}) => {
            return _id !== note._id;
        }))
        setNotes([note, ...notes]);
    }

    const moveToTrash = async() => {
        await editNote(note._id, note.title, note.description, note.tag,null, true);
        setTrashedNotes([note, ...trashedNotes]);
        let temp = notes.filter(({_id}) => _id === note._id);
        if(temp.length){
            setNotes(notes.filter(({_id}) => _id !== note._id));
        } else {
            setPinnedNotes(pinnedNotes.filter(({_id}) => _id !== note._id));
        }
        props.showAlert("Moved to trash", "success");
    }

    return (
        <div className='col-md-4' onClick={(e) => { updateNote(note) }}>
            <div className="cardParent card  my-1" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseExit}>
                <div className={`card-body pb-1 ${props.mode === 'light' ? 'signupContainer-light' : 'signupContainer-dark'}`}>
                    <h5 className="card-title mb-3">{note.title}</h5>
                    <div className={`navIcons position-absolute top-0 end-0 ${props.mode === 'light' ? 'signupContainer-light' : 'signupContainer-dark'}`} style={hide ? {} : {
                        visibility: 'hidden'
                    }}>
                        {!isPinned ?
                            <i className="fa-solid fa-thumbtack" title="pin" style={{ color: props.mode === 'light' ? 'lightColor' : 'darkColor' }} onClick={(e) => {
                                handlePinnedNote();
                                e.stopPropagation();
                            }}></i> :
                            <i className="fa-solid fa-thumbtack" title="unpin" style={{ color: props.mode === 'light' ? 'lightColor' : 'darkColor' }} onClick={(e) => {
                                handleUnPinnedNote();
                                e.stopPropagation();
                            }}></i>
                        }
                    </div>
                    <p className="card-text">{note.description}</p>
                    <div className={`icons ${props.mode === 'light' ?
                        'signupContainer-light' : 'signupContainer-dark'}`} style={hide ? {} :
                            { visibility: 'hidden' }}>
                        <i className="fa-solid fa-trash mx-3" title="move to trash" onClick={(e) => {
                            moveToTrash();
                            e.stopPropagation();
                        }}></i>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default NoteItem