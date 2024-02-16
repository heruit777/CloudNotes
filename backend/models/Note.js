const mongoose = require('mongoose');
const { Schema } = mongoose;
//  const TTL = ;// In 30 days, notes will be removed from bin

const NotesSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        default: "General"
    },
    date: {
        type: Date,
        default: Date.now
    },
    expireAt: {
        type: Date,
        expires: 11,
    }
}, {strict: false})

module.exports = mongoose.model('Notes', NotesSchema);