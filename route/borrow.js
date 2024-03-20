const express = require("express");
const route = express.Router();

const {
    ToBorrow, ToReturn,BorrowedByMember,CurrentBorrowed
} = require("../controller/borrow");

route.get("/", (req, res) => {
  res.send("borrow route");
});

route.put("/ToBorrow", (req, res) => {
    ToBorrow(req, res);
});

route.put("/ToReturn", (req, res) => {
  console.log("ToReturn");
  ToReturn(req, res);
});

route.get("/BorrowedByMember", (req, res) => {
  console.log("BorrowedByMember");
  BorrowedByMember(req, res);
});

route.get("/CurrentBorrowed", (req, res) => {
  console.log("CurrentBorrowed");
  CurrentBorrowed(req, res);
});





module.exports = route;
