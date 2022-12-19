import express from "express";
import { getGeneralPosts, getEventPosts, addPost, deletePost } from "../controllers/post.js";

const router = express.Router();

router.get("/general-posts", getGeneralPosts);
router.get("/event-posts", getEventPosts);
router.post("/", addPost);
router.delete("/:id", deletePost);

export default router;
