import express from "express";
import {getCommunities, getCommunityDetails} from "../controllers/community.js"

const router = express.Router();

router.get("/", getCommunities);
router.get("/detail/:comId", getCommunityDetails);

export default router;