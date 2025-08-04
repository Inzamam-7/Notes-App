const { boolean } = require("joi");
const {Schema,model} = require("mongoose");

const noteSchema = new Schema({
    title:{
        type:String
    },
    content:{
        type:String
    },
    tags:{
        type:[String],
        default: [],
    },
    isPinned:{
        type:Boolean,
        default: false,
    },
    userId:{
        type:String,
    },
    createdOn:{
        type:String,
        default: new Date,
    }
})

module.exports = model("Note", noteSchema);