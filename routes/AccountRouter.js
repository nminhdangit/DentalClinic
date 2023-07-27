const express = require('express');
const router = express.Router();

const customerController = require('../Controllers/User/CustomerController');

const doctorController = require('../Controllers/User/DoctorController');

router.get('/customer/index', customerController.index);

router.get('/customer/details', customerController.detail);

router.post('/customer/update', customerController.update);

router.post('/customer/create', customerController.create);

router.post('/customer/addAmount', customerController.addAmount);

router.post('/customer/subtractAmount', customerController.subtractAmount);


router.delete('/customer/delete', customerController.delete);

router.get('/doctor/index', doctorController.index);

router.get('/doctor/alllist', doctorController.getAllDoctor);

router.get('/doctor/details', doctorController.detail);

router.post('/doctor/update', doctorController.update);

router.post('/doctor/status', doctorController.status);

router.get('/doctor/getAllDoctorByName', doctorController.getAllDoctorByName);

router.delete('/doctor/delete', doctorController.delete);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Customer:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - fullname
 *         - address
 *         - phone
 *         - gender
 *         - role
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the customer
 *         email:
 *           type: string
 *           description: The email of customer
 *         password:
 *           type: string
 *           description: The password of customer
 *         fullname:
 *           type: string
 *           description: The fullname of customer
 *         address:
 *           type: string
 *           description: The address of customer
 *         phone:
 *           type: string
 *           description: The phone of customer
 *         gender:
 *           type: string
 *           description: The gender of customer
 *         role:
 *           type: string
 *           description: The role of customer (customer)
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The create date
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: The lastest date this data was updated
 * 
 *     Doctor:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - fullname
 *         - address
 *         - phone
 *         - gender
 *         - role
 *         - avatar
 *         - idCard
 *         - experience
 *         - qualification
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the customer
 *         email:
 *           type: string
 *           description: The email of customer
 *         password:
 *           type: string
 *           description: The password of customer
 *         fullname:
 *           type: string
 *           description: The fullname of customer
 *         address:
 *           type: string
 *           description: The address of customer
 *         phone:
 *           type: string
 *           description: The phone of customer
 *         gender:
 *           type: string
 *           description: The gender of customer
 *         role:
 *           type: string
 *           description: The role of customer (customer)
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The create date
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: The lastest date this data was updated
 *         avatar:
 *           type: string
 *           description: The avatar of Doctor (format Base64)
 *         idCard:
 *           type: string
 *           description: The ID Card of Doctor
 *         experience:
 *           type: string
 *           description: The experience details of Doctor
 *         qualification:
 *           type: string
 *           description: The qualification of Doctor
 *         dateOfBirth:
 *           type: string
 *           format: Date
 *           description: The date of birth of Doctor
 *         status:
 *           type: string 
 *           description: The status of Doctor
 */

/**
 * @swagger
 * tags:
 *   name: Customer
 *   description: The customer managing API
 * /api/account/customer/index:
 *   get:
 *     summary: Get list customer
 *     tags: [Customer]
 * 
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Customer'
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
 * /api/account/customer/details:
 *   get:
 *     summary: Get Customer details
 *     tags: [Customer]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of Customer
 * 
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Customer'
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
 * /api/account/customer/update:
 *  put:
 *     summary: Update Customer
 *     tags: [Customer]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of Customer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                  fullname:
 *                      type: string
 *                  email:
 *                      type: string
 *                  address:
 *                      type: string
 *                  phone: 
 *                      type: string
 *                  gender:
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
 * /api/account/customer/create:
 *  post:
 *     summary: Create Customer
 *     tags: [Customer]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
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
 * /api/account/customer/delete:
 *  delete:
 *     summary: Delete Customer
 *     tags: [Customer]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties: 
 *                  email:
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
 * /api/account/customer/addAmount:
 *  post:
 *     summary: Add Balance Customer
 *     tags: [Customer]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties: 
 *                  customerId:
 *                      type: int
 *                  amount:
 *                      type: float
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
 * /api/account/customer/subtractAmount:
 *  post:
 *     summary: Subtract Balance Customer
 *     tags: [Customer]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties: 
 *                  customerId:
 *                      type: int
 *                  amount:
 *                      type: float
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
 * tags:
 *   name: Doctor
 *   description: The doctor managing API
 * /api/account/doctor/index:
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
 * /api/account/doctor/details:
 *   get:
 *     summary: Get details of doctor
 *     tags: [Doctor]
 *     parameters:
 *       - in: query
 *         name: id
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
 *                 $ref: '#/components/schemas/Doctor'
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
 * /api/account/doctor/update:
 *  put:
 *     summary: Update Doctor
 *     tags: [Doctor]
 *     parameters:
 *       - in: query
 *         name: doctorId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The Doctor ID
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Doctor'
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
 * /api/account/doctor/status:
 *  put:
 *     summary: Kick Doctor
 *     tags: [Doctor]
 *     parameters:
 *       - in: query
 *         name: doctorId
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
 * /api/account/doctor/getAllDoctorByName:
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

/**
 * @swagger
 * /api/account/doctor/delete:
 *   delete:
 *     summary: Delete Doctor
 *     tags: [Doctor]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties: 
 *                  email:
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
