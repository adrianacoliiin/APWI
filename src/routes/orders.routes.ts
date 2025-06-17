import { Router } from "express";
import { createOrder, updateOrder, deleteOrder, getOrders } from "../controllers/order.controller";

const router = Router();

router.get("/", getOrders);
router.post("/create-order", createOrder);
router.put("/update-order/:orderId", updateOrder);
router.put("/delete-order/:orderId", deleteOrder);

export default router;