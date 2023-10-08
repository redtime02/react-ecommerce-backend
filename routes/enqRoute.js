const express = require('express');
const { createEnquiry, getEnquiry, getAllEnquirys, updateEnquiry, deleteEnquiry } = require('../controller/enqCtrl');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', createEnquiry);
router.get('/:id', getEnquiry);
router.put('/:id', authMiddleware, isAdmin, updateEnquiry);
router.delete('/:id',  authMiddleware, isAdmin, deleteEnquiry);
router.get('/', getAllEnquirys);

module.exports = router;