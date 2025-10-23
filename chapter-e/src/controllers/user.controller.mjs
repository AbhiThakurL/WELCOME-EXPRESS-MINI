import bcrypt from "bcryptjs";
import { User } from "../models/user.model.mjs";


const registerUser = async (request,response) => {
    try{

        const {name , email, password} = request.body;

        const existing = await User.findOne({ email })
        if(existing) return response.status(400).json({message:"Email already exists"})

        const hashedPassword = await bcrypt.hash(password,10)
        const user =  await User.create({name,email,password:hashedPassword})

        return response.status(201).json({
            message:"Create Accounts Successfully  ",
            user,
        })

    }catch(error){

        return response.status(500).json({
            message:"Bad Request ..",
            success:false
        })
        
    }

}

const login = async (request,response) => {
    try{

        const { email , password } = request.body;

        const user =  await User.findOne({ email })
        if(!user) return response.status(404).json({message:"User Not Found ."})
        
        const CheckPassword = await bcrypt.compare(password,user.password)
        if(!CheckPassword) return response.status(404).json({message:"Invalid credentials"})
        

        response.cookie("userId",user._id.toString(),{
            httpOnly: true,
            maxAge: 1000 * 60 * 60,
        })

    
        return response.status(200).json({
            message:"login successFully"
        })


    }catch(error){

        return response.status(500).json({
            message:"Bad Request . ",
            errors:error
        })

    }
      
}

const Profile = async (request,response) => {
    try{

        const findUser = request.cookies.userId
        if(!findUser) return response.status(401).json({ message:"User Not Loggin ."})

        const user = await User.findById(findUser).select("-password")

        return response.status(200).json({
            message:"Profile Successfully Show . ",
            Profile:user
        })
    
    }catch(error){
          return response.status(500).json({
            message:"Bad Request . ",
            errors:error
        })
    }

}

const Logout = (request,response) => {
    try{
        response.clearCookie("userId");
        return response.status(200).json({
            message:"Logout Accounts . "
        })

    }catch(error){
            return response.status(500).json({
            message:"Bad Request . ",
            errors:error
        })

    }
}

export { registerUser,login,Profile,Logout };