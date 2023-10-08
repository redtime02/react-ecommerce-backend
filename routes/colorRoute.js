const express = require('express');
const { createColor, getColor, getAllColors, updateColor, deleteColor } = require('../controller/colorCtrl');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, isAdmin, createColor);
router.get('/:id', getColor);
router.put('/:id', authMiddleware, isAdmin, updateColor);
router.delete('/:id',  authMiddleware, isAdmin, deleteColor);
router.get('/', getAllColors);

module.exports = router;