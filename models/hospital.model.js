const { Schema, model } = require("mongoose");

// Creación modelo.
const HospitalSchema = Schema({
  name: { type: String, required: true },
  img: { type: String, required: false },
  user: { required: true, type: Schema.Types.ObjectId, ref: "User" },
}); // Para cambiar el nombre en la BD se añade otro parámetro al schema { collection: 'nombre' }

// Editar respuesta del ORM
HospitalSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});

module.exports = model("Hospital", HospitalSchema);
