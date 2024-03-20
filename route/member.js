const express = require("express");
const route = express.Router();

const {
    MemberSignup,
    MemberSignin,
    MemberProfile,
    UpdateMemberProfile,DeleteMember,AllMemberProfile }= require("../controller/member");

  
route.get("/", (req, res) => {
  res.send("member route")
  });
  
  route.post("/MemberSignup", (req, res) => {
    console.log("MemberSignup");
    MemberSignup(req, res);
  });
  route.post("/MemberSignin", (req, res) => {
    console.log("MemberSignin");
    MemberSignin(req, res);
  });
  route.get("/MemberProfile", (req, res) => {
    console.log("MemberProfile");
    MemberProfile(req, res);
  });
  
  route.put("/UpdateMemberProfile", (req, res) => {
    console.log("UpdateMemberProfile");
    UpdateMemberProfile(req, res);
  });
  
  
  route.delete("/DeleteMember", (req, res) => {
    console.log("DeleteMember");
    DeleteMember(req, res);
  });
  
  //admin use
  route.get("/AllMemberProfile", (req, res) => {
    console.log("AllMemberProfile");
    AllMemberProfile(req, res);
  });
  
 
  
  module.exports = route;