import express from "express";
import {
  getComments,
  addComment,
  deleteComment,
  reportedComment,
} from "../controllers/comment.js";
 
const router = express.Router();

router.get("/", getComments);
router.post("/", addComment);
router.post("/report", reportedComment);
router.delete("/:id", deleteComment);

export default router;
