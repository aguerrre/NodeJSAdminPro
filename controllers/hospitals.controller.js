const { response } = require("express");

const Hospital = require("../models/hospital.model");

const getHospitals = async (req, res = response) => {
  const hospitals = await Hospital.find().populate('user', 'first_name img');
  res.json({
    ok: true,
    hospitals,
  });
};

const createHospitals = async (req, res = response) => {
  try {
    const uid = req.uid;
    const hospital = new Hospital({ user: uid, ...req.body });

    const createdHospital = await hospital.save();

    res.json({
      ok: true,
      hospital: createdHospital,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado.",
    });
  }
};

const updateHospitals = (req, res = response) => {
  res.json({
    ok: true,
    msg: "update Hospitales",
  });
};

const deleteHospitals = (req, res = response) => {
  res.json({
    ok: true,
    msg: "delete Hospitales",
  });
};

module.exports = {
  getHospitals,
  createHospitals,
  updateHospitals,
  deleteHospitals,
};
