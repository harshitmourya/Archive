const FirstInning = require('../models/FirstInnings');
const PlayerOnGround = require('../models/playerOnGroundDetail');



async function first(req, res) {
    try {
         // Check if BattingTeamID, BowlingTeamID, and Player_ID_OnStrike are in the database
         const isBattingTeamExist = await PlayerOnGround.findOne({ teamID: req.body.BattingTeamID });
         const isBowlingTeamExist = await PlayerOnGround.findOne({ teamID: req.body.BowlingTeamID });
         const isPlayerOnStrikeExist = await PlayerOnGround.findOne({ playerID: req.body.Player_ID_OnStrike });
         const isPlayerOnBowlingExist = await PlayerOnGround.findOne({playerID:req.body.Player_IDonBowling})
 
         if (!isBattingTeamExist || !isBowlingTeamExist || !isPlayerOnStrikeExist || isPlayerOnBowlingExist) {
             return res.status(400).json({ message: "One or more teams/players not found" });
         }else{
            

        // const api1 = new FirstInning({
        //     BattingTeamName: req.body.BattingTeamName,
        //     BattingTeamID: req.body.BattingTeamID,
        //     BowlingTeamID: req.body.BowlingTeamID,
        //     Player_ID_OnStrike: req.body.Player_ID_OnStrike,
        //     PlayerName_OnStrike: req.body.PlayerName_OnStrike,
        //     WicketStatus: req.body.WicketStatus,
        //     BattingTeamwicketCount: req.body.BattingTeamwicketCount,
        //     BallCountofBatsman: req.body.BallCountofBatsman,
        //     BowlingTeamName: req.body.BowlingTeamName,
        //     Player_IDonBowling: req.body.Player_IDonBowling,
        //     PlayerNameOnBowling: req.body.PlayerNameOnBowling,
        //     BallCountofBowler: req.body.BallCountofBowler,
        //     batterRunCount: req.body.batterRunCount,
        //     teamRunCount:req.body.teamRunCount,
        //     wicketCount: req.body.wicketCount,
        //     BowlerwicketCount: req.body.BowlerwicketCount,
        //     isFour: req.body.isFour,
        //     isSix: req.body.isSix,
        //     wideBall: req.body.wideBall,
        //     NOBall: req.body.NOBall,
        //     teamOverCount: req.body.teamOverCount,
        //     MaidenOver: req.body.MaidenOver
            
        // });
    

        


        // Check if the inning already exists
        const existingInning = await FirstInning.findOne({
            // BattingTeamName,
            BattingTeamID: req.body.BattingTeamID, 
            Player_ID_OnStrike: req.body.Player_ID_OnStrike,
            //Player_ID_OfStrike: req.body.Player_ID_OfStrike,
            Player_IDonBowling: req.body.Player_IDonBowling,
          
        });

        if (existingInning) {
            // Updating players detail
            existingInning.Player_ID_OnStrike = req.body.Player_ID_OnStrike;
            existingInning.PlayerName_OnStrike = req.body.PlayerName_OnStrike;
            existingInning.BattingTeamID = req.body.BattingTeamID;
            existingInning.BowlingTeamID = req.body.BowlingTeamID;
            existingInning.BowlingTeamName = req.body.BowlingTeamName;
            existingInning.Player_IDonBowling = req.body.Player_IDonBowling;
            existingInning.PlayerNameOnBowling = req.body.PlayerNameOnBowling;

            // Updating other fields also
            existingInning.WicketStatus = req.body.WicketStatus,
            existingInning.batterRunCount= req.body.batterRunCount,
            existingInning.teamRunCount= req.body.teamRunCount,
            existingInning.isSix = req.body.isSix;
            existingInning.isFour = req.body.isFour;
            existingInning.wicketCount = req.body.wicketCount;
            existingInning.batterRunCount= req.body.batterRunCount
            existingInning.BattingTeamwicketCount= req.body.BattingTeamwicketCount; 
            existingInning.BallCountofBatsman = req.body.BallCountofBatsman;
            existingInning.BallCountofBowler = req.body.BallCountofBowler;
            existingInning.BowlerwicketCount = req.body.BowlerwicketCount;
            existingInning.wideBall = req.body.wideBall;
            existingInning.NOBall = req.body.NOBall;
            existingInning.teamOverCount = req.body.teamOverCount;
            existingInning.MaidenOver = req.body.MaidenOver; 
               
            // Save the updated document
            await existingInning.save();
        } else {
            const newlyInning = await new FirstInning({
                BattingTeamName: req.body.BattingTeamName,
                BattingTeamID: req.body.BattingTeamID,
                BowlingTeamID: req.body.BowlingTeamID,
                Player_ID_OnStrike: req.body.Player_ID_OnStrike,
                PlayerName_OnStrike: req.body.PlayerName_OnStrike,
                WicketStatus: req.body.WicketStatus,
                BattingTeamwicketCount: req.body.BattingTeamwicketCount,
                BallCountofBatsman: req.body.BallCountofBatsman,
                BowlingTeamName: req.body.BowlingTeamName,
                Player_IDonBowling: req.body.Player_IDonBowling,
                PlayerNameOnBowling: req.body.PlayerNameOnBowling,
                BallCountofBowler: req.body.BallCountofBowler,
                batterRunCount: req.body.batterRunCount,
                teamRunCount:req.body.teamRunCount,
                wicketCount: req.body.wicketCount,
                BowlerwicketCount:req.body.BowlerwicketCount,
                isFour: req.body.isFour,
                isSix: req.body.isSix,
                wideBall: req.body.wideBall,
                NOBall: req.body.NOBall,
                teamOverCount: req.body.teamOverCount,
                MaidenOver: req.body.MaidenOver

            })
            await newlyInning.save();
        }

        // const apiData = await api1.save()
    

        res.status(200).json({ message: 'Data saved successfully ' });
    }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error saving data' });
    }
    
}

