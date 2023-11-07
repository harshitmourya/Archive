const MatchDetail = require("../models/matchDetail");
const TeamDetail = require("../models/teamDetail");

const saveMatchDetails = async (req, res) => {
    const matchdetail = new MatchDetail(req.body);
    var msg = "", win, loose, team1, team2;
    var isFound = true;
    const team1Id = req.body.team1;
    const team2Id = req.body.team2;
    const winningTeam = req.body.winningTeam;
    const looserTeam = req.body.looserTeam;
    try {
        win = await TeamDetail.findOne({_id: winningTeam});
        loose = await TeamDetail.findOne({_id: looserTeam});
        team1 = await TeamDetail.findOne({_id: team1Id});
        team2 = await TeamDetail.findOne({_id: team2Id});
    }catch(error) {
        msg = "Team Not Found";
        isFound = false;
        console.log("Inside catch Block");
    }

    if(team1 == null || team2== null || win == null || loose == null) {
        msg = "Team Not Found";
        isFound = false;
        console.log("Team Not Found");
    }

    if(team1 == ""){
        console.log("Hello");
    }

    if(isFound) {
        matchdetail.save();
        res.status(200).send({
            message: "Success",
            matchdetail
        })
    }else {
        res.status(400).send({
            message: msg
        })
    }


    // matchdetail.save().then(() => {
    //     res.status(200).send(matchdetail);
    // }).catch((error) => {
    //     res.status(400).send(error);
    // })
}

module.exports = saveMatchDetails;