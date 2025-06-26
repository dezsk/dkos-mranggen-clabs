const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
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
    booking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        required: true
    },
    amount: { 
        type: Number, 
        required: true 
    },
    status: { 
        type: String, 
        enum: ['pending', 'waiting_confirmation', 'confirmed', 'rejected'],
        default: 'pending' 
    },
    paymentDate: { 
        type: Date 
    },
    dueDate: { 
        type: Date, 
        required: true 
    },
    paymentProof: { 
        type: String 
    },
    paymentMethod: {
        type: String,
        required: true
    },
    verifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    verificationDate: {
        type: Date
    },
    rejectionReason: {
        type: String
    },
    type: {
        type: String,
        enum: ['new_booking', 'extension'],
        required: true
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('Payment', PaymentSchema);