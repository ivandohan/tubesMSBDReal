import express from "express";
import { getMarketPlace, addOrder, getOrderInProcessList, updateOrderList, getOrderOnDeliveryList } from "../controllers/market.js";

const router = express.Router();

router.get("/", getMarketPlace)
router.get("/orders-inpros", getOrderInProcessList)
router.get("/orders-ondel", getOrderOnDeliveryList)
router.put("/orders", updateOrderList)
router.post("/", addOrder)

export default router

