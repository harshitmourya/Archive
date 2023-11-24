const teamDetail = require('../models/teamDetail');


async function SingleTeamDelete(req,res){
    const {teamid} = req.params;
        console.log("TEAMID :-",teamid);

    try {
        const SingleTeam = await teamDetail.findByIdAndDelete(teamid);

        if(!SingleTeam){
            res.status(400).json({mesage:"ID not found for the given teamid"})
        } else {
            res.status(200).json({message:"Team deleted successfully"})
        }

    } catch (error) {
        console.log("error :-",error.message);
        res.status(500).json({mesage:"Internal server error"})
    }
}
module.exports = SingleTeamDelete