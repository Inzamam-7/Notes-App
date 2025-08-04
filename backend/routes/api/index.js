const router = require("express").Router();
const authRoutes = require("./auth.route");
const noteRoute = require("../api/note.route");
const userRoute = require("../api/user.route");

router.use("/auth", authRoutes);
router.use("/note",noteRoute);
router.use("/user", userRoute);

module.exports = router;