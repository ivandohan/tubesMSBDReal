import express from "express";
import { getUser , getUserByUsername, updateUser} from "../controllers/user.js";

const router = express.Router()

router.get("/find/:userId", getUser)
router.get("/get/:username", getUserByUsername)
router.put("/", updateUser)


export default router