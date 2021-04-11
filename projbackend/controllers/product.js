const Product = require('../models/Product');
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
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
exports.createProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req,(err,fields, file) => {
        if(err) {
            return res.status(400).json({
                errors: "Photo failed to save"
            })
        }
        //TODO: validations on fields
        let product = new Product(fields);
        if(file.photo){
            if(file.photo.size> 3000000){
                return res.status(400).json({
                    errors: "Photo size must below 3000000"
                })
            }
            product.photo.data = fs.appendFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
        }
        product.save((err, product)=>{
            if(err){
                return res.status(400).json({
                    errors: "failed to save product"
                })
            }
            res.json(product)
        })
    })
}