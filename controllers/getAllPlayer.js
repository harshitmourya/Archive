const Player = require("../models/playerDetail");

const getAllPlayers = async (req, res) => {
    // const {Players} = req.params;

    try {
        const allPlayers = await Player.find({userID:req.params.userID});
        console.log( "userID -", userID)
        if (!allPlayers.length) {
            res.status(404).json({ message: 'User not found' });
            return
        }else{
        res.status(200).json(allPlayers);
        console.log(allPlayers);
        }
    } catch (error) {
        console.log(error.message)
    }

}   

module.exports = getAllPlayers;