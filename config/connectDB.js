const { mongoURI } = require("./configKeys");
const mongoose = require("mongoose");
const Grid = require("gridfs-stream");

const connectDB = async () => {
  mongoose
    .connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((res) => {
      gfs = Grid(res.connection.db, mongoose.mongo);
      gfs.collection("uploads");
      console.log(`MongoDB Connected: ${res.connection.host}`);
    })
    .catch((error) => {
      console.log(`Connection Error: ${error.message}`);
      process.exit(1);
    });
};
module.exports = connectDB;
