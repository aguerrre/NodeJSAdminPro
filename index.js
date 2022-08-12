const express = require("express");
require("dotenv").config();
const { dbConn } = require("./database/config.js");
const cors = require("cors");

//crear servidor express
const app = express();

// Config CORS
app.use(cors());

// Lectura y parseo body (bodyparams)
app.use(express.json());

// Conexión BD
dbConn();
// mean_user
// CvoXLTkSZN895Y0o

//Rutas
app.use('/api/users', require('./routes/users.routes'));

app.listen(process.env.PORT, () => {
  console.log("servidor en puerto " + process.env.PORT);
});
