import express from "express"
import { protectRoute } from "../middleware/protectRoute.js";
import { getUsersforsidebar ,getMessages , sendMessage } from "../controllers/message.controller.js";
const router=express.Router();

router.get("/users" ,protectRoute, getUsersforsidebar);
router.get("/:id",protectRoute , getMessages);
router.post("/send/:id" ,protectRoute, sendMessage);

export default router;