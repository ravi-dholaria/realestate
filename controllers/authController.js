import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from '../helper/authHelper.js';
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Basic validation
        if (!email)
        {   
            return res.send({ error: "email is Required!" });   
        }if (!password)
        {
            return res.send({ error: "password is Required!" });   
        }

        // checking if following mail is already registered or not!
        const existingUser = await userModel.findOne({ email });
        if (existingUser)
        {
            return res.status(200).send({
                success: true,
                message: "Already registered please login"
            });    
        }
        
        const hashedPassword = await hashPassword(password);
        const user = await new userModel({ email, password: hashedPassword}).save();
        return res.status(201).send({
            success: true,
            message: "User Registered Successfully",
            user
        });
        

    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error in Registration",
            error
        });
    }
};

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(404).send({
                success: false,
                message: "Invalid email or password!"
            });
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            res.status(404).send({
                success: false,
                message: "Email is not registered!"
            });
        }
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "invalid password"
            });
        }
        // tokenizing 
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7D" });
        res.status(200).send({
            success: true,
            message: "login successfully",
            user: {
                email: user.email,
            },
            token
        });
  } catch (error) {
      console.error(error);
      res.status(500).send({
          success: false,
          message: "Error in login",
          error
      });
  }  
};

export const testController = async (req, res) => {
    res.send("protected Test!!");
};