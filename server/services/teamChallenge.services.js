const { checkData, errMessage } = require("../errController");
const teamChallengeController = require("../controller/teamChallenge.controller.js");
const cron = require('node-cron');


const getTeamChallenge = async (filter, proj) => {
    const teamChallenge = await teamChallengeController.readOne(filter, proj);
return teamChallenge;
};
const getAllTeamChallenge = async (filter, proj) => {
    const teamChallenge = await teamChallengeController.read(filter, proj);
return teamChallenge;
};

const createTeamChallenge = async (data) => {
    const res =await teamChallengeController.create(data);
  return res
};

const updateTeamChallenge = async (filter, data) => {
  const teamChallenge = await teamChallengeController.updateAndReturn(
    filter,
    data
  );
  if (!teamChallenge) throw errMessage.USER_NOT_FOUND;
  return teamChallenge;
};
cron.schedule('0 0 0 * * *', async() => {
  const res = await getAllTeamChallenge({isActive:true})
  res.forEach(async team => {
    if(team.date.getTime()<=Date.now()&&team.dayNumber<24){
      await teamChallengeController.update({_id:team._id,isActive:true},{$inc:{dayNumber:1}});
    }
    if(team.date.getTime()<=Date.now()&&team.dayNumber>=24){
      await teamChallengeController.update({_id:team._id,isActive:true},{$isActive:false});
    }
  });
});
module.exports = { getTeamChallenge, createTeamChallenge, updateTeamChallenge,getAllTeamChallenge };
