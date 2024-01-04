const { checkData, errMessage } = require("../errController");
const dayController = require("../controller/day.controller.js")

const createDay = async (data) => {
    checkData(data, ["dayNumber", "title","description","videoIdHow","videoIdWhy"]);
    await getDayForRegister({dayNumber:data.dayNumber});
    return await dayController.create(data);
  };
const getDay = async (filter,proj) => {
    const day = await dayController.readOne(filter,proj);
    if (!day) throw errMessage.USER_NOT_FOUND;
    return day;
  };
const getAllDays = async () => {
    const days = await dayController.read();
    if (!days) throw errMessage.USER_NOT_FOUND;
    return days;
  };
const getDayForRegister = async (filter,proj) => {
    const day = await dayController.readOne(filter,proj);
    if (day) throw errMessage.USER_IS_EXIST;
  };
  
const updateDay = async (filter,data) => {
    const day = await dayController.updateAndReturn(filter,data)
    if(!day) throw errMessage.USER_NOT_FOUND
    return day
}

module.exports = {updateDay,getAllDays,getDay,createDay}