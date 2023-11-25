const matchDetail = require("../models/matchDetail");
const MatchDetail = require("../models/matchDetail");
const TeamDetail = require("../models/teamDetail");

async function saveMatchDetails(req, res) {
    try {
        const matchdata = new matchDetail({
            team1_id: req.body.team1_id,
            team1Name: req.body.team1Name,
            team1TotalPlayers:req.body.team1TotalPlayers,
            team2_id: req.body.team2_id,
            team2Name: req.body.team2Name,
            team2TotalPlayers:req.body.team2TotalPlayers,
            totalOver: req.body.totalOver,
            TosswinningTeamId: req.body.TosswinningTeamId,
            choose: req.body.choose
        });

        console.log("New matchdata: ", matchdata);
        console.log("Team1_id: ", req.body.team1_id);
        console.log("Team2_id: ", req.body.team2_id);
        console.log("team1players :-" ,req.body.team1TotalPlayers);
        console.log("team2players :-" ,req.body.team2TotalPlayers);


        async function isExistTeam() {
            try {
                const isteam1 = await TeamDetail.findOne({ _id:team1_id });
                const isteam2 = await TeamDetail.findOne({ _id:team2_id });

                console.log("team1ID :-", isteam1);
                console.log("team2ID :-", isteam2);

                if(!isteam1 || isteam2){
                    return res.status(400).json({message:"One or both teams not found"})
                }

            } catch (error) {
                console.log("Team Not found", error.message);
            }

            const ExistingMatch = await MatchDetail.findOne({
                team1_id: req.body.team1_id,
                team2_id: req.body.team2_id
            });

            if (ExistingMatch) {
                ExistingMatch.team1_id = req.body.team1_id;
                ExistingMatch.team2_id = req.body.team2_id;
                ExistingMatch.team1Name = req.body.team1Name;
                ExistingMatch.team1TotalPlayers=req.body.team1TotalPlayers;   
                ExistingMatch.team2Name = req.body.team2Name;
                ExistingMatch.TosswinningTeamId = req.body.TosswinningTeamId;
                ExistingMatch.team2TotalPlayers = req.body.team2TotalPlayers;
                ExistingMatch.totalOver = req.body.totalOver;
                ExistingMatch.choose = req.body.choose;

                await ExistingMatch.save();

            } else {
                const secondExist = await new MatchDetail({
                    team1_id: req.body.team1_id,
                    team1Name: req.body.team1Name,
                    team1TotalPlayers:req.body.team1TotalPlayers,
                    team2_id: req.body.team2_id,
                    team2Name: req.body.team2Name,
                    team1TotalPlayers:req.body.team1TotalPlayers,
                    totalOver: req.body.totalOver,
                    TosswinningTeamId: req.body.TosswinningTeamId,
                    choose: req.body.choose
                });

                await secondExist.save();
            }

            res.status(200).json({ message: "MatchDetail data saved successfully" });
        }

        await isExistTeam();
    } catch (error) {
        console.log("error :-",error.message);
        res.status(500).json({ message: "Team not found" });
    }
}

module.exports = saveMatchDetails;

 // const matchdetail = new MatchDetail(req.body);
    // var msg = "", win, loose, team1, team2;
    // var isFound = true;
    // const team1Id = req.body.team1;
    // const team2Id = req.body.team2;
    // const winningTeam = req.body.winningTeam;
    // const looserTeam = req.body.looserTeam;
    // try {
    //     win = await TeamDetail.findOne({_id: winningTeam});
    //     loose = await TeamDetail.findOne({_id: looserTeam});
    //     team1 = await TeamDetail.findOne({_id: team1Id});
    //     team2 = await TeamDetail.findOne({_id: team2Id});
    // }catch(error) {
    //     msg = "Team Not Found";
    //     isFound = false;
    //     console.log("Inside catch Block");
    // }

    // if(team1 == null || team2== null || win == null || loose == null) {
    //     msg = "Team Not Found";
    //     isFound = false;
    //     console.log("Team Not Found");
    // }

    // if(team1 == ""){
    //     console.log("Hello");
    // }

    // if(isFound) {
    //     matchdetail.save();
    //     res.status(200).send({
    //         message: "Success",
    //         matchdetail
    //     })
    // }else {
    //     res.status(400).send({
    //         message: msg
    //     })
    // }


    // // matchdetail.save().then(() => {
    // //     res.status(200).send(matchdetail);
    // // }).catch((error) => {
    // //     res.status(400).send(error);
    // // })