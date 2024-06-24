const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const router = require("./routes/authRoutes");
const { ConnectMongoDB } = require("./ConnectMongoDB");
const cookieParser = require("cookie-parser");
dotenv.config();
const port = process.env.PORT || 3000;
const URL = process.env.URL;
ConnectMongoDB(URL);

// middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Allow your frontend origin
    credentials: true, // Enable credentials
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(router);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
