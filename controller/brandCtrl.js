const Brand = require('../models/brandModel');
const asyncHandler = require('express-async-handler');
const validateMongoDbId = require('../utils/validateMongodbId');

// Tạo thương hiệu
const createBrand = asyncHandler(async (req, res) => {
    try {
        const newBrand = await Brand.create(req.body);
        res.json(newBrand);
    } catch (error) {
        throw new Error(error);
    }
});

// Cập nhật thương hiệu
const updateBrand = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const updatedBrand = await Brand.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.json(updatedBrand);
    } catch (error) {
        throw new Error(error);
    }
});

// Xóa thương hiệu
const deleteBrand = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const deletedBrand = await Brand.findByIdAndDelete(id);
        res.json(deletedBrand);
    } catch (error) {
        throw new Error(error);
    }
});

// Lấy thương hiệu
const getBrand = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const findBrand = await Brand.findById(id);
        res.json(findBrand);
    } catch (error) {
        throw new Error(error);
    }    
});

// Lấy danh sách thương hiệu
const getAllBrands = asyncHandler(async (req, res) => {
    try {
        const findAllBrand = await Brand.find();
        res.json(findAllBrand);
    } catch (error) {
        throw new Error(error);
    }    
});

module.exports = { createBrand, updateBrand, deleteBrand, getBrand, getAllBrands };