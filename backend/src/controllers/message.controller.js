import cloudinary from "../lib/cloudinary.js"
import User from "../models/user.model.js";
import Messages from "../models/messages.model.js"
import {getSocketId,io} from "../lib/socket.js"

export const getUsersforsidebar = async (req,res) =>{
    try {
        const logedInUser = req.user._id;
        const Allotherusers= await User.find({_id : {$ne : logedInUser}}).select("-password");
        res.status(200).json(Allotherusers);    
    } catch (error) {
        res.status(400).json("Internal server error", error);
    }
}

export const getMessages = async (req,res) =>{
    try {
        const {id:usertochatId} = req.params;
        const myId = req.user._id;
    
        const allmessages = await Messages.find({
            $or : [
                {senderId : usertochatId , recieverId : myId},
                {senderId : myId , recieverId : usertochatId},
            ]
        });
        res.status(200).json(allmessages);
        
    } catch (error) {
        res.status(400).json("Internal server error");    
    }
}

export const sendMessage = async (req,res) =>{
    try {
        const {id: recieverId} = req.params;
        const senderId = req.user._id;
        const {text , image} = req.body;

        let img_Url;
        if(image)  {
            const uploadResponse= await cloudinary.uploader.upload(image);
            img_Url = uploadResponse.secure_url;
        }

        const newmessage= new Messages({
            senderId : senderId,
            recieverId : recieverId ,
            text : text ,
            image : img_Url
        });

        await newmessage.save();

        // socketio implementation: returning the messages to targeted user real-time
        const SocketRecieverId= getSocketId(recieverId);
        if(SocketRecieverId) {
            io.to(SocketRecieverId).emit("newMessage",newmessage);
        }


        res.status(200).json(newmessage);
    } catch (error) {
        res.status(400).json("internal server error ", error);
    }
}