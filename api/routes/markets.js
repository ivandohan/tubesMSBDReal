import express from "express";
import { getMarketPlace, addOrder } from "../controllers/market.js";

const router = express.Router();

router.get("/", getMarketPlace)
router.post("/", addOrder)

export default router

