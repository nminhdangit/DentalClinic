const express = require('express');
const router = express.Router();

const adminController = require('../Controllers/User/AdminController');

//Create doctor
router.post('/createdoctor', adminController.createDoctor);
// Get all doctor
router.get('/getAllDoctor', adminController.getAllDoctor);
// Get all doctor active
router.get('/getAllDoctorActive', adminController.getAllDoctorActive);
// get doctor
router.get('/getDoctor', adminController.getDoctor);
//Get all doctor by name
router.get('/getAllDoctorByName', adminController.getAllDoctorByName);


module.exports = router;

/**
 * @swagger
 * /api/account/doctor/createdoctor:
 *  post:
 *     summary: Create Doctor
 *     tags: [Doctor]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                  persionalInfo:
 *                      type: object
 *                  professionalInfo:
 *                      type: object
 *                  accountInfo:
 *                      type: object
 *                  avatar:
 *                      type: string
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

/**
 * @swagger
 * /api/admin/getAllDoctor:
 *   get:
 *     summary: Get list doctor
 *     tags: [Doctor]
 * 
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  doctors:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Doctor'
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
 * /api/admin/getDoctor:
 *   get:
 *     summary: Get details of doctor
 *     tags: [Doctor]
 *     parameters:
 *       - in: query
 *         name: doctorId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The doctor ID
 * 
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *                 type: object
 *                 properties:
 *                     doctor:
 *                          $ref: '#/components/schemas/Doctor'
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
 * /api/admin/getAllDoctorByName:
 *   Get:
 *     summary: Get All Doctor By Name
 *     tags: [Doctor]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: The Doctor Name
 * 
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  doctors:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Doctor'
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