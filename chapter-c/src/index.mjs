import express, { request, response } from "express";
import router from "./routes/userRoute.mjs";
 


const app = express()
app.use(express.json())
const PORT = process.env.PORT || 3000

app.use("/api/",router)

app.get("/",(request,response)=>{
  response.status(200).json({
    message:"Home"
  })
})



 
 




app.listen(PORT,()=>{
    console.log(`Running Server ${PORT}`)
})











