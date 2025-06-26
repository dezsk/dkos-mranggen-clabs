const express = require('express');
const router = express.Router();
const { verifyToken } = require('../../middleware/auth');
const userController = require('../../controllers/user/userController');
const paymentController = require('../../controllers/user/paymentController');

// Protect all routes
router.use(verifyToken);

/**
 * @swagger
 * /api/user/profile:
 *   get:
 *     summary: Mendapatkan profil pengguna
 *     tags: [User Profile]
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
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Token tidak valid atau kedaluwarsa
 *       404:
 *         description: Pengguna tidak ditemukan
 *       500:
 *         description: Server error
 */
router.get('/profile', userController.getProfile);
/**
 * @swagger
 * /api/user/profile:
 *   put:
 *     summary: Memperbarui profil pengguna
 *     tags: [User Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               address:
 *                 type: string
 *               emergencyContact:
 *                 type: string
 *               occupation:
 *                 type: string
 *               identityNumber:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profil berhasil diperbarui
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Data tidak valid
 *       401:
 *         description: Token tidak valid atau kedaluwarsa
 *       404:
 *         description: Pengguna tidak ditemukan
 *       500:
 *         description: Server error
 */
router.put('/profile', userController.updateProfile);
/**
 * @swagger
 * /api/user/profile/password:
 *   put:
 *     summary: Mengubah password pengguna
 *     tags: [User Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 description: Password saat ini
 *               newPassword:
 *                 type: string
 *                 description: Password baru
 *     responses:
 *       200:
 *         description: Password berhasil diubah
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       400:
 *         description: Data tidak valid atau password baru terlalu pendek
 *       401:
 *         description: Password saat ini tidak valid
 *       404:
 *         description: Pengguna tidak ditemukan
 *       500:
 *         description: Server error
 */
router.put('/profile/password', userController.changePassword);
/**
 * @swagger
 * /api/user/profile/picture:
 *   put:
 *     summary: Memperbarui foto profil pengguna
 *     tags: [User Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - profilePicture
 *             properties:
 *               profilePicture:
 *                 type: string
 *                 description: URL atau Base64 dari foto profil
 *     responses:
 *       200:
 *         description: Foto profil berhasil diperbarui
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 profilePicture:
 *                   type: string
 *       400:
 *         description: Data tidak valid
 *       401:
 *         description: Token tidak valid atau kedaluwarsa
 *       404:
 *         description: Pengguna tidak ditemukan
 *       500:
 *         description: Server error
 */
router.put('/profile/picture', userController.updateProfilePicture);

/**
 * @swagger
 * tags:
 *   - name: User Dashboard
 *     description: Endpoint untuk dashboard pengguna
 */

/**
 * @swagger
 * /api/user/dashboard:
 *   get:
 *     summary: Mendapatkan ringkasan dashboard pengguna
 *     tags: [User Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Ringkasan dashboard berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 currentBooking:
 *                   type: object
 *                   properties:
 *                     kostName:
 *                       type: string
 *                     roomType:
 *                       type: string
 *                     startDate:
 *                       type: string
 *                       format: date
 *                     endDate:
 *                       type: string
 *                       format: date
 *                     status:
 *                       type: string
 *                 pendingPayments:
 *                   type: integer
 *                 announcements:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                       content:
 *                         type: string
 *                       date:
 *                         type: string
 *                         format: date-time
 *       401:
 *         description: Token tidak valid atau kedaluwarsa
 *       404:
 *         description: Pengguna tidak ditemukan
 *       500:
 *         description: Server error
 */
router.get('/dashboard', userController.getDashboardSummary);

/**
 * @swagger
 * tags:
 *   - name: User Payments
 *     description: Endpoint untuk manajemen pembayaran pengguna
 */

