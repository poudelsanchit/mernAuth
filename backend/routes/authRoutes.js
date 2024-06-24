const express = require("express");
const { handleGetUser, LoginUser, RegisterUser ,getProfile} = require("../controllers/authController");
const router = express.Router();

router.get("/users", handleGetUser);
router.post("/login", LoginUser);
router.post("/register", RegisterUser);
router.get("/profile", getProfile);


module.exports = router;
