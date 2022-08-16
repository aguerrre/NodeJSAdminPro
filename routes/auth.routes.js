const { Router } = require("express");
const { check } = require("express-validator");

const {
  login,
  googleSignIn,
  renewToken,
} = require("../controllers/auth.controller");
const { validateFields } = require("../middlewares/validation-forms");
const { validateJWT } = require("../middlewares/validation-jwt");

/* Path: /api/auth */
const router = Router();

router.post(
  "/login",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "La contraseña es obligatoria").notEmpty(),
    validateFields,
  ],
  login
);

router.post(
  "/google",
  [
    check("token", "El token de google es obligatorio").notEmpty(),
    validateFields,
  ],
  googleSignIn
);

router.get("/renew", [validateJWT], renewToken);

module.exports = router;
