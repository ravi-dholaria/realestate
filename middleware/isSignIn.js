import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const isSignIn = async (req, res, next) => {
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user = decode;
        console.log(decode);
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: error
        });
   }
    
};
