const express = require('express');
const { createUser, loginUserCtrl, getallUser, getaUser, deleteUser, updateUser, blockUser, unBlockUser, handleRefreshToken, logOut, updatePassword, forgotPasswordToken, resetPassword, loginAdmin, getWishList, saveAddress, userCart, getUserCart, emptyCart, applyCoupon, createOrder, getOrders, updateOrderStatus } = require('../controller/userCtrl');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/cart', authMiddleware, getUserCart);
router.post('/register', createUser);
router.post('/forgot-password-token', forgotPasswordToken);
router.put('/order/update-order/:id', authMiddleware, isAdmin, updateOrderStatus);
router.put('/reset-password/:token', resetPassword);
router.put('/password', authMiddleware, updatePassword);
router.post('/login', loginUserCtrl);
router.post('/admin-login', loginAdmin);
router.post('/cart', authMiddleware, userCart);
router.post('/cart/apply-coupon', authMiddleware, applyCoupon);
router.post('/cart/order', authMiddleware, createOrder);
router.get('/all-users', getallUser);
router.get('/get-orders', authMiddleware, getOrders);
router.get('/refresh', handleRefreshToken);
router.get('/logout', logOut);
router.get('/:wishlist', authMiddleware, getWishList);
router.get('/:id', authMiddleware, isAdmin, getaUser);
router.delete('/empty-cart', authMiddleware, emptyCart)
router.delete('/:id', deleteUser);
router.put('/edit-user', authMiddleware, updateUser);
router.put('/save-address', authMiddleware, saveAddress);
router.put('/block-user/:id', authMiddleware, isAdmin, blockUser);
router.put('/unblock-user/:id', authMiddleware, isAdmin, unBlockUser);

module.exports = router;