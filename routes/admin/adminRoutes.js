const express = require('express');
const router = express.Router();
const { verifyAdmin } = require('../../middleware/auth');

// Import controllers
const kostController = require('../../controllers/admin/kostController');
const paymentController = require('../../controllers/admin/paymentController');
const announcementController = require('../../controllers/admin/announcementController');
const galleryController = require('../../controllers/admin/galleryController');

// Import upload middleware
const { uploadImage } = require('../../config/cloudinary');

// Protect all routes
router.use(verifyAdmin);

/**
 * @swagger
 * tags:
 *   - name: Admin Kost
 *     description: Endpoint untuk manajemen kost oleh admin
 */

/**
 * @swagger
 * /api/admin/kosts:
 *   get:
 *     summary: Mendapatkan semua data kost
 *     tags: [Admin Kost]
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
 *           enum: [available, full, maintenance]
 *         description: Filter berdasarkan status kost
 *     responses:
 *       200:
 *         description: Daftar kost berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 kosts:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Kost'
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *       401:
 *         description: Token tidak valid atau kedaluwarsa
 *       403:
 *         description: Tidak memiliki akses admin
 *       500:
 *         description: Server error
 */
router.get('/kosts', kostController.getAllKost);
/**
 * @swagger
 * /api/admin/kosts/{id}:
 *   get:
 *     summary: Mendapatkan detail kost berdasarkan ID
 *     tags: [Admin Kost]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID kost yang ingin ditampilkan
 *     responses:
 *       200:
 *         description: Detail kost berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 kost:
 *                   $ref: '#/components/schemas/Kost'
 *       401:
 *         description: Token tidak valid atau kedaluwarsa
 *       403:
 *         description: Tidak memiliki akses admin
 *       404:
 *         description: Kost tidak ditemukan
 *       500:
 *         description: Server error
 */
router.get('/kosts/:id', kostController.getKostById);
/**
 * @swagger
 * /api/admin/kosts:
 *   post:
 *     summary: Membuat data kost baru
 *     tags: [Admin Kost]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - address
 *               - price
 *               - roomType
 *               - totalRooms
 *               - availableRooms
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nama kost
 *               address:
 *                 type: string
 *                 description: Alamat lengkap kost
 *               description:
 *                 type: string
 *                 description: Deskripsi kost
 *               facilities:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Daftar fasilitas yang tersedia
 *               price:
 *                 type: number
 *                 description: Harga sewa per bulan
 *               roomType:
 *                 type: string
 *                 description: Tipe kamar (e.g., single, double)
 *               totalRooms:
 *                 type: integer
 *                 description: Total jumlah kamar
 *               availableRooms:
 *                 type: integer
 *                 description: Jumlah kamar yang tersedia
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: URL gambar kost
 *               status:
 *                 type: string
 *                 enum: [available, full, maintenance]
 *                 default: available
 *                 description: Status ketersediaan kost
 *               rules:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Peraturan kost
 *     responses:
 *       201:
 *         description: Kost berhasil dibuat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 kost:
 *                   $ref: '#/components/schemas/Kost'
 *       400:
 *         description: Data tidak valid
 *       401:
 *         description: Token tidak valid atau kedaluwarsa
 *       403:
 *         description: Tidak memiliki akses admin
 *       500:
 *         description: Server error
 */
