const Product = require('../models/productModel');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const validateMongoDbId = require('../utils/validateMongoDbId');
const { cloudinaryUploadImg, cloudinaryDeleteImg } = require('../utils/cloudinary');
const fs = require('fs');

// Thêm sản phẩm
const createProduct = asyncHandler(async (req, res) => {
    try {
        if(req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        const newProduct = await Product.create(req.body);
        res.json(newProduct);
    } catch (error) {
        throw new Error(error);
    }
});

// Cập nhật sản phẩm
const updateProduct = asyncHandler(async (req, res) => {
    try {
        if(req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(product);
    } catch (error) {
        throw new Error(error);
    }
});

// Xóa sản phẩm
const deleteProduct = asyncHandler(async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        res.json(product);
    } catch (error) {
        throw new Error(error);
    }
});

// Lấy một sản phẩm
const getProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const findProduct = await Product.findById(id);
        res.json(findProduct);
    } catch (error) {
        throw new Error(error);
    } 
});

// Lấy danh sách sản phẩm
const getAllProducts = asyncHandler(async (req, res) => {
    try {
        // Lọc
        const queryObj = {...req.query};
        const excludeFields = ['page', 'sort', 'limit', 'fields'];
        excludeFields.forEach((element) => delete queryObj[element]);
        // console.log(queryObj);

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
        
        let query = Product.find(JSON.parse(queryStr));

        // Sắp xếp
        if (req.query.sort) {
            const sortBy = req.query.sort.split(",").join(" ");
            query = query.sort(sortBy);
        } else {
            query = query.sort('-createdAt');
        }

        // Giới hạn fields
        if (req.query.fields) {
            const fields = req.query.fields.split(",").join(" ");   
            query = query.select(fields);     
        } else {
            query = query.select('-__v');
        }

        // Phân trang
        const page = req.query.page;
        const limit = req.query.limit;
        const skip = (page - 1) * limit;
        query = query.skip(skip).limit(limit);
        if(req.query.page) {
            const productCount = await Product.countDocuments();
            if(skip >= productCount) {
                throw new Error('Trang không tồn tại');
            }
        }
        console.log(page, limit, skip);

        const product = await query;
        res.json(product);
    } catch (error) {
        throw new Error(error);
    }
});

// Thêm vào danh sách yêu thích
const addToWishList = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { prodId } = req.body;
    try {
        const user = await User.findById(_id);
        const alreadyAdded = user.wishlist.find((id) => id.toString() === prodId);
        if (alreadyAdded) {
            let user = await User.findByIdAndUpdate(_id, {
                $pull: {wishlist: prodId},
            }, {
                new: true,
            });
            res.json(user);
        } else {
            let user = await User.findByIdAndUpdate(_id, {
                $push: {wishlist: prodId},
            }, {
                new: true,
            });
            res.json(user);
        }
    } catch (error) {
        throw new Error(error);
    }
});

// Đánh giá sản phẩm
const rating = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { star, prodId, comment } = req.body;
    try {
        const product = await Product.findById(prodId);
        let alreadyRated = product.ratings.find((userId) => userId.postedby.toString() === _id.toString());
        if (alreadyRated) {
            const updateRating = await Product.updateOne(
                {
                    ratings: { $elemMatch: alreadyRated },
                  },
                  {
                    $set: { "ratings.$.star": star, "ratings.$.comment": comment },
                  },
                  {
                    new: true,
                  }                
            );
        } else {
            const rateProduct = await Product.findByIdAndUpdate(prodId, {
                $push: {
                    ratings: {
                        star: star,
                        comment: comment,
                        postedby: _id,
                    },
                },
            }, {
                new: true,
            });
        }   
        const getAllRatings = await Product.findById(prodId);
        let totalRating = getAllRatings.ratings.length;
        let ratingSum = getAllRatings.ratings.map((item) => item.star).reduce((prev, curr) => prev + curr, 0);
        let actualRating = Math.round(ratingSum / totalRating);
        let finalProduct = await Product.findByIdAndUpdate(prodId, {
            totalrating: actualRating,
        }, {
            new: true,
        });
        res.json(finalProduct);
    } catch (error) {
        throw new Error(error);
    }
});

// Tải hình ảnh lên
const uploadImages = asyncHandler(async (req, res) => {
    try {
        const uploader = (path) => cloudinaryUploadImg(path, "images");
        const urls = [];
        const files = req.files;
        for (const file of files) {
            const { path } = file;
            const newpath = await uploader(path);
            urls.push(newpath);
            fs.unlinkSync(path);
        }
        const images = urls.map((file) => {
            return file;
        });
        res.json(images);
    } catch (error) {
        throw new Error(error);
    }
});

// Xoá hình ảnh
const deleteImages = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = cloudinaryDeleteImg(id, "images");
        res.json({ message: "Deleted" });

    } catch (error) {
        throw new Error(error);
    }
});

module.exports = { createProduct, getProduct, getAllProducts, updateProduct, deleteProduct, addToWishList, rating, uploadImages, deleteImages };