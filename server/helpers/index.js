if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const hashPassword = (plainPassword) => {
  return bcrypt.hashSync(plainPassword, salt);
};

const checkPassword = (plainPassword, hashedPassword) => {
  return bcrypt.compareSync(plainPassword, hashedPassword);
};

const generatedToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY);
};

const tokenVerify = (myToken) => {
  return jwt.verify(myToken, SECRET_KEY);
};

module.exports = {
  hashPassword,
  checkPassword,
  generatedToken,
  tokenVerify,
};
