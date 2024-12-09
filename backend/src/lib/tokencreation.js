import jwt from "jsonwebtoken"

export const tokengeneration= async (userId, res) =>{
    // token creation 
    const token = jwt.sign({userId} , process.env.JWT_SCERET , {
        expiresIn: "7d",
    });

    // cookie creation
    res.cookie("jwt" , token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,    //maximum age of this token
        httpOnly: true,                     // stopping the cross platform attacks i.e. from XSS
        sameSite: "None",                 //cross site request forgery attack
        secure: process.env.NODE_ENV !== "development" //not secure in development but in prodution
    });

    return token;
};