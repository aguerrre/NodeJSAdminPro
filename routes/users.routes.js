const { Router } = require("express");
const { check } = require("express-validator");

const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users.controller");
const { validateFields } = require("../middlewares/validation-forms");
const {
  validateJWT,
  validateAdminRole,
  validateAdminRoleOrSameUser,
} = require("../middlewares/validation-jwt");

const router = Router();

/*
 * Ruta /api/users
 */
router.get("/", [validateJWT, validateAdminRole], getUsers);
router.post(
  "/", // ruta
  [
    check("first_name", "El nombre es obligatorio").not().isEmpty(),
    check("password", "La contraseña es obligatoria").notEmpty(), // validacion campos
    check("email", "El email es incorrecto").isEmail(),
    validateFields, //middleware
  ],
  createUser //Funcion del controlador.
);
router.put(
  "/:id",
  [
    validateJWT,
    validateAdminRoleOrSameUser,
    check("first_name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es incorrecto").isEmail(),
    check("role", "El rol es obligatorio").notEmpty(),
    validateFields, //middleware
  ],
  updateUser
);
router.delete("/:id", [validateJWT, validateAdminRole], deleteUser);

module.exports = router;
