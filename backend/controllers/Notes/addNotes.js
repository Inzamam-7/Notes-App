const {noteValidation} = require("../../services/validationSchema");
const Note = require("../../models/note.model");

const addNote =async(req,res,next) =>{
   try{
    const data = await noteValidation.validateAsync(req.body);
    const {title,content,tags} =data;
    const user = req.user;

    const note = new Note({
        title,
        content,
        tags: tags || [],
        userId:req.user._id,
    });

    await note.save();


    return res.status(201).json({
        message: "Note added successfully",
        success: true,
        note
    })

   }catch(error){
    return res.status(500).json({
        message: `Internal server Error ${error}`,
        success: false
    })
   }
}

module.exports = addNote;