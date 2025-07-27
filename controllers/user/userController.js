const User = require('../../models/User');
const Booking = require('../../models/Booking');
const Payment = require('../../models/Payment');
const bcrypt = require('bcryptjs');

// Get user profile
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
            .select('-password');
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching user profile' });
    }
};

// Update user profile
exports.updateProfile = async (req, res) => {
    try {
        const { name, phoneNumber, address, emergencyContact, occupation } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            {
                name,
                phoneNumber,
                address,
                emergencyContact,
                occupation,
                updatedAt: new Date()
            },
            { new: true, runValidators: true }
        ).select('-password');

        res.status(200).json({ success: true, data: updatedUser });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating profile' });
    }
};

// Change password
exports.changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        const user = await User.findById(req.user.id);
        const validPassword = await bcrypt.compare(currentPassword, user.password);

        if (!validPassword) {
            return res.status(400).json({ success: false, message: 'Current password is incorrect' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.updatedAt = new Date();
        await user.save();

        res.status(200).json({ success: true, message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error changing password' });
    }
};

// Update profile picture
exports.updateProfilePicture = async (req, res) => {
    try {
        const { profilePicture } = req.body;

        const user = await User.findByIdAndUpdate(
            req.user.id,
            { 
                profilePicture,
                updatedAt: new Date()
            },
            { new: true }
        ).select('-password');

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating profile picture' });
    }
};

// Get user dashboard summary
exports.getDashboardSummary = async (req, res) => {
    try {
        // Get active bookings
        const activeBookings = await Booking.find({
            user: req.user.id,
            status: 'confirmed',
            endDate: { $gt: new Date() }
        }).populate('kost', 'name roomType price roomNumber');

        // Get payment statistics
        const totalPayments = await Payment.countDocuments({ user: req.user.id });
        const pendingPayments = await Payment.countDocuments({
            user: req.user.id,
            status: 'pending'
        });
        const waitingConfirmation = await Payment.countDocuments({
            user: req.user.id,
            status: 'waiting_confirmation'
        });
        const verifiedPayments = await Payment.countDocuments({
            user: req.user.id,
            status: 'confirmed'
        });

        // Get recent payments (last 5)
        const recentPayments = await Payment.find({ user: req.user.id })
            .sort({ createdAt: -1 })
            .limit(5)
            .select('amount status type createdAt');

        // Get upcoming payment
        const upcomingPayment = await Payment.findOne({
            user: req.user.id,
            status: 'pending',
            dueDate: { $gt: new Date() }
        }).sort({ dueDate: 1 })
          .populate('kost', 'name')
          .populate('booking', 'startDate endDate');

        // Get booking history count
        const totalBookings = await Booking.countDocuments({ user: req.user.id });

        res.status(200).json({
            success: true,
            data: {
                totalPayments,
                pendingPayments,
                waitingConfirmation,
                verifiedPayments,
                recentPayments,
                activeBookings,
                upcomingPayment,
                totalBookings
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching dashboard summary' });
    }
};

// Deactivate account
exports.deactivateAccount = async (req, res) => {
    try {
        // Check for active bookings
        const activeBooking = await Booking.findOne({
            user: req.user.id,
            status: 'confirmed',
            endDate: { $gt: new Date() }
        });

        if (activeBooking) {
            return res.status(400).json({
                success: false,
                message: 'Cannot deactivate account with active booking'
            });
        }

        // Check for pending payments
        const pendingPayments = await Payment.findOne({
            user: req.user.id,
            status: { $in: ['pending', 'waiting_confirmation'] }
        });

        if (pendingPayments) {
            return res.status(400).json({
                success: false,
                message: 'Cannot deactivate account with pending payments'
            });
        }

        const user = await User.findByIdAndUpdate(
            req.user.id,
            { 
                status: 'inactive',
                updatedAt: new Date()
            },
            { new: true }
        );

        res.status(200).json({ success: true, message: 'Account deactivated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deactivating account' });
    }
};