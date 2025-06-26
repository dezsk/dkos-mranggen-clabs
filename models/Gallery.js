const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String 
    },
    mediaType: { 
        type: String, 
        enum: ['image', 'video'],
        required: true 
    },
    mediaUrl: { 
        type: String, 
        required: true 
    },
    kost: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Kost',
        required: true 
    },
    isActive: { 
        type: Boolean, 
        default: true 
    },
    uploadedBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true 
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

module.exports = mongoose.model('Gallery', GallerySchema);