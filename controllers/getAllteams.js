const teamDetail = require("../models/teamDetail");



async function getAllteam(req,res){
    const teamAll = await teamDetail.find();
    console.log(teamAll);
    res.status(200).json({teamAll});
}
module.exports = getAllteam