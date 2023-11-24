const playerDetail =require("../models/playerDetail");

async function DeleteSinglePlayer(req,res){
    const {playerId} = req.params;
    console.log(playerId);
    try {
        const deletePlayer = await playerDetail.findByIDAndDelete(playerId);

        if(!deletePlayer){
            res.status(404).json({message :"Id not found for the given playerID"})
        } else{
            res.status(200).json({message:"Player deleted successfully"})
        }
    } catch (error) {
        console.log("error",error.message);
        res.status(500).json({message:"Internal server error"})
    }

}
module.exports = DeleteSinglePlayer