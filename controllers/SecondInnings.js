const FirstInning  = require("../models/FirstInnings");
const PlayerOnGround = require("../models/playerOnGroundDetail");
const SecondInning = require("../models/SecondInnings")

async function second(req,res){
    console.log("Outside Try");
    try {
        console.log("Inside Try");
        const api2 = new SecondInning({
            BattingTeamName: req.body.BattingTeamName,
            BattingTeamID: req.body.BattingTeamID,
            BowlingTeamID: req.body.BowlingTeamID,
            Player_ID_OnStrike: req.body.Player_ID_OnStrike,
            PlayerName_OnStrike: req.body.PlayerName_OnStrike,
            //Player_ID_OfStrike: req.body.Player_ID_OfStrike,
            //PlayerName_OfStrike: req.body.PlayerName_OfStrike,
            WicketStatus: req.body.WicketStatus,
            BattingTeamwicketCount: req.body.BattingTeamwicketCount,
            BallCountofBatsman: req.body.BallCountofBatsman,
            BowlingTeamName: req.body.BowlingTeamName,
            Player_IDonBowling: req.body.Player_IDonBowling,
            PlayerNameOnBowling: req.body.PlayerNameOnBowling,
            BallCountofBowler: req.body.BallCountofBowler,
            batterRunCount: req.body.batterRunCount,
            teamRunCount: req.body.teamRunCount,
            wicketCount: req.body.wicketCount,
            isFour: req.body.isFour,
            isSix: req.body.isSix,
            wideBall: req.body.wideBall,
            NOBall: req.body.NOBall,
            teamOverCount: req.body.teamOverCount,
            MaidenOver: req.body.MaidenOver   
        }); 
        
        console.log("Hello, Harshit");
        console.log("Object: ", api2);

        console.log("battingteam: ", api2.BattingTeamID);
        console.log("bowlingteam: ", api2.BowlingTeamID);
        // const firstInningData = await FirstInning.findOne({ BowlingTeamID: bowlingTeamID });

         // Check if the inning already exists


         const ExistingInning = await SecondInning.findOne({
           
            BattingTeamID: req.body.BattingTeamID, 
            Player_ID_OnStrike: req.body.Player_ID_OnStrike,
            //Player_ID_OfStrike: req.body.Player_ID_OfStrike,
            BowlingTeamID:req.body.BowlingTeamID,
            Player_IDonBowling: req.body.Player_IDonBowling,
          
        });
        
        console.log("Existing Team ID: ", ExistingInning);

        if(ExistingInning){
            // update secondInning Player details

            ExistingInning.Player_ID_OnStrike =  req.body.Player_ID_OnStrike;
            //ExistingInning.Player_ID_OfStrike =  req.body.Player_ID_OfStrike;
            ExistingInning.PlayerName_OnStrike = req.body.PlayerName_OnStrike;
            //ExistingInning.PlayerName_OfStrike = req.body.PlayerName_OfStrike;
            ExistingInning.BattingTeamID = req.body.BattingTeamID;
            ExistingInning.BowlingTeamID = req.body.BowlingTeamID;
            ExistingInning.BowlingTeamName = req.body.BowlingTeamName;
            ExistingInning.Player_IDonBowling = req.body.Player_IDonBowling;
            ExistingInning.PlayerNameOnBowling = req.body.PlayerNameOnBowling;

            // update other Fields also related to secondInning
            
            ExistingInning.batterRunCount = req.body.batterRunCount;
            ExistingInning.teamRunCount= req.body.teamRunCount,
            ExistingInning.isSix = req.body.isSix;
            ExistingInning.isFour = req.body.isFour;    
            ExistingInning.wicketCount = req.body.wicketCount;
            ExistingInning.BattingTeamwicketCount= req.body.BattingTeamwicketCount;
            ExistingInning.BallCountofBatsman = req.body.BallCountofBatsman;
            ExistingInning.BallCountofBowler = req.body.BallCountofBowler;
            ExistingInning.wideBall = req.body.wideBall;
            ExistingInning.NOBall = req.body.NOBall;
            ExistingInning.teamOverCount = req.body.teamOverCount;
            ExistingInning.MaidenOver = req.body.MaidenOver;

            console.log('inside is exist');
            
            // save the ExistingInning Data
             await ExistingInning.save();

        }else{
            const newSecond = await new SecondInning({
                BattingTeamName: req.body.BattingTeamName,
                BattingTeamID: req.body.BattingTeamID,
                BowlingTeamID: req.body.BowlingTeamID,
                Player_ID_OnStrike: req.body.Player_ID_OnStrike,
                PlayerName_OnStrike: req.body.PlayerName_OnStrike,
                //Player_ID_OfStrike: req.body.Player_ID_OfStrike,
                //PlayerName_OfStrike: req.body.PlayerName_OfStrike,
                WicketStatus: req.body.WicketStatus,
                BattingTeamwicketCount: req.body.BattingTeamwicketCount,
                BallCountofBatsman: req.body.BallCountofBatsman,
                BowlingTeamName: req.body.BowlingTeamName,
                Player_IDonBowling: req.body.Player_IDonBowling,
                PlayerNameOnBowling: req.body.PlayerNameOnBowling,
                BallCountofBowler: req.body.BallCountofBowler,
                batterRunCount: req.body.batterRunCount,
                teamRunCount: req.body.teamRunCount,
                wicketCount: req.body.wicketCount,
                isFour: req.body.isFour,
                isSix: req.body.isSix,
                wideBall: req.body.wideBall,
                NOBall: req.body.NOBall,
                teamOverCount: req.body.teamOverCount,
                MaidenOver: req.body.MaidenOver

            })
            console.log(' else inside is exist')

            await newSecond.save(); 
        }
        res.status(200).json({message: 'Second Inning Data saved Successfully'});
        console.log('response')
    } catch (error) {
        console.log("Team Not Found",error.message);
        res.status(500).json({ message: 'Error saving data 2222' });
    }
    console.log("debug")
}

module.exports = second;    