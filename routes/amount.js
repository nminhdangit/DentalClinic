const express = require('express');
const router = express.Router();

const AmountController = require('../Controllers/Clinic/amountController');
//get 
router.get('/get', AmountController.get);
//update 
router.post('/update', AmountController.update);



module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Amount:
 *       type: object
 *       required:
 *         - id
 *         - amount
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the Amount
 *         amount:
 *           type: integer
 *           description: The Amount
 *         createdAt:
 *           type: string
 *           format: Date
 *           description: The date create this Amount
 *         updatedAt:
 *           type: string
 *           format: Date
 *           description: The lastest date update this Amount
 */

/**
 * @swagger
 * tags:
 *   name: Amount
 *   description: The Amount managing API
 * /api/amount/get:
 *   get:
 *     summary: Get the Booking Price
 *     tags: [Amount]
 * 
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  amount:
 *                      type: integer
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


/**
 * @swagger
 * tags:
 *   name: Amount
 *   description: The Amount managing API
 * /api/amount/update:
 *   post:
 *     summary: Update the Booking Price
 *     tags: [Amount]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                  amount:
 *                      type: integer
 * 
 *     responses:
 *       200:
 *         description: Successful
 * 
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