const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true},
    password: { type: String, required: true},
    email: { type: String, required: true },
    publication_date: {  type: Date, required: true,default:Date.now()},
   
  },

  { timestamps: true }
);

module.exports = mongoose.model("member", memberSchema);