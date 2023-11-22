const mongoose = require("mongoose");

const matchDetailSchema = new mongoose.Schema({
    team1_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"TeamDetails"
    },
    team1Name:{
        type:mongoose.Schema.Types.String,
        required:true,
        ref:"TeamDetails"
    },
    team2_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"TeamDetails"
    },
    team2Name:{
        type:mongoose.Schema.Types.String,
        required:true,
        ref:"TeamDetails"
    },
    totalOver: {
        type: Number,
        required: true
    },
    TosswinningTeamId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    choose:{
        type:String,
        required:true
    }
    
});

const matchDetail = new mongoose.model("MatchDetail", matchDetailSchema);
module.exports = matchDetail;