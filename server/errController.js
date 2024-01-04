const err = (c, m) => {
  return { code: c, message: m };
};

const errMessage = Object.freeze({
  DOCUMENTS_NOT_FOUND: err(999, "documents not found"),
  CAN_NOT_CREATE_TOKEN: err(999, "can't create token"),
  UNAUTHORIZED: err(403, "user not authorized"),
  USER_NOT_FOUND: err(401, "user not found"),
  USER_IS_EXIST: err(999, "user already exists"),
  PASSWORDS_ARE_NOT_CORRECT: err(999, "passwords are not correct"),
  MISSING_DATA: err(999, "missing data"),
});

const sendErrorAxios = (res, err = {}) => {
  console.log(err);
  res.status(err.code || 999).send(err);
};
const sendErrorSocket = (socket, err = {}) => {
  console.log(err);
  socket.emit("error", err);
};
const checkData = (data, parameters) => {
  parameters.forEach((parameter) => {
    if (!data[parameter]) {
      console.log(parameter);
      throw errMessage.MISSING_DATA;
    }
  });
};

module.exports = {
  errMessage,
  sendErrorAxios,
  checkData,
  sendErrorSocket,
};
