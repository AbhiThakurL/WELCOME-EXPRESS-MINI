const jwt =  require("jsonwebtoken");
const userModel = require("../models/user.model")

const authMiddlewares =  async (request,response,next) => {

    const token =  request.cookies.token;
    
    if(!token){
        return response.status(401).json({
            message:"Unauthorized access, please login first "
        })    
    }

    try{
          const decoded = jwt.verify(token,process.env.JWT_SECRET);
          
          const user =  await userModel.findOne({
            _id:decoded.id
          })

          
          
          request.user = user


          next()



    }catch(err){

        return response.status(401).json({
            message:"Invalid token please login again "
        })

    }
 
   


 



    
}

module.exports = authMiddlewares