const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true},
    password: { type: String, required: true},
    email: { type: String, required: true },
    membership_date: {  type: Date, required: true,default:Date.now()},
    isAdmin :{type: Boolean,default:false}

  },

  { timestamps: true }
);

module.exports = mongoose.model("member", memberSchema);