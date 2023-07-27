const express = require('express');
const router = express.Router();

const slotController = require('../Controllers/Clinic/SlotController');

//Create slot for doctor
router.post('/create', slotController.createSlotForDoctor);

//read all slot by doctor
router.get('/getSlotbyDoctor', slotController.getAllSlotsByDoctor);

//get all doctor by slot 
router.post('/getDoctorByTime', slotController.getAllDoctorBySlot);
//Read slot by id
router.get('/details', slotController.getSlotById);

//Read all slot of doctor by doctor ID
router.get('/schedule', slotController.getAllSlotsByDoctor);

//Read available slot of doctor by doctor ID 
router.get('/available/:doctorID', slotController.getAvailableSlotsByDoctor);

//Update status 
router.put('/updateStatus', slotController.updateSlotStatus);

//Update 
router.post('/updateStatus', slotController.updateSlot);

//Delete slot 
router.delete('/delete', slotController.deleteSlot);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Slot:
 *       type: object
 *       required:
 *         - time
 *         - date
 *         - doctorID
 *         - status
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the slot
 *         time:
 *           type: string
 *           description: The time work
 *         date:
 *           type: string
 *           description: The date work
 *         doctorID:
 *           type: integer
 *           description: The ID of doctor
 *         createdAt:
 *           type: string
 *           format: Date
 *           description: The date create this slot
 *         updatedAt:
 *           type: string
 *           format: Date
 *           description: The lastest date update this slot
 *         status:
 *           type: string
 *           description: The status of slot (available/unavailable)
 */

/**
 * @swagger
 * /api/slot/create:
 *   post:
 *     summary: Create Slot for Doctor
 *     tags: [Slot]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               type: object
 *               required:
 *                     - doctor
 *                     - startDate
 *                     - endDate
 *                     - shifts
 *               properties:
 *                  doctor:
 *                      type: object
 *                      properties:
 *                           id:
 *                              type: integer
 *                  startDate:
 *                      type: string
 *                      format: date
 *                  endDate:
 *                      type: string
 *                      format: date
 *                  shifts:
 *                      type: array
 *                      items:
 *                          type: string
 *                          description: The shift of the slot ("Ca sáng"/"Ca chiều")
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

/**
 * @swagger
 * /api/slot/getDoctorByTime:
 *   post:
 *     summary: Get Doctor by Time
 *     tags: [Slot]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               type: object
 *               required:
 *                  - selectedDate
 *                  - selectedTime
 *               properties:
 *                  selectedDate: 
 *                      type: string
 *                      format: Date
 *                      description: The Date you wanna choose
 *                  selectedTime:
 *                      type: string
 *                      description: The Time you wanna choose
 * 
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: 
 *                  $ref: '#/components/schemas/Doctor'
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
 * /api/slot/details:
 *   get:
 *     summary: Get Slot by ID
 *     tags: [Slot]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of Slot
 * 
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema: 
 *                $ref: '#/components/schemas/Slot'
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
 * /api/slot/schedule:
 *   get:
 *     summary: Get Slot by Doctor
 *     tags: [Slot]
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

/**
 * @swagger
 * /api/slot/getSlotbyDoctor:
 *   get:
 *     summary: Get Slot by Doctor
 *     tags: [Slot]
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

/**
 * @swagger
 * /api/slot/available/{doctorID}:
 *   get:
 *     summary: Get all available slot of Doctor 
 *     tags: [Slot]
 *     parameters:
 *       - name: doctorID
 *         in: path
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

/**
 * @swagger
 * /api/slot/updateStatus:
 *   post:
 *     summary: Update Slot
 *     tags: [Slot]
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  slotId: 
 *                      type: integer
 *                  status:
 *                      type: string
 * 
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Slot'
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
 * /api/slot/updateStatus:
 *   put:
 *     summary: Update Slot
 *     tags: [Slot]
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  id: 
 *                  type: integer
 * 
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Slot'
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
 * /api/slot/delete/{id}:
 *   delete:
 *     summary: Delete Slot
 *     tags: [Slot]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The Slot ID
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