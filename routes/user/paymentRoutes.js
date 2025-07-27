const express = require('express');
const router = express.Router();
const paymentController = require('../../controllers/user/paymentController');
const { verifyToken } = require('../../middleware/auth');

/**
 * @swagger
 * tags:
 *   - name: User Payments
 *     description: Endpoint untuk manajemen pembayaran user
 */

/**
 * @swagger
 * /api/user/payments/history:
 *   get:
 *     summary: Mendapatkan riwayat pembayaran user
 *     tags: [User Payments]
 *     security:
 *       - bearerAuth: []
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
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Payment'
 *       401:
 *         description: Token tidak valid atau kedaluwarsa
 *       500:
 *         description: Server error
 */
router.get('/history', verifyToken, paymentController.getUserPaymentHistory);

/**
 * @swagger
 * /api/user/payments/pending:
 *   get:
 *     summary: Mendapatkan pembayaran tertunda user
 *     tags: [User Payments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Pembayaran tertunda berhasil diambil
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
 *                     $ref: '#/components/schemas/Payment'
 *       401:
 *         description: Token tidak valid atau kedaluwarsa
 *       500:
 *         description: Server error
 */
router.get('/pending', verifyToken, paymentController.getPendingPayments);

/**
 * @swagger
 * /api/user/payments/{paymentId}:
 *   get:
 *     summary: Mendapatkan detail pembayaran user
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
 *                 data:
 *                   $ref: '#/components/schemas/Payment'
 *       401:
 *         description: Token tidak valid atau kedaluwarsa
 *       404:
 *         description: Pembayaran tidak ditemukan
 *       500:
 *         description: Server error
 */
router.get('/:paymentId', verifyToken, paymentController.getPaymentDetails);

/**
 * @swagger
 * /api/user/payments/statistics:
 *   get:
 *     summary: Mendapatkan statistik pembayaran user
 *     tags: [User Payments]
 *     security:
 *       - bearerAuth: []
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
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalPayments:
 *                       type: integer
 *                     confirmedPayments:
 *                       type: integer
 *                     pendingPayments:
 *                       type: integer
 *                     waitingConfirmation:
 *                       type: integer
 *                     totalSpent:
 *                       type: number
 *       401:
 *         description: Token tidak valid atau kedaluwarsa
 *       500:
 *         description: Server error
 */
router.get('/statistics', verifyToken, paymentController.getUserPaymentStatistics);

module.exports = router; 