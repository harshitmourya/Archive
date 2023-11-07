const Player = require("../models/playerDetail");
const Team = require("../models/teamDetail");

const savePlayerDetails = async (req, res) => {
    //console.log("Request Body",req.body);
    // for (const file of files)
    var isPlayerFound = false;
    var isTeamFound = true;
    var data = "";
    var contact = "", firstname = "", teamName = "";
    const obj = req.body;
    for(const element of obj){
        const   player = new Player(element);
        console.log("Given Object: ", player);
        console.log("Object: ", element)
        contact = element.playerContact;
        console.log("Contact: ", contact)
        firstname = element.playerFullName;
        console.log("First Name: ", firstname);
        // teamID = element.teamID;
        // console.log("Team ID: ", teamID);
        // teamName = element.teamName;
        // console.log("Team Name: ", teamName);
        // const teamData = await Team.findOne({team: teamName});
        // console.log("Team Data: ", teamData);
        // console.log("Team ID: ", teamData._id);
        // player.teamID = teamData._id;
        // console.log("Player Team ID: ", player.teamID);
        // console.log("Player: ", player);
        // if (teamData == null) {
        //     console.log("Team Not Found")
        //     isTeamFound = false;
        //     break;
        // }
        try {
            data = await Player.findOne({playerContact: contact});
            console.log("Data: ", data)
        }catch(error){
            console.log("Error: ",error);
            data = ""
        }
        if (data){
            console.log("Player Already Exist");
            isPlayerFound = true;
            break;
        }else {
            await player.save()
            console.log("Inside Else Condition.");
        }  
        console.log("Inside For Each at the end");
    }
    console.log("Outside For Each");
    // if (isPlayerFound || (!isTeamFound)) {
    if (isPlayerFound) {
        var msg = ""
        if (isPlayerFound) {
            msg = "Contact is already exist.";
        }
        // else if (!isTeamFound){
        //     msg = "Team not found.";
        // }
        console.log("Message: ", msg);
        return res.status(400).send({
            user: firstname,
            contact: contact,
            // teamName: teamName,
            message: msg
        })
    } else {
        console.log("Success");
        return res.status(201).send(req.body)
    }
};

module.exports = savePlayerDetails;




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