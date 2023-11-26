const FirstInning = require("../models/FirstInnings");
const TwoMatchData = require("../models/saveMatchBTW2teams");
const PlayerOnGround = require("../models/playerOnGroundDetail");
const matchDetail = require("../models/matchDetail")
const SecondInning = require("../models/SecondInnings");


var isSecondBattingTeam = '';
var isBattingTeam = '';
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
            let message = '';

             isBattingTeam = await FirstInning.findOne().sort({ createdAt: -1 }).exec();

            if (isBattingTeam) {
                const isteamOver = isBattingTeam.teamOverCount >= matchDetail.totalOver;
                const isteamWicket = isBattingTeam.wicketCount >= matchDetail.team1TotalPlayers;

                if (isteamWicket || isteamOver) {
                    console.log('First Inning is Over');
                    message = 'First Inning is Over';
                }// } else {
                //     console.log("first Inning is running");
                //     message = isBattingTeam;
                // }
            } else {
                 isSecondBattingTeam = await SecondInning.findOne().sort({ createdAt: -1 }).exec();
                const isteamOver = isSecondBattingTeam.teamOverCount >= matchDetail.totalOver;
                const isteamWicket = isSecondBattingTeam.wicketCount >= matchDetail.team2TotalPlayers;

                console.log("SecondInning:-", isSecondBattingTeam);

                if (isteamOver || isteamWicket) {
                    console.log('Second Inning is Over');
                    message = 'Second Inning is Over';
                } else {
                    console.log("Second Inning is running");
                    message = isSecondBattingTeam;
                }
            }

            return message; // Return the message
        } catch (error) {
            console.log(error.message, " BattingTeam and BowlingTeam not found");
            return false; // Return false in case of an error
        }
    }

    try {
        const allTeamData = await twoTeamDetail.save();
        console.log("Saved Data:", allTeamData);

        const inning = await isTeam();
        console.log("inning :-",inning)

        res.status(200).json({
            message: "Two match data saved successfully",
            inningStatus: inning ? 'Inning Over' : 'Inning Running',
            data: inning, // Include the data in the response
        });
    } catch (error) {
        console.log("Error saving two match data:", error);
        res.status(500).json({ message: "Error saving two match data" });
    }
}

module.exports = twoMatch;




// function generateMatchID(isBattingTeam,isBowlingTeam) {
//     // Create a unique match ID based on team IDs and a timestamp
//     const timestamp = Date.now(); // Get the current timestamp
//     const matchID = `${battingTeamID}-${bowlingTeamID}-${timestamp}-${uuid.v4()}`;
//     console.log(matchID);
//     return matchID;
// }
