const { response } = require("express");
const { validationResult } = require("express-validator");

// función para validar los campos usando el validationResult
const validateFields = (req, res = response, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        ok: false,
        errors: errors.mapped(),
      });
    }

    next();

};

module.exports = {
    validateFields,
}
