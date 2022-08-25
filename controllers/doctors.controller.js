const { response } = require("express");
const mongoose = require("mongoose");

const Hospital = require("../models/hospital.model");
const Doctor = require("../models/doctor.model");

const getDoctors = async (req, res = response) => {
  const doctors = await Doctor.find()
    .populate("user", "first_name img")
    .populate({
      path: "hospital",
      select: "name img",
      populate: {
        path: "user",
        select: "first_name",
      },
    });

  res.json({
    ok: true,
    doctors,
  });
};

const getDoctorById = async (req, res = response) => {
  try {
    const doctorId = req.params.id;
    const doctor = await Doctor.findById(doctorId)
      .populate("user", "first_name img")
      .populate({
        path: "hospital",
        select: "name img",
        populate: {
          path: "user",
          select: "first_name",
        },
      });
    
    if (!doctor) {
      return res.status(404).json({
        ok: false,
        msg: "Médico no encontrado",
      });
    }

    res.json({
      ok: true,
      doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

const createDoctor = async (req, res = response) => {
  try {
    const uid = req.uid;
    const { name, hospital } = req.body;

    const existsHospital = await Hospital.findById(
      mongoose.Types.ObjectId(hospital)
    );
    if (!existsHospital) {
      return res.status(404).json({
        ok: false,
        msg: "El hospital al que intenta asignar al doctor no existe.",
      });
    }
    const doctor = new Doctor({
      user: uid,
      hospital: existsHospital._id,
      ...req.body,
    });

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

const updateDoctor = async (req, res = response) => {
  try {
    const doctorId = req.params.id;
    const uid = req.uid;
    const { hospital } = req.body;

    const existsHospital = await Hospital.findById(
      mongoose.Types.ObjectId(hospital)
    );
    if (!existsHospital) {
      return res.status(404).json({
        ok: false,
        msg: "El hospital al que intenta asignar al doctor no existe.",
      });
    }

    const changes = {
      ...req.body,
      user: uid,
    };
    const updatedDoctor = await Doctor.findByIdAndUpdate(doctorId, changes, { new: true });
    if (!updatedDoctor) {
      return res.status(404).json({
        ok: false,
        msg: "El doctor no existe con ese id.",
      });
    }

    res.json({
      ok: true,
      doctor: updatedDoctor,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

const deleteDoctor = async(req, res = response) => {
  try {
    const doctorId = req.params.id;
    const deletedDoctor = await Doctor.findByIdAndDelete(doctorId);
    if (!deletedDoctor) {
      return res.status(404).json({
        ok: false,
        msg: "El doctor no existe con ese id.",
      });
    }

    res.json({
      ok: true,
      doctor: deletedDoctor,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

module.exports = {
  getDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
};
