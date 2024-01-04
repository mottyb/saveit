const jwt = require("jsonwebtoken");
const { errMessage, sendError } = require("./errController");
const secret = process.env.SECRET;

const createToken = (data = { familyId, userId }) => {
  const token = jwt.sign(data, secret);
  if (!token) throw errMessage.CAN_NOT_CREATE_TOKEN;
  return token;
};

const validToken = async (token) => {
  if (!token) throw errMessage.UNAUTHORIZED;
  var result = jwt.verify(token.replace("Bearer ", ""), secret);
  if (!result.familyId) throw errMessage.UNAUTHORIZED;
  return result;
};

module.exports = { createToken, validToken };