router.post('/kosts', kostController.createKost);
/**
 * @swagger
 * /api/admin/kosts/{id}:
 *   put:
 *     summary: Memperbarui data kost berdasarkan ID
 *     tags: [Admin Kost]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID kost yang ingin diperbarui
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nama kost
 *               address:
 *                 type: string
 *                 description: Alamat lengkap kost
 *               description:
 *                 type: string
 *                 description: Deskripsi kost
 *               facilities:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Daftar fasilitas yang tersedia
 *               price:
 *                 type: number
 *                 description: Harga sewa per bulan
 *               roomType:
 *                 type: string
 *                 description: Tipe kamar (e.g., single, double)
 *               totalRooms:
 *                 type: integer
 *                 description: Total jumlah kamar
 *               availableRooms:
 *                 type: integer
 *                 description: Jumlah kamar yang tersedia
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: URL gambar kost
 *               status:
 *                 type: string
 *                 enum: [available, full, maintenance]
 *                 description: Status ketersediaan kost
 *               rules:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Peraturan kost
 *     responses:
 *       200:
 *         description: Kost berhasil diperbarui
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 kost:
 *                   $ref: '#/components/schemas/Kost'
 *       400:
 *         description: Data tidak valid
 *       401:
 *         description: Token tidak valid atau kedaluwarsa
 *       403:
 *         description: Tidak memiliki akses admin
 *       404:
 *         description: Kost tidak ditemukan
 *       500:
 *         description: Server error
 */
router.put('/kosts/:id', kostController.updateKost);
/**
 * @swagger
 * /api/admin/kosts/{id}:
 *   delete:
 *     summary: Menghapus data kost berdasarkan ID
 *     tags: [Admin Kost]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID kost yang ingin dihapus
 *     responses:
 *       200:
 *         description: Kost berhasil dihapus
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       401:
 *         description: Token tidak valid atau kedaluwarsa
 *       403:
 *         description: Tidak memiliki akses admin
 *       404:
 *         description: Kost tidak ditemukan
 *       500:
 *         description: Server error
 */
router.delete('/kosts/:id', kostController.deleteKost);
/**
 * @swagger
 * /api/admin/kosts/{id}/availability:
 *   put:
 *     summary: Memperbarui ketersediaan kamar kost
 *     tags: [Admin Kost]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID kost yang ingin diperbarui ketersediaan kamarnya
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - availableRooms
 *             properties:
 *               availableRooms:
 *                 type: integer
 *                 description: Jumlah kamar yang tersedia
 *               status:
 *                 type: string
 *                 enum: [available, full, maintenance]
 *                 description: Status ketersediaan kost
 *     responses:
 *       200:
 *         description: Ketersediaan kamar berhasil diperbarui
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 kost:
 *                   $ref: '#/components/schemas/Kost'
 *       400:
 *         description: Data tidak valid
 *       401:
 *         description: Token tidak valid atau kedaluwarsa
 *       403:
 *         description: Tidak memiliki akses admin
 *       404:
 *         description: Kost tidak ditemukan
 *       500:
 *         description: Server error
 */
router.put('/kosts/:id/availability', kostController.updateRoomAvailability);

/**
 * @swagger
 * tags:
 *   - name: Admin Payments
 *     description: Endpoint untuk manajemen pembayaran oleh admin
 */

/**
 * @swagger
 * /api/admin/payments:
 *   get:
 *     summary: Mendapatkan semua data pembayaran
 *     tags: [Admin Payments]
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
 *           enum: [pending, paid, verified, rejected, expired]
 *         description: Filter berdasarkan status pembayaran
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter berdasarkan tanggal mulai (format YYYY-MM-DD)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter berdasarkan tanggal akhir (format YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Daftar pembayaran berhasil diambil
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
 *                     $ref: '#/components/schemas/Payment'
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *       401:
 *         description: Token tidak valid atau kedaluwarsa
 *       403:
 *         description: Tidak memiliki akses admin
 *       500:
 *         description: Server error
 */
router.get('/payments', paymentController.getAllPayments);
/**
 * @swagger
 * /api/admin/payments/verification:
 *   get:
 *     summary: Mendapatkan daftar pembayaran yang perlu diverifikasi
 *     tags: [Admin Payments]
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
 *         description: Daftar pembayaran yang perlu diverifikasi berhasil diambil
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
 *                     $ref: '#/components/schemas/Payment'
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *       401:
 *         description: Token tidak valid atau kedaluwarsa
 *       403:
 *         description: Tidak memiliki akses admin
 *       500:
 *         description: Server error
 */
