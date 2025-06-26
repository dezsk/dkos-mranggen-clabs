const Gallery = require('../../models/Gallery');
const Kost = require('../../models/Kost');

// Get all gallery items
exports.getAllGalleryItems = async (req, res) => {
    try {
        const galleryItems = await Gallery.find()
            .populate('kost', 'name')
            .populate('uploadedBy', 'name')
            .sort({ createdAt: -1 });
        res.status(200).json(galleryItems);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching gallery items' });
    }
};

// Get gallery items by kost
exports.getGalleryByKost = async (req, res) => {
    try {
        const { kostId } = req.params;
        const galleryItems = await Gallery.find({ kost: kostId, isActive: true })
            .populate('kost', 'name')
            .populate('uploadedBy', 'name')
            .sort({ createdAt: -1 });

        res.status(200).json(galleryItems);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching kost gallery' });
    }
};

// Upload new gallery item
exports.uploadGalleryItem = async (req, res) => {
    try {
        const { title, description, mediaType, mediaUrl, kostId } = req.body;

        // Verify kost exists
        const kost = await Kost.findById(kostId);
        if (!kost) {
            return res.status(404).json({ message: 'Kost not found' });
        }

        const newGalleryItem = new Gallery({
            title,
            description,
            mediaType,
            mediaUrl,
            kost: kostId,
            uploadedBy: req.user.id // from auth middleware
        });

        const savedGalleryItem = await newGalleryItem.save();

        // Update kost images if it's a photo
        if (mediaType === 'image') {
            kost.images.push(mediaUrl);
            await kost.save();
        }

        res.status(201).json(savedGalleryItem);
    } catch (error) {
        res.status(500).json({ message: 'Error uploading gallery item' });
    }
};

// Update gallery item
exports.updateGalleryItem = async (req, res) => {
    try {
        const updatedGalleryItem = await Gallery.findByIdAndUpdate(
            req.params.id,
            { ...req.body, updatedAt: new Date() },
            { new: true, runValidators: true }
        );

        if (!updatedGalleryItem) {
            return res.status(404).json({ message: 'Gallery item not found' });
        }

        res.status(200).json(updatedGalleryItem);
    } catch (error) {
        res.status(500).json({ message: 'Error updating gallery item' });
    }
};

// Delete gallery item
exports.deleteGalleryItem = async (req, res) => {
    try {
        const galleryItem = await Gallery.findById(req.params.id);
        if (!galleryItem) {
            return res.status(404).json({ message: 'Gallery item not found' });
        }

        // Remove image from kost if it's a photo
        if (galleryItem.mediaType === 'image') {
            const kost = await Kost.findById(galleryItem.kost);
            if (kost) {
                kost.images = kost.images.filter(img => img !== galleryItem.mediaUrl);
                await kost.save();
            }
        }

        await galleryItem.remove();
        res.status(200).json({ message: 'Gallery item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting gallery item' });
    }
};

// Toggle gallery item status
exports.toggleGalleryItemStatus = async (req, res) => {
    try {
        const galleryItem = await Gallery.findById(req.params.id);
        if (!galleryItem) {
            return res.status(404).json({ message: 'Gallery item not found' });
        }

        galleryItem.isActive = !galleryItem.isActive;
        const updatedGalleryItem = await galleryItem.save();

        res.status(200).json(updatedGalleryItem);
    } catch (error) {
        res.status(500).json({ message: 'Error toggling gallery item status' });
    }
};

// Get gallery statistics
exports.getGalleryStatistics = async (req, res) => {
    try {
        const totalItems = await Gallery.countDocuments();
        const activeItems = await Gallery.countDocuments({ isActive: true });
        const imageCount = await Gallery.countDocuments({ mediaType: 'image' });
        const videoCount = await Gallery.countDocuments({ mediaType: 'video' });

        const kostWithMostMedia = await Gallery.aggregate([
            { $group: {
                _id: '$kost',
                count: { $sum: 1 }
            }},
            { $sort: { count: -1 } },
            { $limit: 1 }
        ]);

        const kost = kostWithMostMedia[0] ? 
            await Kost.findById(kostWithMostMedia[0]._id) : null;

        res.status(200).json({
            totalItems,
            activeItems,
            imageCount,
            videoCount,
            kostWithMostMedia: kost ? {
                name: kost.name,
                count: kostWithMostMedia[0].count
            } : null
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching gallery statistics' });
    }
};