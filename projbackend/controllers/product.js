const Product = require('../models/product');
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');

// Fetch product by id
exports.getProductById = (req, res, next, id) => {

    Product.findById(id).populate("category").exec((err, product) => {
        if (err) {
            return res.status(400).json({
                error: "Product not found in DB!"
            });
        }
        req.product = product;
        next();
    });

}

exports.createProduct = (req, res) => {

    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {

        if (err) {
            return res.status(400).json({
                error: "Problem with image"
            });
        }

        // Destructure fields
        const { name, description, price, category, stock } = fields;

        if (!name || !description || !price || !category || !stock) {
            return res.status(400).json({
                error: "Please fill all fields!"
            });
        }

        let product = new Product(fields);

        // Handle file here
        if (file.photo) {
            if (file.photo.size > 3000000) {
                return res.status(400).json({
                    error: "Image size should be less than 3 MB!"
                });
            }
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
        }

        // Save to DB
        product.save((err, product) => {
            if (err) {
                return res.status(400).json({
                    error: "Problem with saving product to DB!"
                });
            }
            res.json(product);
        });

    });

}

exports.getProduct = (req, res) => {
    req.product.photo = undefined;
    return res.json(req.product);
}

// Middleware
exports.photo = (req, res, next) => {
    if (req.product.photo.data) {
        res.set('Content-Type', req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
}

// Delete Product
exports.deleteProduct = (req, res) => {
    let product = req.product;
    product.remove((err, deletedProduct) => {
        if (err) {
            return res.status(400).json({
                error: "Problem with deleting product from DB!"
            });
        }
        res.json({
            message: "Product deleted successfully!", deletedProduct
        });
    });
}

// Update Product
exports.updateProduct = (req, res) => {

    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {

        if (err) {
            return res.status(400).json({
                error: "Problem with image"
            });
        }

        // Updation Code
        let product = req.product;
        product = _.extend(product, fields);

        // Handle file here
        if (file.photo) {
            if (file.photo.size > 3000000) {
                return res.status(400).json({
                    error: "Image size should be less than 3 MB!"
                });
            }
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
        }

        // Save to DB
        product.save((err, product) => {
            if (err) {
                return res.status(400).json({
                    error: "Updation of product failed!"
                });
            }
            res.json(product);
        });

    });
}

// Product listing
exports.getAllProducts = (req, res) => {

    let limit = req.query.limit ? parseInt(req.query.limit) : 8;
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

    Product.find().select("-photo").populate("category").sort([[sortBy, "asc"]]).limit(limit).exec((err, products) => {
        if (err) {
            return res.status(400).json({
                error: "No products found!"
            });
        }
        res.json(products);
    });

}

exports.getAllUniqueCategories = (req, res) => {
    Product.distinct("category", {}, (err, category) => {
        if (err) {
            res.status(400).json({
                error: "No categories found!"
            });
        }
        res.json(category);
    });
}

exports.updateStock = (req, res, next) => {

    let myOperations = req.body.order.products.map(prod => {
        return {
            updateOne: {
                filter: { _id: prod._id },
                update: { $inc: { stock: -prod.count, sold: +prod.count } }
            }
        }
    });

    product.bulkWrite(myOperations, {}, (err, products) => {
        if (err) {
            return res.json(400).json({
                error: "Bilk operation failed"
            });
        }
        next();
    });

}
