const TwoMatchData = require("../models/saveMatchBTW2teams");


async function runningMatch(req, res) {
    const {_id} = req.params;
    console.log("RunningObjID", _id);

    try {
        const RunningDetail = await TwoMatchData.findOne({ _id});
        console.log("RunningMatchDetail", RunningDetail);
        if (!RunningDetail) {
            return res.status(404).json({ message: "No Running Match found for the selected ID" });
        } else {
            res.status(200).json({ RunningDetail });
        }
    } catch (error) {
        res.status(500).json({ message: "Error while fetching Running Match details", error: error.message });
    }
}

module.exports = runningMatch;
