const mongoose = require("mongoose");

const MONGODB_URL = process.env.MONGODB_URL;
//mongodb://localhost:27017/nasa
// "mongodb+srv://nasa-api02:uRb1verogMATg8U2@nasacluster.39j0f.mongodb.net/nasa?retryWrites=true&w=majority";

mongoose.connection
  .once("open", () => {
    console.log("mongoDB connection ready");
  })
  .on("error", (error) => {
    console.log(error);
  });

const mongoConnect = async () => {
  await mongoose.connect(MONGODB_URL);
};

const mongoClose = async () => {
  await mongoose.disconnect();
};

module.exports = { mongoConnect, mongoClose };
