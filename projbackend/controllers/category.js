const Category = require('../models/Category');

exports.getCategoryById = (req, res, next,id) => {
    Category.findById(id).exec((err, category) => {
        if(err){
            return res.status(404).json({
                errors: "Category not found!"
            })
        }
        req.category = category;
        next();
    })
}

exports.createCategory = (req, res) => {
    const category = new Category(req.body);
    category.save().then((err, category) => {
        if(err){
            return res.status(400).json({
                errors: "Not able to save category in DB"
            })
        }
        res.json({category})
    });
}

exports.getCategory = (req, res) => {
    return res.json(req.category);
}

exports.getAllCategory = (req, res) => {
    Category.find().exec((err, category) => {
    if(err){
        return res.status(400).json({
            errors: "No category found"
        })
    }
    return res.json(category);
    })
}