import { useState } from "react";
import NoteContext from "../notes/noteContext";

const NoteSate = (props) => {
    const host = process.env.REACT_APP_SERVER_URL;
    // const host = 'http://localhost:5000'
    const [notes, setNotes] = useState([]);
    const [directoryContent, setDirectoryContent] = useState([]);
    const [pinnedNotes, setPinnedNotes] = useState([]);
    const [trashedNotes, setTrashedNotes] = useState([]);

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
            return val.typeName === 'note' &&  !val.pinnedAt && !val.expireAt;
        }))
    }

    // ADD
    const addNote = async (title, description, tag, parent) => {
        // eslint-disable-next-line
        const data = {title, description, tag};
        if(parent){
            data.parent = parent;
        }
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify(data)
        });
        const newNote = await response.json();
        setNotes([newNote, ...notes])
    }

    // EDIT
    const editNote = async (id, title, description, tag, pinnedAt, expireAt) => {
        const requestData = {};
        if (title) { requestData.title = title };
        if (description) { requestData.description = description };
        if (tag) { requestData.tag = tag };

        if(typeof pinnedAt === 'number' && Date.now() >= pinnedAt){
            requestData.pinnedAt = {
                status: true,
                value: pinnedAt
            }
        } else if(pinnedAt === 'remove'){
            requestData.pinnedAt = {
                status: false
            }
        }

        if(expireAt === true){
            requestData.expireAt = {
                status: true,
            }
        } else if(expireAt === 'remove'){
            requestData.expireAt = {
                status: false,
            }
        }
        
        const noteData = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify(requestData)
        });
        const res = await noteData.json();
        console.log(res);
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
            return val.typeName === 'note' && val.pinnedAt && !val.expireAt;
        }));
    }

    //get trashed notes
    const getTrashedNotes = async() => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            }
        });
        const json = await response.json();

        setTrashedNotes(json.filter((val) => {
            return val.typeName === 'note' && val.expireAt;
        }))
    }

    // create folder
    const createFolder = async(name, parent) => {
        const sendData = {name};
        if(parent){
            sendData.parent = parent;
        }
        const data = await fetch(`${host}/api/notes/createFolder`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify(sendData)
        })
        const res = await data.json();
        console.log(res);
    }

    // get directory content based on directory name
    const getDirectoryContent = async(directoryId) => {
        if(!directoryId){
            directoryId = 'none';
        }
        const data = await fetch(`${host}/api/notes/fetch/${directoryId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            }
        })
        const res = await data.json();
        console.log(res);
        setDirectoryContent(res);
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, getNotes, setNotes, pinnedNotes, setPinnedNotes, getPinnedNotes, trashedNotes, setTrashedNotes, getTrashedNotes, createFolder, getDirectoryContent, directoryContent, setDirectoryContent }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteSate;