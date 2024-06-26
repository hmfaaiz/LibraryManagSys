const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const tokenExpiration = "30d";

const GenerateToken = (user, res) => {

  jwt.sign({ user }, process.env.Key,{ expiresIn: tokenExpiration }, (err, token) => {
      if (token) {
   
        return res.status(200).json({ token: token });
      } else {
        return res.status(404).json({ message: "Something is wrong in token" });
      }
    }
  );
};

const Authentication = (req, res, next) => {
  const token = req.headers.token || req.headers.authorization;

  if (token) {
    jwt.verify(token.replace("Bearer ", ""), process.env.Key, (err, user) => {
      
      if (user) {
        
        const currentTime = Math.floor(Date.now() / 1000); 
        
        if (user.exp && user.exp < currentTime) {
          return res.status(404).json({ message: "Token has expired" });
        } else {
         // console.log(user)
          next(user.user);
        }
      } else {
        return res.status(404).json({ message: "Invalid token" });
      }
    });
  } else {
   
    return res.status(404).json({status:404, message: "You are not authenticate user" });
  }
};

module.exports = { GenerateToken, Authentication };
