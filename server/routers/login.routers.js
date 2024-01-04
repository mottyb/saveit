const express = require("express");
const loginRouter = express.Router();
const familyService = require("../services/family.services.js");
const userService = require("../services/user.services.js");
const { sendErrorAxios, errMessage } = require("../errController");
const { validToken, createToken } = require("../jwt.js");
loginRouter.post("/login", async (req, res) => {
  try {
    const family = await familyService.login(req.body);
    res.send(family);
  } catch (err) {
    sendErrorAxios(res, err);
  }
});
loginRouter.post("/token", async (req, res) => {
  try {
    const token =createToken({
      familyId: req.body.familyId,
      userId: req.body.userId,
    });
    res.send(token);
  } catch (err) {
    sendErrorAxios(res, err);
  }
});
loginRouter.get("/login", async (req, res) => {
  try {
    const userData = await validToken(req.headers.authorization);
    const user = await userService.getUser({ _id: userData.userId });
    const family = await familyService.getFamily({ _id: userData.familyId });
    if (!user || !family) throw errMessage.USER_NOT_FOUND;
    res.send({ user, family });
  } catch (err) {
    sendErrorAxios(res, err);
  }
});
loginRouter.post("/register", async (req, res) => {
  try {
    const family = await familyService.createFamily(req.body);
    res.send(family);
  } catch (err) {
    sendErrorAxios(res, err);
  }
});
loginRouter.post("/deleteuser", async (req, res) => {
  try {
    const user = await userService.updateUser({ _id: req.body._id},{ isActive: false });
    const family = await familyService.getFamily({_id:user.my_family})
    res.send(family);
  } catch (err) {
    sendErrorAxios(res, err);
  }
});
loginRouter.post("/addusers", async (req, res) => {
  try {
    const temp = await familyService.getFamily({ _id: req.body.familyId });
    if (!temp) throw errMessage.USER_NOT_FOUND;
    const users = [];
    for (let user of req.body.my_family) {
      const result = await userService.createUser({
        firstName: user.firstName,
        lastName: user.lastName,
        my_family: temp._id,
      });
      users.push(result);
    }
    const my_family = [
      ...temp.my_family.map((user) => user._id),
      ...users.map((user) => user._id),
    ];
    const family = await familyService.updateFamily(
      { _id: temp._id },
      {
        my_family,
      }
    );
    res.send(family);
  } catch (err) {
    sendErrorAxios(res, err);
  }
});

module.exports = loginRouter;
