import express from "express";
import { getMarketPlace, addOrder, getOrderInProcessList, updateOrderList, getOrderOnDeliveryList, addProducts } from "../controllers/market.js";

const router = express.Router();

router.get("/", getMarketPlace)
router.get("/orders-inpros", getOrderInProcessList)
router.get("/orders-ondel", getOrderOnDeliveryList)
router.put("/orders", updateOrderList)
router.post("/", addOrder)
router.post("/add-product", addProducts)

export default router

