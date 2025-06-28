const mongoose = require("mongoose");

function connectDB() {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("Connected to the database successfully");
    })
    .catch((err) => {
      console.error("Error connecting to the database:", err);
    });
}

module.exports = connectDB;
