const { Router } = require("express");
const { check } = require("express-validator");

const {
  getDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} = require("../controllers/doctors.controller");
const { validateFields } = require("../middlewares/validation-forms");
const { validateJWT } = require("../middlewares/validation-jwt");

/* Path - /api/doctors */

const router = Router();

router.get("/", [validateJWT], getDoctors);

router.get(
  "/:id",
  [
    validateJWT,
    check("id", "El id del doctor debe ser válido.").isMongoId(),
    validateFields,
  ],
  getDoctorById
);

router.post(
  "/",
  [
    validateJWT,
    check("name", "El nombre es requerido.").notEmpty(),
    check("hospital", "Debe ser asignado a un hospital.").notEmpty(),
    check("hospital", "El id del hospital debe ser válido.").isMongoId(),
    validateFields,
  ],
  createDoctor
);

router.put(
  "/:id",
  [
    validateJWT,
    check("name", "El nombre es requerido.").notEmpty(),
    check("hospital", "Debe ser asignado a un hospital.").notEmpty(),
    check("hospital", "El id del hospital debe ser válido.").isMongoId(),
    check("id", "El id del doctor debe ser válido.").isMongoId(),
    validateFields,
  ],
  updateDoctor
);

router.delete(
  "/:id",
  [
    validateJWT,
    check("id", "El id del doctor debe ser válido.").isMongoId(),
    validateFields,
  ],
  deleteDoctor
);

module.exports = router;
