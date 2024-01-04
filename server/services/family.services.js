const { checkData, errMessage } = require("../errController");
const familyController = require("../controller/family.controller.js");
const teamChallengeController = require("../controller/teamChallenge.controller.js");
const { createToken } = require("../jwt.js");
const bcrypt = require("bcrypt");

//create family
const createFamily = async (data) => {
  checkData(data, ["email", "password", "familyName","teamChallenge"]);
  await getFamilyForRegister({ email: data.email });
  data.password = bcrypt.hashSync(data.password, 10);
  const res =  await familyController.create(data);
  await teamChallengeController.updateAndReturn({_id:data.teamChallenge},{$push:{team_family:res._id}})
  return res
};
//get family
const getFamily = async (filter, proj) => {
  const family = await familyController.readOne(filter, proj)
  if (!family) throw errMessage.USER_NOT_FOUND;
  return family;
};
const getFamilyForRegister = async (filter, proj) => {
  const family = await familyController.readOne(filter, proj);
  if (family && family.isActive) throw errMessage.USER_IS_EXIST;
};

//update family
const updateFamily = async (filter, data) => {
  const family = await familyController.updateAndReturn(filter, data);
  if (!family) throw errMessage.USER_NOT_FOUND;
  return family;
};

const login = async (data) => {
  checkData(data, ["email", "password"]);
  const family = await getFamily({ email: data.email }, "+password");
  const isEqual = bcrypt.compareSync(data.password, family.password);
  if (!isEqual) throw errMessage.PASSWORDS_ARE_NOT_CORRECT;
  return family;
};
module.exports = { login, getFamily, createFamily, updateFamily };
