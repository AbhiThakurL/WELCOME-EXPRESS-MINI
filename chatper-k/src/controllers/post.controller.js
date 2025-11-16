const postModel = require("../models/post.model");
const ImageSend = require("../service/ai.service");
const uploadFile = require("../service/storage.service");
const { v4:uuidv4} = require("uuid")


const postController =  async (request,response) => {

    try{

        const file = request.file;

        if(!file){
            return response.status(400).json({
                error:"No file uploaded"
            })
        }

        const base64ImageData = file.buffer.toString("base64");
        const mimeType = file.mimetype;

        const {title , description } = await ImageSend(base64ImageData,mimeType)

        const result = await uploadFile(file.buffer,`${uuidv4()}`);
        

        const post = await postModel.create({
            image:result.url,
            title:title,
            description:description,
            user:request.user._id

        })


        return response.status(201).json({
          message:"Post created successfully",
          post  
        })



    }catch(erorr){

        console.error(error)
        return response.status(500).json({
            erorr:"Failed to process image"
        })
    }




   
}

module.exports = { postController }