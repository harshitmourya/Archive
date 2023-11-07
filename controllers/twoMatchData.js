const FirstInning = require("../models/FirstInnings");
const TwoMatchData = require("../models/saveMatchBTW2teams");
const PlayerOnGround = require("../models/playerOnGroundDetail");
const uuid = require('uuid');


async function twoMatch(req, res) {
    var battingTeamID = req.body.battingTeamID;
    var bowlingTeamID = req.body.bowlingTeamID;

    const twoTeamDetail = new TwoMatchData({
        battingTeamID: battingTeamID,
        bowlingTeamID: bowlingTeamID,
    });

    console.log(twoTeamDetail);
    console.log("BattingTeam :-", battingTeamID);
    console.log("BowlingTeam :-", bowlingTeamID);

    async function isTeam() {
        try {
            const isBattingTeam = await FirstInning.findOne({ BattingTeamID: battingTeamID });
            const isBowlingTeam = await FirstInning.findOne({ BowlingTeamID: bowlingTeamID });

            console.log(isBattingTeam);
            console.log(isBowlingTeam);
        }
        catch (error) {
            console.log(error.message, " BattingTeam and BowlingTeam not found");
        }
    }

    try {

        // function generateMatchID(isBattingTeam,isBowlingTeam) {
        //     // Create a unique match ID based on team IDs and a timestamp
        //     const timestamp = Date.now(); // Get the current timestamp
        //     const matchID = `${battingTeamID}-${bowlingTeamID}-${timestamp}-${uuid.v4()}`;
        //     console.log(matchID);
        //     return matchID;
        // }
        


        const allTeamData = await twoTeamDetail.save();
        console.log(allTeamData);
        
        isTeam();
        //generateMatchID();

        res.status(200).json({ message: "Two match data saved successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error saving two match data" });
    }
}

module.exports = twoMatch;

