const mongoose = require('mongoose');
const {Schema} = mongoose;

const FolderSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    tag: {
        type: String,
        default: "General"
    },
    parent: {
        type: String,
        default: null,
    },
    typeName: {
        type: String,
        default: "folder"
    },
}, 
{collection: 'notes'});

module.exports = mongoose.model('Folders', FolderSchema);