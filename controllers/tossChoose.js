  const teamDetail = require("../models/teamDetail");
  const Toss = require("../models/toss");
  const winningTeamDetail = require("../models/winningTeamDetail");
  const winningTeam = require("../models/winningTeamDetail");
  // const tossResult = require("../controllers/toss");
  // const winningTeamObj = require('../controllers/toss');
   const tossData  = require('../controllers/toss')
   const tossResult =  require("../controllers/toss");


  var message = '';
   var  isFound = false;

  async function tossGet(req, res) {
    try {

      //
      const winner = await winningTeamDetail({
        teamId: req.body.teamId,
        teamName: req.body.teamName
      });
      console.log(winner)

      // 
      // var optionA = "batting";
      // var optionB = "bowling";
      
      //    
      var teamId = req.body.teamId;
      var teamName = req.body.teamName;

      var team1_id = tossResult.team1_id;
      var team2_id = tossResult.team2_id;
      var team1Name = tossResult.team1Name;
      var team2Name = tossResult.team2Name;

      console.log("team1: ",team1_id);
      console.log("team2: ",team2_id);
      console.log("team1name: ",team1Name);
      console.log("team2name: ",team2Name);

    //  var winTeam =  winningTeamObj.WinningTeamId
    //  console.log(winTeam)
      //

      async function isWinnertoss(req,res) {
        let chooseTeam;

        try {

          // 
          const isExistteam1 = await Toss.findOne({ team1_id:team1_id });
          const isExistteam2 = await Toss.findOne({ team2_id:team2_id });
              
          console.log( " isteam1",isExistteam1  );
          console.log('isteam2',isExistteam2 );
          
          try {

            if(isExistteam1 === teamId){
              if(isFound = true){
              message = `${winner.teamName} Choose to Bat First`;
              chooseTeam = winner.teamName;
              console.log(winner.teamName,"Choose to Bat first");
            }else{
              message = `${winner.teamName} Choose to Bowl First`;
              chooseTeam = winner.teamName;
              console.log(winner.teamName,"Choose to Bowl first");
            }
            if(isExistteam2 === teamId){
              if(isFound = true){
                message = `${winner.teamName} Choose to Bat First`;
                chooseTeam = winner.teamName;
                console.log(winner.teamName,"Choose to Bat First")
              }else {
                message = `${winner.teamName} Choose to Bowl First`;
                chooseTeam = winner.teamName;   
                console.log(winner.teamName,"Choose to Bowl First");
              }
            }
          }

          } catch (error) {
            console.log(error.message)
          }   
          

        } catch (error) {
          console.log(error);
          message = 'An error occurred while doing the toss result.';
        }
      }

       await isWinnertoss();

      // 

      res.status(200).send({ message });

    } catch (error) {
      console.log(error);
      // 
      res.status(500).json({ message: 'Internal Server Error' });
    }
    }

  module.exports = tossGet;




  // if (winner && winner.winningTeam) {
    //   if (winner.winningTeam === optionA) {
    //     message = `${winner.teamName} choose to Bat first`;
    //     console.log(`${winner.teamName} choose to Bat first`)
    //   } else if (winner.winningTeam === optionB) {
    //     message = `${winner.teamName} choose to Bowl first`;
    //     console.log(`${winner.teamName} choose to Bowl first`)
    //   }
    // } else {
    //   message = 'Winner not found or winning team not specified.';
    // }

  // const tossData = require("../controllers/toss");
  // const tossResult = require('../controllers/toss');
  // const winningTeamDetail = require("../models/winningTeamDetail");

  // var message = '';

  // isFound  = false;

  // async function tossGet(req,res) {

  //   const  tossing = await winningTeamDetail.tossGet({
  //     teamId : req.body.teamId,
  //     teamName: req.body.teamName
  //   }) 
      
  //     var optionA = Batting;
  //     var optionB  = Bowling;
  //     var teamId = req.body.teamId;
  //     var teamName = req.body.teamName;
  //     var team1_id = req.body.team1_id;
  //     var team2_id = req.body.team2_id;

      
      
  //     async function isWinnertoss(req,res){
      
  //       try {
  //         const isExistTeam1 = await toss.findOne({_id:team1_id});
  //         const isExistTeam2 = await toss.findOne({_id:team2_id});
          
  //       } catch (error) {
  //         console.log(error)
  //       } 

  //         if(team1_id || team1_id){

  //           const winning = await tossData.findOne({WinningTeamId});
            

  //         } else{
            
  //         }

  //     } 
  //     await isWinnertoss();

  //     console.log(winner);
  //     console.log('HEKLOs')
  //     try {
  //         if(winningTeam == optionA){
  //             message = winner,"choose to Bat first" 
  //           }
  //           else{
  //             (winningTeam == optionB)
  //               message = winner,"choose to Ball first"
  //           }

  //           res.status(200).json.send(winner)
  //                    const resu = winner.save()
  //     }
    
  //     catch (error) {
  //     console.log(error)    
  //     }
      
      


  // }




  // module.exports = tossGet