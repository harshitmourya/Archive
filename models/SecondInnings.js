const mongoose  = require( "mongoose");

const allsecondschema = new mongoose.Schema({
    BattingTeamName: {
        type: String,
        required:true
    },
    BattingTeamID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    PlayerIDonBatting: {
        type:String,
        required: true
    },
    PlayerNameOnBatting:{
        type: String,
        required:true
    },

    BowlingTeamID: {
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },
    BowlingTeamName:{
        type: String,
        required: true
    },
    PlayerIDonBowling:{
        type:String,
        required: true
    },
    PlayerNameOnBowling:{
        type:String,
        required:true
    },
    runCount: {
        type:String,
        required:true
    },
    wicketCount:{
        type:Number,
        required:true
    },
    isFour:{
        type:Number,
        required:true
    },
    isSix:{
        type:Number,
        required:true
    },
    wideBall: {
        type:Number,
        required:true
    },
    NOBall:{
        type:Number,
        required:true
    },
    BallCountofBatsman: {
        type:Number,
        required:true
    },
    BallCountofBowler:{
        type:Number,
        required:true
    },
    OverCount: {
        type:Number,
        required:true
    },
    MaidenOver: {
        type:Number,
        required:true
    },
    
})

const All3secondgApi = new mongoose.model("SecondInning", allsecondschema);
module.exports = All3secondgApi;