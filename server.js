import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from 'cors';
import connectDB from './db.js';
import authRoute from "./routes/authRoute.js"
import propertyRoutes from "./routes/propertyRoutes.js"
dotenv.config();

//connecting DB
connectDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use("/api", authRoute);
app.use("/api/property", propertyRoutes);
// app.use("/api/v1/category", categoryRoute);
// app.use("/api/v1/product", productRoute);

app.get("/",(req,res)=>{
    res.send("HelloWorld");
});

const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log(`server listening on ${PORT}`);
});