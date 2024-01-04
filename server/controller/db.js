const mongoose = require("mongoose");
mongoose.set('strictQuery', true)
const MONGO_URL = process.env.MONGO_URL;

async function connect() {
  try {
    mongoose.connect(
      MONGO_URL,
      { useNewUrlParser: true, useUnifiedTopology: true },
    ).then(()=>console.log("db connection Success")).catch(error=>{
      console.log(error);
    throw error;
    })
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = { connect };