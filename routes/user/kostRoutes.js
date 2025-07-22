const express = require('express');
const router = express.Router();
const kostController = require('../../controllers/user/kostController');

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
router.get('/', kostController.getAllKost);

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

module.exports = router;
