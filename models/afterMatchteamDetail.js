const mongoose = require("mongoose");

const afterMatchSchema = new mongoose.Schema({
    Team1Id: {
        type:mongoose.Schema.Types.ObjectId,
        required: true
    },
    Team1Name : {
        type:mongoose.Schema.Types.ObjectId,
        required: true
    },
    Team1Runs:{
        type:Number,
        required: true
    },
    Team1Wickets:{
      type:Number,
      required: true
    },


    Team2ID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    Team2Name: {
        type: mongoose.Schema.Types.ObjectId,
        requiredd:true
    },
    Team2Runs: {
        type:Number,
        required:true
    },
    Team2Wickets:{
        type:Number,
        required: true
    },

    WinningTeamId:{
        type: String,
        required:true
    },
    WinningTeamName: {
        type:String,
        required:true
    }

})
const after = new mongoose.model("AfterMatch",afterMatchSchema);
module.exports = after 

