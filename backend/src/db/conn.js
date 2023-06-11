const mongoose = require("mongoose");
const dotenv = require('dotenv');

dotenv.config();

const URI = process.env.MONGO_URI;

mongoose.set("strictQuery", true);
mongoose.connect(
    URI,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
  .then((msg) => {
    console.log("success");
  })
  .catch((error) => {
    console.log(error);
  });