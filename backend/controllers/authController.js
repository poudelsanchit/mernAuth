const User = require("../models/user");
const { comparePasswords, hashPassword } = require("../helpers/auth");
const JWT = require("jsonwebtoken");

// Handle Get User
const handleGetUser = async (req, res) => {
  try {
    const data = await User.find();
    return res.json(data);
  } catch (error) {
    console.error("Err:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Login Endpoint
const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    } else if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email address" });
    }

    const validPassword = await comparePasswords(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: "Incorrect password" });
    }

    JWT.sign(
      { email: user.email, id: user._id, username: user.username },
      process.env.JWT_SECRET,
      {},
      (err, token) => {
        if (err) {
          console.error("JWT Error:", err);
          return res.status(500).json({ error: "Internal server error" });
        }

        res
          .cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
          })
          .json({
            msg: "Logged in successfully",
            user,
          });
      }
    );
  } catch (error) {
    console.error("Err:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Register Endpoint
const RegisterUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }

    if (!password || password.length < 6) {
      return res.status(400).json({
        error: "Password is required and should be at least 6 characters long",
      });
    }

    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({ error: "Email already taken" });
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return res.status(201).json(user);
  } catch (error) {
    console.error("Err:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getProfile = (req, res) => {
  const { token } = req.cookies;
  if (token) {
    JWT.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) {
        console.error("JWT Error:", err);
        return res.status(500).json({ error: "Internal server error" });
      } else {
        res.json(user);
      }
    });
  } else {
    res.json(null);
  }
};

module.exports = { handleGetUser, LoginUser, RegisterUser, getProfile };
