const mongoose = require("mongoose");
const winningTeamSchema = new mongoose.Schema({
    teamId: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "toss"
    },
    teamName: {
        type: mongoose.Schema.Types.String,
        require: true,
        ref: "toss"
    }
})

module.exports = mongoose.model("winningTeam",winningTeamSchema); 