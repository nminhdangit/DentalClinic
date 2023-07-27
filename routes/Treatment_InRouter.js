const express = require('express');
const router = express.Router();
const treatmentincontroller = require('../Controllers/Clinic/Treatment_inController');


router.get('/getAllByTreatmentProfile', treatmentincontroller.getTreatmentInDetailsByidTreatmentProfile);

router.get('/details', treatmentincontroller.getTreatmentInDetails);

router.post('/update', treatmentincontroller.updateTreatmentIn);

router.post('/create', treatmentincontroller.createTreatmentIn);
module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     TreatmentIn:
 *       type: object
 *       required:
 *         - id
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the TreatmentIn
 *         doctorID:
 *           type: integer
 *           description: The Doctor ID
 *         idTreatmentProfile:
 *           type: integer
 *           description: The TreatmentProfile ID
 *         createdAt:
 *           type: string
 *           format: Date
 *           description: The date created this TreatmentIn
 *         updatedAt:
 *           type: string
 *           format: Date
 *           description: The lastest date updated this TreatmentIn
 */

/**
 * @swagger
 * tags:
 *   name: TreatmentIn
 *   description: The TreatmentIn managing API
 * /api/treatmentin/getAllByTreatmentProfile:
 *   get:
 *     summary: Get All By TreatmentProfile
 *     tags: [TreatmentIn]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of TreatmentProfile
 * 
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  treatmentIns:
 *                      type: array
 *                      items: 
 *                          $ref: '#/components/schemas/TreatmentIn'
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
 * /api/treatmentin/details:
 *  get:
 *     summary: Get details By ID
 *     tags: [TreatmentIn]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of TreatmentIn
 * 
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *            application/json:
 *               schema:
 *                  $ref: '#/components/schemas/TreatmentIn'
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
 *              schema:
 *               type: object
 *               properties:
 *                  error:
 *                      type: string
 */

 /**
 * @swagger
 * /api/treatmentin/update:
 *  post:
 *     summary: Update TreatmentIn
 *     tags: [TreatmentIn]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of TreatmentIn
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *               schema:
 *                   $ref: '#/components/schemas/TreatmentIn'
 *  
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/TreatmentIn'
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
 * /api/treatmentin/create:
 *  post:
 *     summary: Create TreatmentIn
 *     tags: [TreatmentIn]
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *               schema:
 *                   $ref: '#/components/schemas/TreatmentIn'
 *  
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/TreatmentIn'
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