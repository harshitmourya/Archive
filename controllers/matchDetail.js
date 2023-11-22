const matchDetail = require("../models/matchDetail");
const MatchDetail = require("../models/matchDetail");
const TeamDetail = require("../models/teamDetail");


async function saveMatchDetails(req,res){
        const matchdata = await matchDetail({
            team1_id:req.body.team1_id,
            team1Name:req.body.team1Name,
            team2_id:req.body.team2_id,
            team2Name:req.body.team2Name,
            totalOver:req.body.totalOver,
            TosswinningTeamId:req.body.TosswinningTeamId,
            choose:req.body.choose
        })


        console.log("New matchdata: ", matchdata)
  console.log("Team1_id: ", req.body.team1_id);
  console.log("Team2_id: ", req.body.team2_id);
  var team1_id = req.body.team1_id;
  var team2_id = req.body.team2_id;
  var team1Name = req.body.team1Name;
  var team2Name = req.body.team2Name;


        async function isExistTeam(req,res){
            try {
                const isteam1 = await TeamDetail.findOne({_id:team1_id});
                const isteam2 = await TeamDetail.findOne({_id:team2_id});


                
                console.log("team1ID :-",isteam1);
                console.log("team2ID :-", isteam2);

            } catch (error) {
                console.log("Team Not found",error.message)
            }

            match = await matchdata.save()
        }

        await isExistTeam()
        res.status(200).json({message:"Data saved successfully"})

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