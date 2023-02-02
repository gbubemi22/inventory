//const db = require("../models");
const bcrypt = require("bcryptjs");
const user_table = require("../models/User");
const { StatusCodes } = require("http-status-codes");

const jwt = require("jsonwebtoken");

//const User = db.user;

const createUser = async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  if(username.length ===0) {
    throw new Error("Username is already exited");
  }

  if(email.length === 0) {
    throw new Error("Email is already exited");
  }
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = new user_table({
    username,
    email,
    password: hashedPassword,
  })
  await user.save();
  res.status(StatusCodes.CREATED).json(user);
};



const login = async (req, res) => {
 const username = req.body.username;
 const password = req.body.password;

 if(!username || !password) {
  throw new Error("Username or password is empty");
 }


 const user = await user_table.findOne({ username });

 if(!user) {
  throw new Error("Username or password is incorrect");
 }

 const isMatch = await bcrypt.compare(password, user.password);
 if(!isMatch) {
  throw new Error("Username or password is incorrect");
 }
 const accessToken = jwt.sign(
  { id: user._id },
  process.env.ACCESS_TOKEN_SECRET,
 )
//  const refreshToken = jwt.sign(
//   { id: user._id },
//   process.env.REFRESH_TOKEN_SECRET,
//  )
 res.cookie("accessToken", accessToken, {
  secure: true,
  sameSite: "none",
  httpOnly: true,
  maxAge: 1000 * 60 * 60 * 24
  })
  .status(StatusCodes.OK).json({
    message:`loged in`,
    user, 
    accessToken
  });

};

const logout = async (req, res) => {
  res
    .clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json("User has been logged out.");
};

module.exports = {
  createUser,
  login,

  logout,
};
