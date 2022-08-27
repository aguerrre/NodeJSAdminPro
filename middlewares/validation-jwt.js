const jwt = require("jsonwebtoken");
const User = require("../models/user.model")

const validateJWT = (req, res, next) => {
  //Leer el token
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "Autenticación requerida.",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);
    req.uid = uid;
    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Token no válido.",
    });
  }
};

const validateAdminRole = async (req, res, next) => {
  try {
    const uid = req.uid;

    const user = await User.findById(uid);
    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: "Usuario no encontrado.",
      });
    }

    if (user.role !== 'ADMIN_ROLE') {
      return res.status(403).json({
        ok: false,
        msg: "No tiene privilegios para esa acción.",
      });
    }

    next();

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado.'
    });
  }
}

const validateAdminRoleOrSameUser = async (req, res, next) => {
  try {
    const uid = req.uid;
    const reqId = req.params.id

    const user = await User.findById(uid);
    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: "Usuario no encontrado.",
      });
    }

    if (user.role === "ADMIN_ROLE" || user._id._id == reqId) {
      next();
    } else {
      return res.status(403).json({
        ok: false,
        msg: "No tiene privilegios para esa acción.",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado.",
    });
  }
};

module.exports = {
  validateJWT,
  validateAdminRole,
  validateAdminRoleOrSameUser,
};
