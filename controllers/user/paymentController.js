const Payment = require('../../models/Payment');
const Booking = require('../../models/Booking');

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
            return res.status(404).json({
                message: 'Payment not found or already processed'
            });
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

// Get user payment history
exports.getUserPaymentHistory = async (req, res) => {
    try {
        const payments = await Payment.find({ user: req.user.id })
            .populate('kost', 'name roomType')
            .populate('booking', 'startDate endDate roomNumber status')
            .sort({ createdAt: -1 });

        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching payment history' });
    }
};

// Get payment details
exports.getPaymentDetails = async (req, res) => {
    try {
        const payment = await Payment.findOne({
            _id: req.params.paymentId,
            user: req.user.id
        }).populate('kost', 'name roomType price')
          .populate('booking', 'startDate endDate duration roomNumber status')
          .populate('verifiedBy', 'name');

        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching payment details' });
    }
};

// Get pending payments
exports.getPendingPayments = async (req, res) => {
    try {
        const pendingPayments = await Payment.find({
            user: req.user.id,
            status: { $in: ['pending', 'waiting_confirmation'] }
        }).populate('kost', 'name roomType price')
          .populate('booking', 'startDate endDate duration');

        res.status(200).json(pendingPayments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching pending payments' });
    }
};

// Get payment statistics for user dashboard
exports.getUserPaymentStatistics = async (req, res) => {
    try {
        const totalPayments = await Payment.countDocuments({ user: req.user.id });
        const confirmedPayments = await Payment.countDocuments({ 
            user: req.user.id,
            status: 'confirmed' 
        });
        const pendingPayments = await Payment.countDocuments({ 
            user: req.user.id,
            status: 'pending' 
        });
        const waitingConfirmation = await Payment.countDocuments({ 
            user: req.user.id,
            status: 'waiting_confirmation' 
        });

        const totalSpent = await Payment.aggregate([
            { $match: { user: req.user.id, status: 'confirmed' } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);

        res.status(200).json({
            totalPayments,
            confirmedPayments,
            pendingPayments,
            waitingConfirmation,
            totalSpent: totalSpent[0]?.total || 0
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching payment statistics' });
    }
};