router.get('/payments/verification', paymentController.getPaymentsForVerification);
/**
 * @swagger
 * /api/admin/payments/{paymentId}/verify:
 *   put:
 *     summary: Memverifikasi atau menolak pembayaran
 *     tags: [Admin Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: paymentId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID pembayaran yang akan diverifikasi
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [verified, rejected]
 *                 description: Status verifikasi pembayaran
 *               rejectionReason:
 *                 type: string
 *                 description: Alasan penolakan (wajib jika status rejected)
 *               notes:
 *                 type: string
 *                 description: Catatan tambahan
 *     responses:
 *       200:
 *         description: Pembayaran berhasil diverifikasi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 payment:
 *                   $ref: '#/components/schemas/Payment'
 *       400:
 *         description: Data tidak valid
 *       401:
 *         description: Token tidak valid atau kedaluwarsa
 *       403:
 *         description: Tidak memiliki akses admin
 *       404:
 *         description: Pembayaran tidak ditemukan
 *       500:
 *         description: Server error
 */
router.post('/payments/:paymentId/verify', paymentController.verifyPayment);
/**
 * @swagger
 * /api/admin/payments/statistics:
 *   get:
 *     summary: Mendapatkan statistik pembayaran
 *     tags: [Admin Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *         description: Tahun untuk statistik (default tahun saat ini)
 *       - in: query
 *         name: month
 *         schema:
 *           type: integer
 *         description: Bulan untuk statistik (1-12, opsional)
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
 *                 statistics:
 *                   type: object
 *                   properties:
 *                     totalRevenue:
 *                       type: number
 *                       description: Total pendapatan
 *                     revenueByMonth:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           month:
 *                             type: string
 *                           amount:
 *                             type: number
 *                     paymentsByStatus:
 *                       type: object
 *                       properties:
 *                         pending:
 *                           type: integer
 *                         paid:
 *                           type: integer
 *                         verified:
 *                           type: integer
 *                         rejected:
 *                           type: integer
 *                         expired:
 *                           type: integer
 *       401:
 *         description: Token tidak valid atau kedaluwarsa
 *       403:
 *         description: Tidak memiliki akses admin
 *       500:
 *         description: Server error
 */
router.get('/payments/statistics', paymentController.getPaymentStatistics);

/**
 * @swagger
 * tags:
 *   - name: Admin Announcements
 *     description: Endpoint untuk manajemen pengumuman oleh admin
 */

/**
 * @swagger
 * /api/admin/announcements:
 *   get:
 *     summary: Mendapatkan semua pengumuman
 *     tags: [Admin Announcements]
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
 *         name: isActive
 *         schema:
 *           type: boolean
 *         description: Filter berdasarkan status aktif
 *     responses:
 *       200:
 *         description: Daftar pengumuman berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 announcements:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Announcement'
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *       401:
 *         description: Token tidak valid atau kedaluwarsa
 *       403:
 *         description: Tidak memiliki akses admin
 *       500:
 *         description: Server error
 */
router.get('/announcements', announcementController.getAllAnnouncements);
/**
 * @swagger
 * /api/admin/announcements/active:
 *   get:
 *     summary: Mendapatkan pengumuman yang aktif
 *     tags: [Admin Announcements]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Daftar pengumuman aktif berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 announcements:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Announcement'
 *       401:
 *         description: Token tidak valid atau kedaluwarsa
 *       403:
 *         description: Tidak memiliki akses admin
 *       500:
 *         description: Server error
 */
