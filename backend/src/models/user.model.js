import mongoose from "mongoose";

const schema = new mongoose.Schema({
    email :{
        type: String,
        required: true, 
        unique: true
    },
    fulName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    profilepic: {
        type: String,
        default: ""
    },
}, {timestamps: true});    // automatically create the createat and updateat

const User= mongoose.model('User', schema);
export default User;