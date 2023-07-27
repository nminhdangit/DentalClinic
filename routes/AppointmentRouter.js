const express = require('express');
const router = express.Router();

const appointmentController = require('../Controllers/Clinic/AppointmentController');

//Create appointment
router.post('/create', appointmentController.createAppointment);

//Read appointment by custormer
router.get('/appointmentcustomer', appointmentController.appointmentcustomer);

//Read all appointment
router.get('/all', appointmentController.getAllAppointments)

//Read all appointment by doctor
router.get('/appointmentdoctor', appointmentController.appointmentdoctor)

//Read appointment by ID
router.get('/details', appointmentController.getAppointmentDetails);

//Update appointment 
router.post('/update', appointmentController.updateAppointment);
//Update appointment 
router.post('/updatedoctor', appointmentController.updateAppointmentDoctor);

//Delete appointment
router.delete('/delete/:id', appointmentController.deleteAppointment);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Appointment:
 *       type: object
 *       required:
 *         - id
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the appointment
 *         status:
 *           type: string
 *           description: The status of appointment
 *         customerID:
 *           type: integer
 *           description: The Customer ID
 *         doctorID:
 *           type: integer
 *           description: The Doctor ID
 *         slotID:
 *           type: integer
 *           description: The Slot ID
 *         createdAt:
 *           type: string
 *           format: Date
 *           description: The date create this appointment
 *         updatedAt:
 *           type: string
 *           format: Date
 *           description: The lastest date update this appointment
 *         reason:
 *           type: string
 *           description: The reason why create this Appointment
 */

/**
 * @swagger
 * tags:
 *   name: Appointment
 *   description: The Appointment managing API
 * /api/appointment/create:
 *   post:
 *     summary: Create new appointment
 *     tags: [Appointment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               $ref: '#/components/schemas/Appointment'
 * 
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Appointment'
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
 * /api/appointment/appointmentcustomer:
 *   get:
 *     summary: Get Appointment by ID
 *     tags: [Appointment]
 *     parameters:
 *       - in: query
 *         name: customerID
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
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Appointment'
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
 * /api/appointment/all:
 *   get:
 *     summary: Get list appointment
 *     tags: [Appointment]
 * 
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Appointment'
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
 * /api/appointment/appointmentdoctor:
 *   get:
 *     summary: Get Slot by ID
 *     tags: [Appointment]
 *     parameters:
 *       - in: query
 *         name: doctorID
 *         schema:
 *           type: integer
 *         required: true
 *         description: The Doctor ID
 * 
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema: 
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Appointment'
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
 * /api/appointment/details:
 *   get:
 *     summary: Get Appointment by ID
 *     tags: [Appointment]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The Appointment ID
 * 
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema: 
 *                type: object
 *                properties:
 *                      $ref: '#/components/schemas/Appointment'
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
 * /api/appointment/updateAppointment:
 *   put:
 *     summary: Update Appointment Doctor
 *     tags: [Appointment]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The Appointment ID
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointment'
 * 
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Appointment'
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
 * /api/appointment/updatedoctor:
 *   put:
 *     summary: Update Appointment Doctor
 *     tags: [Appointment]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The Appointment ID
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointment'
 * 
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Appointment'
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
 * /api/appointment/delete/{id}:
 *   Delete:
 *     summary: Delete Appointment
 *     tags: [Appointment]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The Appointment ID
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