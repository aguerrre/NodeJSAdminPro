const express = require("express");
require("dotenv").config();
const { dbConn } = require("./database/config.js");
const cors = require("cors");

//crear servidor express
const app = express();

// Config CORS
app.use(cors());

// Conexión BD
dbConn();
//BBDD
// mean_user
// CvoXLTkSZN895Y0o

//Rutas
app.get("/", (request, response) => {
  response.json({
    ok: true,
    msg: "Hola mundo",
  });
});

app.listen(process.env.PORT, () => {
  console.log("servidor en puerto " + process.env.PORT);
});
