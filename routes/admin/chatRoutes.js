const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../../middleware/auth');
const chatController = require('../../controllers/admin/chatController');

/**
 * @swagger
 * tags:
 *   name: Admin Chat
 *   description: API untuk manajemen chat admin
 */

/**
 * @swagger
 * /api/admin/chats:
 *   get:
 *     summary: Mendapatkan semua chat admin
 *     tags: [Admin Chat]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Daftar chat berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Chat'
 *       401:
 *         description: Tidak terautentikasi
 *       403:
 *         description: Bukan admin
 *       500:
 *         description: Server error
 */
router.get('/chats', verifyToken, isAdmin, chatController.getAllChats);

/**
 * @swagger
 * /api/admin/chats/users:
 *   get:
 *     summary: Mendapatkan semua pengguna untuk memulai chat baru
 *     tags: [Admin Chat]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Daftar pengguna berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   profilePicture:
 *                     type: string
 *       401:
 *         description: Tidak terautentikasi
 *       403:
 *         description: Bukan admin
 *       500:
 *         description: Server error
 */
router.get('/chats/users', verifyToken, isAdmin, chatController.getAllUsersForChat);

/**
 * @swagger
 * /api/admin/chats/{chatId}:
 *   get:
 *     summary: Mendapatkan detail chat berdasarkan ID
 *     tags: [Admin Chat]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: chatId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID chat
 *     responses:
 *       200:
 *         description: Detail chat berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Chat'
 *       401:
 *         description: Tidak terautentikasi
 *       403:
 *         description: Tidak memiliki akses
 *       404:
 *         description: Chat tidak ditemukan
 *       500:
 *         description: Server error
 */
router.get('/chats/:chatId', verifyToken, isAdmin, chatController.getChatById);

/**
 * @swagger
 * /api/admin/chats:
 *   post:
 *     summary: Membuat chat baru dengan pengguna
 *     tags: [Admin Chat]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID pengguna yang akan diajak chat
 *     responses:
 *       200:
 *         description: Chat yang sudah ada berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Chat'
 *       201:
 *         description: Chat baru berhasil dibuat
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Chat'
 *       400:
 *         description: Data tidak valid
 *       401:
 *         description: Tidak terautentikasi
 *       403:
 *         description: Bukan admin
 *       404:
 *         description: Pengguna tidak ditemukan
 *       500:
 *         description: Server error
 */
router.post('/chats', verifyToken, isAdmin, chatController.createChat);

/**
 * @swagger
 * /api/admin/chats/{chatId}/messages:
 *   post:
 *     summary: Mengirim pesan dalam chat
 *     tags: [Admin Chat]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: chatId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID chat
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 description: Isi pesan
 *     responses:
 *       201:
 *         description: Pesan berhasil dikirim
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Chat'
 *       400:
 *         description: Data tidak valid
 *       401:
 *         description: Tidak terautentikasi
 *       403:
 *         description: Tidak memiliki akses
 *       404:
 *         description: Chat tidak ditemukan
 *       500:
 *         description: Server error
 */
router.post('/chats/:chatId/messages', verifyToken, isAdmin, chatController.sendMessage);

/**
 * @swagger
 * /api/admin/chats/statistics:
 *   get:
 *     summary: Mendapatkan statistik chat
 *     tags: [Admin Chat]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Statistik chat berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalChats:
 *                   type: number
 *                 chatsWithUnreadMessages:
 *                   type: number
 *                 totalMessagesSent:
 *                   type: number
 *       401:
 *         description: Tidak terautentikasi
 *       403:
 *         description: Bukan admin
 *       500:
 *         description: Server error
 */
router.get('/chats/statistics', verifyToken, isAdmin, chatController.getChatStatistics);

module.exports = router;