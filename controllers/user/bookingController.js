const Booking = require('../../models/Booking');
const Payment = require('../../models/Payment');
const Kost = require('../../models/Kost');

// Get all bookings for current user
exports.getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user.id })
            .populate('kost', 'name roomType price')
            .sort({ createdAt: -1 });
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bookings' });
    }
};

// Get single booking detail
exports.getBookingDetail = async (req, res) => {
    try {
        const booking = await Booking.findOne({
            _id: req.params.bookingId,
            user: req.user.id
        }).populate('kost', 'name roomType price address facilities');

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Get associated payments
        const payments = await Payment.find({
            user: req.user.id,
            kost: booking.kost._id,
            booking: booking._id
        }).sort({ createdAt: -1 });

        res.status(200).json({
            booking,
            payments
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching booking detail' });
    }
};

// Create new booking
exports.createBooking = async (req, res) => {
    try {
        const { kostId, duration, startDate } = req.body;

        // Check kost availability
        const kost = await Kost.findById(kostId);
        if (!kost) {
            return res.status(404).json({ message: 'Kost not found' });
        }
        if (kost.availableRooms === 0) {
            return res.status(400).json({ message: 'No rooms available' });
        }

        // Calculate end date and total price
        const start = new Date(startDate);
        const end = new Date(startDate);
        end.setMonth(end.getMonth() + duration);
        const totalPrice = kost.price * duration;

        // Create booking
        const booking = new Booking({
            user: req.user.id,
            kost: kostId,
            startDate: start,
            endDate: end,
            duration,
            totalPrice,
            status: 'pending'
        });

        const savedBooking = await booking.save();

        // Create initial payment record
        const payment = new Payment({
            user: req.user.id,
            kost: kostId,
            booking: savedBooking._id,
            amount: totalPrice,
            type: 'new_booking',
            status: 'pending',
            dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
            paymentMethod: 'bank_transfer' // Default payment method
        });

        await payment.save();

        res.status(201).json({
            booking: savedBooking,
            payment
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating booking' });
    }
};

// Submit payment proof
exports.submitPaymentProof = async (req, res) => {
    try {
        const { paymentId } = req.params;
        const { paymentProof, paymentMethod } = req.body;

        const payment = await Payment.findOne({
            _id: paymentId,
            user: req.user.id,
            status: 'pending'
        });

        if (!payment) {
            return res.status(404).json({ message: 'Payment not found or already processed' });
        }

        payment.paymentProof = paymentProof;
        payment.paymentMethod = paymentMethod;
        payment.paymentDate = new Date();
        payment.status = 'waiting_confirmation';

        const updatedPayment = await payment.save();

        res.status(200).json(updatedPayment);
    } catch (error) {
        res.status(500).json({ message: 'Error submitting payment proof' });
    }
};

// Request booking extension
exports.requestExtension = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const { duration } = req.body;

        const booking = await Booking.findOne({
            _id: bookingId,
            user: req.user.id,
            status: 'confirmed'
        }).populate('kost', 'price');

        if (!booking) {
            return res.status(404).json({ message: 'Active booking not found' });
        }

        // Calculate extension price
        const extensionPrice = booking.kost.price * duration;

        // Create payment for extension
        const payment = new Payment({
            user: req.user.id,
            kost: booking.kost._id,
            booking: booking._id,
            amount: extensionPrice,
            type: 'extension',
            status: 'pending',
            dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
            paymentMethod: 'bank_transfer' // Default payment method
        });

        await payment.save();

        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json({ message: 'Error requesting extension' });
    }
};

// Get active bookings
exports.getActiveBookings = async (req, res) => {
    try {
        const activeBookings = await Booking.find({
            user: req.user.id,
            status: 'confirmed',
            endDate: { $gt: new Date() }
        }).populate('kost', 'name roomType price');

        res.status(200).json(activeBookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching active bookings' });
    }
};