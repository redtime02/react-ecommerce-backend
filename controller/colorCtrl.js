const Color = require('../models/colorModel');
const asyncHandler = require('express-async-handler');
const validateMongoDbId = require('../utils/validateMongodbId');

// Tạo màu
const createColor = asyncHandler(async (req, res) => {
    try {
        const newColor = await Color.create(req.body);
        res.json(newColor);
    } catch (error) {
        throw new Error(error);
    }
});

// Cập nhật màu
const updateColor = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const updatedColor = await Color.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.json(updatedColor);
    } catch (error) {
        throw new Error(error);
    }
});

// Xóa màu
const deleteColor = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const deletedColor = await Color.findByIdAndDelete(id);
        res.json(deletedColor);
    } catch (error) {
        throw new Error(error);
    }
});

// Lấy màu
const getColor = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const findColor = await Color.findById(id);
        res.json(findColor);
    } catch (error) {
        throw new Error(error);
    }    
});

// Lấy danh sách màu
const getAllColors = asyncHandler(async (req, res) => {
    try {
        const findAllColor = await Color.find();
        res.json(findAllColor);
    } catch (error) {
        throw new Error(error);
    }    
});

module.exports = { createColor, updateColor, deleteColor, getColor, getAllColors };