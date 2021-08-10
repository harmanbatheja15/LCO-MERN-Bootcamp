const express = require('express');
const router = express.Router();
const { isSignedIn, isAuthenticated, isAdmin } = require('../controllers/auth');
const { getOrderById, createOrder, getAllOrders, getOrderStatus, updateStatus } = require('../controllers/order');
const { updateStock } = require('../controllers/product');
const { getUserById, pushOrderInPurchaseList } = require('../controllers/user');

// Params
router.param("userId", getUserById);
router.param("orderId", getOrderById);

// Actual Routes goes here

// Create
router.post("/order/create/:userId", isSignedIn, isAuthenticated, pushOrderInPurchaseList, updateStock, createOrder);

// Read
router.get("/order/all/:userId", isSignedIn, isAuthenticated, isAdmin, getAllOrders)

// Status of order
router.get("/order/status/:userId", isSignedIn, isAuthenticated, isAdmin, getOrderStatus);
router.put("/order/:orderId/status/:userId", isSignedIn, isAuthenticated, isAdmin, updateStatus);

module.exports = router;
