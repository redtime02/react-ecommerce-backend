const express = require('express');
const { createBrand, getBrand, getAllBrands, updateBrand, deleteBrand } = require('../controller/brandCtrl');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, isAdmin, createBrand);
router.get('/:id', getBrand);
router.put('/:id', authMiddleware, isAdmin, updateBrand);
router.delete('/:id',  authMiddleware, isAdmin, deleteBrand);
router.get('/', getAllBrands);

module.exports = router;