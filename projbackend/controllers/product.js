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
    let form = formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
    if (err) {
        return res.status(400).json({
        error: "problem with image",
        });
    }

      //destructure the fields
    const { name, price, description, category, stock } = fields;
    if (!name || !description || !price || !category || !stock) {
        return res.status(400).json({
        error: "please include all fields",
        });
    }

    let product = new Product(fields);
      //handle file here
    if (file.photo) {
        if (file.photo.size > 3000000) {
        return res.status(400).json({
            error: "File size too big",
        });
        }
        product.photo.data = fs.readFileSync(file.photo.path);
        product.photo.contentType = file.photo.type;
    }
      // save to the db
    product.save((err, product) => {
        if (err) {
        res.status(400).json({
            error: "saving tshirt in db failed",
    });
        }
        res.json(product);
    });
    });
};
exports.getProduct = (req, res) => {
    req.product.photo = undefined;
    return res.json(req.product);
}
//middleware
exports.photo = (req, res,next) => {
    res.set("Content-Type",req.product.photo.contentType);
    return res.send(req.product.photo.data);
    next();
}

exports.deleteProduct = (req,res) => {
    let product = req.product;
    product.remove((err, deletedProduct)=> {
        if(err){
            res.status(400).json({
                error: "Failed to delete product"
            })
        }
        res.json({
            message: "Product deleted",
            deletedProduct
        })
    })
}

exports.updateProduct = (req,res) => {
    let form = formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
    if (err) {
        return res.status(400).json({
        error: "problem with image",
        });
    }
    //updation code
    let product = req.product;
    product = _.extend(product,fields);
      //handle file here
    if (file.photo) {
        if (file.photo.size > 3000000) {
        return res.status(400).json({
            error: "File size too big",
        });
        }
        product.photo.data = fs.readFileSync(file.photo.path);
        product.photo.contentType = file.photo.type;
    }
      // save to the db
    product.save((err, product) => {
        if (err) {
        res.status(400).json({
            error: "Updation of product failed",
    });
        }
        res.json(product);
    });
    });
}