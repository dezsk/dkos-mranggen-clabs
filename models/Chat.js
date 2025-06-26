const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    sender: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true 
    },
    content: { 
        type: String, 
        required: true 
    },
    timestamp: { 
        type: Date, 
        default: Date.now 
    },
    isRead: {
        type: Boolean,
        default: false
    }
});

const ChatSchema = new mongoose.Schema({
    participants: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true 
    }],
    messages: [MessageSchema],
    lastMessage: {
        content: String,
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        timestamp: Date,
        isRead: Boolean
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('Chat', ChatSchema);