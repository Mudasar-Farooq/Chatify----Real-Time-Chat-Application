import jwt from "jsonwebtoken"
import { tokengeneration } from "../lib/tokencreation.js";
import User from "../models/user.model.js"

export const protectRoute = async (req, res, next) => {

    try {
        // finding the token
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No token found" });
        }

        // decoding the value of cookie
        const decoded = jwt.verify(token, process.env.JWT_SCERET);
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized - Invalid token" });
        }

        // identifying the user
        const user = await User.findById(decoded.userId).select("-password");
        // console.log(user._id);
        if (!user) {
            return res.status(404).json({ message: "Unauthorized - User not found" });
        }

        // token , cookie & user identified
        req.user = user;
        next();
        return decoded.userId;

    } catch (error) {
        // return res.status(400).json({ message: error.message });
    }
}
