const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const {connect_To_DB}=require("./dbconfig");
connect_To_DB()

const memberR = require("./route/member");
const bookR = require("./route/book");
const borrowR = require("./route/borrow");


app.use(express.json());
app.get("/", (req, res) => {
  res.send("Connected");
});

app.use("/api/librarymanagementsystem/member", memberR);
app.use("/api/librarymanagementsystem/book", bookR);
app.use("/api/librarymanagementsystem/borrow", borrowR);


app.listen(process.env.PORT, () => {
    console.log("server is running");
  });
  