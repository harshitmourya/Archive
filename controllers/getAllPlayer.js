const Player = require("../models/playerDetail");

const getAllPlayers = async (req, res) => {
    try {
        const allPlayers = await Player.find();

        // console.log("userID -", req.params.userID);

        if (!allPlayers.length) {
            res.status(404).json({ message: 'User not found for the given id' });
            return;
        } else {
            res.status(200).json(allPlayers);
            console.log(allPlayers);
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = getAllPlayers;
