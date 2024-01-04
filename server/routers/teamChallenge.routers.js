const express = require("express");
const teamChallengeRouter = express.Router();
const familyService = require("../services/family.services.js");
const userService = require("../services/user.services.js");
const { sendErrorAxios, errMessage } = require("../errController");
const teamChallengesService = require("../services/teamChallenge.services.js");
const { validToken, createToken } = require("../jwt.js");

teamChallengeRouter.post("/", async (req, res) => {
  try {
    const mainChallenge = await teamChallengesService.getTeamChallenge({
      isMain: true,
    });
    if (mainChallenge)
      await teamChallengesService.updateTeamChallenge(
        { _id: mainChallenge._id },
        { isMain: false }
      );
    const result = await teamChallengesService.createTeamChallenge({date:req.body.date})
    res.send(result)
  } catch (err) {
    sendErrorAxios(res, err);
  }
});
teamChallengeRouter.get("/All", async (req, res) => {
  try {
    const challenges = await teamChallengesService.getAllTeamChallenge({
      isActive: true,
    });
    res.send(challenges)
  } catch (err) {
    sendErrorAxios(res, err);
  }
});
teamChallengeRouter.get("/one/:_id", async (req, res) => {
  try {
    const challenges = await teamChallengesService.getTeamChallenge({
      _id:req.params._id
    });
    res.send(challenges)
  } catch (err) {
    sendErrorAxios(res, err);
  }
});

module.exports = teamChallengeRouter;
