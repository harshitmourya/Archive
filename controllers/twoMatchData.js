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
    // console.log("First Inning Detail: ", FirstInning);

    console.log("BattingTeam :-", battingTeamID);
    console.log("BowlingTeam :-", bowlingTeamID);

    async function isTeam(){
        try {
            let message = '';

            isBattingTeam = await FirstInning.findOne().sort({ createdAt: -1 }).exec();
            const a = await matchDetail.findOne();
            console.log("Current Over: ",  isBattingTeam ? isBattingTeam.teamOverCount : null);
            console.log("Check: ",isBattingTeam ? isBattingTeam.teamOverCount >= a.totalOver : null);

            if (isBattingTeam) {

                // console.log("over :-", matchDetail)

                const isteamOver = isBattingTeam.teamOverCount >= a.totalOver;
                const isteamOverRunning = isBattingTeam.teamOverCount <= a.totalOver;
                const isteamWicketRunning = isBattingTeam.wicketCount <=a.team1TotalPlayers;
                const isteamWicket = isBattingTeam.wicketCount >= a.team1TotalPlayers;

                if (isteamWicket || isteamOver) {
                    console.log('First Inning is Over');
                    message = 'First Inning is Over';

                } else if (isteamOverRunning && isteamWicketRunning) {
                    console.log("First Inning is running",isBattingTeam);
                    message = isBattingTeam;
                } else {
                    console.log("First Inning data not found");
                    message = 'First Inning data not found';
                }
            }


            isSecondBattingTeam = await SecondInning.findOne().sort({ createdAt: -1 }).exec();
                let secondInningmessage = ''
            const isteamOver = isSecondBattingTeam.teamOverCount >= a.totalOver;
            const isteamWicket = isSecondBattingTeam.wicketCount >= a.team2TotalPlayers;

            console.log("Count Over team:-", isteamOver);
            console.log("Count Wicket Team", isteamWicket);

            if (isteamOver || isteamWicket) {
                console.log('Second Inning is Over');
                secondInningmessage = 'Second Inning is Over';
            } else if (isSecondBattingTeam) {
                console.log("Second Inning is running", isSecondBattingTeam);
                secondInningmessage = 'Second Inning is Running';
            } else {
                console.log("Second Inning data not found");
                secondInningmessage = 'Second Inning data not found';
            } 
            let matchwin = ''
             if (isBattingTeam && isSecondBattingTeam) {
                
                if (isBattingTeam.teamRunCount > isSecondBattingTeam.teamRunCount) {
                    console.log("Team1 has won the match");
                    matchwin = 'Team1 has won the match';
                } else if (isBattingTeam.teamRunCount < isSecondBattingTeam.teamRunCount) {
                    console.log('Team2 has won the match');
                    matchwin = 'Team2 has won the match';
                } else {
                    console.log('The match is a draw');
                    matchwin = 'The match is a draw';
                }
            }

            

            return message; 
        } catch (error) {
            console.log(error.message, " BattingTeam and BowlingTeam not found");
            return false; 
        }
    }

    try {
        const allTeamData = await twoTeamDetail.save();
        console.log("Saved Data:", allTeamData);

        const inning = await isTeam();
        //console.log("inning :-", inning);

        res.status(200).json({
            message: "Two match data saved successfully",
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
