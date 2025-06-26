const mongoose = require('mongoose');

const KostSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    address: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    facilities: [{ 
        type: String, 
        required: true 
    }],
    price: { 
        type: Number, 
        required: true 
    },
    roomType: { 
        type: String, 
        required: true 
    },
    totalRooms: { 
        type: Number, 
        required: true 
    },
    availableRooms: { 
        type: Number, 
        required: true 
    },
    images: [{ 
        type: String 
    }],
    status: { 
        type: String, 
        enum: ['available', 'full', 'maintenance'],
        default: 'available' 
    },
    rules: [{ 
        type: String 
    }],
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('Kost', KostSchema);