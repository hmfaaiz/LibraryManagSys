const express = require("express");
const app = express();

// const adminR = require("./routes/adminR");

const dotenv = require("dotenv");
dotenv.config();

const {connect_To_DB}=require("./dbconfig");
connect_To_DB()


app.use(express.json());
app.get("/", (req, res) => {
  res.send("Connected");
});


app.listen(process.env.PORT, () => {
    console.log("server is running");
  });
  