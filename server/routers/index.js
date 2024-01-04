const { sendErrorSocket, errMessage } = require("../errController");
const express = require("express");
const mainRouter = express.Router();
const loginRouter = require("./login.routers");
const teamChallengeRouter = require("./teamChallenge.routers");
const { validToken } = require("../jwt");
const userService = require("../services/user.services");
const familyService = require("../services/family.services");
const dayService = require("../services/day.services");
const teamChallengesService = require("../services/teamChallenge.services.js");
const fs = require("fs");

mainRouter.use("/", loginRouter);
mainRouter.use("/team_challenge", teamChallengeRouter);

const routers = (io, socket) => {

  socket.on("addSave", async (data) => {
    try {
      const userData = await validToken(socket.handshake.headers.authorization);
      if (!userData) throw "jwt";
      const updateUser = await userService.updateUser(
        { _id: data.userId },
        { $inc: { total_save: Number(data.save) } }
      );
      const updateFamily = await familyService.updateFamily(
        { _id: userData.familyId },
        { $inc: { total_save: Number(data.save) } }
      );
      if (!updateUser || !updateFamily) throw errMessage.USER_NOT_FOUND;
      socket.emit("my_total", updateUser);
      io.to(userData.familyId).emit("family_total", updateFamily);
    } catch (err) {
      sendErrorSocket(socket, err);
    }
  });
  socket.on("getDaysData", async (data) => {
    try {
      const userData = await validToken(socket.handshake.headers.authorization);
      if (!userData) throw "jwt";
      const videoData = await dayService.getAllDays();
      socket.emit("updateDayData", videoData);
    } catch (err) {
      sendErrorSocket(socket, err);
    }
  });
  socket.on("updateDayData", async (data) => {
    try {
      const userData = await validToken(socket.handshake.headers.authorization);
      if (!userData) throw "jwt";
      fs.writeFileSync("./upload/"+data.file.name, data.file.originFileObj)
      data.file = `upload/${data.file.name}`
      const res = await dayService.updateDay(
        { dayNumber: data.dayNumber },
        data
      );
    } catch (err) {
      sendErrorSocket(socket, err);
    }
  });
  socket.on("getDayData", async (data) => {
    try {
      const userData = await validToken(socket.handshake.headers.authorization);
      if (!userData) throw "jwt";
      const family = await familyService.getFamily({ _id: userData.familyId });
      const teamChallenge = await teamChallengesService.getTeamChallenge({
        _id: family.teamChallenge,
      });
      const videoData = await dayService.getDay({
        dayNumber: teamChallenge.dayNumber,
      });
      socket.emit("dayData", videoData);
    } catch (err) {
      sendErrorSocket(socket, err);
    }
  });
  socket.on("getDay", async (data) => {
    try {
      const userData = await validToken(socket.handshake.headers.authorization);
      if (!userData) throw "jwt";
      const videoData = await dayService.getDay({
        dayNumber: data.dayNumber,
      });
      socket.emit("dayData", videoData);
    } catch (err) {
      sendErrorSocket(socket, err);
    }
  });
};
module.exports = { routers, mainRouter };
