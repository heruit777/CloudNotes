const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');
const NOTE_EXPIRATION_TIME = 84600*30*1000; // 30days 1 day = 84600seconds and 30 days, but we want in ms so * by 1000

// ROUTE 1: Get All the Notes using: GET "/api/notes/getuser". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id}).sort({date: -1});
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 2: Add a new Note using: POST "/api/notes/addnote". Login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a title'),
    body('description', 'Enter a description'),], async (req, res) => {
        try {
            const { title, description, tag } = req.body;

            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const note = new Note({
                title, description, tag, user: req.user.id
            })
            const savedNote = await note.save()

            res.json(savedNote)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })

// ROUTE 3: Update an existing Note using: PUT "/api/notes/updatenote". Login required
/*
    pinnedAt = {
        status: true|false,
        value: status ? Date.Now() : undefined 
    }
*/
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag, pinnedAt, expireAt } = req.body;
    try {
        // Create a newNote object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };
        if (pinnedAt) {newNote.pinnedAt = pinnedAt};
        if (expireAt) {newNote.expireAt = expireAt};
        
        // Find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        // Removing Schema properties
        if(pinnedAt && pinnedAt.status == false){
            note = await Note.findByIdAndUpdate(req.params.id, { $unset:{pinnedAt: 1} }, {new: true})
            return res.json({ note });
        }
        
        if(expireAt && expireAt.status == false){
            note = await Note.findByIdAndUpdate(req.params.id, { $unset:{expireAt: 1} }, {new: true})
            return res.json({ note });
        }
        
        // Adding new Schema properties
        if(pinnedAt && pinnedAt.status == true){
            note = await Note.findByIdAndUpdate(req.params.id, { $set: {...newNote, pinnedAt: pinnedAt.value} }, {new: true})
            return res.json({ note });
        }
        
        if(expireAt && expireAt.status == true){
            let expirationDate = new Date();
            expirationDate = new Date(expirationDate.getTime() + NOTE_EXPIRATION_TIME);
            note = await Note.findByIdAndUpdate(req.params.id, { $set: {...newNote, expireAt: expirationDate} }, {new: true})
            return res.json({ note });
        }
        // editing title, description and tag
        note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote". Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be delete and delete it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this Note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note is deleted successfully", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router