const { Schema, model } = require("mongoose");

// Creación modelo.
const DoctorSchema = Schema({
  name: { type: String, required: true },
  img: { type: String, required: false },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  hospital: { type: Schema.Types.ObjectId, ref: "Hospital", required: true },
});

// Editar respuesta del ORM
DoctorSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});

module.exports = model("Doctor", DoctorSchema);
