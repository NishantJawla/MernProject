const express = require('express');
const router = express.Router();
const {getProductById, createProduct,getProduct,photo,deleteProduct,updateProduct,getAllProducts} = require('../controllers/product');
const {isAdmin,isSignedIn,isAuthenticated} = require('../controllers/auth')
const {getUserById} = require('../controllers/user');
//all my params
router.param("userId",getUserById);
router.param("productId",getProductById);
//all my routers
router.post("/products/create/:userId",isSignedIn,isAuthenticated,isAdmin,createProduct);
//read route
router.get("/products/:productsId",getProduct);
router.get("/products/photo/:productId",photo);
//update route
router.put("/products/:productsId/userId",isSignedIn,isAuthenticated,isAdmin,updateProduct);
//delete route
router.get("/products/:productsId/userId",isSignedIn,isAuthenticated,isAdmin,deleteProduct);
//listing routes
router.get("/products",getAllProducts);
module.exports = router;