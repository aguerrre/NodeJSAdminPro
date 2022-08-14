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

const updateImage = async (collection, id, filename) => {
  switch (collection) {
    case "users":
      const user = await User.findById(id);
      if (!user) {
        console.log("no existe user");
        return false;
      }
      const oldUserImage = `./uploads/users/${user.img}`;
      deleteImageIfExists(oldUserImage);
      user.img = filename;
      await user.save();
      return true;
      break;
    case "doctors":
      const doctor = await Doctor.findById(id);
      if (!doctor) {
        console.log("no existe doctor");
        return false;
      }
      const oldDoctorImage = `./uploads/doctors/${doctor.img}`;
      deleteImageIfExists(oldDoctorImage);
      doctor.img = filename;
      await doctor.save();
      return true;
      break;
    case "hospitals":
      const hospital = await Hospital.findById(id);
      if (!hospital) {
        console.log("no existe hospital");
        return false;
      }
      const oldHospitalImage = `./uploads/hospital/${hospital.img}`;
      deleteImageIfExists(oldHospitalImage);
      hospital.img = filename;
      await hospital.save();
      return true;
      break;
    default:
      return false;
  }
};

module.exports = { updateImage };
