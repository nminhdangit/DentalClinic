const express = require('express');
const router = express.Router();

const treatmentProfile_Controller = require('../Controllers/Clinic/Treatment_profileController');

//Create treatmentProfile
router.post('/create', treatmentProfile_Controller.createTreatmentProfile);

//Read treatmentProfile by ID
router.get('/details', treatmentProfile_Controller.getTreatmentProfileById);

//Read treatmentProfile by CustomerID
router.get('/schedule', treatmentProfile_Controller.getAllTreatmentProfilesByCustomer);

//Read all treatmentProfile
router.get('/available', treatmentProfile_Controller.getAllTreatmentProfiles);

//Update treatmentProfile 
router.put('/updateStatus/:id', treatmentProfile_Controller.updateTreatmentProfile);

//Delete treatmentProfile 
router.delete('/delete/:id', treatmentProfile_Controller.deleteTreatmentProfile);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     TreatmentProfile:
 *       type: object
 *       required:
 *         - id
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the TreatmentProfile
 *         customerID:
 *           type: integer
 *           description: The Customer ID
 *         doctorID:
 *           type: integer
 *           description: The Doctor ID
 *         description:
 *           type: string
 *           description: The description  
 *         createdAt:
 *           type: string
 *           format: Date
 *           description: The date created this TreatmentProfile
 *         updatedAt:
 *           type: string
 *           format: Date
 *           description: The lastest date updated this TreatmentProfile
 */

/**
 * @swagger
 * tags:
 *   name: TreatmentProfile
 *   description: The TreatmentProfile managing API
 * /api/treatment_profile/create:
 *   post:
 *     summary: Create new TreatmentProfile
 *     tags: [TreatmentProfile]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               $ref: '#/components/schemas/TreatmentProfile'
 * 
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/TreatmentProfile'
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
 * /api/treatment_profile/details:
 *   get:
 *     summary: Get TreatmentProfile by ID
 *     tags: [TreatmentProfile]
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
 *                $ref: '#/components/schemas/TreatmentProfile'
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
 * /api/treatment_profile/schedule:
 *   get:
 *     summary: Read TreatmentProfile by CustomerID
 *     tags: [TreatmentProfile]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The Customer ID
 * 
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  treatmentProfiles:
 *                      type: array
 *                      items: 
 *                          $ref: '#/components/schemas/TreatmentProfile'
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
 * /api/treatment_profile/available:
 *   get:
 *     summary: Get list TreatmentProfile
 *     tags: [TreatmentProfile]
 * 
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                     type: array
 *                     items:
 *                        $ref: '#/components/schemas/TreatmentProfile'
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
 * /api/treatment_profile/updateStatus/{id}:
 *   put:
 *     summary: Update Treatment Profile
 *     tags: [TreatmentProfile]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of TreatmentProfile
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TreatmentProfile'
 * 
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/TreatmentProfile'
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
 * /api/treatment_profile/delete/{id}:
 *   Delete:
 *     summary: Delete TreatmentProfile
 *     tags: [TreatmentProfile]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The TreatmentProfile ID
 * 
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                      type: string
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