const { default: mongoose } = require("mongoose");
const PlayerMatchDetail = require("../models/playerMatchDetail");
const playerDetail = require("../models/playerDetail");

const savePlayerMatchDetails = async (req, res) => {
    var playerFound = true;
    var msg = "";
    var registredPlayer = "";
    var player = "";
    var matchDetail = new PlayerMatchDetail(req.body);
    console.log("Match Detail: ", matchDetail);
    const playerID = req.body.playerId;
    console.log("Player ID: ", playerID);
    console.log("Object ID: ", matchDetail._id);
    try{
        registredPlayer = await playerDetail.findOne({_id: playerID});
    }catch(error) {
        console.log("Error: ", error);
        msg = "Player not registred";
        playerFound = false
    }

    console.log("Registred Player: ", registredPlayer);

    if(registredPlayer) {
        player = await PlayerMatchDetail.findOne({playerId: playerID});
    }
    console.log("Player Object: ", player);
    if (player){
        console.log("Player Found");
        msg = "Updated Player";
        console.log("Player: ", player);
        player.runCount = req.body.runCount,
        player.wicketCount = req.body.wicketCount,
        player.wicketStatus = req.body.wicketStatus,
        player.fourCount = req.body.runCount,
        player.sixCount = req.body.sixCount,
        player.maidenOverCount = req.body.maidenOverCount,
        player.noBallCount = req.body.noBallCount,
        player.wideBallCount = req.body.wideBallCount,
        player.ballCount = req.body.ballCount,
        player.overCount = req.body.overCount,
        player.isBowler = req.body.isBowler,
        player.isBatsman = req.body.isBatsman
        matchDetail = player;
    }else {
        console.log("Not Found");
        msg = "Player Started Playing."
    }
    if(player || (playerFound == true && player == null)) {
        console.log("Inside player Found.");
        if (playerFound == true && player == null) {
            matchDetail._id = req.body.playerId;
        }
        console.log("New Object Id: ", matchDetail._id);
        matchDetail.save();
        res.status(200).send({
            message: msg,
            matchDetail
        });
    }else {
        console.log("Inside else");
        res.status(400).send({
            message: msg
        })
    }
    // matchDetail.save().then(() => {
    //     res.status(200).send(matchDetail);
    // }).catch((error) => {
    //     res.status(400).send(error)
    // })
};

module.exports = savePlayerMatchDetails;