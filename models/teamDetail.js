const mongoose = require("mongoose");

const teamDetailSchema = new mongoose.Schema({
    team: {
        type: String,
        required: true,
        unique:true
    },
    place: {
        type: String,
        required: true
    },
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"registrationDetail"
    },
    username:{
        type:mongoose.Schema.Types.String,
        required:true,
        ref:"registrationDetail"
    }
});


const teamDetail = new mongoose.model("TeamDetail", teamDetailSchema);
module.exports = teamDetail;
