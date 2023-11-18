const teamDetail = require("../models/teamDetail");
const Toss = require("../models/toss");
const winningTeamDetail = require("../models/winningTeamDetail");
// var team1_id =  ""; 
var isFound = false;
var message = "";
// var tossData = "";
   

async function  create(req, res) {
  const     toss = await Toss.create({

    team1_id: req.body.team1_id,
    team2_id: req.body.team2_id,
    team1Name: req.body.team1Name,
    team2Name: req.body.team2Name,
    tosses: req.body.tosses
  });

  console.log(toss)
  
  console.log("New Toss Object: ", toss)
  console.log("Team1_id: ", req.body.team1_id);
  console.log("Team2_id: ", req.body.team2_id);
  var team1_id = req.body.team1_id;
  var team2_id = req.body.team2_id;
  var team1Name = req.body.team1Name;
  var team2Name = req.body.team2Name;
  //  var tosses = req.body.tosses;



  async function isExistTeam(req, res) {

    try {
      const isExistTeam1 = await teamDetail.findOne({ _id: team1_id });//.populate(teamDetail);
      const isExistTeam2 = await teamDetail.findOne({ _id: team2_id });//.populate(teamDetail);


      var isTeam1 = await teamDetail.findOne({ team: team1Name });
      var isTeam2 = await teamDetail.findOne({ team: team2Name });

      //  isTeam1 = isExistTeam1 != null;
      //  isTeam2 = isExistTeam2  != null

      console.log("Is Exist Team: ", isExistTeam1);
      
      if (isExistTeam1 && isExistTeam2 & isTeam1 && isTeam2) {
        isFound = true;
        const A = isExistTeam1._id;
        const B = isExistTeam2._id;

        const C = isTeam1._id;
        const D = isTeam2._id;

        console.log("weedede", team1_id);
        console.log('TEAM1 NAME:-', team1Name);
        console.log('TEAM2 NAME:-', team2Name)

        console.log(A);
        console.log(B);

        tossData = await toss.save();
        // await toss.updateOne({ TEXT: toss.TEST });

      } else {
        isFound = false;
        message = 'team not found'
      }


    } catch (error) {
      console.log("Is Exist Team: ", isExistTeam);
      console.log(error)
      isFound = false;
      message = "error: ",error
    }

  }

  await isExistTeam()


  async function tossResult(tossData) {
    const i = Math.floor(Math.random() * 2);

    let message;
    let winningTeam;
    let WinningTeamId;

    try {
        if (i === 1) {
            message= `${tossData.team1Name} won the toss`;
            winningTeam = tossData.team1Name;
            WinningTeamId = tossData.team1_id;
            console.log(message);
            console.log("winning teamID: ", WinningTeamId);
            console.log("winning team: ", winningTeam);

            // Assuming winningTeamDetail is a valid model
            const winningTeamObj = new winningTeamDetail({
                teamId: WinningTeamId,
                teamName: winningTeam
            });

            await winningTeamObj.save();
        } else {
            message = `${tossData.team2Name} won the toss`;
            winningTeam = tossData.team2Name;
            WinningTeamId = tossData.team2_id;
            console.log(message);
            console.log("winning team: ", winningTeam);

            // Assuming winningTeamDetail is a valid model
            const winningTeamObj = new winningTeamDetail({
                teamId: WinningTeamId,
                teamName: winningTeam
            });

            await winningTeamObj.save();
        }
    } catch (error) {
        console.error("Error: ", error.message);
        message = "Error: " + error.message;
    }
    return WinningTeamId;
}

if (isFound) {
    const result = await tossResult(tossData);

    res.status(200).send({
        msg: message,
        tossData,
        WinningTeamId: result
    });
} else {
    res.status(400).send({
        Message: message
    });
}


};



module.exports = create


