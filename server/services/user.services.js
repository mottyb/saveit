const { checkData, errMessage } = require("../errController");
const userController = require("../controller/user.controller.js")


const getUser = async (filter,proj) => {
  const user = await userController.readOne(filter,proj);
  if (!user || !(user.isActive)) throw errMessage.USER_NOT_FOUND;
  return user;
};

const createUser = async (data) => {
  checkData(data, ["firstName", "lastName",'my_family']);
  return await userController.create(data);
};

const updateUser = async (filter,data) => {
    const user = await userController.updateAndReturn(filter,data)
    if(!user) throw errMessage.USER_NOT_FOUND
    return user
}
  
module.exports = {getUser,createUser,updateUser}
