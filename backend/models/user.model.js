const {Schema, model} = require("mongoose");

const userSchema = new Schema({
    fullName:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    createdOn:{
        type:Date,
        default:Date.now
    }
})

module.exports = model("User", userSchema)