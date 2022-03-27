const { Category } = require('../models/category');
const Joi = require("joi");

exports.findAllCategories = async (req, res, next) => {
    try {
        const allCategories = await Category.find();
        res.status(200).send({ success: true, allCategories });
    }
    catch (err) {
        next(err);
    }

};

exports.findById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);
        if (!category) {
            res.status(404).send({ success: false, message: "not Found" });
        }
        res.status(200).send({ success: true, category });
    }
    catch (err) {
        next(err);
    }
};

exports.addCategory = async (req, res, next) => {
    try {
        const { body: { name,icon, image } } = req
        const category = await new Category({ name: name, icon: icon, image: image });
        await category.save();
        res.status(201).json({ success: true, category ,createdAt: new Date()});
    }
    catch (err) {
        next(err);
    }

};

exports.deleteCategoryById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            res.status(404).send({ success: false, message: "not Found" });
        }
        res.status(200).send({ success: true, category });
    }
    catch (err) {
        next(err);
    }

};

exports.deleteAllCategories = async (req, res, next) => {
    try {
        const deletedCategories = await Category.deleteMany();
        res.status(200).send({ success: true, deletedCategories });
    }
    catch (err) {
        next(err);
    }

};

exports.updateCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { body: { name, icon, image } } = req;
        const category = await Category.findByIdAndUpdate(id, { $set: { name: name, icon: icon, image: image } });
        if (!category) {
            res.status(404).send({ success: false, message: "not Found" });
        }
        res.status(200).send({ success: true, category });
    }
    catch (err) {
        next(err);
    }
};
exports.policy = async (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(4).max(20).required(),
    });
    const { name } = req.body;
    const { error } = schema.validate({ name});
    if (error) {
        switch (error.details[0].context.key) {
            case "name":
                res.status(500).json({ message: error.details[0].message });
                break;
            default:
                res.status(500).json({ message: "An error occurred." });
                break;
        }
    }
    return next();
}