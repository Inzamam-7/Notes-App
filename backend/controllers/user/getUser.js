// const {loginValidation} = require("../../services/validationSchema")
const User = require("../../models/user.model");


const getUser = async(req,res,next) =>{
    try{
        console.log("Decoded user from token:", req.user);
         const user = req.user;

         const isUser = await User.findById(user._id);

         if(!isUser){
            return res.status(401).json({
                message: "User not Found",
                success: false,
            })
         }

         return res.json({
           user: {
            fullName: isUser.fullName,
            email: isUser.email,
            "id" : isUser._id,
            createdOn: isUser.createdOn
           },
           message: ""
         })
    }catch(error){
        res.status(400).json({
            message:`Invalid credentials ${error}`,
            success:false
        })
    }
}

module.exports = getUser;