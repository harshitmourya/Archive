const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const loginDetailSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        validator(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email");
            }
        }
    },
    password: {
        type: String,
        required: true,

    }
})

// loginDetailSchema.pre('save', async function(){
//     try{
//         var user = this;
//         const salt = await(bcrypt.genSalt(10));
//         const hashpass = await bcrypt.hash(user.password, salt);
//         user.password = hashpass;
//     }catch (error) {
//         throw error;
//     }
// })

const userLogin = new mongoose.model("LoginDetail", loginDetailSchema);
module.exports = userLogin;