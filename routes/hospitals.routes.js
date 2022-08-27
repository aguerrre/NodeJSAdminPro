const { Router } = require("express");
const { check } = require("express-validator");

const {getHospitals,
    createHospitals,
    updateHospitals,
    deleteHospitals,} = require('../controllers/hospitals.controller')
const { validateFields } = require("../middlewares/validation-forms");
const { validateJWT } = require("../middlewares/validation-jwt");

/* Path: /api/hospitals */

const router = Router();

/*
 * Ruta /api/users
 */
router.get("/", [validateJWT], getHospitals);
router.post(
  "/",
  [
    validateJWT,
    check('name', 'El nombre del hospital es necesario').notEmpty(),
    validateFields,
  ],
  createHospitals
);
router.put(
  "/:id",
  [
    validateJWT,
    check("name", "El nombre del hospital es necesario").notEmpty(),
    validateFields,
  ],
  updateHospitals
);
router.delete("/:id",[validateJWT], deleteHospitals);

module.exports = router;