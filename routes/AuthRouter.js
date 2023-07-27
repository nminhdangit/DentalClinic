const express = require('express');
const router = express.Router();
const OAuth2 = require('../oauth2google');

const authController = require('../Controllers/AuthController');

//Register
router.post('/register', authController.register);

//Login by email
router.post('/login', authController.login);

//Login by Google OAuth
router.get('/google', authController.googleAuth);

router.get('/getgooglecheck', (req, res) => {
    res.send(OAuth2.credentials);
});

//Google OAuth Callback
router.get('/google/callback', authController.googleAuthCallBack);

//ForgetPassword
router.post('/forgetpassword', authController.forgotPassword);
//Change Pass
router.post('/resetpassword', authController.resetPassword);
//Momo
router.post('/momo', authController.momo);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
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
 *           type: int
 *           description: The id of user
 *         email:
 *           type: string
 *           format: email
 *           description: The email of user
 *         password:
 *           type: string
 *           format: password
 *           description: The password of user
 *         fullname:
 *           type: string
 *           description: The fullname of user
 *         address:
 *           type: string
 *           description: The address of user
 *         phone:
 *           type: string
 *           description: Phone number
 *         gender:
 *           type: string
 *           description: Gender of user (Male/Female/LGBT/...)
 *         role:
 *           type: string
 *           description: Role of user (Customer/Doctor/Admin)
 */

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: The Authentication API
 * /api/auth/register:
 *   post:
 *     summary: Register
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
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
 *                  message:
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
 * 
 * /api/auth/login:
 *   post:
 *     summary: Login
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               type: object
 *               required:
 *                  - email
 *                  - password
 *               properties:
 *                  email: 
 *                      type: string
 *                  password:
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
 *                  message:
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
 * 
 * /api/auth/forgetpassword:
 *   post:
 *     summary: ForgetPassword
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               type: object
 *               required:
 *                  - email
 *               properties:
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
 *                  message:
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