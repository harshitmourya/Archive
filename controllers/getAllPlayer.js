const Player = require("../models/playerDetail");

const getAllPlayers = async (req, res) => {
    const allPlayers = await Player.find();
    console.log(allPlayers);
    res.status(200).json(allPlayers);
}

module.exports = getAllPlayers;