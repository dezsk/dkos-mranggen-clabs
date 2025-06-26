const express = require('express');
const router = express.Router();
const { verifyToken } = require('../../middleware/auth');
const bookingController = require('../../controllers/user/bookingController');

// Protect all routes
router.use(verifyToken);

/**
 * @swagger
 * tags:
 *   - name: Bookings
 *     description: Endpoint untuk manajemen booking kost
 */

/**
 * @swagger
 * /api/bookings:
 *   get:
 *     summary: Mendapatkan daftar booking pengguna
 *     tags: [Bookings]
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
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, active, completed, cancelled]
 *         description: Filter berdasarkan status booking
 *     responses:
 *       200:
 *         description: Daftar booking berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 bookings:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       kostId:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           name:
 *                             type: string
 *                           address:
 *                             type: string
 *                           roomType:
 *                             type: string
 *                       startDate:
 *                         type: string
 *                         format: date
 *                       endDate:
 *                         type: string
 *                         format: date
 *                       status:
 *                         type: string
 *                         enum: [pending, active, completed, cancelled]
 *                       totalAmount:
 *                         type: number
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
router.get('/', bookingController.getUserBookings);
/**
 * @swagger
 * /api/bookings/active:
 *   get:
 *     summary: Mendapatkan daftar booking aktif pengguna
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Daftar booking aktif berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 activeBookings:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       kostId:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           name:
 *                             type: string
 *                           address:
 *                             type: string
 *                           roomType:
 *                             type: string
 *                           facilities:
 *                             type: array
 *                             items:
 *                               type: string
 *                       startDate:
 *                         type: string
 *                         format: date
 *                       endDate:
 *                         type: string
 *                         format: date
 *                       status:
 *                         type: string
 *                         enum: [active]
 *                       totalAmount:
 *                         type: number
 *                       remainingDays:
 *                         type: integer
 *       401:
 *         description: Token tidak valid atau kedaluwarsa
 *       500:
 *         description: Server error
 */
router.get('/active', bookingController.getActiveBookings);
/**
 * @swagger
 * /api/bookings/{bookingId}:
 *   get:
 *     summary: Mendapatkan detail booking berdasarkan ID
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID booking
 *     responses:
 *       200:
 *         description: Detail booking berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 booking:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     userId:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         name:
 *                           type: string
 *                         email:
 *                           type: string
 *                         phoneNumber:
 *                           type: string
 *                     kostId:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         name:
 *                           type: string
 *                         address:
 *                           type: string
 *                         roomType:
 *                           type: string
 *                         price:
 *                           type: number
 *                         facilities:
 *                           type: array
 *                           items:
 *                             type: string
 *                         images:
 *                           type: array
 *                           items:
 *                             type: string
 *                     startDate:
 *                       type: string
 *                       format: date
 *                     endDate:
 *                       type: string
 *                       format: date
 *                     status:
 *                       type: string
 *                       enum: [pending, active, completed, cancelled]
 *                     totalAmount:
 *                       type: number
 *                     payments:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           amount:
 *                             type: number
 *                           status:
 *                             type: string
 *                             enum: [pending, verified, rejected]
 *                           paymentDate:
 *                             type: string
 *                             format: date-time
 *                           paymentProof:
 *                             type: string
 *       401:
 *         description: Token tidak valid atau kedaluwarsa
 *       403:
 *         description: Tidak memiliki akses ke booking ini
 *       404:
 *         description: Booking tidak ditemukan
 *       500:
 *         description: Server error
 */
router.get('/:bookingId', bookingController.getBookingDetail);
/**
 * @swagger
 * /api/bookings:
 *   post:
 *     summary: Membuat booking baru
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - kostId
 *               - startDate
 *               - duration
 *             properties:
 *               kostId:
 *                 type: string
 *                 description: ID kost yang akan dibooking
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: Tanggal mulai sewa (YYYY-MM-DD)
 *               duration:
 *                 type: integer
 *                 description: Durasi sewa dalam bulan
 *               notes:
 *                 type: string
 *                 description: Catatan tambahan (opsional)
 *     responses:
 *       201:
 *         description: Booking berhasil dibuat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 booking:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     kostId:
 *                       type: string
 *                     startDate:
 *                       type: string
 *                       format: date
 *                     endDate:
 *                       type: string
 *                       format: date
 *                     status:
 *                       type: string
 *                     totalAmount:
 *                       type: number
 *                     paymentId:
 *                       type: string
 *                       description: ID pembayaran yang harus dilakukan
 *       400:
 *         description: Data tidak valid atau kost tidak tersedia
 *       401:
 *         description: Token tidak valid atau kedaluwarsa
 *       404:
 *         description: Kost tidak ditemukan
 *       500:
 *         description: Server error
 */
router.post('/', bookingController.createBooking);
/**
 * @swagger
 * /api/bookings/payments/{paymentId}/proof:
 *   post:
 *     summary: Mengirimkan bukti pembayaran
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: paymentId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID pembayaran
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - paymentProof
 *             properties:
 *               paymentProof:
 *                 type: string
 *                 description: URL atau Base64 dari bukti pembayaran
 *               paymentDate:
 *                 type: string
 *                 format: date-time
 *                 description: Tanggal pembayaran dilakukan (opsional)
 *               notes:
 *                 type: string
 *                 description: Catatan tambahan (opsional)
 *     responses:
 *       200:
 *         description: Bukti pembayaran berhasil dikirim
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 payment:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     status:
 *                       type: string
 *                       enum: [pending]
 *                     paymentProof:
 *                       type: string
 *                     paymentDate:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Data tidak valid
 *       401:
 *         description: Token tidak valid atau kedaluwarsa
 *       403:
 *         description: Tidak memiliki akses ke pembayaran ini
 *       404:
 *         description: Pembayaran tidak ditemukan
 *       500:
 *         description: Server error
 */
router.post('/payments/:paymentId/proof', bookingController.submitPaymentProof);
/**
 * @swagger
 * /api/bookings/{bookingId}/extend:
 *   post:
 *     summary: Mengajukan perpanjangan sewa
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID booking
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - duration
 *             properties:
 *               duration:
 *                 type: integer
 *                 description: Durasi perpanjangan dalam bulan
 *               notes:
 *                 type: string
 *                 description: Catatan tambahan (opsional)
 *     responses:
 *       200:
 *         description: Permintaan perpanjangan berhasil diajukan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 extension:
 *                   type: object
 *                   properties:
 *                     bookingId:
 *                       type: string
 *                     newEndDate:
 *                       type: string
 *                       format: date
 *                     additionalAmount:
 *                       type: number
 *                     paymentId:
 *                       type: string
 *                       description: ID pembayaran untuk perpanjangan
 *       400:
 *         description: Data tidak valid atau booking tidak dapat diperpanjang
 *       401:
 *         description: Token tidak valid atau kedaluwarsa
 *       403:
 *         description: Tidak memiliki akses ke booking ini
 *       404:
 *         description: Booking tidak ditemukan
 *       500:
 *         description: Server error
 */
router.post('/:bookingId/extend', bookingController.requestExtension);

module.exports = router;