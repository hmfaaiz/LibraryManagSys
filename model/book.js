const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true,unique:true},
    author: { type: String, required: true},
    publication_date: {  type: Date},
    genre: { type: String},
    is_available: {
      type: Boolean,
      default: true
    },
    isSoftDeleted: {
      type: Boolean,
      default: false
    }

  },

  { timestamps: true }
);

module.exports = mongoose.model("book", bookSchema);