const Announcement = require('../../models/Announcement');

// Get all announcements
exports.getAllAnnouncements = async (req, res) => {
    try {
        const announcements = await Announcement.find()
            .populate('author', 'name')
            .sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: announcements });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching announcements' });
    }
};

// Get single announcement
exports.getAnnouncementById = async (req, res) => {
    try {
        const announcement = await Announcement.findById(req.params.id)
            .populate('author', 'name');
        if (!announcement) {
            return res.status(404).json({ success: false, message: 'Announcement not found' });
        }
        res.status(200).json({ success: true, data: announcement });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching announcement' });
    }
};

// Create new announcement
exports.createAnnouncement = async (req, res) => {
    try {
        const { title, content, priority, targetAudience, validUntil } = req.body;
        
        const newAnnouncement = new Announcement({
            title,
            content,
            author: req.user.id, // from auth middleware
            priority,
            targetAudience,
            validUntil: validUntil ? new Date(validUntil) : null
        });

        const savedAnnouncement = await newAnnouncement.save();
        res.status(201).json({ success: true, data: savedAnnouncement, message: 'Announcement created successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error creating announcement' });
    }
};

// Update announcement
exports.updateAnnouncement = async (req, res) => {
    try {
        const updatedAnnouncement = await Announcement.findByIdAndUpdate(
            req.params.id,
            { ...req.body, updatedAt: new Date() },
            { new: true, runValidators: true }
        );

        if (!updatedAnnouncement) {
            return res.status(404).json({ success: false, message: 'Announcement not found' });
        }

        res.status(200).json({ success: true, data: updatedAnnouncement, message: 'Announcement updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating announcement' });
    }
};

// Delete announcement
exports.deleteAnnouncement = async (req, res) => {
    try {
        const deletedAnnouncement = await Announcement.findByIdAndDelete(req.params.id);
        
        if (!deletedAnnouncement) {
            return res.status(404).json({ success: false, message: 'Announcement not found' });
        }

        res.status(200).json({ success: true, message: 'Announcement deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting announcement' });
    }
};

// Get active announcements
exports.getActiveAnnouncements = async (req, res) => {
    try {
        const currentDate = new Date();
        
        const announcements = await Announcement.find({
            $or: [
                { validUntil: { $gt: currentDate } },
                { validUntil: null }
            ]
        }).populate('author', 'name')
          .sort({ priority: -1, createdAt: -1 });

        res.status(200).json({ success: true, data: announcements });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching active announcements' });
    }
};

// Get announcements by target audience
exports.getAnnouncementsByTarget = async (req, res) => {
    try {
        const { target } = req.params;
        const currentDate = new Date();

        const announcements = await Announcement.find({
            targetAudience: target,
            $or: [
                { validUntil: { $gt: currentDate } },
                { validUntil: null }
            ]
        }).populate('author', 'name')
          .sort({ priority: -1, createdAt: -1 });

        res.status(200).json(announcements);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching targeted announcements' });
    }
};