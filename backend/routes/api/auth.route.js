const router = require("express").Router();
const Signup = require("../../controllers/auth/Signup");
const Login = require("../../controllers/auth/Login");
const authenticateToken = require("../../utilities");
router.post("/signup", Signup);
router.post("/login", Login);

module.exports =  router;