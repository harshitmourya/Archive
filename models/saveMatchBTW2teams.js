const mongoose = require("mongoose");
const PlayerOnGround = require("../models/playerOnGroundDetail");

const twoMatchDataSchema = new mongoose.Schema({
    battingTeamID :{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "FirstInning"
    },
    bowlingTeamID :{
        type : mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"FirstInning"
    },
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"registrationDetail"
    },
    username:{
        type:mongoose.Schema.Types.String,
        required:true,
        ref:"registrationDetail"
    }
 
});

const TwoMatchData = new mongoose.model( "TwoMatchData" ,twoMatchDataSchema);
module.exports = TwoMatchData 