const express = require("express");
const router = express.Router();
// const authenticaterequest = require("../app/")

const getAllPlayers = require("../controllers/getAllPlayer");
const savePlayerDetails = require("../controllers/playerDetail");
const saveUserDetails = require("../controllers/registrationDetail");
const saveTeamDetail = require("../controllers/teamDetail");
const saveLoginDetail = require("../controllers/loginDetail");
const saveBallDetail = require("../controllers/ballDetail");
const savePlayerMatchDetails = require("../controllers/playerMatchDetail");
const saveMatchDetails = require("../controllers/matchDetail");
const savePlayerOnGroundDetails = require("../controllers/playerOnGroundDetail");
const create = require("../controllers/toss");
// const isExistTeam = require("../controllers/toss");
const tossGet = require("../controllers/tossChoose");
const first = require("../controllers/FirstInnings");
const teamPlayers = require("../controllers/getAllTeamPlayers");
const twoMatch  =require("../controllers/twoMatchData"); 
const runningMatch = require("../controllers/getMatchRunningStatus");
const second = require("../controllers/SecondInnings");
const deleteAllPlayer = require("../controllers/deleteAllplayer");
const getAllteam = require("../controllers/getAllteam");
const DeleteSinglePlayer = require("../controllers/deleteSinglePlayer");
const AllteamDelete = require("../controllers/TeamDeleteAll");
const SingleTeamDelete = require("../controllers/TeamSingleDelete");
const determineWinner = require("../controllers/WinningMatchTeam");



router.route("/All/:userID").get(getAllPlayers);
router.route("/team/:teamID").get(teamPlayers);
router.route("/:_id").get(runningMatch);
router.route("/all/getAllteam").get(getAllteam);
router.route("/winner/:TwoMatch").get(determineWinner);
router.route("/newPlayer").post(savePlayerDetails);
router.route("/registration").post(saveUserDetails);
router.route("/team").post(saveTeamDetail);
 router.route("/login").post(saveLoginDetail);
router.route("/toss").post(create);
router.route("/tossGet").post(tossGet);
router.route("/ball").post(saveBallDetail);
router.route("/playerMatchDetail").post(savePlayerMatchDetails);
router.route("/match").post(saveMatchDetails);
router.route("/onGround").post(savePlayerOnGroundDetails);
router.route("/first").post(first);
router.route("/second").post(second);
router.route("/twoMatch").post(twoMatch);
router.route("/deleteAllPlayer").delete(deleteAllPlayer);
router.route("/DeleteSinglePlayer/:playerId").delete(DeleteSinglePlayer);
router.route("/AllteamDelete").delete(AllteamDelete);
router.route("/SingleTeamDelete/:teamid").delete(SingleTeamDelete);

module.exports = router;
