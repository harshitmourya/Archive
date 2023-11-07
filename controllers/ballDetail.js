const BallDetail = require("../models/ballDetail");
const PlayerDetail = require("../models/playerDetail");

const saveBallDetails = async (req, res) => {
    const ball = new BallDetail(req.body);
    var msg = "", batsman, bowler;
    var isFound = true;
    const bowlerId = req.body.bowlerId;
    const batsmandId = req.body.batsmandId;

    try{
        batsman = await PlayerDetail.find({_id: batsmandId});
        bowler = await PlayerDetail.find({_id: bowlerId});
    }catch {
        isFound = false
        msg = "Player Not Found";
    }

    console.log("Batsman: ", batsman);
    console.log("Bowler: ", bowler);
    
    if(batsman == null || bowler == null) {
        isFound = false
        console.log("Player id not found")
    }

    console.log("Is Found: ", bowler);
    console.log("Batsman ID: ", batsmandId);
    console.log("Bowler ID: ", bowlerId);

    if (!isFound) {
        if(batsman == null) {
            msg = "Batsman not found";
        }else if(bowler == null) {
            msg = "Bowler not found";
        }
    }

    if(isFound) {
        ball.save()
        res.status(200).send({
            msg: "Successfull",
            ball
        });
    }else {
        res.status(400).send({
            message: msg,
            ball
        });
    }

    // ball.save().then(() => {
    //     res.status(200).send(ball);
    // }).catch((error) => {
    //     res.status(400).send(error);
    // })
};

module.exports = saveBallDetails;