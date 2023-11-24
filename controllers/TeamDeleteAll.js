const teamDetail =  require("../models/teamDetail");

async function AllteamDelete(req,res){
    try {
    const AllTeam = await teamDetail.deleteMany({});
    res.status(200).json({message:"All teams are deleted successfully"});

    } catch (error) {
        console.log("error :-",error.message)
        res.status(500).json({message:"Internal server error"})
    }
}

module.exports = AllteamDelete