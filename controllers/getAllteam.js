const teamDetail = require("../models/teamDetail");


const getAllteam = async (req, res) => {
    const teamAll = await teamDetail.find();
    console.log(teamAll);
    res.status(200).json(teamAll);
}


// async function getAllteam(req,res){
//     try {
//         const teamAll = await teamDetail.find();
//         console.log(teamAll);
//         res.status(200).json(teamAll);  
//     } catch (error) {
//         console.log("error",error.message)
//     } 
// }
// getAllteam()
module.exports = getAllteam