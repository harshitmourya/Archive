const TeamDetail = require("../models/teamDetail");

const saveTeamDetail = async (req, res) => {
    console.log(req.body);

    const teams = req.body;
    const savedTeams = [];

    for (const teamData of teams) {
        console.log("Team Data: ", teamData);
        const team = new TeamDetail(teamData);

        try {
            const existingTeam = await TeamDetail.findOne({ team: teamData.team });
            if (existingTeam) {
                console.log("Team already exists: ", existingTeam);
                return res.status(400).send({
                    team: existingTeam.team,
                    message: "Team already exists"
                });
            }

            const savedTeam = await team.save();
            savedTeams.push({
                team_id: savedTeam._id,
                team: savedTeam.team,
                place: savedTeam.place
            });
        } catch (error) {
            console.error("Error saving team: ", error);
            return res.status(500).send({
                error: "Internal server error "
            });
        }
    }

    return res.status(201).send({
        message: "Teams saved successfully",
        teams: savedTeams
    });
};

module.exports = saveTeamDetail;
