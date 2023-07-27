const express = require('express');
const router = express.Router();

const Balance_detail = require('../Controllers/Clinic/balance_detail');
//get 
router.get('/get', Balance_detail.get);
//update 



module.exports = router;