import { useState } from "react";
import NoteContext from "../notes/noteContext";

const NoteSate = (props) => {
    const host = 'http://localhost:5000';

    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)

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
        setNotes(json)
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
        setNotes(notes.concat(newNote))
    }

    // EDIT
    const editNote = async (id, title, description, tag) => {
        // eslint-disable-next-line
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });

        const newNotes = JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
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
        const newNotes = notes.filter((n) => n._id !== note._id);
        setNotes(newNotes);
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteSate;