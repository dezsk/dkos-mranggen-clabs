const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API untuk autentikasi pengguna
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: Nama pengguna
 *         email:
 *           type: string
 *           description: Email pengguna, harus unik
 *         password:
 *           type: string
 *           description: Password pengguna (minimal 6 karakter)
 *         role:
 *           type: string
 *           description: Peran pengguna (admin atau user)
 *           enum: [admin, user]
 *           default: user
 *         phoneNumber:
 *           type: string
 *           description: Nomor telepon pengguna
 *         address:
 *           type: string
 *           description: Alamat pengguna
 *         profilePicture:
 *           type: string
 *           description: URL gambar profil pengguna
 *         status:
 *           type: string
 *           description: Status akun pengguna
 *           enum: [active, inactive]
 *           default: active
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Mendaftarkan pengguna baru
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [admin, user]
 *                 default: user
 *     responses:
 *       201:
 *         description: Pendaftaran berhasil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Validasi gagal atau email sudah terdaftar
 *       500:
 *         description: Server error
 */
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Validasi input
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Semua field harus diisi' });
        }

        // Validasi email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Format email tidak valid' });
        }

        // Validasi password length
        if (password.length < 6) {
            return res.status(400).json({ message: 'Password minimal 6 karakter' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Email sudah terdaftar' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ 
            name, 
            email, 
            password: hashedPassword, 
            role: role || 'user' 
        });

        await user.save();
        res.status(201).json({ message: 'Pendaftaran berhasil' });
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ message: 'Pendaftaran gagal', error: err.message });
    }
});

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login pengguna
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login berhasil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token untuk autentikasi
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     role:
 *                       type: string
 *       400:
 *         description: Email atau password tidak diisi
 *       401:
 *         description: Kredensial tidak valid
 *       403:
 *         description: Akun tidak aktif
 *       404:
 *         description: Pengguna tidak ditemukan
 *       500:
 *         description: Server error
 */
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validasi input
        if (!email || !password) {
            return res.status(400).json({ message: 'Email dan password harus diisi' });
        }

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'Pengguna tidak ditemukan' });

        // Cek status pengguna
        if (user.status === 'inactive') {
            return res.status(403).json({ message: 'Akun tidak aktif' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(401).json({ message: 'Kredensial tidak valid' });

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' } // Memperpanjang waktu token menjadi 24 jam
        );

        // Mengembalikan informasi pengguna yang lebih lengkap
        res.status(200).json({ 
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Login gagal', error: err.message });
    }
});

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Mendapatkan profil pengguna yang sedang login
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profil pengguna berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     role:
 *                       type: string
 *                     phoneNumber:
 *                       type: string
 *                     address:
 *                       type: string
 *                     profilePicture:
 *                       type: string
 *                     status:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       401:
 *         description: Token tidak valid atau kedaluwarsa
 *       404:
 *         description: Pengguna tidak ditemukan
 *       500:
 *         description: Server error
 */
router.get('/me', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        
        if (!user) {
            return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
        }
        
        res.status(200).json({
            success: true,
            user: user
        });
    } catch (err) {
        console.error('Get user profile error:', err);
        res.status(500).json({ message: 'Gagal mengambil profil pengguna', error: err.message });
    }
});

module.exports = router;
