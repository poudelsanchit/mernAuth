const express = require("express");
const { handleGetUser, LoginUser, RegisterUser } = require("../controllers/authController");
const router = express.Router();

router.get("/users", handleGetUser);
router.post("/login", LoginUser);
router.post("/register", RegisterUser);

module.exports = router;
