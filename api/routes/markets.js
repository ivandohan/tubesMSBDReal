import express from "express";
import { getMarketPlace } from "../controllers/market.js";

const router = express.Router();

router.get("/", getMarketPlace)

export default router

