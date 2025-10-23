import express from "express";
import dotenv from "dotenv";
import taskRoute from "./routes/TaskMangerRoute/TaskMangerRoute.mjs";
import morgan from "morgan";

dotenv.config()

const app = express()
app.use(express.json())
app.use(morgan('dev'));




app.use("/api",taskRoute)






const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log(`Server Starting ${PORT} `)
})


