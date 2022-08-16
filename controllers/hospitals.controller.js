const { response } = require("express");
const ObjectId = require("mongoose").Types.ObjectId;

const Hospital = require("../models/hospital.model");

const getHospitals = async (req, res = response) => {
  const hospitals = await Hospital.find().populate("user", "first_name img");
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

const updateHospitals = async (req, res = response) => {
  try {
    const hospitalId = req.params.id;
    const uid = req.uid;
    // validar Mongo ID
    if (!ObjectId.isValid(hospitalId)) {
      return res.status(400).json({
        ok: false,
        msg: "El id de hospital no es válido.",
      });
    }
    //Validar existencia Hospital
    const hospital = await Hospital.findById(hospitalId);
    if (!hospital) {
      return res.status(404).json({
        ok: false,
        msg: "El hospital no se encuentra en la Base de Datos.",
      });
    }
    const changes = {
      ...req.body,
      user: uid,
    }
    const newHospital = await Hospital.findByIdAndUpdate(hospitalId, changes, {new: true});
    res.json({
      ok: true,
      hospital: newHospital,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado.",
    });
  }
};

const deleteHospitals = async (req, res = response) => {
  try {
    const hospitalId = req.params.id;
    // validar Mongo ID
    if (!ObjectId.isValid(hospitalId)) {
      return res.status(400).json({
        ok: false,
        msg: "El id de hospital no es válido.",
      });
    }
    //Validar existencia Hospital
    const hospital = await Hospital.findById(hospitalId);
    if (!hospital) {
      return res.status(404).json({
        ok: false,
        msg: "El hospital no se encuentra en la Base de Datos.",
      });
    }
    const deletedHospital = await Hospital.findByIdAndDelete(hospitalId);
    res.json({
      ok: true,
      hospital: deletedHospital,
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
  getHospitals,
  createHospitals,
  updateHospitals,
  deleteHospitals,
};
