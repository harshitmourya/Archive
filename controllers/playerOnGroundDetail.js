const Player = require("../models/playerOnGroundDetail");
const Team = require("../models/teamDetail");

const savePlayerOnGroundDetails = async (req, res) => {
    var isPlayerFound = false;
    var isTeamFound = true;
    var msg = "";
    var teamId = "", firstname = "", teamName = "", playerID = "";

    console.log("Request body: ", req.body);
    const obj = req.body;

    for (const element of obj) {
        const player = new Player(element);
        console.log("Given Object: ", player);
        console.log("Object: ", element);
        firstname = element.playerFullName;
        console.log("First Name: ", firstname);
        playerID = element.playerID;
        console.log("Player ID: ", playerID);
        teamId = element.teamID;
        console.log("Team ID: ", teamId);
        teamName = element.teamName;
        console.log("Team Name: ", teamName);

        const teamDataName = await Team.findOne({ team: teamName });
        const teamDataId = await Team.findOne({ _id: teamId });

        console.log("New object Id", player._id);
        console.log("Team Data Name: ", teamDataName);
        console.log("Player Team ID: ", teamDataId);

        if (teamDataName == null || teamDataId == null) {
            console.log("Team Not Found");
            isTeamFound = false;
            break;
        } else {
            isTeamFound = true;

            // Uncomment the following block if you want to check for existing players with the same contact
            // try {
            //     const data = await Player.findOne({ playerContact: contact });
            //     console.log("Data: ", data);
            //     if (data) {
            //         console.log("Player Already Exist");
            //         isPlayerFound = true;
            //         break;
            //     } else {
            //         await player.save();
            //         console.log("Player Added Successfully");
            //         msg = "Player with Team Added Successfully.";
            //     }
            // } catch (error) {
            //     console.log("Error: ", error);
            //     return res.status(500).send({
            //         error: "Internal server error",
            //     });
            // }
            // End of the commented block

            // Include this part if you're not checking for existing players
            await player.save();
            console.log("Player Added Successfully");
            msg = "Player with Team Added Successfully.";
        }

        console.log("Inside For Each at the end");
    }

    console.log("Outside For Each");

    if (!isTeamFound) {
        console.log("Message: ", msg);
        return res.status(400).send({
            user: firstname,
            teamName: teamName,
            message: msg,
        });
    } else {
        console.log("Success");
        console.log("Request Body: ", req.body);
        return res.status(201).send(req.body);
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