const teamDetail = require("../models/teamDetail");


const getAllteam = async (req, res) => {
    try {
        const teamAll = await teamDetail.find();
        console.log(teamAll);
        res.status(200).json(teamAll);   
    } catch (error) {
        console.log("error fetching team data :-",error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = getAllteam