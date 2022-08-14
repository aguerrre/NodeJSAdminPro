const { Router } = require("express");
const { check } = require("express-validator");

const {
  getDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} = require("../controllers/doctors.controller");
const { validateFields } = require("../middlewares/validation-forms");
const { validateJWT } = require("../middlewares/validation-jwt");

/* Path - /api/doctors */

const router = Router();

router.get("/", getDoctors);

router.post(
  "/",
  [
    validateJWT,
    check('name', "El nombre es requerido.").notEmpty(),
    check('hospital', "Debe ser asignado a un hospital.").notEmpty(),
    check('hospital', "El id del hospital debe ser válido.").isMongoId(),
    validateFields,
  ],
  createDoctor);

router.put("/:id", [], updateDoctor);

router.delete("/:id", deleteDoctor);

module.exports = router;
