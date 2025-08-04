const Note = require("../../models/note.model");

const editNote = async(req,res,next) =>{
    try{
        const noteId = req.params.noteId;
        const{title, content, tags, isPinned} = req.body;
        const user = req.user;

        if(!title && !content && !tags){
            return res.status(400).json({
                success:false,
                message:"No changes Provided"
            })
        }

        const note = await Note.findOne({_id : noteId, userId: user._id})

        if(!note){
            return res.status(400).json({
                success:false,
                message: "Note not found",
            })
        }

        if(title) note.title = title;
        if(content) note.content = content;
        if(tags) note.tags = tags;
        if(isPinned) note.isPinned = isPinned;

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

module.exports = editNote;