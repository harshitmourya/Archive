const mongoose = require("mongoose");

const matchDetailSchema = new mongoose.Schema({
    team1: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    team2: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    totalOver: {
        type: Number,
        required: true
    },
    winningTeam: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    looserTeam: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    team1Run: {
        type: Number,
        required: true
    },
    team2Run : {
        type: Number,
        required: true
    },
    team1Wicket: {
        type: Number,
        required: true
    },
    team2Wicket: {
        type: Number,
        required: true
    },
    tie: {
        type: Boolean,
        required: true
    }
});

const matchDetail = new mongoose.model("MatchDetail", matchDetailSchema);
module.exports = matchDetail;