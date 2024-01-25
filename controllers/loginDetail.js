const LoginDetail = require("../models/loginDetail");
const RegisterdUser = require("../models/registrationDetail");
const bcrypt = require('bcrypt');

const saveLoginDetail = async (req, res) => {
  try {
    const { password } = req.body;
    const email = req.body.email;
    // console.log(email)
    // console.log(password)

    const existingLogin = await LoginDetail.findOne({ email });

    if (existingLogin) {
      console.log("User has already logged in");
      return res.status(200).json({
        message: 'User has already logged in',
        email: `You are logged in as: ${email}`
      });
    }

    const user = await RegisterdUser.findOne({ email });  // Fix: Change 'id' to 'email'
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        const login = new LoginDetail({ email ,password ,_id});

        login.save();
        console.log("login successful")
        res.status(200).json({
          message: 'Login successful',
          email: `You logged in as: ${email}`,
          _id
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
    console.error(error);  // Log the error for debugging
    res.status(500).json({
      error: 'Internal server error',
    });
  }
};

module.exports = saveLoginDetail;
