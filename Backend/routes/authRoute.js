const express = require("express");
const { handleRegister, handleLogin, handleGetProfile } = require("../controllers/authController");
const { protect } = require("../middleware/protect");
const { roleAuthentication } = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/register", handleRegister);
router.post("/login", handleLogin);
router.get("/get_profile", protect, roleAuthentication(["User", "Driver", "Admin"]), handleGetProfile);


module.exports = router