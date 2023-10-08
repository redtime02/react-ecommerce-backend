const Category = require('../models/prodCategoryModel');
const asyncHandler = require('express-async-handler');
const validateMongoDbId = require('../utils/validateMongodbId');

// Tạo danh mục sản phẩm
const createCategory = asyncHandler(async (req, res) => {
    try {
        const newCategory = await Category.create(req.body);
        res.json(newCategory);
    } catch (error) {
        throw new Error(error);
    }
});

// Cập nhật danh mục sản phẩm
const updateCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.json(updatedCategory);
    } catch (error) {
        throw new Error(error);
    }
});

// Xóa danh mục sản phẩm
const deleteCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const deletedCategory = await Category.findByIdAndDelete(id);
        res.json(deletedCategory);
    } catch (error) {
        throw new Error(error);
    }
});

// Lấy danh mục sản phẩm
const getCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const findCategory = await Category.findById(id);
        res.json(findCategory);
    } catch (error) {
        throw new Error(error);
    }    
});

// Lấy danh sách danh mục sản phẩm
const getAllCategory = asyncHandler(async (req, res) => {
    try {
        const findAllCategory = await Category.find();
        res.json(findAllCategory);
    } catch (error) {
        throw new Error(error);
    }    
});

module.exports = { createCategory, updateCategory, deleteCategory, getCategory, getAllCategory };