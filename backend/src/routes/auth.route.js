import express from "express"
import { signup, login, logout,updateProfile,checkroute ,updateName} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router=express.Router();

router.post("/signup",signup)

router.post("/login",login)

router.get("/logout",logout)

router.post("/update-profile",protectRoute,updateProfile)

router.post("/update-name",protectRoute,updateName)

router.get("/check",protectRoute,checkroute)
 
export default router;