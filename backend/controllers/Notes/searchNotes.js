const Note = require("../../models/note.model");
const searchNotes = async (req, res) => {
    try {
      const user = req.user;
      const query = req.query.query;
  
      if (!query) {
        return res.status(400).json({
          success: false,
          message: "Search query is required",
        });
      }
  
      const matchingNotes = await Note.find({
        userId: user._id,
        $or: [
          { title: { $regex: new RegExp(query, "i") } },
          { content: { $regex: new RegExp(query, "i") } },
        ],
      });
  
      return res.json({
        success: true,
        notes: matchingNotes,
      });
    } catch (error) {
      console.error("Search error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };
  

module.exports = searchNotes;