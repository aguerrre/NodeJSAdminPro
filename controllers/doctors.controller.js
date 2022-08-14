const { response } = require("express");
const mongoose = require("mongoose");

const Hospital = require("../models/hospital.model");
const Doctor = require("../models/doctor.model");

const getDoctors = async (req, res = response) => {

  const doctors = await Doctor.find()
    .populate('user', 'first_name img')
    .populate({
      path: 'hospital',
      select: 'name img',
      populate: {
        path: 'user',
        select: 'first_name'
      }
    });

  res.json({
    ok: true,
    doctors,
  });
};

const createDoctor = async (req, res = response) => {
  try {
    const uid = req.uid;
    const { name, hospital } = req.body;

    const existsHospital = await Hospital.findById(mongoose.Types.ObjectId(hospital));
    if (!existsHospital) {
      return res.status(404).json({
        ok: false,
        msg: "El hospital al que intenta asignar al doctor no existe.",
      });
    }
    const doctor = new Doctor({ user: uid, hospital: existsHospital._id, ...req.body });

    const newDoctor = await doctor.save();
    res.json({
      ok: true,
      newDoctor,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado.",
    });
  }
  
};

const updateDoctor = (req, res = response) => {
  res.json({
    ok: true,
    msg: "update Doctor",
  });
};

const deleteDoctor = (req, res = response) => {
  res.json({
    ok: true,
    msg: "delete Doctor",
  });
};

module.exports = {
  getDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
};
