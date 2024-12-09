import mongoose from "mongoose";

const schema = new mongoose.Schema({
    senderId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    recieverId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    text : {
        type : String,
    },
    image : {
        type : String,
    }

  
}, {timestamps: true});    // automatically create the createat and updateat

const Messages= mongoose.model('Messages', schema);
export default Messages;