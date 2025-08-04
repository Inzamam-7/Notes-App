const Note = require("../../models/note.model");

const updateNotePinned = async(req,res,next) =>{
    try{
        const noteId = req.params.noteId;
        const{isPinned} = req.body;
        const user = req.user;


        const note = await Note.findOne({_id : noteId, userId: user._id})

        if(!note){
            return res.status(400).json({
                success:false,
                message: "Note not found",
            })
        }

        note.isPinned = isPinned;

        await note.save();

        return res.json({
            success: true,
            message:"Note updated successfully",
            note,
        })

    }catch(error){
        return res.status(500).json({
            message: "Internal Error",
            success: false,
        })
    }
}

module.exports = updateNotePinned;