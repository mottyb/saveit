const { errMessage } = require("../errController");
const familyData = require("./family.model");
require("./user.model");
async function create(data) {
  return await familyData.create(data);
}

async function read(filter) {
  if (filter) {
    const res = await familyData.find(filter);
  }
  const res = await familyData.find({});
  return res;
}

async function readOne(filter, proj) {
  const res = await familyData
    .findOne({ isActive: true, ...filter }, proj)
    .populate("my_family");
  if (res) {
    res.my_family = res.my_family.filter((user) => user.isActive);
  }
  return res;
}

async function update(filter, newData) {
  return await familyData.updateOne(filter, newData);
}

async function updateAndReturn(filter, newData) {
  let data = await familyData
    .findOneAndUpdate(filter, newData, { new: true })
    .populate("my_family");
  if (data) {
    data.my_family = data.my_family.filter((user) => user.isActive);
  }
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
