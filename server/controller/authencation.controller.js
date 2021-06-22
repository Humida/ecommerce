const User = require("../model/User.model");
const bcrypt = require("bcrypt");

module.exports = {
  register: async (req, res, next) => {
    const { email, name } = req.body;

    const checkEmail = await User.findOne({ email: email });
    const checkName = await User.findOne({ name: name });

    if (checkEmail) return res.send("email invalid");

    if (checkName) return res.send("name invalid");

    // if (!checkEmail && !checkName) {
    const password = req.body.password;

    bcrypt.hash(password, 10, async function (err, hash) {
      try {
        if (!err) {
          const data = Object.assign({}, req.body, { password: hash });
          const user = new User(data);
          await user.save();
          res.send("ok");
        } else {
          res.send(err.message);
        }
      } catch (err) {
        console.log(err);
        res.send(err.message);
      }
    });
    // }
  },
  login: async (req, res, next) => {
    const { name, password } = req.body;
    const user = await User.findOne({ name: name });

    if (!user) return res.send("user not found");

    const hashPassword = user.password;

    bcrypt.compare(password, hashPassword, async function (err, result) {
      try {
        if (!result) return res.send("password wrong");
        return res.status(200).send("accept");
      } catch (err) {
        throw err;
      }
    });
  },
  updateInfo: async (req, res, next) => {},
  deleteSoft: async (req, res, next) => {},
  delete: async (req, res, next) => {},
};