router.get('/announcements/active', announcementController.getActiveAnnouncements);
/**
 * @swagger
 * /api/admin/announcements/target/{audience}:
 *   get:
 *     summary: Mendapatkan pengumuman berdasarkan target audiens
 *     tags: [Admin Announcements]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: audience
 *         required: true
 *         schema:
 *           type: string
 *           enum: [all, users, admins]
 *         description: Target audiens pengumuman
 *     responses:
 *       200:
 *         description: Daftar pengumuman berdasarkan target berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 announcements:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Announcement'
 *       401:
 *         description: Token tidak valid atau kedaluwarsa
 *       403:
 *         description: Tidak memiliki akses admin
 *       500:
 *         description: Server error
 */
router.get('/announcements/target/:audience', announcementController.getAnnouncementsByTarget);
/**
 * @swagger
 * /api/admin/announcements/{id}:
 *   get:
 *     summary: Mendapatkan detail pengumuman berdasarkan ID
 *     tags: [Admin Announcements]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID pengumuman yang ingin ditampilkan
 *     responses:
 *       200:
 *         description: Detail pengumuman berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 announcement:
 *                   $ref: '#/components/schemas/Announcement'
 *       401:
 *         description: Token tidak valid atau kedaluwarsa
 *       403:
 *         description: Tidak memiliki akses admin
 *       404:
 *         description: Pengumuman tidak ditemukan
 *       500:
 *         description: Server error
 */
router.get('/announcements/:id', announcementController.getAnnouncementById);
/**
 * @swagger
 * /api/admin/announcements:
 *   post:
 *     summary: Membuat pengumuman baru
 *     tags: [Admin Announcements]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - target
 *               - startDate
 *             properties:
 *               title:
 *                 type: string
 *                 description: Judul pengumuman
 *               content:
 *                 type: string
 *                 description: Isi pengumuman
 *               target:
 *                 type: string
 *                 enum: [all, users, admins]
 *                 description: Target audiens pengumuman
 *               startDate:
 *                 type: string
 *                 format: date-time
 *                 description: Tanggal mulai pengumuman ditampilkan
 *               endDate:
 *                 type: string
 *                 format: date-time
 *                 description: Tanggal berakhir pengumuman ditampilkan
 *               isActive:
 *                 type: boolean
 *                 default: true
 *                 description: Status aktif pengumuman
 *     responses:
 *       201:
 *         description: Pengumuman berhasil dibuat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 announcement:
 *                   $ref: '#/components/schemas/Announcement'
 *       400:
 *         description: Data tidak valid
 *       401:
 *         description: Token tidak valid atau kedaluwarsa
 *       403:
 *         description: Tidak memiliki akses admin
 *       500:
 *         description: Server error
 */
router.post('/announcements', announcementController.createAnnouncement);
/**
 * @swagger
 * /api/admin/announcements/{id}:
 *   put:
 *     summary: Memperbarui pengumuman berdasarkan ID
 *     tags: [Admin Announcements]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID pengumuman yang ingin diperbarui
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Judul pengumuman
 *               content:
 *                 type: string
 *                 description: Isi pengumuman
 *               target:
 *                 type: string
 *                 enum: [all, users, admins]
 *                 description: Target audiens pengumuman
 *               startDate:
 *                 type: string
 *                 format: date-time
 *                 description: Tanggal mulai pengumuman ditampilkan
 *               endDate:
 *                 type: string
 *                 format: date-time
 *                 description: Tanggal berakhir pengumuman ditampilkan
 *               isActive:
 *                 type: boolean
 *                 description: Status aktif pengumuman
 *     responses:
 *       200:
 *         description: Pengumuman berhasil diperbarui
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 announcement:
 *                   $ref: '#/components/schemas/Announcement'
 *       400:
 *         description: Data tidak valid
 *       401:
 *         description: Token tidak valid atau kedaluwarsa
 *       403:
 *         description: Tidak memiliki akses admin
 *       404:
 *         description: Pengumuman tidak ditemukan
 *       500:
 *         description: Server error
 */
