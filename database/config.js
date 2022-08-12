const mongoose = require("mongoose");
require('dotenv').config();

const dbConn = async () => {
  try {
    mongoose.connect(process.env.DB_CNN);
    console.log("DB ONLINE");
  } catch (error) {
    console.log(error);
    throw new Error("Error a la hora de iniciar la base de datos. Ver logs.");
  }
};

module.exports = {
  dbConn,
};
