const Product = require('../models/Product');
exports.getProductById = (req, res, next, id) => {
    Product.findById(id).exec((err, product) =>{
        if(err){
            return res.status(400).json({
                errors: "Product not found!",
                message: err.message
            })
        }
        req.product = product;
        next();
    })
}