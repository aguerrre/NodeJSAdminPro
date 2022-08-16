const express = require("express");
require("dotenv").config();
const { dbConn } = require("./database/config.js");
const cors = require("cors");

//crear servidor express
const app = express();

// Config CORS
app.use(cors());

// public folder
app.use(express.static('public'))

// Lectura y parseo body (bodyparams)
app.use(express.json());

// Conexión BD
dbConn();
// mean_user
// CvoXLTkSZN895Y0o

//Rutas
app.use('/api/users', require('./routes/users.routes'));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/hospitals', require('./routes/hospitals.routes'));
app.use('/api/doctors', require('./routes/doctors.routes'));
app.use('/api/all', require('./routes/search.routes'));
app.use('/api/uploads', require('./routes/uploads.routes'));

app.listen(process.env.PORT, () => {
  console.log("servidor en puerto " + process.env.PORT);
});
