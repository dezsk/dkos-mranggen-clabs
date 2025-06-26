const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    role: { 
        type: String, 
        enum: ['admin', 'user'], 
        default: 'user' 
    },
    phoneNumber: { 
        type: String 
    },
    address: { 
        type: String 
    },
    profilePicture: { 
        type: String 
    },
    emergencyContact: { 
        name: String,
        relation: String,
        phoneNumber: String 
    },
    occupation: { 
        type: String 
    },
    identityNumber: { 
        type: String 
    },
    status: { 
        type: String, 
        enum: ['active', 'inactive'], 
        default: 'active' 
    },
    currentBooking: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Kost' 
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

module.exports = mongoose.model('User', userSchema);