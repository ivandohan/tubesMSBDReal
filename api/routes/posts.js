import express from "express";
import { getGeneralPosts, getEventPosts, getAchPosts, getLogPosts, addPost, deletePost } from "../controllers/post.js";

const router = express.Router();

router.get("/general-posts", getGeneralPosts);
router.get("/event-posts", getEventPosts);
router.get("/achievement-posts", getAchPosts);
router.get("/log-posts", getLogPosts);
router.post("/", addPost);
router.delete("/:id", deletePost);

export default router;
