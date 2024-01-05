const FirstInning = require("../models/FirstInnings");
const TwoMatchData = require("../models/saveMatchBTW2teams");
const PlayerOnGround = require("../models/playerOnGroundDetail");
const matchDetail = require("../models/matchDetail");
const SecondInning = require("../models/SecondInnings");


// ... (other imports)

var isSecondBattingTeam = '';
var isBattingTeam = '';

async function twoMatch(req, res) {
    var battingTeamID = req.body.battingTeamID;
    var bowlingTeamID = req.body.bowlingTeamID;

    const twoTeamDetail = new TwoMatchData({
        battingTeamID: battingTeamID,
        bowlingTeamID: bowlingTeamID,
    });

    console.log("BattingTeam :-", battingTeamID);
    console.log("BowlingTeam :-", bowlingTeamID);

    async function isTeam() {
        try {
            let message = '';

            isBattingTeam = await FirstInning.findOne().sort({ createdAt: -1 }).exec();
            const a = await matchDetail.findOne();
            console.log("Current Over: ", isBattingTeam ? isBattingTeam.teamOverCount : null);

            if (isBattingTeam) {
                const isteamOver = isBattingTeam.teamOverCount >= a.totalOver;
                const isteamWicket = isBattingTeam.wicketCount >= a.team1TotalPlayers;
                const isteamOverRunning = isBattingTeam.teamOverCount < a.totalOver;
                const isteamWicketRunning = isBattingTeam.wicketCount < a.team1TotalPlayers;

                if (isteamWicketRunning && isteamOverRunning) {
                    console.log("First Inning is running", isBattingTeam);
                    message = isBattingTeam;
                } else if (isteamWicket || isteamOver) {
                    console.log('First Inning is Over');
                    message = 'First Inning is Over';
                } else {
                    console.log("First Inning data not found");
                    message = 'First Inning data not found';
                }
            } else {
                console.log('First Inning is not started yet');
                message = 'First Inning is not started yet';
            }

            isSecondBattingTeam = await SecondInning.findOne().sort({ createdAt: -1 }).exec();
            let secondInningmessage = '';
            if (isSecondBattingTeam) {
                const isteamOver = isSecondBattingTeam.teamOverCount >= a.totalOver;
                const isteamWicket = isSecondBattingTeam.wicketCount >= a.team2TotalPlayers;
                const isOverTeam = isSecondBattingTeam.teamOVerCount <= a.totalOver;
                const isWicketTeam = isSecondBattingTeam.wicketCount <= a.team2TotalPlayers;

                console.log("Count Over team:-", isteamOver);
                console.log("Count Wicket Team", isteamWicket);

                if (isteamOver || isteamWicket) {
                    console.log('Second Inning is Over');
                    secondInningmessage = 'Second Inning is Over';
                } else {
                    // Check for the winning condition inside the block where second inning is running
                    let matchwin = '';
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
                        // console.log("Second Inning is running", isSecondBattingTeam);
                        // secondInningmessage = 'Second Inning is Running';
                        if (isOverTeam && isWicketTeam) {
                            console.log("Second Inning is running", isSecondBattingTeam);
                            secondInningmessage = 'Second Inning is Running ';
                        }
                    }
                   
                }
            } else {
                console.log("Second Inning is not started yet");
                secondInningmessage = 'Second Inning is not started yet';
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

        res.status(200).json({
            message: "Two match data saved successfully",
            data: inning,
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
