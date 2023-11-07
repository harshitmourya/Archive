const mongoose = require("mongoose");

const playerMatchDetailSchema = new mongoose.Schema({
    playerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
        required: true
    },
    runCount: {
        type: Number,
        required: true
    },
    wicketCount: {
        type: Number,
        required: true
    },
    wicketStatus: {
        type: Boolean,
        required: true
    },
    fourCount: {
        type: Number,
        required: true
    },
    sixCount: {
        type: Number,
        required: true
    },
    maidenOverCount: {
        type: Number,
        required: true
    },
    noBallCount: {
        type: Number,
        required: true
    },
    wideBallCount: {
        type: Number,
        required: true
    },
    ballCount: {
        type: Number,
        required: true
    },
    overCount: {
        type: Number,
        required: true
    },
    isBowler: {
        type: Boolean,
        required: true
    },
    isBatsman: {
        type: Boolean,
        required: true
    }
});

const playerMatch = new mongoose.model("PlayerMatchDetail", playerMatchDetailSchema)
module.exports = playerMatch;