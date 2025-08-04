const router = require("express").Router();
const addNote = require("../../controllers/Notes/addNotes");
const editNote = require("../../controllers/Notes/editNotes");
const getNote = require("../../controllers/Notes/getNotes");
const deletenote = require("../../controllers/Notes/deleteNotes");
const searchNotes = require("../../controllers/Notes/searchNotes");
const pinnedNotes = require("../../controllers/Notes/pinnedNotes");
const authenticateToken = require("../../utilities");

 

router.post("/addnote", authenticateToken, addNote);
router.put("/editnote/:noteId", authenticateToken, editNote);
router.get("/getnote", authenticateToken, getNote);
router.delete("/deletenote/:noteId", authenticateToken, deletenote);
router.get("/search", authenticateToken,searchNotes);
router.put("/pin/:noteId", authenticateToken, pinnedNotes);
module.exports = router;