const { errMessage } = require("../errController");
const dayData = require("./day.model");

async function create(data) {
  return await dayData.create(data);
}

async function read(filter={}) {
  if (filter) {
    return await dayData.find(filter);
  }
  return await dayData.find({});
}

async function readOne(filter, proj) {
  const res = await dayData.findOne(filter, proj);
  return res;
}

async function update(filter, newData) {
  return await dayData.updateOne(filter, newData);
}

async function updateAndReturn(filter, newData) {
  let data = await dayData.findOneAndUpdate(filter, newData, { new: true });
  if (!data) throw errMessage.USER_NOT_FOUND;
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
