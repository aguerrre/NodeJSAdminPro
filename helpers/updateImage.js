const fs = require("fs");
const User = require("../models/user.model");
const Doctor = require("../models/doctor.model");
const Hospital = require("../models/hospital.model");

const deleteImageIfExists = (path) => {
  if (fs.existsSync(path)) {
    // borrar imagen anterior
    fs.unlinkSync(path);
  }
};

const getEntityAndDeleteExistingImage = async (collection, id, filename) => {
  switch (collection) {
    case "users":
      const user = await User.findById(id);
      if (!user) {
        console.log("no existe user");
        return null;
      }
      const oldUserImage = `./uploads/users/${user.img}`;
      deleteImageIfExists(oldUserImage);
      return user;
      break;
    case "doctors":
      const doctor = await Doctor.findById(id);
      if (!doctor) {
        console.log("no existe doctor");
        return null;
      }
      const oldDoctorImage = `./uploads/doctors/${doctor.img}`;
      deleteImageIfExists(oldDoctorImage);
      return doctor;
      break;
    case "hospitals":
      const hospital = await Hospital.findById(id);
      if (!hospital) {
        console.log("no existe hospital");
        return null;
      }
      const oldHospitalImage = `./uploads/hospital/${hospital.img}`;
      deleteImageIfExists(oldHospitalImage);
      return hospital;
      break;
    default:
      return null;
  }
};

module.exports = { getEntityAndDeleteExistingImage };
