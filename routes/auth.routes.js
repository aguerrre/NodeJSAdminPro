const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/auth.controller");
const { validateFields } = require("../middlewares/validation-forms");

/* Path: /api/auth */
const router = Router();

router.post(
    "/login",
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La contraseña es obligatoria').notEmpty(),
        validateFields,
    ],
    login
);

module.exports = router;
