const { Schema, model } = require("mongoose");

// Creación modelo.
const UserSchema = Schema({
  first_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  img: { type: String, required: false },
  role: { type: String, required: true, default: "USER_ROLE" },
  google_auth: { type: Boolean, default: false },
});

// Editar respuesta del ORM
UserSchema.method('toJSON', function () {
  const { __v, _id, password, ...object } = this.toObject();
  object.uid = _id;
  return object;
}) 

module.exports = model("User", UserSchema);
