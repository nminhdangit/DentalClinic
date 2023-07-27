const express = require('express');
const router = express.Router();

const transactionController = require('../Controllers/Clinic/TransactionController');
//get 
router.get('/getall', transactionController.getall);

router.get('/get', transactionController.getTransactionByCustomer);

router.get('/total', transactionController.total);
module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Transaction:
 *       type: object
 *       required:
 *         - id
 *         - partnerId
 *         - amount
 *         - comment
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the Transaction
 *         partnerId:
 *           type: integer
 *           description: The partner id of Transaction
 *         commnect:
 *           type: string
 *           description: The note in Transaction
 *         createdAt:
 *           type: string
 *           format: Date
 *           description: The date create this Transaction
 *         updatedAt:
 *           type: string
 *           format: Date
 *           description: The lastest date update this Transaction
 */

/**
 * @swagger
 * /api/transaction/getall:
 *   get:
 *     summary: Get all Transaction
 *     tags: [Transaction]
 * 
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: 
 *                  $ref: '#/components/schemas/Slot'
 *       400: 
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  error:
 *                      type: string
 *       500:
 *         description: Some server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  error:
 *                      type: string
 */