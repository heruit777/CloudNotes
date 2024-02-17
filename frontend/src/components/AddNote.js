import React, { useContext, useState, useRef } from 'react';
import noteContext from '../context/notes/noteContext';
import { Link } from "react-router-dom";

function AddNote(props) {
    const context = useContext(noteContext);
    const { addNote } = context;
    const descriptionRef = useRef("");
    const titleRef = useRef("");

    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        descriptionRef.current.innerHTML = "";
        titleRef.current.innerHTML = "";
        props.showAlert("Added Successfully", "success");
    }
    const isDescriptionEmpty = !note.description.trim();

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const handleContentChange = (e) => {
        const cleanedContent = e.target.innerHTML.replace(/&nbsp;/g, " ").trim();
        setNote({ ...note, [e.target.getAttribute('name')]: cleanedContent });
    };

    return (
        <>
            <div className={`${props.mode === 'light' ? 'signupContainer-light' : 'signupContainer-dark'}`} style={{
                display: 'flex', justifyContent: 'space-evenly', borderRadius: "8px",
                boxShadow: '0 0 8px rgba(0, 0, 0, 0.3)', width: 'fit-content', margin: 'auto', padding: '10px',
            }}>
                <i className="fa-solid fa-folder-plus" title="Create folder" style={{ color: props.mode === 'light' ? 'lightColor' : 'darkColor' }}>
                </i>
                <Link className='nav-link' to="/bin">
                    <i className="fa-solid fa-eye" title="See Recycle Bin" style={{ color: props.mode === 'light' ? 'lightColor' : 'darkColor' }}></i>
                </Link>
            </div>
            <div className={`signup-container mt-3 mb-5 ${props.mode === 'light' ? 'signupContainer-light' : 'signupContainer-dark'}`} id='addNote' style={{ width: '70%' }} >
                <div>
                    <form className="form mx-auto" id='addNote' style={{ width: '90%' }}>
                        <h1 style={{ textAlign: 'center' }}>Take a note...</h1>
                        <div className="mb-2">
                            <label htmlFor="title" className="form-label">Title</label>
                            <div className={`form-control ${props.mode === 'light' ? 'signupContainer-light' : 'signupContainer-dark'}`} id="title" name="title" contentEditable={true}
                                aria-describedby="emailHelp" onInput={handleContentChange} required ref={titleRef} data-placeholder="Required" onFocus={(e) => e.target.classList.add('focused')} onBlur={(e) => e.target.classList.remove('focused')} onPaste={(e) => {
                                    e.preventDefault();
                                    document.execCommand("insertText", false, e.clipboardData.getData('text/plain'));
                                }} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <div className={`form-control ${props.mode === 'light' ? 'signupContainer-light' : 'signupContainer-dark'}`} id="description" name="description" contentEditable={true} onInput={handleContentChange} required ref={descriptionRef} data-placeholder="Required" onFocus={(e) => e.target.classList.add('focused')} onBlur={(e) => e.target.classList.remove('focused')} onPaste={(e) => {
                                e.preventDefault();
                                document.execCommand("insertText", false, e.clipboardData.getData('text/plain'));
                            }} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="tag" className="form-label">Tag</label>
                            <input type="text" className={`form-control ${props.mode === 'light' ? 'signupContainer-light' : 'signupContainer-dark'}`} id="tag" name="tag" value={note.tag} onChange={onChange} placeholder='Optional' onFocus={(e) => e.target.classList.add('focused')} onBlur={(e) => e.target.classList.remove('focused')} />
                        </div>
                        <button type="submit" className="btn btn-primary mb-3" disabled={!note.title.trim() || isDescriptionEmpty} onClick={handleClick} >Add Note</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddNote
