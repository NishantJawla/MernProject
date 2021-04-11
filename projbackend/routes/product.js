const express = require('express');
const router = express.Router();
const {getProductById, createProduct} = require('../controllers/product');
const {isAdmin,isSignedIn,isAuthenticated} = require('../controllers/auth')
const {getUserById} = require('../controllers/user');
//all my params
router.param("userId",getUserById);
router.param("productId",getProductById);
//all my routers
router.post("/products/create/:userId",isSignedIn,isAuthenticated,isAdmin,createProduct);
module.exports = router;