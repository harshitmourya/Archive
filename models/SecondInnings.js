const mongoose  = require( "mongoose");
const allsecondschema = new mongoose.Schema({
    BattingTeamName: {
        type: String,
        required:true,
        ref: "PlayerOnGround"
    },
    BattingTeamID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"PlayerOnGround"
    },
    Player_ID_OnStrike: {
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"PlayerOnGround"
    },
    PlayerName_OnStrike: {
        type:String,
        required: true,
        ref:"PlayerOnGround"
    },
    // PlayerNameOnBatting:{
    //     type: String,
    //     required:true,
    //     ref:"PlayerOnGround"
    // },
    WicketStatus:{
        type:Boolean,
        required:true,
    },
    BattingTeamwicketCount:{
        type:Number,
        required:true,
    },


    BowlingTeamID: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"PlayerOnGround"
    },
    BowlingTeamName:{
        type: String,
        required: true,
        ref:"PlayerOnGround"
    },
    Player_IDonBowling:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"PlayerOnGround"
    },
    PlayerNameOnBowling:{
        type:String,
        required:true,
        ref:"PlayerOnGround",
    },
    BowlerwicketCount:{
        type:Number,
        required:true
    },

    batterRunCount: {
        type:Number,
        required:true
    },
    teamRunCount: {
        type:Number,
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
    teamOverCount: {
        type:Number,
        required:true
    },
    MaidenOver: {
        type:Number,
        required:true
    },
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"LoginDetail"
    },
    username:{
        type:mongoose.Schema.Types.String,
        required:true,
        ref:"LoginDetail"
    }
    
},{
    timestamps:true
}
)


const All3secondgApi = new mongoose.model("SecondInning", allsecondschema);
module.exports = All3secondgApi;