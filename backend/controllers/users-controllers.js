const { genPassword, validPassword } = require("../lib/util");
const User = require("../models/user");
const { issueJWT } = require("../middleware/auth");
const HttpError = require("../models/HttpError");
const { createDecipher } = require("crypto");

//user sign up function
const userRegistration = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      return next(new HttpError("All fields are required", 400));
    }
    const { hash, salt } = genPassword(password);
    const user = await User.findOne({ email });
    if (user) {
      return next(
        new HttpError("User already exists in DB. Try to login.", 400)
      );
    }
    const newUser = new User({
      username,
      email,
      hash,
      salt,
    });
    await newUser.save();
    res.json({ message: "User successfully added to DB." });
  } catch (e) {
    return next(new HttpError("Something went wrong.", 500));
  }
};

//checking user existance
const userExistance = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    res.json({ existedUser: true, msg: "Email already exist in DB." });
    return;
  }
  res.json({ existedUser: false, msg: "Email not exist in  DB." });
};

//user login in database
const userLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const userDB = await User.findOne({ email });
  if (!userDB) {
    return next(
      new HttpError("User is not in database, please sign up first.", 401)
    );
  }
  const isValid = validPassword(password, userDB.hash, userDB.salt);
  if (!isValid) {
    return next(new HttpError("Wrong password. Try again.", 403));
  }
  const tokenObj = issueJWT(userDB);
  res.json({ username: userDB.username, email: userDB.email, tokenObj });
};

module.exports.userRegistration = userRegistration;
module.exports.userExistance = userExistance;
module.exports.userLogin = userLogin;
