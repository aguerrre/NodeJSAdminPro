const { Router } = require("express");

const {
  getAll,
  getAllByCollection,
} = require("../controllers/search.controller");
const { validateJWT } = require("../middlewares/validation-jwt");

/* Path: api/todo/:param */

const router = Router();

router.get("/:param",[validateJWT], getAll);
router.get("/:collection/:param",[validateJWT], getAllByCollection);

module.exports = router;
