const dotenv = require("dotenv");
dotenv.config();
const {Authentication } = require("../security/authentication");
const validator = require("validator");
const Book = require("../model/book");


//Book
const AddBook = async (req, res) => {
  Authentication(req, res, async (user) => {
    try {
      if (user.isAdmin) {
        if (
          req.body.title &&
          req.body.author &&
       
          req.body.publication_date &&
          req.body.genre &&
          validator.isDate(req.body.publication_date) 
        
        ) {
          const findBook = await Book.findOne({
            title: req.body.title,
          });

          if (!findBook) {
            const newBook = new Book({
                title: req.body.title,
                author: req.body.author,
                publication_date: req.body.publication_date,
                genre: req.body.genre,
            });

            await newBook.save();
            return res.status(200).json({
              status: 200,
              message: "Book Successfully added",
            });
          } else {
            return res
              .status(409)
              .json({ status: 409, message: "Book already exist with this Title" });
          }
        } else {
          return res.status(400).json({ status: 400, message: "Invalid data provided" });
        }
      } else {
        return res
          .status(400)
          .json({ status: 400, message: "You are not allowed" });
      }
    } catch (error) {
      console.error("Error:", error);
      return res
        .status(500)
        .json({ status: 500, message: "Internal error", error });
    }
  });
};

//no authentication is required
const GetAllBooks = async (req, res) => {
//   Authentication(req, res, async (user) => {
    console.log("Book", req.body);
    try {
      const filter = {};
      if (req.query.title )
        filter.title  = req.query.title ;
      if (req.query.author) filter.author = req.query.author;
      
      const findBook = await Book.find(filter);
      let totalBooks;
      if (findBook && findBook.length > 0) {
        const validBook = findBook.filter((Book) => !Book.isSoftDeleted);
        let totalBooks = validBook.length;

        return res.status(200).json({
          status: 200,
          message: "Book found",
          data: validBook,
          totalBooks: totalBooks,
        });
      } else {
        return res.status(404).json({ status: 404, message: "Not found" });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ status: 500, message: "Internal error 2", error: error });
    }
//   });
};

const UpdateBook = async (req, res) => {
  Authentication(req, res, async (user) => {
    try {
      if (user.isAdmin) {
        if (req.body.BookId) {
          const findBook = await Book.findOne({
            _id: req.body.BookId,
          });
          if (findBook) {
       
            if (req.body.genre) {
              findBook.genre = req.body.genre;
            }
            if (req.body.author) {
              findBook.author = req.body.author;
            }
            if (req.body.publication_date &&  validator.isDate(req.body.publication_date))  {
              findBook.publication_date = req.body.publication_date;
            }
            if (req.body.title) {
              const findtitle = await Book.findOne({
                title: req.body.title,
              });
              if (findtitle) {
                return res
                  .status(409)
                  .json({ status: 409, message: "this Title Already exist" });
              } else {
                findBook.title = req.body.title;
              }
            }
            await findBook.save();
            return res.status(200).json({
              status: 200,
              message: "Book Successfully updated",
              data: findBook,
            });
          } else {
            return res
              .status(404)
              .json({ status: 404, message: "Book not found" });
          }
        } else {
          return res.status(400).json({ status: 400, message: "Invalid data" });
        }
      } else {
        return res
          .status(404)
          .json({ status: 404, message: "You are not allowed" });
      }
    } catch (error) {
      console.error("Error:", error);
      return res
        .status(500)
        .json({ status: 500, message: "Internal error", error });
    }
  });
};

const DeleteBook = async (req, res) => {
  Authentication(req, res, async (user) => {
    try {
      if (user.isAdmin) {
        if (req.query.BookId) {
          const findBook = await Book.findOne({
            _id: req.query.BookId,
          });

          if (findBook) {
            findBook.isSoftDeleted = true;
            findBook.save();
            return res.status(200).json({
              status: 200,
              message: "Book Successfully (soft) deleted",
              deletedBook: findBook,
            });
          } else {
            return res
              .status(404)
              .json({ status: 404, message: "Book not found" });
          }
        } else {
          return res.status(400).json({ status: 400, message: "Invalid data" });
        }
      } else {
        return res
          .status(404)
          .json({ status: 404, message: "You are not allowed" });
      }
    } catch (error) {
      console.error("Error:", error);
      return res
        .status(500)
        .json({ status: 500, message: "Internal error", error });
    }
  });
};

const PermanentlyDeleteBook = async (req, res) => {
  Authentication(req, res, async (user) => {
    try {
      if (user.isAdmin) {
        if (req.query.BookId) {
          const findBook = await Book.findOneAndDelete({
            _id: req.query.BookId,
          });

          if (!findBook) {
            return res
              .status(404)
              .json({ status: 404, message: "Book not found." });
          }
          return res
            .status(200)
            .json({ status: 200, message: "Book Permanently deleted successfully." });
            
          
        } else {
          return res.status(400).json({ status: 400, message: "Invalid data provided" });
        }
      } else {
        return res
          .status(404)
          .json({ status: 404, message: "You are not allowed" });
      }
    } catch (error) {
      console.error("Error:", error);
      return res
        .status(500)
        .json({ status: 500, message: "Internal error", error });
    }
  });
};



module.exports = {
  AddBook,
  GetAllBooks,
  UpdateBook,
  DeleteBook,PermanentlyDeleteBook
};
