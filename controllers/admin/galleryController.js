const Gallery = require('../../models/Gallery');
const Kost = require('../../models/Kost');
const { cloudinary } = require('../../config/cloudinary');

// Get all gallery items
exports.getAllGalleryItems = async (req, res) => {
    try {
        const galleryItems = await Gallery.find()
            .populate('kost', 'name')
            .populate('uploadedBy', 'name')
            .sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: galleryItems });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching gallery items' });
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

        res.status(200).json({ success: true, data: galleryItems });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching kost gallery' });
    }
};

// Upload new gallery item
exports.uploadGalleryItem = async (req, res) => {
    try {
        const { title, description, mediaType, kostId } = req.body;
        let mediaUrl = '';

        // Verify kost exists
        const kost = await Kost.findById(kostId);
        if (!kost) {
            return res.status(404).json({ success: false, message: 'Kost not found' });
        }

        // Handle file upload if present
        if (req.file) {
            // File sudah diupload ke Cloudinary oleh middleware multer-storage-cloudinary
            mediaUrl = req.file.path; // URL gambar dari Cloudinary
        } else if (req.body.mediaUrl) {
            // Jika tidak ada file tetapi ada URL (untuk video)
            mediaUrl = req.body.mediaUrl;
        } else {
            return res.status(400).json({ success: false, message: 'Media file or URL is required' });
        }

        // Tentukan mediaType berdasarkan file yang diupload jika tidak ditentukan
        if (!mediaType) {
            if (req.file) {
                mediaType = 'image';
            } else if (mediaUrl.includes('youtube') || mediaUrl.includes('youtu.be')) {
                mediaType = 'video';
            } else {
                return res.status(400).json({ success: false, message: 'Media type is required' });
            }
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

        res.status(201).json({ success: true, data: savedGalleryItem, message: 'Gallery item uploaded successfully' });
    } catch (error) {
        console.error('Error uploading gallery item:', error);
        res.status(500).json({ success: false, message: 'Error uploading gallery item', error: error.message });
    }
};

// Update gallery item
exports.updateGalleryItem = async (req, res) => {
    try {
        // Dapatkan item galeri yang akan diupdate
        const galleryItem = await Gallery.findById(req.params.id);
        if (!galleryItem) {
            return res.status(404).json({ success: false, message: 'Gallery item not found' });
        }

        const updateData = { ...req.body, updatedAt: new Date() };
        let oldMediaUrl = galleryItem.mediaUrl;
        let oldMediaType = galleryItem.mediaType;

        // Handle file upload if present
        if (req.file) {
            updateData.mediaUrl = req.file.path; // URL gambar dari Cloudinary
            updateData.mediaType = 'image';
        }

        // Update gallery item
        const updatedGalleryItem = await Gallery.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        // Handle kost images update if media type changed or URL changed
        if (oldMediaType === 'image' && (updateData.mediaType !== 'image' || oldMediaUrl !== updatedGalleryItem.mediaUrl)) {
            // Remove old image from kost
            const kost = await Kost.findById(galleryItem.kost);
            if (kost) {
                kost.images = kost.images.filter(img => img !== oldMediaUrl);
                await kost.save();
            }

            // Delete old image from Cloudinary
            if (oldMediaUrl && oldMediaUrl.includes('cloudinary')) {
                try {
                    // Extract public_id from Cloudinary URL
                    const urlParts = oldMediaUrl.split('/');
                    const publicIdWithExtension = urlParts[urlParts.length - 1];
                    const publicId = publicIdWithExtension.split('.')[0];
                    
                    // Delete from Cloudinary
                    await cloudinary.uploader.destroy(`dkost-mranggen/${publicId}`);
                } catch (cloudinaryError) {
                    console.error('Error deleting old image from Cloudinary:', cloudinaryError);
                }
            }
        }

        // Add new image to kost if new media is image
        if (updateData.mediaType === 'image' && (oldMediaType !== 'image' || oldMediaUrl !== updatedGalleryItem.mediaUrl)) {
            const kost = await Kost.findById(galleryItem.kost);
            if (kost) {
                kost.images.push(updatedGalleryItem.mediaUrl);
                await kost.save();
            }
        }

        res.status(200).json({ success: true, data: updatedGalleryItem, message: 'Gallery item updated successfully' });
    } catch (error) {
        console.error('Error updating gallery item:', error);
        res.status(500).json({ success: false, message: 'Error updating gallery item', error: error.message });
    }
};

// Delete gallery item
exports.deleteGalleryItem = async (req, res) => {
    try {
        const galleryItem = await Gallery.findById(req.params.id);
        if (!galleryItem) {
            return res.status(404).json({ success: false, message: 'Gallery item not found' });
        }

        // Remove image from kost if it's a photo
        if (galleryItem.mediaType === 'image') {
            const kost = await Kost.findById(galleryItem.kost);
            if (kost) {
                kost.images = kost.images.filter(img => img !== galleryItem.mediaUrl);
                await kost.save();
            }
            
            // Delete image from Cloudinary if it's stored there
            if (galleryItem.mediaUrl && galleryItem.mediaUrl.includes('cloudinary')) {
                try {
                    // Extract public_id from Cloudinary URL
                    const urlParts = galleryItem.mediaUrl.split('/');
                    const publicIdWithExtension = urlParts[urlParts.length - 1];
                    const publicId = publicIdWithExtension.split('.')[0];
                    
                    // Delete from Cloudinary
                    await cloudinary.uploader.destroy(`dkost-mranggen/${publicId}`);
                    console.log(`Deleted image from Cloudinary: ${publicId}`);
                } catch (cloudinaryError) {
                    console.error('Error deleting from Cloudinary:', cloudinaryError);
                    // Continue with deletion even if Cloudinary delete fails
                }
            }
        }

        await galleryItem.remove();
        res.status(200).json({ success: true, message: 'Gallery item deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting gallery item' });
    }
};

// Toggle gallery item status
exports.toggleGalleryItemStatus = async (req, res) => {
    try {
        const galleryItem = await Gallery.findById(req.params.id);
        if (!galleryItem) {
            return res.status(404).json({ success: false, message: 'Gallery item not found' });
        }

        galleryItem.isActive = !galleryItem.isActive;
        const updatedGalleryItem = await galleryItem.save();

        res.status(200).json({ success: true, data: updatedGalleryItem, message: 'Gallery item status toggled successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error toggling gallery item status' });
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
            success: true,
            data: {
                totalItems,
                activeItems,
                imageCount,
                videoCount,
                kostWithMostMedia: kost ? {
                    name: kost.name,
                    count: kostWithMostMedia[0].count
                } : null
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching gallery statistics' });
    }
};