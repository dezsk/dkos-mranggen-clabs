const Payment = require('../../models/Payment');
const Booking = require('../../models/Booking');
const User = require('../../models/User');
const Kost = require('../../models/Kost');

// Get all payments
exports.getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find()
            .populate('user', 'name email')
            .populate('kost', 'name roomType')
            .populate('booking', 'roomNumber')
            .sort({ createdAt: -1 });
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching payments' });
    }
};

// Get payments waiting for confirmation
exports.getPaymentsForVerification = async (req, res) => {
    try {
        const payments = await Payment.find({ status: 'waiting_confirmation' })
            .populate('user', 'name email phoneNumber')
            .populate('kost', 'name roomType price')
            .populate('booking', 'startDate endDate duration')
            .sort({ paymentDate: 1 });

        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching payments for verification' });
    }
};

// Verify payment
exports.verifyPayment = async (req, res) => {
    try {
        const { paymentId } = req.params;
        const { status, rejectionReason, roomNumber } = req.body;

        const payment = await Payment.findById(paymentId);
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        payment.status = status;
        payment.verifiedBy = req.user.id;
        payment.verificationDate = new Date();

        if (status === 'rejected') {
            payment.rejectionReason = rejectionReason;
        } else if (status === 'confirmed') {
            // Update booking status
            const booking = await Booking.findById(payment.booking);

            if (booking) {
                if (payment.type === 'new_booking') {
                    booking.status = 'confirmed';
                    booking.paymentStatus = 'paid';
                    
                    // Assign room number if provided
                    if (roomNumber) {
                        booking.roomNumber = roomNumber;
                    }
                    
                    // Update kost availability
                    const kost = await Kost.findById(payment.kost);
                    if (kost) {
                        kost.availableRooms -= 1;
                        if (kost.availableRooms === 0) {
                            kost.status = 'full';
                        }
                        await kost.save();
                    }
                } else if (payment.type === 'extension') {
                    // Update booking end date based on extension duration
                    const extensionDuration = payment.amount / booking.kost.price;
                    const newEndDate = new Date(booking.endDate);
                    newEndDate.setMonth(newEndDate.getMonth() + extensionDuration);
                    booking.endDate = newEndDate;
                    booking.duration += extensionDuration;
                }
                await booking.save();
            }
        }

        const updatedPayment = await payment.save();

        res.status(200).json(updatedPayment);
    } catch (error) {
        res.status(500).json({ message: 'Error verifying payment' });
    }
};

// Get payment statistics
exports.getPaymentStatistics = async (req, res) => {
    try {
        const totalPayments = await Payment.countDocuments();
        const confirmedPayments = await Payment.countDocuments({ status: 'confirmed' });
        const pendingPayments = await Payment.countDocuments({ status: 'pending' });
        const waitingConfirmation = await Payment.countDocuments({ status: 'waiting_confirmation' });
        const rejectedPayments = await Payment.countDocuments({ status: 'rejected' });

        const totalAmount = await Payment.aggregate([
            { $match: { status: 'confirmed' } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);

        const paymentsByType = await Payment.aggregate([
            { $match: { status: 'confirmed' } },
            { $group: {
                _id: '$type',
                count: { $sum: 1 },
                total: { $sum: '$amount' }
            }}
        ]);

        res.status(200).json({
            totalPayments,
            confirmedPayments,
            pendingPayments,
            waitingConfirmation,
            rejectedPayments,
            totalAmountCollected: totalAmount[0]?.total || 0,
            paymentsByType: paymentsByType.reduce((acc, curr) => {
                acc[curr._id] = {
                    count: curr.count,
                    total: curr.total
                };
                return acc;
            }, {})
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching payment statistics' });
    }
};