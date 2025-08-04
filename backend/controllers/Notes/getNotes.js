const Note = require("../../models/note.model");

const getNote = async(req,res) =>{
    try{
       const user = req.user;

       const notes = await Note.find({userId : user._id}).sort({isPinned: -1});

       return res.json({
        success:true,
        message: "All notes retrived successfully",
        notes,
       })
    }catch(error){
        return res.status(500).json({
            success:false,
            message: "Internal Server Error123",
           })
    }
}

module.exports = getNote