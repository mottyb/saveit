const { errMessage } = require("../errController");
const userData = require("./user.model");
require("./family.model");
async function create(data) {
  return await userData.create(data);
}

async function read(filter) {
  if (filter) {
    return await userData.find(filter).populate("my_family");
  }
  return await userData.find({});
}

async function readOne(filter,proj) {
  const res = await userData.findOne(filter,proj).populate("my_family");
  return res;
}

async function update(filter, newData) {
  return await userData.updateOne(filter, newData).populate("my_family");
}

async function updateAndReturn(filter, newData) {
  let data = await userData
    .findOneAndUpdate(filter, newData, { new: true })
    .populate("my_family");
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
};