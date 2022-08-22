const { response } = require("express");
const bcrypt = require("bcryptjs");
const ObjectId = require("mongoose").Types.ObjectId;

const User = require("../models/user.model");
const { generateJWT } = require("../helpers/jwt");

const getUsers = async (req, res) => {
  const page = Number(req.query.page) >= 1 ? Number(req.query.page) : 0;
  const perPage = 10;

  const [users, total] = await Promise.all([
    page === 0
      ? User.find({}, "first_name email role google_auth img")
      : User.find({}, "first_name email role google_auth img")
          .limit(perPage)
          .skip(perPage * (page - 1)),
    User.countDocuments(),
  ]);

  const totalPages =
    total % perPage !== 0
      ? Math.floor(total / perPage) + 1
      : Math.floor(total / perPage);

  res.json({
    ok: true,
    users: users,
    total: total,
    totalPages,
  });
};

const createUser = async (req, res = response) => {
  const { password, email } = req.body;

  try {
    // Comprobar unicidad email
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({
        ok: false,
        msg: "El correo ya está asignado.",
      });
    }

    const user = new User(req.body);

    // Encriptar contraseña generando un salt para que encripte en una sola vía y sea imposible de desencriptar.
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    const createdUser = await user.save();
    const token = await generateJWT(createdUser.id);

    res.json({
      ok: true,
      user: createdUser,
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado.",
    });
  }
};

const updateUser = async (req, res = response) => {
  try {
    const uid = req.params.id;
    if (!ObjectId.isValid(uid)) {
      return res.status(400).json({
        ok: false,
        msg: "El id de usuario no es válido.",
      });
    }
    const existsUser = await User.findById(uid);

    if (!existsUser) {
      return res.status(404).json({
        ok: false,
        msg: "No existe usuario con ese id.",
      });
    }

    const { password, google, email, ...fields } = req.body;

    if (existsUser.email !== email) {
      const existsEmail = await User.findOne({ email });
      if (existsEmail) {
        return res.status(400).json({
          ok: false,
          msg: "Ya existe un usuario con ese email.",
        });
      }
    }

    if (!existsUser.google_auth) {
      fields.email = email;
    } else if (!existsUser.email !== email) {
      return res.status(400).json({
        ok: false,
        msg: "No puedes cambiar el email de tu cuenta de Google.",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(uid, fields, {
      new: true,
    });

    res.json({
      ok: true,
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado.",
    });
  }
};

const deleteUser = async (req, res = response) => {
  try {
    const uid = req.params.id;
    if (!ObjectId.isValid(uid)) {
      return res.status(400).json({
        ok: false,
        msg: "El id de usuario no es válido.",
      });
    }
    const user = await User.findById(uid);
    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: "El usuario no existe en la Base de Datos.",
      });
    }

    await User.findByIdAndDelete(uid);
    res.json({
      ok: true,
      msg: "Usuario eliminado con éxito.",
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
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
