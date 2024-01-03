const FirstInning = require("../models/FirstInnings");
const TwoMatchData = require("../models/saveMatchBTW2teams");
const PlayerOnGround = require("../models/playerOnGroundDetail");
const matchDetail = require("../models/matchDetail");
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
    console.log("First Inning Detail: ", FirstInning);
    // let a = await matchDetail.findOne();
    // console.log("Overs: ",a.totalOver);
    // console.log("Team 1 Player: ", a.team1TotalPlayers);
    // console.log(twoTeamDetail);
    console.log("BattingTeam :-", battingTeamID);
    console.log("BowlingTeam :-", bowlingTeamID);

    async function isTeam() {
        try {
            let message = '';

            isBattingTeam = await FirstInning.findOne().sort({ createdAt: -1 }).exec();
            const a = await matchDetail.findOne();
            console.log("Current Over: ", isBattingTeam.teamOverCount);
            console.log("Check: ", isBattingTeam.teamOverCount >= a.totalOver);

            if (isBattingTeam) {

                console.log( "over :-",matchDetail)

                const isteamOver = isBattingTeam.teamOverCount >= a.totalOver;
                const isteamWicket = isBattingTeam.wicketCount >= a.team1TotalPlayers;

                if (isteamWicket || isteamOver) {
                    console.log('First Inning is Over');
                    message = 'First Inning is Over';
                } else {
                    console.log("First Inning is running");
                    message = isBattingTeam;
                }
            }
             

                isSecondBattingTeam = await SecondInning.findOne().sort({ createdAt: -1 }).exec();
                console.log("Second Inning: ",isSecondBattingTeam);
                const isteamOver = isSecondBattingTeam.teamOverCount >= a.totalOver;
                const isteamWicket = isSecondBattingTeam.wicketCount >= a.team2TotalPlayers;

                console.log("Count Over team:-", isteamOver);
                console.log("Count Wicket Team", isteamWicket);

                if (isteamOver || isteamWicket) {
                    console.log('Second Inning is not started yet');
                    message = 'Second Inning is not started yet';
                }  if(isteamOver == a.totalOver){
                    console.log("Match has ended");
                    message = "Match has ended";
                } if(isteamWicket == a.team2TotalPlayers){
                    console.log('Match has ended');
                    message = 'Match has ended';
                }  
                else {
                    console.log("Second Inning is running");
                    message = isSecondBattingTeam; 
                }

                if(isBattingTeam.teamRunCount > isSecondBattingTeam.teamRunCount){
                    console.log("Team1 has won the match");
                    message = `${battingTeamID} has won the match`;
                } else{
                    console.log('Team2 has won the match');
                    message = `${bowlingTeamID} has wont the match`;
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
        console.log("inning :-", inning);

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
