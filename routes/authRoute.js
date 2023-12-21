const express = require("express");
const {
  createUser,
  loginUserCtrl,
  getallUser,
  getaUser,
  deleteUser,
  updateUser,
  blockUser,
  unBlockUser,
  handleRefreshToken,
  logOut,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  loginAdmin,
  getWishList,
  saveAddress,
  userCart,
  getUserCart,
  emptyCart,
  applyCoupon,
  createOrder,
  getOrders,
  updateOrderStatus,
  getAllOrders,
  getOrderByUserId,
  removeProductFromCart,
  updateProductQuantityFromCart,
  getMyOrders,
  getMonthWiseOrderIncome,
  getYearlyTotalOrders,
  getSingleOrder,
  updateOrder,
} = require("../controller/userCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { checkout, paymentVerification } = require("../controller/paymentCtrl");
const router = express.Router();

router.get(
  "/get-month-wise-order-income",
  authMiddleware,
  getMonthWiseOrderIncome
);
// router.get(
//   "/get-month-wise-order-count",
//   authMiddleware,
//   getMonthWiseOrderCount
// );
router.get("/get-yearly-total-orders", authMiddleware, getYearlyTotalOrders);
router.post("/cart/order", authMiddleware, createOrder);
router.post("/order/checkout", authMiddleware, checkout);
router.get("/cart", authMiddleware, getUserCart);
router.post("/register", createUser);
router.post("/forgot-password-token", forgotPasswordToken);
// router.put(
//   "/order/update-order/:id",
//   authMiddleware,
//   isAdmin,
//   updateOrderStatus
// );
router.put("/reset-password/:token", resetPassword);
router.put("/password", authMiddleware, updatePassword);
router.post("/login", loginUserCtrl);
router.post("/admin-login", loginAdmin);
router.post("/cart", authMiddleware, userCart);
router.post("/order/paymentVerification", authMiddleware, paymentVerification);
// router.post("/cart/apply-coupon", authMiddleware, applyCoupon);
router.get("/all-users", getallUser);
router.get("/get-orders", authMiddleware, getOrders);
router.get("/get-my-orders", authMiddleware, getMyOrders);
router.get("/get-all-orders", authMiddleware, isAdmin, getAllOrders);
router.get("/get-a-order/:id", authMiddleware, isAdmin, getSingleOrder);
router.put("/update-order/:id", authMiddleware, isAdmin, updateOrder);
// router.post("/get-order-by-user/:id", authMiddleware, isAdmin, getAllOrders);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logOut);
router.get("/:wishlist", authMiddleware, getWishList);
router.get("/:id", authMiddleware, isAdmin, getaUser);
router.delete(
  "/delete-product-cart/:cartItemId",
  authMiddleware,
  removeProductFromCart
);
router.delete(
  "/update-product-cart/:cartItemId/:newQuantity",
  authMiddleware,
  updateProductQuantityFromCart
);
router.delete("/empty-cart", authMiddleware, emptyCart);
router.delete("/:id", deleteUser);
router.put("/edit-user", authMiddleware, updateUser);
router.put("/save-address", authMiddleware, saveAddress);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unBlockUser);

module.exports = router;
