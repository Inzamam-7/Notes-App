const router = require("express").Router();
const getUser = require("../../controllers/user/getUser");

const authenticateToken = require("../../utilities");

router.get("/getuser", authenticateToken, getUser);

module.exports = router;