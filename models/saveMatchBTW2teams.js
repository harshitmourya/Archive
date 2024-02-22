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
    }
});

const TwoMatchData = new mongoose.model( "TwoMatchData" ,twoMatchDataSchema);
module.exports = TwoMatchData 