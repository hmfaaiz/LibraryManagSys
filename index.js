const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const {connect_To_DB}=require("./dbconfig");
connect_To_DB()

const memberR = require("./route/member");


app.use(express.json());
app.get("/", (req, res) => {
  res.send("Connected");
});

app.use("/api/librarymanagementsystem/member", memberR);

app.listen(process.env.PORT, () => {
    console.log("server is running");
  });
  