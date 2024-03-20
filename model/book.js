const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true,},
    authors: [{ type: String,required: true }],
    publication_date: {  type: Date, required: true},
    genre: { type: String, required: true },
    is_available: {
      type: Boolean,
      default: true
    }

  },

  { timestamps: true }
);

module.exports = mongoose.model("book", bookSchema);