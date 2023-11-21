require("dotenv").config();

var express = require("express");
var app = express();
app.use(express.json());

//use cors to allow cross origin resource sharing
const cors = require("cors");
app.use(cors());

const apiRouter = require("./routes/routes");
app.use("/", apiRouter);

const { mongoDB } = require("./config");
const mongoose = require("mongoose");

// Mongo Connection
mongoose.connect(
  mongoDB,
  {
    maxPoolSize: 50,
    wtimeoutMS: 2500,
    useNewUrlParser: true,
  },
  (err, res) => {
    if (err) {
      console.log(err);
      console.log(`MongoDB Connection Failed`);
    } else {
      console.log(`MongoDB Connected`);
    }
  }
);

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
