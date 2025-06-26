const express = require('express');
const router = express.Router();
const { verifyToken } = require('../../middleware/auth');
const chatController = require('../../controllers/user/chatController');

/**
 * @swagger
 * tags:
 *   name: User Chat
 *   description: API untuk manajemen chat pengguna
 */

/**
 * @swagger
 * /api/user/chats:
 *   get:
 *     summary: Mendapatkan semua chat pengguna
 *     tags: [User Chat]
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
 *       500:
 *         description: Server error
 */
router.get('/chats', verifyToken, chatController.getUserChats);

/**
 * @swagger
 * /api/user/chats/{chatId}:
 *   get:
 *     summary: Mendapatkan detail chat berdasarkan ID
 *     tags: [User Chat]
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
router.get('/chats/:chatId', verifyToken, chatController.getChatById);

/**
 * @swagger
 * /api/user/chats:
 *   post:
 *     summary: Membuat chat baru atau mendapatkan chat yang sudah ada
 *     tags: [User Chat]
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
 *       404:
 *         description: Pengguna tidak ditemukan
 *       500:
 *         description: Server error
 */
router.post('/chats', verifyToken, chatController.createOrGetChat);

/**
 * @swagger
 * /api/user/chats/{chatId}/messages:
 *   post:
 *     summary: Mengirim pesan dalam chat
 *     tags: [User Chat]
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
router.post('/chats/:chatId/messages', verifyToken, chatController.sendMessage);

module.exports = router;