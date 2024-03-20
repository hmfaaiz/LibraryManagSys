const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    publication_date: {  type: Date, required: true},
   
  },

  { timestamps: true }
);

module.exports = mongoose.model("member", memberSchema);