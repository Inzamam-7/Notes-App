const {loginValidation} = require("../../services/validationSchema")
const User = require("../../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const Login = async(req,res,next) =>{
    try{
         const data = await loginValidation.validateAsync(req.body);
         const {email,password} = data;

         const user = await User.findOne({email});
         if(!user){
            return res.status(400).json({
                message: "User not Found",
                success: false,
            })
         }
         
         const isPasswordValid = await bcrypt.compare(password, user.password);

         if(!isPasswordValid){
           return res.status(400).json({
            message: "password Incorrect",
            success: false
           })
         }

         const accessToken = jwt.sign({_id: user._id, email:user.email},process.env.ACCESS_TOKEN_SECRET,{expiresIn:"3600m"})

         const userInfo = {
            email,
            password
         }

         return res.status(201).json({
            message: "Login Successful",
            success:true,
            email : user.email,
            accessToken,
            userInfo
         })
    }catch(error){
        res.status(400).json({
            message:`Invalid credentials ${error}`,
            success:false
        })
    }
}

module.exports = Login