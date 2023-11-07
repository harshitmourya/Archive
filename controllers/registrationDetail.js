const RegistrationDetail = require("../models/registrationDetail");
const bcrypt = require("bcrypt")




const saveRegistrationDetail = async (req, res, next) => {
    bcrypt.hash(req.body.password, 10,  async function (err, hashedPass) {
      if (err) {
        res.json({
          error: err,
        });
      }
      const user = new RegistrationDetail({ 
        username: req.body.username,
        email:req.body.email,
        phone:req.body.phone,
        password: hashedPass,
        
      });

      console.log("User Obj: ", user);

      try {
        const isEmailExist = await RegistrationDetail.findOne({email: user.email});
        const isContactExist = await RegistrationDetail.findOne({phone: user.phone});
        console.log("Email: ", isEmailExist);
        console.log("Phone: ", isContactExist);
        
        if(isEmailExist == null && isContactExist == null) {
        
            await user.save()
            res.status(201).json({
                message: "Registred Successfully",
                user
            })
        }else {
            res.status(400).json({
                message: "User already exists"
            });
        }
    }
    catch(error) {
         console.log("Error: ",error);
     }
  
  
    
    });
  };

  module.exports = saveRegistrationDetail;
  //    await user.save()
    //     .then((user) => {
    //       res.json({
    //         message: "User added successfully",
    //       });
    //     })
    //     .catch((error) => {
    //       res.json({
    //         message: "An error occurred",
    //       });
    //     });
  

// const saveRegistrationDetail = async (req, res) => {
//     console.log(req.body);
//     const userDetail = new RegistrationDetail(req.body);
//     const email = req.body.email;
//     const phone = req.body.phone;
//     console.log("Entered Email: ", email, "Hello");
//     try {
//         const isEmailExist = await RegistrationDetail.findOne({email: email});
//         const isContactExist = await RegistrationDetail.findOne({phone: phone});
//         console.log("Email: ", isEmailExist);
//         console.log("Phone: ", isContactExist);
        
//         if(isEmailExist == null && isContactExist == null) {
//             console.log("FUll Name: ", userDetail);
//             userDetail.save()
//             res.status(201).json({
//                 message: "Registred Successfully",
//                 userDetail
//             })
//         }else {
//             res.status(400).json({
//                 message: "User already exists"
//             });
//         }
//     }catch(error) {
//          print("Error: ",error);
//      }
    
 
//     userDetail.save().then(() => {
//         res.status(201).send(userDetail);
//     }).catch((error) => {
//         res.status(400).send(error);
//     })
// };


