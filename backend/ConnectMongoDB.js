const mongoose = require("mongoose");

const ConnectMongoDB = async (URL) => {
  try {
    mongoose.connect(URL);
    console.log("Database connected succesfully");
  } catch (error) {
    console.log("Error conencting to MongoDB", error.message);
  }
};

module.exports = {
  ConnectMongoDB,
};
