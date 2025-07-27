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

// Get kost by room type (A/B)
exports.getKostByRoomType = async (req, res) => {
    try {
        const kost = await Kost.findOne({ roomType: req.params.roomType });
        if (!kost) return res.status(404).json({ success: false, message: 'Kost not found' });

        // Normalisasi skema agar selalu sama dengan FormKamarA
        const normalized = {
            name: kost.name || "",
            address: kost.address || "",
            description: kost.description || "",
            facilities: kost.facilities || [],
            price: kost.price || 0,
            roomType: kost.roomType || "",
            totalRooms: kost.totalRooms || 0,
            availableRooms: kost.availableRooms || 0,
            status: kost.status || "available",
            rules: kost.rules || [],
            images: kost.images || []
        };

        res.status(200).json({ success: true, data: normalized });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching kost data' });
    }
};