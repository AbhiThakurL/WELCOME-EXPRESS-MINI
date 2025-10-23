import express, { request, response } from "express"

const router2 = express.Router()

router2.get("/sub",(request,response)=>{
    response.status(200).json({
        message:"Sub Routing "
    })
})

export default router2;
