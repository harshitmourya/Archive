const LoginDetail = require("../models/loginDetail");
const RegisterdUser = require("../models/registrationDetail");
const bcrypt = require('bcrypt');

const saveLoginDetail = async (req, res) => {
  try {
    const { password } = req.body;
    const id = req.body.email;
    const login = new LoginDetail(req.body);
    const user = await RegisterdUser.findOne({email: id});

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {

        login.save();
        console.log("login successfull")
        res.status(200).json({
          message: 'Login successful',
          
        });
      } else {
        res.status(401).json({
          message: 'Wrong password',
        });
      }
    } else {
      res.status(404).json({
        message: 'User not found!',
      });
    }
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
    });
  }
};

module.exports = saveLoginDetail;

