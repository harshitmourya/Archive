
const Player  = require("../models/playerDetail");
const PlayerOnGround = require("../models/playerOnGroundDetail");


async function teamPlayers(req,res){
    
    const {teamID} = req.params;
    console.log("Teamid",teamID);

    try {
        const players = await PlayerOnGround.find({teamID:teamID});
        console.log("TeamPlayers",players)
        if(players.length === 0){
            return res.status(404).json({ message : "No players found for the given team ID"});
        }
        res.status(200).json({ players });
       
    } catch (error) {
        res.status(500).json({ message: 'Error while fetching players by team', error: error.message });
        
    }
}
 module.exports = teamPlayers;
                                                                                                                                                                                                                                                                                                                                                                                                                                