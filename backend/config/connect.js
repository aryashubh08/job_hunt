const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("MongoDB Connected Successfully!");
    })
    .catch((error) => {
      console.log("MongoDB Connection Failed!");
      console.error(error.message);
      process.exit(1);
    });
};
