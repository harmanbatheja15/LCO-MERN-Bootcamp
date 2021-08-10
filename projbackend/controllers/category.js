const Category = require('../models/category');

// Fetch categories by id
exports.getCategoryById = (req, res, next, id) => {

    Category.findById(id).exec((err, cate) => {
        if (err) {
            return res.status(400).json({
                error: "Category not found in DB!"
            });
        }
        req.category = cate;
        next();
    });

}

// Create Category
exports.createCategory = (req, res) => {
    const category = new Category(req.body);
    category.save((err, category) => {
        if (err) {
            return res.status(400).json({
                error: "Not able to save category in DB!"
            });
        }
        res.json({ category });
    });
}

exports.getCategory = (req, res) => {
    return res.json(req.category);
}

// Fetch all categories
exports.getAllCategory = (req, res) => {
    Category.find().exec((err, categories) => {
        if (err) {
            return res.status(400).json({
                error: "No categories found!"
            });
        }
        res.json(categories);
    });
}

// Update Category
exports.updateCategory = (req, res) => {
    const category = req.category;
    category.name = req.body.name;
    category.save((err, updatedCategory) => {
        if (err) {
            return res.status(400).json({
                error: "Failed to update category!"
            });
        }
        res.json(updatedCategory);
    });
}

// Remove Category
exports.removeCategory = (req, res) => {
    const category = req.category;
    category.remove((err, category) => {
        if (err) {
            return res.status(400).json({
                error: "Failed to delete category!"
            });
        }
        res.json({
            message: `Successfully deleted ${category.name} category`
        });
    });
}
