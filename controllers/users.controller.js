const User = require("../models/user.model");

const getUsers = async (req, res) => {
  const users = await User.find({}, 'first_name email role google_auth');

  res.json({
    ok: true,
    users: users,
  });
};

const createUser = async (req, res) => {
  const { first_name, password, email } = req.body;

  const user = new User(req.body);
  await user.save();

  res.json({
    ok: true,
    user: user,
  });
};

module.exports = {
  getUsers,
  createUser,
};
