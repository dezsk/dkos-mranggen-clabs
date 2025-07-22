const Kost = require('../../models/Kost');

// Get all kost
exports.getAllKost = async (req, res) => {
    try {
        const kosts = await Kost.find();
        res.status(200).json(kosts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching kost data' });
    }
};

// Get single kost
exports.getKostById = async (req, res) => {
    try {
        const kost = await Kost.findById(req.params.id);
        if (!kost) return res.status(404).json({ message: 'Kost not found' });
        res.status(200).json(kost);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching kost data' });
    }
};