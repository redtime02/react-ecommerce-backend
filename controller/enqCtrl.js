const Enquiry = require('../models/enqModel');
const asyncHandler = require('express-async-handler');
const validateMongoDbId = require('../utils/validateMongodbId');

// Tạo phản hồi
const createEnquiry = asyncHandler(async (req, res) => {
    try {
        const newEnquiry = await Enquiry.create(req.body);
        res.json(newEnquiry);
    } catch (error) {
        throw new Error(error);
    }
});

// Cập nhật phản hồi
const updateEnquiry = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const updatedEnquiry = await Enquiry.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.json(updatedEnquiry);
    } catch (error) {
        throw new Error(error);
    }
});

// Xóa phản hồi
const deleteEnquiry = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const deletedEnquiry = await Enquiry.findByIdAndDelete(id);
        res.json(deletedEnquiry);
    } catch (error) {
        throw new Error(error);
    }
});

// Lấy phản hồi
const getEnquiry = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const findEnquiry = await Enquiry.findById(id);
        res.json(findEnquiry);
    } catch (error) {
        throw new Error(error);
    }    
});

// Lấy danh sách phản hồi
const getAllEnquirys = asyncHandler(async (req, res) => {
    try {
        const findAllEnquiry = await Enquiry.find();
        res.json(findAllEnquiry);
    } catch (error) {
        throw new Error(error);
    }    
});

module.exports = { createEnquiry, updateEnquiry, deleteEnquiry, getEnquiry, getAllEnquirys };