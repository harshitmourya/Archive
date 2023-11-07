const Player = require("../models/playerOnGroundDetail");
const Team = require("../models/teamDetail");

const savePlayerOnGroundDetails = async (req, res) => {
    //console.log("Request Body",req.body);
    // for (const file of files)
    var isPlayerFound = false;
    var isTeamFound = true;
    var data = "";
    var msg = "";
    // var message = "";
    var teamId = "", firstname = "", teamName = "", playerID = "";
    console.log("Request body: ", req.body);
    const obj = req.body;
    for(const element of obj){
        const player = new Player(element);
        console.log("Given Object: ", player);
        console.log("Object: ", element)
        firstname = element.playerFullName;
        console.log("First Name: ", firstname);
        playerID = element.playerID;
        console.log("Player ID: ", playerID);
        teamId = element.teamID;
        console.log("Team ID: ", teamId);
        teamName = element.teamName;
        console.log("Team Name: ", teamName);
        const teamDataName = await Team.findOne({team: teamName});
        const teamDataId = await Team.findOne({_id: teamId});
        console.log("New object Id", player._id)
        console.log("Team Data Name: ", teamDataName);
        console.log("Player Team ID: ", teamDataId);
        if (teamDataName == null) {
            console.log("Team Not Found")
            isTeamFound = false;
            break;
        }else if(teamDataId == null) {
            console.log("Team Id Not Founc")
            isTeamFound = false
            break
        }else {
            isTeamFound = true
            await player.save()
            msg = "Player with Team Added Successfully."
        }
        // try {
        //     data = await Player.findOne({playerContact: contact});
        //     console.log("Data: ", data)
        // }catch(error){
        //     console.log("Error: ",error);
        //     data = ""
        // }
        // if (data){
        //     console.log("Player Already Exist");
        //     isPlayerFound = true;
        //     break;
        // }else {
        //     await player.save()
        //     console.log("Inside Else Condition.");
        // }  
        console.log("Inside For Each at the end");
    }
    console.log("Outside For Each");
    // if (isPlayerFound || (!isTeamFound)) {
    if (!isTeamFound) {
        // var msg = ""
        // if (isPlayerFound) {
        //     msg = "Contact is already exist.";
        // }
        // else if (!isTeamFound){
        //     msg = "Team not found.";
        // }
        console.log("Message: ", msg);
        return res.status(400).send({
            user: firstname,
            // contact: contact,
            teamName: teamName,
            message: msg
        })
    } else {
        console.log("Success");
        console.log("Request Body: ", req.body)
        return res.status(201).send(req.body)
    }
};

module.exports = savePlayerOnGroundDetails;




// const Player = require("../models/playerDetail");
// const savePlayerDetails = async (req, res) => {
//     // res.send("Hi, this is anjali")
//     console.log(req.body);
//     const player = new Player(req.body);
//     await Player.deleteMany();
//     player.save().then(() => {
//         res.status(201).send(player);
//     }).catch((error) => {
//         res.status(400).send(error);
//     });
// };

// module.exports = savePlayerDetails;

// let re = await player.save();