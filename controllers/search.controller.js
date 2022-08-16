const { response } = require("express");

const User = require("../models/user.model");
const Doctor = require("../models/doctor.model");
const Hospital = require("../models/hospital.model");

const getAll = async (req, res = response) => {
  try {
    const param = req.params.param;
    const regex = new RegExp(param, "i");
    const [users, doctors, hospitals] = await Promise.all([
      User.find({ first_name: regex }),
      Doctor.find({ name: regex }),
      Hospital.find({ name: regex }),
    ]);

    res.json({
      ok: true,
      users,
      doctors,
      hospitals,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado.",
    });
  }
};

const getAllByCollection = async (req, res = response) => {
  try {
    const param = req.params.param;
    const collection = req.params.collection;
    const regex = new RegExp(param, "i");
    let data = [];

    switch (collection) {
      case "users":
        data = await User.find({ first_name: regex });
        break;
      case "doctors":
        data = await Doctor.find({ name: regex })
          .populate("user", "first_name img")
          .populate("hospital", "name img");
        break;
      case "hospitals":
        data = await Hospital.find({ name: regex }).populate(
          "user",
          "first_name img"
        );
        break;
      default:
        return res.status(400).json({
          ok: false,
          msg: 'Sólo se admiten búsquedas en "users", "doctors" y "hospitals".',
        });
    }

    res.json({
      ok: true,
      results: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado.",
    });
  }
};

module.exports = {
  getAll,
  getAllByCollection,
};
