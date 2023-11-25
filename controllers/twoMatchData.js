const FirstInning = require("../models/FirstInnings");
const TwoMatchData = require("../models/saveMatchBTW2teams");
const PlayerOnGround = require("../models/playerOnGroundDetail");
const matchDetail = require("../models/matchDetail")

const SecondInning = require("../models/SecondInnings");



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

           const  isBattingTeam = await FirstInning.findOne().sort({ createdAt: -1 }).exec();

            if (isBattingTeam) {

                // checking teamOverCount is equal or greater than teamOverCount
                const isteamOver = isBattingTeam.teamOverCount >= matchDetail.teamOver;
                // checking teamWicketCount is equal or greater than teamWicketlimit
                const isteamWicket = isBattingTeam.WicketCount >= matchDetail.team1TotalPlayers;
                
                if(isteamWicket || isteamOver){
                    console.log('First Inning is Over');
                    res.status(200).json({message:"first inning is Over"})
                    return true;

                }else {
                    console.log("first Inning is running");
                    res.status(200).json({message: isBattingTeam})
                    return false;
                }


            } else {

                const isSecondBattingTeam = await SecondInning.findOne().sort({ createdAt: -1 }).exec();
                
                // checking teamOverCount is equal or greater than teamOverCount
                const isteamOver = isSecondBattingTeam.teamOverCount >= matchDetail.teamOver;
                // checking teamWicketCount is equal or greater than teamWicketlimit
                const isteamWicket = isSecondBattingTeam.WicketCount >= matchDetail.team2TotalPlayers;

                console.log("SecondInning:-",isSecondBattingTeam);

                if(isteamOver || isteamWicket){
                    console.log('Second Inning is Over');
                    res.status(200).json({message: 'Second Inning is Over'});
                    return true;

                }else {
                    console.log("Second Inning is running");
                   res.status(200).json({message: isSecondBattingTeam});
                    return false;
                }

               
            }
        }

        catch (error) {
            console.log(error.message, " BattingTeam and BowlingTeam not found");
        }
       
    }

    try {

        const allTeamData = await twoTeamDetail.save();
        console.log(allTeamData);

      const inningEnd =   await isTeam();


        res.status(200).json({
            message: "Two match data saved successfully",
            inningStatus: inningEnd ? 'Inning Over' : 'Inning Running',

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
