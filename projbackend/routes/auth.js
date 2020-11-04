const express = require('express');
const router = express.Router();
const {signout, signup} = require('../controllers/auth');
router.get("/signout", signout);
router.post('/signup', signup);
module.exports = router;
