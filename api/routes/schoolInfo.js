import express from "express";
import {getSchDetail} from "../controllers/school.js"

const router = express.Router();

router.get("/vission-mission/:schLevelId", getSchDetail);

export default router;