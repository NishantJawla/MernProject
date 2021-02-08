const express = require('express');
const router = express.Router();
const { check , validationResult} = require('express-validator');
const {signout, signup} = require('../controllers/auth');
router.get("/signout", signout);
router.post('/signup',[
    check("name", "name should be atleast 3 characters").isLength({ min: 3 }),
    check("email" , "email is required").isEmail(),
    check("password", "password should be atleast 3 characters").isLength({ min: 3 })
], signup);
module.exports = router;
