import express from "express";
import { getRegRequest, getUser , getUserByUsername, setAccepted, setRejected, updateUser} from "../controllers/user.js";

const router = express.Router()

router.get("/find/:userId", getUser)
router.get("/get/:username", getUserByUsername)
router.get("/regreq", getRegRequest)
router.put("/accept", setAccepted)
router.put("/reject", setRejected)
router.put("/", updateUser)


export default router