router.put('/announcements/:id', announcementController.updateAnnouncement);
/**
 * @swagger
 * /api/admin/announcements/{id}:
 *   delete:
 *     summary: Menghapus pengumuman berdasarkan ID
 *     tags: [Admin Announcements]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID pengumuman yang ingin dihapus
 *     responses:
 *       200:
 *         description: Pengumuman berhasil dihapus
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       401:
 *         description: Token tidak valid atau kedaluwarsa
 *       403:
 *         description: Tidak memiliki akses admin
 *       404:
 *         description: Pengumuman tidak ditemukan
 *       500:
 *         description: Server error
 */
router.delete('/announcements/:id', announcementController.deleteAnnouncement);

/**
 * @swagger
 * tags:
 *   - name: Admin Gallery
 *     description: Endpoint untuk manajemen galeri oleh admin
 */

/**
 * @swagger
 * /api/admin/gallery:
 *   get:
 *     summary: Mendapatkan semua item galeri
 *     tags: [Admin Gallery]
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
 *         name: type
 *         schema:
 *           type: string
 *           enum: [kost, facility, other]
 *         description: Filter berdasarkan tipe gambar
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: boolean
 *         description: Filter berdasarkan status aktif
 *     responses:
 *       200:
 *         description: Daftar item galeri berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 gallery:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Gallery'
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *       401:
 *         description: Token tidak valid atau kedaluwarsa
 *       403:
 *         description: Tidak memiliki akses admin
 *       500:
 *         description: Server error
 */
router.get('/gallery', galleryController.getAllGalleryItems);
/**
 * @swagger
 * /api/admin/gallery/kost/{kostId}:
 *   get:
 *     summary: Mendapatkan item galeri berdasarkan ID kost
 *     tags: [Admin Gallery]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: kostId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID kost yang terkait dengan item galeri
 *     responses:
 *       200:
 *         description: Daftar item galeri berdasarkan kost berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 gallery:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Gallery'
 *       401:
 *         description: Token tidak valid atau kedaluwarsa
 *       403:
 *         description: Tidak memiliki akses admin
 *       404:
 *         description: Kost tidak ditemukan
 *       500:
 *         description: Server error
 */
router.get('/gallery/kost/:kostId', galleryController.getGalleryByKost);
/**
 * @swagger
 * /api/admin/gallery:
 *   post:
 *     summary: Menambahkan item galeri baru
 *     tags: [Admin Gallery]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - kostId
 *             properties:
 *               title:
 *                 type: string
 *                 description: Judul gambar
 *               description:
 *                 type: string
 *                 description: Deskripsi gambar
 *               mediaType:
 *                 type: string
 *                 enum: [image, video]
 *                 description: Opsional jika mengunggah file gambar
 *               media:
 *                 type: string
 *                 format: binary
 *                 description: File gambar yang akan diunggah
 *               mediaUrl:
 *                 type: string
 *                 description: URL video (diperlukan jika mediaType adalah video)
 *               kostId:
 *                 type: string
 *                 description: ID kost terkait
 *               type:
 *                 type: string
 *                 enum: [kost, facility, other]
 *                 description: Tipe gambar
 *               isActive:
 *                 type: boolean
 *                 default: true
 *                 description: Status aktif gambar
 *     responses:
 *       201:
 *         description: Item galeri berhasil ditambahkan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 gallery:
 *                   $ref: '#/components/schemas/Gallery'
 *       400:
 *         description: Data tidak valid
 *       401:
 *         description: Token tidak valid atau kedaluwarsa
 *       403:
 *         description: Tidak memiliki akses admin
 *       404:
 *         description: Kost tidak ditemukan
 *       500:
 *         description: Server error
 */
