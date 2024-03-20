const mongoose = require("mongoose");

const borrowSchema = new mongoose.Schema(
  {
    book_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "book",
      required: true,
    },
    member_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "member",
      required: true,
    },
    borrow_date: {
      type: Date,
      default:Date.now(),
    },
    return_date: {
      type: Date,default:null,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("borrow", borrowSchema);
