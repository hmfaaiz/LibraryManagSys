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
      required: true,
    },
    return_date: {
      type: Date,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("borrow", borrowSchema);
