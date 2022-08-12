const { response } = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/user.model");
const { generateJWT } = require("../helpers/jwt");

const login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    // Verificación email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: "Las credenciales son incorrectas.",
      });
    }

    //Verificación contraseña
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(404).json({
        ok: false,
        msg: "Las credenciales son incorrectas.",
      });
    }

    // GENERAR TOKEN
      const token = await generateJWT(user.id);
      
    res.json({
      ok: true,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado.",
    });
  }
};

module.exports = {
  login,
};
