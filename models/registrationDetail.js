const mongoose = require("mongoose");
const { OAuth2Server } = require("oauth2-server");
const validator = require("validator");
// const bcrypt = require("bcrypt");

const registrationDetailSchema= new mongoose.Schema ({ 
    username: {
        type: String,
        require: true,
        minlength: 4
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Email is already present"],
        validator(value){
            if(!validator.isEmail(value)) {
                throw new Error("Invalid Email")
            }
        }
    },
    phone: {
        type: Number,   
        required: true,
        minlenght: 10,
        maxlenght: 10,
        required: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    tokens:[{
        token:{
        type:String,
        required:true}
    }]
});





const registrationDetail = new mongoose.model('RegistrationDetail', registrationDetailSchema);
module.exports = registrationDetail;




// const mongoose = require("mongoose");
// const validator = require("validator");
// const bcrypt = require("bcrypt");

// const registrationDetailSchema = new mongoose.Schema({
//     fullName: {
//         type: String,
//         require: true,
//         minlenght: 3
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: [true, "Email is already present"],
//         validator(value){
//             if(!validator.isEmail(value)) {
//                 throw new Error("Invalid Email")
//             }
//         }
//     },
//     phone: {
//         type: Number,   
//         required: true,
//         minlenght: 10,
//         maxlenght: 10,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         require: true
//     }
// });

// registrationDetailSchema.pre('save', async function(){
//     try{
//         var user = this;
//         const salt = await(bcrypt.genSalt(10));
//         const hashpass = await bcrypt.hash(user.password, salt);
//         user.password = hashpass;
//     }catch (error) {
//         throw error;
//     }
// });

