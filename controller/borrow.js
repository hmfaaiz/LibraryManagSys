const dotenv = require("dotenv");
dotenv.config();

const { Authentication } = require("../security/authentication");
const Book = require("../model/book");
const Member = require("../model/member");
const Borrow = require("../model/borrow");

//Book Allocation

const ToBorrow = async (req, res) => {
  Authentication(req, res, async (user) => {
    try {
      if (!req.query.BookId) {
        return res.status(400).json({
          status: 400,
          message: "BookId not provided",
        });
      }
      const findMember = await Member.findOne({ _id: user._id });
      const findBook = await Book.findOne({ _id: req.query.BookId });
      if (!findMember || !findBook || !findBook.is_available) {
        return res.status(404).json({
          status: 404,
          message: "Member/Book not found or borrowed by other ",
        });
      } else {
        const newBorrow = new Borrow({
          book_id: findBook._id,
          member_id: findMember._id,
        });

        await newBorrow.save();
        findBook.is_available=false
        await findBook.save();
        return res.status(200).json({
          status: 200,
          message: "Book Successfully borrowed",
        });
      }
    } catch (error) {
      
      return res
        .status(500)
        .json({ status: 500, message: "Internal error", error });
    }
  });
};


const ToReturn = async (req, res) => {
  Authentication(req, res, async (user) => {
    try {
      if (!req.query.BorrowId) {
        return res.status(400).json({
          status: 400,
          message: "BorrowId not provided",
        });
      }
      const findMember = await Member.findOne({ _id: user._id });
      const findBorrow = await Borrow.findOne({ _id: req.query.BorrowId });
      if (!findMember || !findBorrow || findBorrow.member_id!=user._id) {
        console.log(findBorrow.member_id,user.id)
        return res.status(404).json({
          status: 404,
          message: "Member/borrow record not found",
        });
      } else {
        if(findBorrow.return_date){
            return res.status(400).json({
                status: 400,
                message: "Book already returned",
              });
        }else{
            const findBook = await Book.findOne({ _id: findBorrow.book_id });
            if(findBook){
                findBook.is_available=true
                await findBook.save();

                findBorrow.return_date=new Date()
                await findBorrow.save()
                return res.status(200).json({
                    status: 200,
                    message: "Book Successfully returned",
                  });
            }

            return res.status(404).json({
                status: 200,
                message: "Book Record not found",
              });
        }

       
      }
    } catch (error) {
      
      return res
        .status(500)
        .json({ status: 500, message: "Internal error", error });
    }
  });
};

const BorrowedByMember = async (req, res) => {
  Authentication(req, res, async (user) => {
    try {
      
      if (user.isAdmin) {
        const findlist = await Borrow.find()
        .populate({
          path: 'member_id',
          select: '_id name email' // Specify the fields you want to select from the 'member_id' document
        })
        .populate({
          path: 'book_id',
          select: '_id title ' // Specify the fields you want to select from the 'member_id' document
        });
        return res
          .status(200)
          .json({ status: 200, message: "List Borrowed By Member", data: findlist,total:findlist.length });
      } else {
        return res
          .status(404)
          .json({ status: 404, message: "You are not allowed" });
      }
    } catch {
      return res.status(500).json({ status: 500, message: "Internal error" });
    }
  });
};

const CurrentBorrowed= async (req, res) => {
  Authentication(req, res, async (user) => {
    try {
      
      if (user.isAdmin) {
        const findlist = await Borrow.find()
        .populate({
          path: 'member_id',
          select: '_id name email' // Specify the fields you want to select from the 'member_id' document
        })
        .populate({
          path: 'book_id',
          select: '_id title ' // Specify the fields you want to select from the 'member_id' document
        });
        let CurrentBorrowed;
        if(findlist && findlist.length>0){
          CurrentBorrowed = findlist.filter(
            (current) => !current.return_date
          );
        }
        return res
          .status(200)
          .json({ status: 200, message: "Current Borrowed By Member", CurrentBorrowed,total:CurrentBorrowed.length });
      } else {
        return res
          .status(404)
          .json({ status: 404, message: "You are not allowed" });
      }
    } catch {
      return res.status(500).json({ status: 500, message: "Internal error" });
    }
  });
};

module.exports = { ToBorrow, ToReturn,BorrowedByMember,CurrentBorrowed };

