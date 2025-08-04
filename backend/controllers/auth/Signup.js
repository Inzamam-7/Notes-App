const {registerValidation} = require("../../services/validationSchema");
const User = require("../../models/user.model")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Signup = async(req,res,next) =>{
   try{
    const data = await registerValidation.validateAsync(req.body);
    const {fullName, email,password} = data;
    console.log(fullName);
    
    const isUser = await User.findOne({email});

    if(isUser){
        return res.status(400).json({
            message: "User already exists",
            success: false,
        })
    }
     const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User ({
        fullName,
        email,
        password : hashedPassword,
    })

    await user.save();

    const accessToken = jwt.sign({_id:user._id, email: user.email},process.env.ACCESS_TOKEN_SECRET,{expiresIn: "30m"});

    return res.json({
        success:true,
        user:{
            fullName: user.fullName,
            email: user.email,
            id: user._id 
        },
        accessToken,
        message:"Registration Successful",
    })


   }
   catch(error){
    res.status(400).json({
        success:false,
        message: `Error while registration ${error}`,
    })
   }
}

module.exports = Signup;