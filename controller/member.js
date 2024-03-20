const validator = require("validator");
const { GenerateToken, Authentication } = require("../security/authentication");

const Member = require("../model/member");

const MemberSignup = async (req, res) => {
  try {
    if (
      req.body.password &&
      req.body.email &&
      validator.isEmail(req.body.email) &&
      req.body.name
    ) {
      const user = new Member({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      const findUser = await Member.findOne({
        email: req.body.email,
      });

      if (findUser) {
        return res
          .status(409)
          .json({ status: 409, message: "Email already in used" });
      }

      saveUser = await user.save();
      return res
        .status(200)
        .json({ status: 200, message: "New Member is Added" });
    } else {
      return res.status(404).json({ status: 404, message: "Invalid data" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, message: "Internal error", error: error });
  }
};

const MemberSignin = async (req, res) => {
  try {
    if (
      req.body.email &&
      validator.isEmail(req.body.email) &&
      req.body.password
    ) {
      const userEmail = req.body.email;
      const userPassword = req.body.password;
      const finduser = await Member.findOne({ email: userEmail });
      if (finduser) {
        if (finduser.password == userPassword) {
          const { email, name, isAdmin, ...other } = finduser;
          const forToken = {
            email,
            name,
            isAdmin,
            _id: finduser._id,
          };
          await GenerateToken(forToken, res);
        } else {
          return res
            .status(404)
            .json({ status: 404, message: "password is wrong" });
        }
      } else {
        return res
          .status(404)
          .json({ status: 404, message: "user does not exist" });
      }
    } else {
      return res
        .status(400)
        .json({ status: 400, message: "please enter your credentials" });
    }
  } catch {
    return res.status(500).json({ status: 500, message: "Internal error" });
  }
};

const MemberProfile = async (req, res) => {
  Authentication(req, res, async (user) => {
    try {
      const finduser = await Member.findOne({ _id: user._id });
      if (finduser) {
        return res
          .status(200)
          .json({ status: 200, message: "Myprofile", data: finduser });
      } else {
        return res
          .status(404)
          .json({ status: 404, message: "user does not exist" });
      }
    } catch {
      return res.status(500).json({ status: 500, message: "Internal error" });
    }
  });
};

const UpdateMemberProfile = async (req, res) => {
  Authentication(req, res, async (user) => {
    try {
      const finduser = await Member.findOne({ _id: user._id });

      if (finduser) {
        if (req.body.email && validator.isEmail(req.body.email)) {
          finduser.email = req.body.email;
        }

        if (req.body.name) {
          finduser.name = req.body.name;
        }

        if (req.body.password) {
          finduser.password = req.body.password;
        }

        await finduser.save();
        return res
          .status(200)
          .json({ status: 200, message: "Profile updated successfully" });
      } else {
        return res
          .status(404)
          .json({ status: 404, message: "User does not exist" });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ status: 500, message: "Internal error", error });
    }
  });
};

const DeleteMember = (req, res) => {
  Authentication(req, res, async (user) => {
    try {
      if (!user.isAdmin) {
        await Member.findOneAndDelete({ _id: user._id });
        return res
          .status(200)
          .json({ status: 200, message: "You deleted your account" });
      }
      if (user.isAdmin && req.query.memberId) {
   
          const findMember = await Member.findOne({ _id: req.query.memberId });
          if (findMember.isAdmin) {
            return res
              .status(200)
              .json({
                status: 200,
                message: "You can't delete admin account",
              });
          }
          const findMemberAcc = await Member.findOneAndDelete({
            _id: req.query.memberId,
          });

          if (!findMemberAcc) {
            return res
              .status(404)
              .json({ status: 404, message: "member not found." });
          }
          
          return res
            .status(200)
            .json({ status: 200, message: "member deleted successfully." });
       
      } else {
        return res
          .status(404)
          .json({ status: 404, message: "Invalid request" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
};

const AllMemberProfile = async (req, res) => {
  Authentication(req, res, async (user) => {
    try {
      
      if (user.isAdmin) {
        const findusers = await Member.find();
        return res
          .status(200)
          .json({ status: 200, message: "All member's profile", data: findusers,total:findusers.length });
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


module.exports = {
  MemberSignup,
  MemberSignin,
  MemberProfile,
  UpdateMemberProfile,
  DeleteMember,AllMemberProfile
};
