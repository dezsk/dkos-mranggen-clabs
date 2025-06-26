const mongoose = require('mongoose');

const AnnouncementSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    content: { 
        type: String, 
        required: true 
    },
    author: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true 
    },
    priority: { 
        type: String, 
        enum: ['low', 'medium', 'high'],
        default: 'medium' 
    },
    targetAudience: { 
        type: String, 
        enum: ['all', 'tenants', 'specific'],
        default: 'all' 
    },
    validUntil: { 
        type: Date 
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

module.exports = mongoose.model('Announcement', AnnouncementSchema);