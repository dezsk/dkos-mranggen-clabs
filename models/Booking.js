const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true 
    },
    kost: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Kost',
        required: true 
    },
    startDate: { 
        type: Date, 
        required: true 
    },
    endDate: { 
        type: Date, 
        required: true 
    },
    duration: { 
        type: Number, 
        required: true 
    },
    totalPrice: { 
        type: Number, 
        required: true 
    },
    status: { 
        type: String, 
        enum: ['pending', 'confirmed', 'cancelled', 'completed'],
        default: 'pending' 
    },
    paymentStatus: { 
        type: String, 
        enum: ['unpaid', 'partially_paid', 'paid'],
        default: 'unpaid' 
    },
    roomNumber: {
        type: String,
        default: null
    },
    specialRequests: { 
        type: String 
    },
    cancelReason: { 
        type: String 
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

module.exports = mongoose.model('Booking', BookingSchema);