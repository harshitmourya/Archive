const FirstInning = require("../models/FirstInnings");
const SecondInning = require("../models/SecondInnings");
const matchDetail = require("../models/matchDetail");




// try {
//     const winnerMessage = await determineWinner(battingTeamID, bowlingTeamID);
//     res.status(200).json({ message: winnerMessage });
// } catch (error) {
//     console.error("Error in GET /winner:", error.message);
//     res.status(500).json({ message: "Internal Server Error" });
// }

async function determineWinner(req,res) {

    const { battingTeamID, bowlingTeamID } = req.params;

    try {
        const firstInningData = await FirstInning.findOne({ battingTeamID }).sort({ createdAt: -1 }).exec();
        const secondInningData = await SecondInning.findOne({ battingTeamID }).sort({ createdAt: -1 }).exec();
        const matchData = await matchDetail.findOne();

        if (!firstInningData || !secondInningData || !matchData) {
            return "Match data not found";
        }

        const team1RunCount = firstInningData.teamRunCount;
        const team2RunCount = secondInningData.teamRunCount;

        const team1WicketCount = firstInningData.WicketCount;
        const team2WicketCount = secondInningData.WicketCount;

        if (team1RunCount > team2RunCount) {
            return `${battingTeamID} Team has won the match`;
        } else if (team2RunCount > team1RunCount) {
            return `${bowlingTeamID} Team has won the match`;
        } else {
            // If the run counts are equal, check wicket count
            if (team1WicketCount < team2WicketCount) {
                return `${battingTeamID} Team has won the match based on fewer wickets lost`;
            } else if (team2WicketCount < team1WicketCount) {
                return `${bowlingTeamID} Team has won the match based on fewer wickets lost`;
            } else {
                return "Match is a draw";
            }
        }
    } catch (error) {
        console.error("Error determining winner:", error.message);
        return "Error determining winner";
    }
}

// // Example usage:
// const winnerMessage = await determineWinner("Team1", "Team2");
// console.log(winnerMessage);

module.exports = determineWinner