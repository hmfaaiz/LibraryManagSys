const express = require("express");
const route = express.Router();

const {
  AddBook,
  GetAllBooks,
  UpdateBook,
  DeleteBook,
  PermanentlyDeleteBook,
} = require("../controller/book");

route.get("/", (req, res) => {
  res.send("book route");
});

route.post("/AddBook", (req, res) => {
  AddBook(req, res);
});

route.get("/GetAllBooks", (req, res) => {
  console.log("GetAllBooks");
  GetAllBooks(req, res);
});

route.delete("/DeleteBook", (req, res) => {
  console.log("DeleteBook");
  DeleteBook(req, res);
});

route.delete("/PermanentlyDeleteBook", (req, res) => {
  console.log("PermanentlyDeleteBook");
  PermanentlyDeleteBook(req, res);
});

route.put("/UpdateBook", (req, res) => {
  console.log("UpdateBook");
  UpdateBook(req, res);
});

module.exports = route;
