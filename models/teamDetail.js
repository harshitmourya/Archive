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
    }
});


const teamDetail = new mongoose.model("TeamDetail", teamDetailSchema);
module.exports = teamDetail;
