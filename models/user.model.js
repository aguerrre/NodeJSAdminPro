const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  first_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  img: { type: String, required: false },
  role: { type: String, required: true, default: "USER_ROLE" },
  google_auth: { type: Boolean, default: false },
});

UserSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.uid = _id;
  return object;
}) 

module.exports = model("User", UserSchema);
