const FirstInning = require("../models/FirstInnings");
const TwoMatchData = require("../models/saveMatchBTW2teams");
const PlayerOnGround = require("../models/playerOnGroundDetail");

const SecondInning = require("../models/SecondInnings");

var message = ""
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
            
            isBattingTeam = await FirstInning.findOne().sort({createdAt:-1}).exec();
            const isSecondBattingTeam = await SecondInning.findOne().sort({createdAt:-1 }).exec();

            console.log("FirstInning :-",isBattingTeam);

            if(isBattingTeam == null){
                console.log("error :-",error.message);
                throw error
            }
            
                //const isSecondBattingTeam = await SecondInning.findOne({BattingTeamID:battingTeamID})
            console.log("SecondInning :-",isSecondBattingTeam);
            }
        
        catch (error) {
            console.log(error.message, " BattingTeam and BowlingTeam not found");
        }
        res.status(200).send({message:isBattingTeam})
    }

    try {

        const allTeamData = await twoTeamDetail.save();
        console.log(allTeamData);
        
        isTeam();
        

        res.status(200).json({ message: "Two match data saved successfully",
    
         isBattingTeam});
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
        