/**
 * @swagger
 * /api/user/payments/history:
 *   get:
 *     summary: Mendapatkan riwayat pembayaran pengguna
 *     tags: [User Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Jumlah maksimum data yang ditampilkan
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Nomor halaman untuk pagination
 *     responses:
 *       200:
 *         description: Riwayat pembayaran berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 payments:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       amount:
 *                         type: number
 *                       paymentDate:
 *                         type: string
 *                         format: date-time
 *                       status:
 *                         type: string
 *                         enum: [pending, verified, rejected]
 *                       bookingId:
 *                         type: string
 *                       kostName:
 *                         type: string
 *                       paymentProof:
 *                         type: string
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *       401:
 *         description: Token tidak valid atau kedaluwarsa
 *       500:
 *         description: Server error
 */
router.get('/payments/history', paymentController.getUserPaymentHistory);
/**
 * @swagger
 * /api/user/payments/pending:
 *   get:
 *     summary: Mendapatkan daftar pembayaran yang masih pending
 *     tags: [User Payments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Daftar pembayaran pending berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 pendingPayments:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       amount:
 *                         type: number
 *                       dueDate:
 *                         type: string
 *                         format: date-time
 *                       bookingId:
 *                         type: string
 *                       kostName:
 *                         type: string
 *                       roomType:
 *                         type: string
 *                       status:
 *                         type: string
 *                         enum: [pending]
 *       401:
 *         description: Token tidak valid atau kedaluwarsa
 *       500:
 *         description: Server error
 */
router.get('/payments/pending', paymentController.getPendingPayments);
/**
 * @swagger
 * /api/user/payments/statistics:
 *   get:
 *     summary: Mendapatkan statistik pembayaran pengguna
 *     tags: [User Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *         description: Tahun untuk filter statistik (opsional)
 *     responses:
 *       200:
 *         description: Statistik pembayaran berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 totalSpent:
 *                   type: number
 *                 paymentsByMonth:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       month:
 *                         type: string
 *                       amount:
 *                         type: number
 *                 paymentsByStatus:
 *                   type: object
 *                   properties:
 *                     verified:
 *                       type: number
 *                     pending:
 *                       type: number
 *                     rejected:
 *                       type: number
 *       401:
 *         description: Token tidak valid atau kedaluwarsa
 *       500:
 *         description: Server error
 */
router.get('/payments/statistics', paymentController.getUserPaymentStatistics);
/**
 * @swagger
 * /api/user/payments/{paymentId}:
 *   get:
 *     summary: Mendapatkan detail pembayaran berdasarkan ID
 *     tags: [User Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: paymentId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID pembayaran
 *     responses:
 *       200:
 *         description: Detail pembayaran berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 payment:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     amount:
 *                       type: number
 *                     paymentDate:
 *                       type: string
 *                       format: date-time
 *                     status:
 *                       type: string
 *                       enum: [pending, verified, rejected]
 *                     bookingId:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         kostId:
 *                           type: object
 *                           properties:
 *                             _id:
 *                               type: string
 *                             name:
 *                               type: string
 *                             address:
 *                               type: string
 *                             roomType:
 *                               type: string
 *                     paymentProof:
 *                       type: string
 *                     verificationDate:
 *                       type: string
 *                       format: date-time
 *                     verifiedBy:
 *                       type: string
 *                     rejectionReason:
 *                       type: string
 *       401:
 *         description: Token tidak valid atau kedaluwarsa
 *       403:
 *         description: Tidak memiliki akses ke pembayaran ini
 *       404:
 *         description: Pembayaran tidak ditemukan
 *       500:
 *         description: Server error
 */
router.get('/payments/:paymentId', paymentController.getPaymentDetails);

/**
 * @swagger
 * tags:
 *   - name: Account Management
 *     description: Endpoint untuk manajemen akun pengguna
 */

/**
 * @swagger
 * /api/user/deactivate:
 *   post:
 *     summary: Menonaktifkan akun pengguna
 *     tags: [Account Management]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *                 description: Password untuk konfirmasi
 *               reason:
 *                 type: string
 *                 description: Alasan menonaktifkan akun (opsional)
 *     responses:
 *       200:
 *         description: Akun berhasil dinonaktifkan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       400:
 *         description: Data tidak valid
 *       401:
 *         description: Password tidak valid atau token tidak valid
 *       404:
 *         description: Pengguna tidak ditemukan
 *       500:
 *         description: Server error
 */
router.post('/deactivate', userController.deactivateAccount);

module.exports = router;