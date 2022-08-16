const { Router } = require("express");
const fileUpload = require("express-fileupload");

const { uploadFile, getImage } = require("../controllers/uploads.controller");
const { validateJWT } = require("../middlewares/validation-jwt");

/* Path: api/uploads/ */

const router = Router();

router.use(fileUpload());

router.put("/:collection/:id", [validateJWT], uploadFile);
router.get("/:collection/:image", getImage);

module.exports = router;
