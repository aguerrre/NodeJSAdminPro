const { response } = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/user.model");
const { generateJWT } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");
const { getMenuFront } = require("../helpers/menu-front");

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
      menu: getMenuFront(user.role),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado.",
    });
  }
};

const googleSignIn = async (req, res = response) => {
  try {
    const { email, name, picture } = await googleVerify(req.body.token);
    const userDb = await User.findOne({ email });
    let user;
    // Comprobar si el usuario existe. Si existe se guarda como usuario autenticado con google, si no, se crea de 0.
    if (!userDb) {
      user = new User({
        first_name: name,
        email,
        password: "@@@",
        img: picture,
        google_auth: true,
      });
    } else {
      user = userDb;
      user.google = true;
    }
    // Guardar el usuario.
    await user.save();
    // GENERAR TOKEN
    const token = await generateJWT(user.id);
    res.json({
      ok: true,
      email,
      name,
      picture,
      token,
      menu: getMenuFront(user.role),
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      msg: "El token de Google no es correcto.",
    });
  }
};

const renewToken = async (req, res = response) => {
  try {
    const uid = req.uid;
    // GENERAR TOKEN
    const token = await generateJWT(uid);
    const user = await User.findById(uid);

    res.json({
      ok: true,
      token,
      user,
      menu: getMenuFront(user.role),
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

module.exports = {
  login,
  googleSignIn,
  renewToken,
};
