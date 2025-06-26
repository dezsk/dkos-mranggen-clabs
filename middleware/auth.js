const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        
        if (!authHeader) {
            return res.status(401).json({ 
                success: false,
                message: 'Akses ditolak. Token tidak ditemukan' 
            });
        }
        
        // Periksa format token
        if (!authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ 
                success: false,
                message: 'Format token tidak valid. Gunakan format: Bearer [token]' 
            });
        }
        
        const token = authHeader.split(' ')[1]; // Bearer token
        
        if (!token) {
            return res.status(401).json({ 
                success: false,
                message: 'Token tidak ditemukan' 
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // simpan payload user
        next();
    } catch (err) {
        console.error('Token verification error:', err);
        
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ 
                success: false,
                message: 'Token telah kedaluwarsa. Silakan login kembali' 
            });
        }
        
        res.status(401).json({ 
            success: false,
            message: 'Token tidak valid',
            error: err.message
        });
    }
};

const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, (err) => {
        if (err) return next(err);
        
        if (req.user.role === 'admin') {
            next();
        } else {
            res.status(403).json({ 
                success: false,
                message: 'Akses ditolak. Hanya admin yang diizinkan' 
            });
        }
    });
};

const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({
            success: false,
            message: 'Akses ditolak. Hanya admin yang diizinkan'
        });
    }
    next();
};

module.exports = { verifyToken, verifyAdmin, isAdmin };