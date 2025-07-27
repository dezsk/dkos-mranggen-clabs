const express = require('express');
const router = express.Router();
const kostController = require('../../controllers/user/kostController');
const { verifyToken } = require('../../middleware/auth');

/**
 * @swagger
 * tags:
 *   - name: User Kost
 *     description: Endpoint untuk user melihat data kost
 */

/**
 * @swagger
 * /api/user/kost:
 *   get:
 *     summary: Mendapatkan daftar semua kost
 *     tags: [User Kost]
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
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Kost'
 *       500:
 *         description: Server error
 */
router.get('/', verifyToken, kostController.getAllKost);

/**
 * @swagger
 * /api/user/kost/{id}:
 *   get:
 *     summary: Mendapatkan detail kost berdasarkan ID
 *     tags: [User Kost]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID kost
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
 *                 data:
 *                   $ref: '#/components/schemas/Kost'
 *       404:
 *         description: Kost tidak ditemukan
 *       500:
 *         description: Server error
 */
router.get('/:id', kostController.getKostById);

/**
 * @swagger
 * /api/user/kost/type/{roomType}:
 *   get:
 *     summary: Mendapatkan detail kost berdasarkan tipe kamar (A/B)
 *     tags: [User Kost]
 *     parameters:
 *       - in: path
 *         name: roomType
 *         required: true
 *         schema:
 *           type: string
 *         description: Tipe kamar (A/B)
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
 *                 data:
 *                   $ref: '#/components/schemas/Kost'
 *       404:
 *         description: Kost tidak ditemukan
 *       500:
 *         description: Server error
 */
router.get('/type/:roomType', kostController.getKostByRoomType);

module.exports = router;