module.exports = first;


















// // Inside your async playerfind function
// try {
//     // Find the player with Player_ID_OnStrike
//     const batsmanOnStrike = await PlayerOnGround.findOne({ playerID: Player_ID_OnStrike });

//     if (batsmanOnStrike) {
//         // Player is found, update their information
//         batsmanOnStrike.runCount = req.body.runCount; // Update runCount
//         batsmanOnStrike.isFour = req.body.isFour; // Update isFour
//         batsmanOnStrike.isSix = req.body.isSix; // Update isSix

//         // Save the updated player information
//         await batsmanOnStrike.save();
//     } else {
//         // Player not found, you can handle this case as needed
//     }

//     // Continue with the rest of your code
// } catch (error) {
//     console.log("Error:", error);
//     message = "Player not found or error occurred while updating player details";
// }





                // // player is Found update their information
                // BatsmanOnStrikeID.runCount = req.body.runCount;
                // BatsmanOnStrikeID.isFour = req.body.isFour;
                // BatsmanOnStrikeID.isSix = req.body.isSix;


                // // BallCount of Batsman
                // // let BallCountofBatsman = 0;
                // let ballsInOver = 0;
                // let overCount = 0;
    
                // //  bowling 6 balls (1 over)
                // for (let ball = 1; ball <= 6; ball++) {
                //     ballsInOver++; // Increment the ball count for each ball bowled
    
                //     // Check if it's the end of the over (6 balls)
                //     if (ballsInOver === 6) {
                //         overCount++; // Increment the over count
                //         ballsInOver = 0; // Reset the ball count for the next over
                //     }
                // }
    
                // console.log(`Total overs bowled: ${overCount}`);

                // // In every response to a "hitFour" 
                // if (fourCount) {
                //     BatsmanOnStrikeID.isFour += 1; // Increment by 1 for each four
                //     BatsmanOnStrikeID.runCount += 4; // Increase in the total run count
                //     await BatsmanOnStrikeID.save();
                // } else {
                //     console.log(error, "error in fourCount");
                // };


                // // In every response to a "hitSix" action
                // if (sixCount) {
                //     BatsmanOnStrikeID.isSix += 1; // Increment by 1 for each six
                //     BatsmanOnStrikeID.runCount += 6; // Increase in the total run count
                //     await BatsmanOnStrikeID.save();
                // } else {
                //     console.log(error, "error in sixCount");
                // };

                // if (WicketStatus) {
                //     console.log('BATSMAN is Out');
                //     message = " This Batsman is out ,please send another Batsman";
                // } else {
                //     message = 'error in wicketStatus'
                //     console.log('error in WicketStatus')
                // }

                // const BattingTeamwicketCounts = req.body.BattingTeamwicketCount;

