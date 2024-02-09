import { useState } from "react";
import NoteContext from "../notes/noteContext";

const NoteSate = (props) => {
    const host = process.env.REACT_APP_SERVER_URL;
    // const host = 'http://localhost:5000'
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)
    const [pinnedNotes, setPinnedNotes] = useState([]);

    // Get all notes
    const getNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            }
        });
        const json = await response.json();
        
        setNotes(json.filter((val) => {
            return !val.pinnedAt;
        }))
    }

    // ADD
    const addNote = async (title, description, tag) => {
        // eslint-disable-next-line
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const newNote = await response.json();
        setNotes([newNote, ...notes])
    }

    // EDIT
    const editNote = async (id, title, description, tag, pinnedAt) => {
        // eslint-disable-next-line
        if(pinnedAt === 'none'){
            pinnedAt = {
                status: false,
            }
        } else {
            pinnedAt = {
                status: true,
                value: pinnedAt
            }
        }
        await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag, pinnedAt})
        });
        
        let newNotes = notes.filter((n) => n._id === id);
        if(newNotes.length){
            setNotes(notes.map((val)=>{
                if(val._id === id){
                    return {...val, title, description, tag};
                }
                return val;
            }))
        } else {
            setPinnedNotes(pinnedNotes.map((val) => {
                if(val._id === id){
                    return {...val, title, description, tag};
                }
                return val;
            }))
        }
    }

    // DELETE
    const deleteNote = async (note) => {
        // eslint-disable-next-line
        const response = await fetch(`${host}/api/notes/deletenote/${note._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            }
        });
        let newNotes = notes.filter((n) => n._id === note._id);
        if(newNotes.length){
            setNotes(notes.filter((n) => n._id !== note._id))
        } else {
            setPinnedNotes(pinnedNotes.filter((n) => n._id !== note._id))
        }
    }

    // Get pinned notes
    const getPinnedNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            }
        });
        const json = await response.json();
        
        setPinnedNotes(json.filter((val) => {
            return val.pinnedAt;
        }));
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, getNotes, setNotes, pinnedNotes, setPinnedNotes, getPinnedNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteSate;