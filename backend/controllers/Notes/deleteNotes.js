const Note = require("../../models/note.model");

const deleteNote = async(req,res) =>{
   try{
    const noteId = req.params.noteId;
    const user = req.user;

    const note = await Note.findOne({_id: noteId, userid: user._id})

    if(!note){
        return res.status(404).json({
            success:false,
            message: "Note Not Found"
        })
    }

    await Note.deleteOne({_id: noteId, userId : user._id})

    return res.json({
        success: true,
        message: "Note Deleted"
    })

   }catch(error){
    return res.status(500).json({
        message: "Internal Server Error",
        success: false,
    })
   }
}

module.exports = deleteNote;