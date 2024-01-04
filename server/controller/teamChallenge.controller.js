const { errMessage } = require("../errController");
const teamChallengeData = require("./teamChallenge.model");
require("./family.model");
async function create(data) {
  return await teamChallengeData.create(data);
}

async function read(filter={}) {
  if (filter) {
    const res=  await teamChallengeData.find(filter).populate("team_family");
  }
  const res=  await teamChallengeData.find({});
  return res
}

async function readOne(filter, proj) {
  const res = await teamChallengeData.findOne(filter, proj).populate("team_family");
  return res;
}

async function update(filter, newData) {
  return await teamChallengeData.updateOne(filter, newData);
}

async function updateMany(filter, newData) {
  return await teamChallengeData.updateMany(filter, newData);
}

async function updateAndReturn(filter, newData) {
  let data = await teamChallengeData
    .findOneAndUpdate(filter, newData, { new: true })
    .populate("team_family");
  return data;
}
async function del(id) {
  return await update(id, { status: "deleted" });
}

module.exports = {
  create,
  read,
  readOne,
  update,
  updateAndReturn,
  del,
  updateMany
};
