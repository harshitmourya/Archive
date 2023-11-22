const FirstInning = require("../models/FirstInnings");
const TwoMatchData = require("../models/saveMatchBTW2teams");
const PlayerOnGround = require("../models/playerOnGroundDetail");

const SecondInning = require("../models/SecondInnings");

var message = ""
var isBattingTeam = '';
var isFound = " ";
var teamOverCount = '';

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

            isBattingTeam = await FirstInning.findOne().sort({ createdAt: -1 }).exec();

            if (isBattingTeam) {

                // checking the team overCount is end or not
                const teamOverLimit = 50;
                const teamWicketLimit = 11;

                // checking teamOverCount is equal or greater than teamOverCount
                const isteamOver = isBattingTeam.teamOverCount >= teamOverLimit;
                console.log("overs are end", isteamOver)

                // checking teamWicketCount is equal or greater than teamWicketlimit
                const isteamWicket = isBattingTeam.WicketCount >= teamWicketLimit;
                console.log("all batsman are out", isteamWicket);
                console.log("FirstInning",isBattingTeam)

                if(teamOverLimit || teamWicketLimit){
                    console.log('First Inning is Over');
                    return true;

                }else {
                    console.log("first Inning is running");
                    return false;
                }


            } else {

                const isSecondBattingTeam = await SecondInning.findOne().sort({ createdAt: -1 }).exec();
                
                //checking the team overCount is end or not
                const teamOverLimit = 50;
                const teamWicketLimit = 11;

                // checking teamOverCount is equal or greater than teamOverCount
                const isteamOver = isSecondBattingTeam.teamOverCount >= teamOverLimit;
                console.log("overs are end", isteamOver)

                // checking teamWicketCount is equal or greater than teamWicketlimit
                const isteamWicket = isSecondBattingTeam.WicketCount >= teamWicketLimit;
                console.log("all batsman are out", isteamWicket);

                console.log("SecondInning:-",isSecondBattingTeam);

                if(teamOverLimit || teamWicketLimit){
                    console.log('Second Inning is Over');
                    message = "Second Inning is Over";
                    return true;

                }else {
                    console.log("Second Inning is running");
                    message ="Second Inning is running";
                    return false;
                }

               
            }
        }

        catch (error) {
            console.log(error.message, " BattingTeam and BowlingTeam not found");
        }
        res.status(200).send({ message: isBattingTeam })
    }

    try {

        const allTeamData = await twoTeamDetail.save();
        console.log(allTeamData);

        isTeam();


        res.status(200).json({
            message: "Two match data saved successfully",

            isBattingTeam
        });
    } catch (error) {
        console.log(error);
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
