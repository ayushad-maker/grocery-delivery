
import express from "express";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";

import {
  createOrder,
  getAllOrders,
  getOrderLocation,
  getUsersOrders,
  getSingleOrder,
  updateOrderStatus,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/", auth, createOrder);

orderRouter.get("/", auth, getUsersOrders);

orderRouter.get("/all", auth, admin, getAllOrders);

// Get a single order for tracking
orderRouter.get("/:id", auth, getSingleOrder);

// Get order location
orderRouter.get("/:id/location", auth, getOrderLocation);

// Update order status (admin only)
orderRouter.put("/:id/status", auth, admin, updateOrderStatus);

export default orderRouter;