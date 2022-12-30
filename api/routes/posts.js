import express from "express";
import { getGeneralPosts, getEventPosts, getAchPosts, getLogPosts, addPost, deletePost, reportPost, getReportedPost } from "../controllers/post.js";

const router = express.Router();

router.get("/general-posts", getGeneralPosts);
router.get("/event-posts", getEventPosts);
router.get("/achievement-posts", getAchPosts);
router.get("/log-posts", getLogPosts);
router.get("/reported-posts", getReportedPost);
router.post("/", addPost);
router.post("/report", reportPost);
router.delete("/:id", deletePost);

export default router;
