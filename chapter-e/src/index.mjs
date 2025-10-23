import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import router from "./routes/user.routes.mjs";


dotenv.config()
const app = express()
app.use(express.json())
app.use(cookieParser());


mongoose.connect(process.env.MONGO_URL).then(()=>console.log("MongoDB Connection SuccessFully .. ")).catch((error)=>console.log("Connect Error "+error))

app.use("/api",router)







const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log(`Server Running ${PORT}`)
})