import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import { tokengeneration } from "../lib/tokencreation.js"
import cloudinary from "../lib/cloudinary.js"
import jwt from "jsonwebtoken"
import { protectRoute } from "../middleware/protectRoute.js"


export const signup = async (req, res) => {
    console.log(req.body);
    try {
        const { fulname, email, password } = req.body;
        // checking
        if (!email || !fulname || !password) {
            return res.status(400).json({ message: "All fields are required!" });
        }
        const find = await User.findOne({ email });
        if (find) {
            return res.status(400).json({ message: "This email already has an account!" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password length should be greater than or equal to 6!" });
        }

        // decrypting password by bcryptjs
        const salt = await bcrypt.genSalt(10)   //creating key
        const hashedpassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            email: email,
            fulName: fulname,
            password: hashedpassword
        });
        if (newUser) {
            // cookie and token creation
            tokengeneration(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                email: newUser.email,
                fulname: newUser.fulname,
                profilepic: newUser.profilepic
            })
        }
        else {
            res.status(400).json({ message: "Invalid User data" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const login = async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password length should be greater than or equal to 6!" });
        }
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        tokengeneration(user._id, res);
        return res.status(200).json({
            _id: user._id,
            fulName: user.fulName,
            createdAt: user.createdAt,
            email: user.email,
            password: user.password,
        })

    } catch (error) {
        return res.status(400).json({ message: "Internal server error" });
    }
}

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        return res.status(200).json({ message: "Logged Out Successfully" });
    } catch (error) {
        return res.status(400).json({ message: "Internal server error" });
    }
}

export const updateProfile = async (req, res) => {
    // coming from protectroute
    try {

        const { profilepic } = req.body;
        const userId = req.user._id;

        if (!profilepic) {
            return res.status(400).json({ message: "New Profile pic is required" });
        }

        const uploadResponse = await cloudinary.uploader.upload(profilepic);
        const updatedUser = await User.findByIdAndUpdate(userId, { profilepic: uploadResponse.secure_url }, { new: true });
        return res.status(200).json(updatedUser);
    }
    catch (error) {
        res.status(400).json({ message: "Internal server error" });
    }
}

export const updateName = async (req, res) => {
    try {
        const new_name = req.body;

        // getting the id
        const userId=req.user._id;

        if (!new_name) {
            return res.status(400).json({ message: "New Name is required" });
        }
        if(!userId) {
            return res.status(400).json({ message: "User Id is not found" });

        }
        const Updateduser = await User.findByIdAndUpdate(userId, { fulName: new_name.fulName }, { new: true });
        console.log(Updateduser)
        res.status(200).json(Updateduser);

    } catch (error) {
        res.status(400).json({ message: "Internal server error at updateName" });
    }
}

export const checkroute = (req, res) => {
    try {
        return res.status(200).json(req.user);
    } catch (error) {
        return res.status(400).json({ message: "Internal server error" });
    }
}