router.post('/gallery', uploadImage.single('media'), galleryController.uploadGalleryItem);
/**
 * @swagger
 * /api/admin/gallery/{id}:
 *   put:
 *     summary: Memperbarui item galeri berdasarkan ID
 *     tags: [Admin Gallery]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID item galeri yang ingin diperbarui
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Judul gambar
 *               description:
 *                 type: string
 *                 description: Deskripsi gambar
 *               mediaType:
 *                 type: string
 *                 enum: [image, video]
 *                 description: Tipe media (gambar atau video)
 *               media:
 *                 type: string
 *                 format: binary
 *                 description: File gambar baru yang akan diunggah
 *               mediaUrl:
 *                 type: string
 *                 description: URL video baru (jika mediaType adalah video)
 *               kostId:
 *                 type: string
 *                 description: ID kost terkait
 *               type:
 *                 type: string
 *                 enum: [kost, facility, other]
 *                 description: Tipe gambar
 *               isActive:
 *                 type: boolean
 *                 description: Status aktif gambar
 *     responses:
 *       200:
 *         description: Item galeri berhasil diperbarui
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 gallery:
 *                   $ref: '#/components/schemas/Gallery'
 *       400:
 *         description: Data tidak valid
 *       401:
 *         description: Token tidak valid atau kedaluwarsa
 *       403:
 *         description: Tidak memiliki akses admin
 *       404:
 *         description: Item galeri tidak ditemukan
 *       500:
 *         description: Server error
 */
router.put('/gallery/:id', uploadImage.single('media'), galleryController.updateGalleryItem);
/**
 * @swagger
 * /api/admin/gallery/{id}:
 *   delete:
 *     summary: Menghapus item galeri berdasarkan ID
 *     tags: [Admin Gallery]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID item galeri yang ingin dihapus
 *     responses:
 *       200:
 *         description: Item galeri berhasil dihapus
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       401:
 *         description: Token tidak valid atau kedaluwarsa
 *       403:
 *         description: Tidak memiliki akses admin
 *       404:
 *         description: Item galeri tidak ditemukan
 *       500:
 *         description: Server error
 */
router.delete('/gallery/:id', galleryController.deleteGalleryItem);
/**
 * @swagger
 * /api/admin/gallery/{id}/status:
 *   put:
 *     summary: Mengubah status aktif item galeri
 *     tags: [Admin Gallery]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID item galeri yang ingin diubah statusnya
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - isActive
 *             properties:
 *               isActive:
 *                 type: boolean
 *                 description: Status aktif baru untuk item galeri
 *     responses:
 *       200:
 *         description: Status item galeri berhasil diubah
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 gallery:
 *                   $ref: '#/components/schemas/Gallery'
 *       400:
 *         description: Data tidak valid
 *       401:
 *         description: Token tidak valid atau kedaluwarsa
 *       403:
 *         description: Tidak memiliki akses admin
 *       404:
 *         description: Item galeri tidak ditemukan
 *       500:
 *         description: Server error
 */
router.put('/gallery/:id/status', galleryController.toggleGalleryItemStatus);
/**
 * @swagger
 * /api/admin/gallery/statistics:
 *   get:
 *     summary: Mendapatkan statistik galeri
 *     tags: [Admin Gallery]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Statistik galeri berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 statistics:
 *                   type: object
 *                   properties:
 *                     totalItems:
 *                       type: integer
 *                       description: Total item dalam galeri
 *                     byType:
 *                       type: object
 *                       properties:
 *                         kost:
 *                           type: integer
 *                           description: Jumlah gambar tipe kost
 *                         facility:
 *                           type: integer
 *                           description: Jumlah gambar tipe fasilitas
 *                         other:
 *                           type: integer
 *                           description: Jumlah gambar tipe lainnya
 *                     activeItems:
 *                       type: integer
 *                       description: Jumlah item aktif
 *                     inactiveItems:
 *                       type: integer
 *                       description: Jumlah item tidak aktif
 *       401:
 *         description: Token tidak valid atau kedaluwarsa
 *       403:
 *         description: Tidak memiliki akses admin
 *       500:
 *         description: Server error
 */
router.get('/gallery/statistics', galleryController.getGalleryStatistics);

module.exports = router;