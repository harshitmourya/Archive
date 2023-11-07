const teamDetail = require("../models/teamDetail");


const saveTeamDetail = async (req, res) => {
    console.log(req.body);


    var obj = req.body;
    console.log("Obj: ", obj)
    var isFound = false;

    for (const element of obj) {

        console.log("Team 1: ", element);
        const team = new teamDetail(element);
        const teamName = element.team;
        const place = element.place;
        console.log("Team Name: " + teamName);
        console.log("Place: ", place);

        const data = await teamDetail.findOne({ teamName: teamName });
        console.log("Data: ", data);

        if (data) {
            console.log("Found ********: ")
            isFound = true
            res.status(400).send({
                team: teamName,
                message: "Already Exists"
            })
        } else {
            team.save()
        }
    };
    res.status(201).send(
        {
            Message: "Saved Successfylly",
            obj
        }
    )
};

;










// const saveTeamDetail = async (req, res) => {
//     console.log(req.body);
//     var isFound = false
//     const team = new teamDetail(req.body);
//     const teamName = req.body.team;
//     console.log("Team Name: "+teamName);



//     const data = await teamDetail.findOne({team: teamName}); 
//     console.log("Data: ", data);


//     if (data){
//         console.log("Found ********: ")
//         isFound = true
//         res.status(400).send({
//             team: teamName,
//             message: "Already Exists"
//         })
//     }else {
//         team.save()
//         res.status(201).send(
//             {
//                 Message: "Saved Successfylly",
//                 team: teamName,
//                 place: req.body.place
//             }
//         )};
//     console.log("Is Found: ", isFound)
// };



module.exports = saveTeamDetail;

