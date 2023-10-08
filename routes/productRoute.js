const express = require('express');
const { createProduct, getProduct, getAllProducts, updateProduct, deleteProduct, addToWishList, rating, uploadImages, deleteImages } = require('../controller/productCtrl');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const { uploadPhoto, productImgResize } = require('../middlewares/uploadImage');
const router = express.Router();

router.post('/', authMiddleware, isAdmin, createProduct);
router.put('/upload', authMiddleware, isAdmin, uploadPhoto.array('images', 10), productImgResize, uploadImages);
router.get('/:id', getProduct);
router.put('/wishlist', authMiddleware, addToWishList);
router.put('/rating', authMiddleware, rating);
router.put('/:id', authMiddleware, isAdmin, updateProduct);
router.delete('/:id',  authMiddleware, isAdmin, deleteProduct);
router.delete('/delete-img/:id',  authMiddleware, isAdmin, deleteImages);
router.get('/', getAllProducts);

module.exports = router;