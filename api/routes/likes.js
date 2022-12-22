import express from "express";
import { getLikes, addLike, deleteLike, getNumOfLikes } from "../controllers/like.js";

const router = express.Router()

router.get("/", getLikes)
router.get("/num-of-likes", getNumOfLikes)
router.post("/", addLike)
router.delete("/", deleteLike)


export default router