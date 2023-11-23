const playerDetail = require('../models/playerDetail');

async function deleteAllPlayer(req,res){
    try {
        await playerDetail.deleteMany({});
        res.status(200).json({ message: 'All players deleted successfully' });

    } catch (error) {
        console.log("error :-",error.message);
        res.status(500).json({ message: 'Internal Server Error' });

    }
}

module.exports = deleteAllPlayer






// router.post('/deleteAllPlayers', async (req, res) => {
//     try {
//         await playerDetail.deleteMany({});
//         res.status(200).json({ message: 'All players deleted successfully' });
//     } catch (error) {
//         console.error('Error deleting players:', error.message);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// });

