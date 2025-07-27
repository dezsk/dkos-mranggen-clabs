const Kost = require('../../models/Kost');

// Get all kost
exports.getAllKost = async (req, res) => {
    try {
        const kosts = await Kost.find();
        res.status(200).json({ success: true, data: kosts });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching kost data' });
    }
};

// Get single kost
exports.getKostById = async (req, res) => {
    try {
        const kost = await Kost.findById(req.params.id);
        if (!kost) return res.status(404).json({ success: false, message: 'Kost not found' });
        res.status(200).json({ success: true, data: kost });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching kost data' });
    }
};

// Create new kost
exports.createKost = async (req, res) => {
    try {
        const newKost = new Kost(req.body);
        const savedKost = await newKost.save();
        res.status(201).json({ success: true, data: savedKost, message: 'Kost created successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error creating kost' });
    }
};

// Update kost
exports.updateKost = async (req, res) => {
    try {
        const updatedKost = await Kost.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedKost) return res.status(404).json({ success: false, message: 'Kost not found' });
        res.status(200).json({ success: true, data: updatedKost, message: 'Kost updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating kost' });
    }
};

// Delete kost
exports.deleteKost = async (req, res) => {
    try {
        const deletedKost = await Kost.findByIdAndDelete(req.params.id);
        if (!deletedKost) return res.status(404).json({ success: false, message: 'Kost not found' });
        res.status(200).json({ success: true, message: 'Kost deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting kost' });
    }
};

// Update room availability
exports.updateRoomAvailability = async (req, res) => {
    try {
        const kost = await Kost.findById(req.params.id);
        if (!kost) return res.status(404).json({ success: false, message: 'Kost not found' });

        const { availableRooms } = req.body;
        if (availableRooms > kost.totalRooms) {
            return res.status(400).json({ 
                success: false,
                message: 'Available rooms cannot exceed total rooms' 
            });
        }

        kost.availableRooms = availableRooms;
        kost.status = availableRooms === 0 ? 'full' : 'available';
        
        const updatedKost = await kost.save();
        res.status(200).json({ success: true, data: updatedKost, message: 'Room availability updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating room availability' });
    }
};